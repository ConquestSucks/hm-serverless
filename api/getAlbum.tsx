import { VercelRequest, VercelResponse } from "@vercel/node";
import { handleCorsAndOptions } from "../lib/setCorsHeaders";
import spotifyAuthSingleton from "../lib/spotifyAuth";
import axios from "axios";

export default async function handler(request: VercelRequest, response: VercelResponse) {
    const albumId = request.query.id as string;

    if (handleCorsAndOptions(request, response)) return;

    const token = await spotifyAuthSingleton.getToken()

    const album = await axios.get<FullAlbumObject>(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => response.data);

    return response.json({
        album
    });
}