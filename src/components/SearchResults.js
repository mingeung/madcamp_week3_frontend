// SearchResults.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import fetchSearchResults from "../utils/fetchSearchresults";
import fetchSpotifyToken from "../utils/spotifyApi";
import getActiveDeviceId from "../to/getActiveDeviceId";

function SearchResults() {
  const location = useLocation();
  const searchQuery = location.state?.query || "";
  const [searchResults, setSearchResults] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeDeviceId, setActiveDeviceId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = await fetchSpotifyToken();
        const results = await fetchSearchResults(access_token, searchQuery);
        setSearchResults(results);
        const deviceId = await getActiveDeviceId(access_token);
        setActiveDeviceId(deviceId);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [location.state?.query]);
  const play = ({
    spofity_uri,
    playerInstance: {
      _options: { getOAuthToken },
    },
  }) => {
    getOAuthToken((access_token) => {
      const device_id = activeDeviceId || "your_default_device_id";
      fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
        {
          method: "PUT",
          body: JSON.stringify({ uris: [spofity_uri] }),
          headers: {
            "Content-Type": "applications/json",
            Authorization: "Bearer %{access_token}",
          },
        }
      );
    });
  };

  const handlePlayPause = async () => {
    try {
      const access_token = await fetchSpotifyToken();
      const device_id =
        activeDeviceId ||
        (await getActiveDeviceId(access_token)) ||
        "your_default_device_id";
      const context_uri = searchResults[0].album.uri;
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/play",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({
            device_id,
            context_uri,
            uris: [searchResults[0].uri],
          }),
        }
      );
      if (response.status === 204) {
        // Playback successful
        setIsPlaying(!isPlaying); // Toggle the play/pause state
      } else {
        console.error("Failed to play track");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div style={{ marginLeft: "500px" }}>
      <h2>Search Results for "{searchQuery}"</h2>

      <div>
        {searchResults.length > 0 && (
          <div>
            <h2>Search Results</h2>
            <ul>
              {searchResults.map((track, index) => (
                <li key={index}>
                  <strong>{track.name}</strong> by {track.artists[0].name}
                  <p>Release Date: {track.album.release_date}</p>
                  <img
                    src={track.album.images[0].url}
                    alt={track.album.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <button onClick={handlePlayPause}>
                    {isPlaying ? "정지" : "재생"}
                  </button>
                  <button>보관함에 담기</button>
                </li>
              ))}
            </ul>
            {/* <ul>
              {searchResults.map((artist, index) => (
                <li key={index}>
                  <p>
                    Genres: {artist.genres ? artist.genres.join(", ") : "N/A"}
                  </p>
                </li>
              ))}
            </ul> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
