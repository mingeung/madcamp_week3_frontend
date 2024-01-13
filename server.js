const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

const authParameters = {
  grant_type: "client_credentials",
  client_id: "449411fb0d224652a5771ed8e0db1ede",
  client_secret: "5a77cb7854a94524879439bfa3e98668",
};

app.post("https://accounts.spotify.com/api/token", async (req, res) => {
  try {
    const spotifyTokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      null,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: authParameters,
      }
    );

    const accessToken = spotifyTokenResponse.data.access_token;

    // 여기에서 accessToken을 사용하거나 클라이언트에게 전달할 수 있습니다.
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error fetching Spotify token:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
