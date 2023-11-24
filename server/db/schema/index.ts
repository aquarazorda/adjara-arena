import * as users from './user';
import { cmsUser } from './cms_user';
import { acceptedTerms } from './accepted_terms';
import { verification } from './verification';
import { activityLogs } from './activity_logs';
import { setantaEvent } from './setanta_event';

export default {
  ...users,
  cmsUser,
  acceptedTerms,
  verification,
  activityLogs,
  setantaEvent,
};
