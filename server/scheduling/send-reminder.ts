import { db } from 'server/db';
import { Schedule } from './schedule';
import { eq, isNull } from 'drizzle-orm';
import { reminder, ChannelType } from 'server/db/schema/reminder';
import { utcToZonedTime } from 'date-fns-tz';
import { addHours, addMinutes, format, subHours } from 'date-fns';
import { sendPhoneMessage } from 'server/services/sms.service'
import reminderTemplate from 'server/mail-templates/reminder-template';
import MailService from 'server/services/mailer.service';

type Reminder = typeof reminder.$inferSelect;

export default class sendReminder extends Schedule {
  public readonly name: string = 'Send reminder job';

  // Every five minute
  public readonly pattern: string = '*/2 * * * * *';

  now() {
    const timeZone = 'Asia/Tbilisi';
    const date = new Date();
    const zonedDate = utcToZonedTime(date, timeZone);
    return addHours(zonedDate, 4);
  }

  async handler(): Promise<void> {
    const reminders = await db.query.reminder.findMany({
      with: {
        event: {
          where: (event: { startAt: any; }, { between }: any) => between(event.startAt, addMinutes(this.now(), 10), addMinutes(this.now(), 20))
        },
        user: true,
      },
      where: isNull(reminder.sendAt)
    })

    if (! reminders.length) {
      return;
    }

    reminders
      .filter((_reminder: Reminder | any) => _reminder.event)
      .forEach(async (r: Reminder | any) => {
        const message = `მატჩი ${r?.event?.title} იწყება ${format(subHours(r.event.startAt, 4), 'HH:mm')}-ზე! უყურე თამაშს უფასოდ Setanta Sports-სგან adjarabetarena-ზე! %s`;

        if (r?.user?.phone_number) {
          await sendPhoneMessage(Number(r?.user?.phone_number), message)
          await db
            .update(reminder)
            .set({ sendAt: new Date(), message, channel: 'sms' })
            .where(eq(reminder.id, r.id));
        }

        if (r?.user?.email) {
          await this.sendEmail(r.user.email, message)
          await db
            .update(reminder)
            .set({ sendAt: new Date(), message, channel: 'email' })
            .where(eq(reminder.id, r.id));
        }
      });
  }

  async sendEmail(email: string, message: string): Promise<boolean> {
    try {
      const emailTemplate = reminderTemplate(message);
      const mailService = MailService.getInstance();
  
      mailService.send({
        to: email,
        subject: 'Match reminder',
        html: emailTemplate.html,
      });
  
      return true;
    } catch (err) {
      throw new Error('Error while send email')
    }
  }
}
