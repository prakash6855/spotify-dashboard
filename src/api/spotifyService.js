import axios from "axios";

const getSpotifyToken = async () => {
  const  [REACT_APP_SPOTIFY_CLIENT_ID, REACT_APP_SPOTIFY_CLIENT_SECRET]  =
  ["8ac09b53615f4cf09d1c03904f7abc81","9d6f1c177d054dd3b33abdd4b79e7712"];
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

export const fetchSongsFromIndia2023 = async () => {
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
