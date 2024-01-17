// fetchPlay.js
let audio;

const fetchPlay = async (accessToken, track_id, isPlaying) => {
  const apiUrl = `https://api.spotify.com/v1/tracks/${track_id}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const previewUrl = data.preview_url;

      if (previewUrl) {
        if (isPlaying) {
          playAudio(previewUrl);
        } else {
          stopAudio();
          // audio.pause();
        }
      } else {
        console.error("No preview URL available for the selected track");
      }
    } else {
      console.error("Failed to fetch track information");
    }
  } catch (error) {
    console.error("Error fetching track information:", error);
  }
};

const playAudio = (previewUrl) => {
  if (!audio) {
    audio = new Audio(previewUrl);
  } else {
    audio.src = previewUrl; // Reuse the existing Audio element
  }
  audio.play();
};

const stopAudio = () => {
  if (audio && !audio.paused) {
    audio.pause();
  }
};

export default fetchPlay;
