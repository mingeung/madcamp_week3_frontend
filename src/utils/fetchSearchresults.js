// fetchSearchResults.js
const fetchSearchResults = async (accessToken, query) => {
  const apiUrl = `https://api.spotify.com/v1/search?q=${query}&type=track`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("옛날코오오드", data.tracks.items);
      return data.tracks.items || []; // "track" 유형의 아이템들을 반환
    } else {
      console.error("Failed to fetch search results");
      return [];
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};

export default fetchSearchResults;
