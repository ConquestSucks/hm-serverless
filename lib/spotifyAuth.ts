import axios from "axios";

class SpotifyAuth {
    private _clientId: string;
    private _clientSecret: string;
    private _token: SpotifyToken;
    private _tokenExpiresAt: number = 0;

    constructor(clientId: string, clientSecret: string) {
        this._clientId = clientId;
        this._clientSecret = clientSecret;
    }

    private async fetchSpotifyToken() {
        const credentials = Buffer.from(`${this._clientId}:${this._clientSecret}`).toString('base64');

        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');

        try {
            const response = await axios.post<SpotifyToken>("https://accounts.spotify.com/api/token", params, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Basic ${credentials}`
                }
            })

            this._token = response.data
            this._tokenExpiresAt = Date.now() + (+this._token.expires_in * 1000) - 60000;

        } catch (error) {
            console.log(error)
        }
    }

    public async getToken(): Promise<string> {
        if (!this._token || Date.now() >= this._tokenExpiresAt) {
            await this.fetchSpotifyToken();
        }
        return this._token.access_token;
    }
}

const spotifyAuthSingleton = new SpotifyAuth(process.env.SPOTIFY_CLIENT_ID!, process.env.SPOTIFY_CLIENT_SECRET!);
export default spotifyAuthSingleton;