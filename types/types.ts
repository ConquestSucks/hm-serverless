interface SpotifyToken {
    access_token: string;
    token_type: string;
    expires_in: string;
}

interface ImageObject {
  url: string;
  height: number | null;
  width: number | null;
}

interface ExternalUrls {
  spotify: string;
}

interface SimplifiedArtistObject {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}

interface Restrictions {
  reason: string;
}

interface SimplifiedAlbumObject {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  restrictions?: Restrictions;
  type: "album";
  uri: string;
  artists: SimplifiedArtistObject[];
  album_group?: "album" | "single" | "compilation" | "appears_on";
}

interface SpotifyAlbumsResponse {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SimplifiedAlbumObject[];
}

interface TrackCopyright {
  text: string;
  type: string;
}

interface ExternalIds {
  isrc?: string;
  ean?: string;
  upc?: string;
}

interface SimplifiedTrackObject {
  artists: SimplifiedArtistObject[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable?: boolean;
  linked_from?: any;
  restrictions?: Restrictions;
  name: string;
  preview_url?: string | null;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
}

interface AlbumTrackObject {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SimplifiedTrackObject[];
}

interface FullAlbumObject extends SimplifiedAlbumObject {
  copyrights: TrackCopyright[];
  external_ids: ExternalIds;
  genres: string[];
  label: string;
  popularity: number;
  tracks: AlbumTrackObject;
}
