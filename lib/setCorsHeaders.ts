import { VercelRequest, VercelResponse } from "@vercel/node";

export function handleCorsAndOptions(request: VercelRequest, response: VercelResponse) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    if (request.method === 'OPTIONS') {
        response.status(200).end();
        return true;
    }
    return false;
}