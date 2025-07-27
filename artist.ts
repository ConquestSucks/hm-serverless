import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(requst: VercelRequest, response: VercelResponse) {

    return response.json({
        "name": "huesos"
    })
}