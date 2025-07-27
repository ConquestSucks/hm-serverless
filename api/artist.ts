import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

export default async function handler(requst: VercelRequest, response: VercelResponse) {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    if (requst.method === 'OPTIONS') {
        response.status(200).end();
        return;
    }

    const token = await axios.post<SpotifyToken>("https://accounts.spotify.com/api/token", params, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${credentials}`
        }
    }).then((response) => response.data.access_token);


    const artistAlbums = await axios.get<SpotifyAlbumsResponse>("https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => response.data);

    return response.json({
        artistAlbums
    });
}