// 예시: Spotify API를 호출하는 함수
const fetchSpotifyToken = async () => {
  const client_id = "449411fb0d224652a5771ed8e0db1ede";
  const client_secret = "5a77cb7854a94524879439bfa3e98668";

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: "Basic " + btoa(`${client_id}:${client_secret}`),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };

  try {
    const response = await fetch(authOptions.url, {
      method: "POST",
      headers: {
        Authorization: authOptions.headers.Authorization,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(authOptions.form).toString(),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.access_token;
      // 이후에 token을 사용하여 Spotify API에 요청을 보낼 수 있음
      console.log(token);
      return token;
    } else {
      console.error("Failed to fetch Spotify token");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Spotify token:", error);
    return null;
  }
};

export default fetchSpotifyToken;

// 함수 호출
fetchSpotifyToken();
