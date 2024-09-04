import axios from "axios";

const getSpotifyToken = async () => {
  const REACT_APP_SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const REACT_APP_SPOTIFY_CLIENT_SECRET = import.meta.env
    .VITE_SPOTIFY_CLIENT_SECRET;

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            `${REACT_APP_SPOTIFY_CLIENT_ID}:${REACT_APP_SPOTIFY_CLIENT_SECRET}`
          ),
      },
    }
  );
  return response.data.access_token;
};

const fetchSongsFromIndia2023 = async () => {
  const token = await getSpotifyToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=year:2023&type=track&market=IN&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.tracks.items;
};

// Function to fetch additional details for songs
const fetchAlbumAndArtistDetails = async (trackIds) => {
  const token = await getSpotifyToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/tracks?ids=${trackIds.join(",")}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.tracks;
};

export { fetchSongsFromIndia2023, fetchAlbumAndArtistDetails };
