import { useEffect } from "react";
import usePlayerStore from "../store/usePlayerStore";

function SpotifyPlayer({ token }) {
  const { setDeviceId, setPosition, setDuration, setPlayer } = usePlayerStore();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "My React Spotify Player",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }) => {
        // console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("initialization_error", ({ message }) => {
        console.error("Initialization Error:", message);
      });

      player.addListener("authentication_error", ({ message }) => {
        console.error("Authentication Error:", message);
      });

      player.addListener("account_error", ({ message }) => {
        console.error("Account Error:", message);
      });

      player.addListener("player_state_changed", (state) => {
        if (state?.paused) {
          // 음악이 끝났거나 멈췄을 때 상태 변경
          setPlayer(false);
        } else {
          setPlayer(true);
        }
      });
      player.addListener("player_state_changed", ({ position, duration }) => {
        setPosition(position);
        setDuration(duration);
      });
      player.connect();
    };
    return () => {
      document.body.removeChild(script);
    };
  }, [token]);

  return;
}

export default SpotifyPlayer;
