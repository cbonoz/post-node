import { PostGrid } from 'postgrid-node-client';
import { Contact } from 'postgrid-node-client/build/contact';
import { IS_DEV, POSTGRID_API_KEY } from '../constants';

const postGrid = new PostGrid(POSTGRID_API_KEY);

// https://github.com/flexbase-eng/postgrid-node-client
export async function sendPostcard(
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
    return letter;
  } catch (error) {
    console.error('PostGrid error:', error);
    throw error;
  }
}
