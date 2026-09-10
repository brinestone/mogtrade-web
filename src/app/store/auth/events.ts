import { CredentialSignInBody } from '@mogtrade/sdk/models';
import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
export const authEvents = eventGroup({
  source: 'Auth',
  events: {
    credentialSignIn: type<CredentialSignInBody>(),
    signedIn: type<void>(),
  },
});
