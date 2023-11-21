import nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/ses-transport';
import { serverEnv } from 'server/env';

type MailOptionsType = {
    from?: string;
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject: string;
    text?: string;
    html: string;
}

export default class MailService {
    private static instance: MailService;
    private transporter: any;

    private constructor() {}

    static getInstance() {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }

    async createConnection() {
        this.transporter = nodemailer.createTransport({
            host: serverEnv.SMTP_HOST,
            port: serverEnv.SMTP_PORT,
            auth: {
                user: serverEnv.SMTP_USERNAME,
                pass: serverEnv.SMTP_PASSWORD,
            }
        });
    }

    async send(
        options: MailOptionsType
    ) {
        this.createConnection();

        return await this.transporter
            .sendMail({ 
                from: `"${serverEnv.SMTP_SENDER_NAME}" <${serverEnv.SMTP_SENDER_EMAIL}>`,
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: options.html
            })
            .then((info: SentMessageInfo) => {
                console.log(`Mail sent successfully!!`);
                console.log(`[MailResponse]=${info.response} [MessageID]=${info.messageId}`);
                if (process.env.NODE_ENV !== 'production') {
                    console.log(`Nodemailer ethereal URL: ${nodemailer.getTestMessageUrl(
                        info
                    )}`);
                }
                return info;
            });
    }

    async verifyConnection() {
        return this.transporter.verify();
    }

    getTransporter() {
        return this.transporter;
    }
}
