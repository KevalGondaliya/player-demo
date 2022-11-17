/* eslint-disable   */
import { useEffect, useRef, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { throttle } from "lodash";
import { Slider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Replay10Icon from "@mui/icons-material/Replay10";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Forward30Icon from "@mui/icons-material/Forward30";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import Button from "../../component/Button";
import { MediaUrl, TimeSeekValue } from "../../constant";
import { secondsToHms } from "../../utils";
import "./style.scss";

function Player() {
  const playerRef = useRef<any>(null);
  const silderRef = useRef<any>(null);
  const [playBackRate, setPlayBackRate] = useState<number>(1);
  const [duration, setDuration] = useState<number>(0);
  const [silderDisable, setSilderDisable] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    if (!playerRef?.current?.audio?.current) return;
    playerRef.current.audio.current.addEventListener(
      "timeupdate",
      handleTimeListener,
      5000
    );

    return () => {
      playerRef.current.audio.current.removeEventListener(
        "timeupdate",
        handleTimeListener
      );
    };
  }, []);

  const handleSpeedDown = throttle(() => {
    if (playerRef.current.audio.current.playbackRate <= 0) {
      playerRef.current.audio.current.playbackRate = playBackRate - 0.25;
    } else {
      playerRef.current.audio.current.playbackRate =
        playBackRate - TimeSeekValue;
    }
    setPlayBackRate(playerRef.current.audio.current.playbackRate);
  }, 1000);

  const handleSpeedUp = () => {
    playerRef.current.audio.current.playbackRate = playBackRate + TimeSeekValue;
    setPlayBackRate(playerRef.current.audio.current.playbackRate);
  };

  const handleTimeListener = throttle(() => {
    console.log(
      "show current time",
      playerRef.current.audio.current.currentTime
    );
  }, 1000);

  const handleSilderOnChange = (_: Event, value: number | number[]) => {
    const timeSeek = Array.isArray(value) ? value[0] : value;
    setCurrentTime(timeSeek);
    playerRef.current.audio.current.currentTime = timeSeek;
  };

  return (
    <div className="main">
      <AudioPlayer
        ref={playerRef}
        src={MediaUrl}
        className="audio-player"
        customIcons={{
          play: <PlayCircleIcon className="playerIcon" />,
          pause: <PauseCircleIcon className="playerIcon" />,
          forward: <Forward30Icon className="playerIcon" />,
          rewind: <Replay10Icon className="playerIcon" />,
          volume: <VolumeUpIcon className="playerIcon" />,
          volumeMute: <VolumeOffIcon className="playerIcon" />,
        }}
        onPause={() => {
          setSilderDisable(true);
        }}
        onPlay={() => {
          setSilderDisable(false);
        }}
        onListen={(e: any) => {
          setCurrentTime(Number(e.target.currentTime));
          setDuration(Number(e.target.duration));
        }}
        progressJumpSteps={{ backward: 10000, forward: 30000 }}
        customVolumeControls={[
          <div className="duration"> {secondsToHms(Number(currentTime))}</div>,
          <div className="separator">&nbsp;/&nbsp;</div>,
          RHAP_UI.CURRENT_LEFT_TIME,
        ]}
        customProgressBarSection={[
          RHAP_UI.MAIN_CONTROLS,
          <Slider
            aria-label="Default"
            ref={silderRef}
            disabled={silderDisable}
            value={Number(currentTime)}
            max={Number(duration)}
            color={"primary"}
            onChange={handleSilderOnChange}
            className={`silderContent ${
              Number(currentTime) >= Number(duration) / 2
                ? "silderSecContent"
                : ""
            }`}
          />,
        ]}
        customAdditionalControls={[
          <div className="speed-control">
            <div className="speed-rate">
              {playerRef?.current?.audio?.current?.playbackRate}X
            </div>
            <Button
              handleOnClick={handleSpeedDown}
              startIcon={<RemoveIcon />}
            />
            <Button handleOnClick={handleSpeedUp} startIcon={<AddIcon />} />
          </div>,
          RHAP_UI.MAIN_CONTROLS,
          RHAP_UI.VOLUME,
        ]}
      />
    </div>
  );
}

export default Player;
