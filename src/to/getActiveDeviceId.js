//getActiveDeviceId.js
const fetch = require("node-fetch");

// Spotify API 엔드포인트 및 사용자 액세스 토큰
const spotifyApiEndpoint = "https://api.spotify.com/v1/me/player/devices";
const accessToken =
  "BQDhe6tvxcVbGngRf2IhQy5U5pDE6v7Q3YjYNAXSGxFz9L9hb3RybMh33sWx1cXbnzThCxnCXsbGPtVYiolwLf-tWr4vx34Zd5MjjWrLGaccPu9KtMw";

// 사용자의 현재 활성 장치 ID 가져오기
const getActiveDeviceId = async () => {
  try {
    const response = await fetch(spotifyApiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const activeDevice = data.devices.find((device) => device.is_active);

      if (activeDevice) {
        const activeDeviceId = activeDevice.id;
        console.log("Active Device ID:", activeDeviceId);
        return activeDeviceId;
      } else {
        console.log("No active devices found.");
        return null;
      }
    } else {
      console.error(
        "Failed to fetch devices:",
        response.status,
        response.statusText
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching devices:", error.message);
    return null;
  }
};

// 사용자의 현재 활성 장치 ID 가져오기
module.exports = getActiveDeviceId;
