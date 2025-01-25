import { PostGrid } from 'postgrid-node-client';
import { Contact } from 'postgrid-node-client/build/contact';
import {
  BASE_SERVER_URL,
  IS_DEV,
  POSTGRID_API_KEY,
  POSTGRID_WEBHOOK_SECRET
} from '../constants';

const getWebhookUrl = () => {
  return `${BASE_SERVER_URL}/webhook/postgrid/callback`;
};

const postGrid = new PostGrid(
  {
    mail: POSTGRID_API_KEY
  },
  {
    webhookEvents: ['letter.created', 'letter.delivered', 'letter.failed'],
    webhookSecret: POSTGRID_WEBHOOK_SECRET,
    webhookUrl: getWebhookUrl(),
    apiKeys: {
      mail: POSTGRID_API_KEY
    }
  }
);

// https://github.com/flexbase-eng/postgrid-node-client
export async function createLetter(
  title: string,
  content: string,
  from: Contact,
  to: Contact
) {
  if (IS_DEV) {
    console.log('Postcard in dev mode, not sending');
    return {};
  }
  try {
    const letter = await postGrid.letter.create({
      to,
      from,
      html: `<h1>${title}</h1><p>${content}</p>`,
      color: true,
      doubleSided: false,
      pageCount: 1,
      mergeVariables: {},
      metadata: {},
      express: false
    });
    if (!letter.success) {
      throw new Error(`PostGrid error: ${JSON.stringify(letter.error)}`);
    }
    return letter.letter;
  } catch (error) {
    console.error('PostGrid error:', error);
    throw error;
  }
}
