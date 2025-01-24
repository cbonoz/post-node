import { PostGrid } from 'postgrid-node-client'
import { Address } from '../types/models'
import { Contact } from 'postgrid-node-client/build/contact'

const postGrid = new PostGrid(process.env.POSTGRID_API_KEY!)

export async function sendPostcard(title: string, content: string, from: Contact, to: Contact) {
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
            express: false,
        })
        return letter
    } catch (error) {
        console.error('PostGrid error:', error)
        throw error
    }
}
