// fetchPlay.js
const fetchPlay = async (accessToken, track_id) => {
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
      console.log("Play Info:", data.preview_url); // 이거 잘 나옴!
      return data.preview_url || [];
    } else {
      console.error("Failed to fetch search results");
      return [];
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};

export default fetchPlay;
