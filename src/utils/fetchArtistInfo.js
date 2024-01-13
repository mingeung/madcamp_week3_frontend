// fetchArtistInfo.js
const fetchArtistInfo = async (accessToken, artistId) => {
  const apiUrl = `https://api.spotify.com/v1/artists/${artistId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      // 여기에서 아티스트 정보를 사용하거나 출력할 수 있습니다.
      console.log("Artist Info:", data);
    } else {
      console.error("Failed to fetch artist info");
    }
  } catch (error) {
    console.error("Error fetching artist info:", error);
  }
};

export default fetchArtistInfo;
