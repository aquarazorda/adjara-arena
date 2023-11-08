import * as samlify from 'samlify';
import fs from 'fs';
import * as validator from '@authenio/samlify-node-xmllint';
import { serverEnv } from './env';

samlify.setSchemaValidator(validator);

const spData: any = {
  entityID: serverEnv.SAML_ENTITY_ID,
  authnRequestsSigned: false,
  wantAssertionsSigned: true,
  wantMessageSigned: true,
  wantLogoutResponseSigned: true,
  wantLogoutRequestSigned: true,
  privateKey: fs.readFileSync(serverEnv.SAML_CERT_PATH),
  privateKeyPass: serverEnv.SAML_PRIVATE_KEY_PASS,
  encPrivateKey: fs.readFileSync(serverEnv.SAML_KEY_PATH),
  isAssertionEncrypted: true,
  assertionConsumerService: [
    {
      Binding: samlify.Constants.namespace.binding.post,
      Location: `${serverEnv.APP_DOMAIN}${serverEnv.SAML_CALLBACK}`,
    },
  ],
};

export const sp = samlify.ServiceProvider(spData);

export async function getIdp() {
  const IpdXmlFetch = await fetch(serverEnv.SAML_IDP_METADATA);
  const Idpxml = await IpdXmlFetch.text();

  const idpData = {
    metadata: Idpxml,
    isAssertionEncrypted: true,
    messageSigningOrder: 'encrypt-then-sign',
    wantLogoutRequestSigned: true,
  };

  return samlify.IdentityProvider(idpData);
}

export function metadata() {
  return sp.getMetadata();
}
