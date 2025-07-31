import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'
import { handleCorsAndOptions } from '../lib/setCorsHeaders';
import spotifyAuthSingleton from '../lib/spotifyAuth';

export default async function handler(request: VercelRequest, response: VercelResponse) {
    const artistId = request.query.id as string;

    if (handleCorsAndOptions(request, response)) return;

    const token = await spotifyAuthSingleton.getToken()

    const artistAlbums = await axios.get<SpotifyAlbumsResponse>(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => response.data);

    return response.json(artistAlbums);
}