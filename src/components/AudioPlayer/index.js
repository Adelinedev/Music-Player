import React, { Component } from "react";
import "./AudioPlayer.css";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "paused",
      currentTime: 0,
      duration: 0,
      loop: false,
      playbackRate: 1,
    };
    this.audioElement = new Audio(this.props.audioURL);
    this.props.updateIsPlaying(true);
  }

  componentDidMount() {
    this.audioElement.play();
    // Add event listener for the 'ended' event
    this.audioElement.addEventListener("ended", this.handleAudioEnded);
    this.audioElement.addEventListener("timeupdate", this.handleTimeUpdate);
    this.audioElement.addEventListener(
      "loadedmetadata",
      this.handleMetadataLoaded
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.audioURL !== prevProps.audioURL) {
      this.audioElement.pause();

      this.audioElement = new Audio(this.props.audioURL);
      // Attach event listeners to the new audio element
      this.audioElement.addEventListener("ended", this.handleAudioEnded);
      this.audioElement.addEventListener("timeupdate", this.handleTimeUpdate);
      this.audioElement.addEventListener(
        "loadedmetadata",
        this.handleMetadataLoaded
      );
      this.audioElement.play();

      // Update the loop and playbackRate property of the new Audio object
      this.audioElement.loop = this.state.loop;
      this.audioElement.playbackRate = this.state.playbackRate;
      // Reset the status to "playing" when a new audio starts playing
      this.setState({ status: "playing" });
    }
  }

  componentWillUnmount() {
    this.audioElement.pause();
    // Remove event listener when component is unmounted
    this.audioElement.removeEventListener("ended", this.handleAudioEnded);
  }

  handlePause = () => {
    this.audioElement.pause();
    this.props.updateIsPlaying(false);
  };

  handlePlay = () => {
    if (this.audioElement.paused) {
      this.audioElement.play();
      this.setState({ status: "playing" });
      this.props.updateIsPlaying(true);
    }
  };
  handleAudioEnded = () => {
    this.setState({ status: "ended" }, () => this.forceUpdate());
  };

  handleTimeUpdate = () => {
    this.setState({ currentTime: this.audioElement.currentTime });
  };

  handleMetadataLoaded = () => {
    this.setState({ duration: this.audioElement.duration });
  };
  handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  };
  handleLoopToggle = () => {
    this.setState((prevState) => ({
      loop: !prevState.loop,
    }));
    this.audioElement.loop = !this.audioElement.loop;
  };
  handlePlaybackRateChange = (event) => {
    const newPlaybackRate = parseFloat(event.target.value);
    this.audioElement.playbackRate = newPlaybackRate;
    this.setState({ playbackRate: newPlaybackRate });
  };
  render() {
    const { audioURL } = this.props;
    const { currentTime, duration, loop, playbackRate } = this.state;

    return (
      <div className="audio-player">
        <p className="audio-info">
          {this.state.status === "ended"
            ? "Music Finished"
            : `Playing ${audioURL}`}
        </p>
        <p className="audio-progress">
          {`Progress: ${currentTime.toFixed(1)} / ${duration.toFixed(
            1
          )} seconds`}
        </p>
        <div className="controls">
          <button className="control-btn" onClick={this.handlePlay}>
            ▶️
          </button>
          <button className="control-btn" onClick={this.handlePause}>
            ⏸️
          </button>
          <button className="control-btn" onClick={this.handleLoopToggle}>
            {loop ? "➡️" : "🔂"}
          </button>
          <div className="playback-rate-selector">
            {/* <label htmlFor="playbackRate">Playback Rate: {playbackRate}x</label> */}
            <select
              id="playbackRate"
              value={playbackRate}
              onChange={this.handlePlaybackRateChange}
            >
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="1.75">1.75x</option>
              <option value="2">2x</option>
            </select>
          </div>
          <input
            className="seek-bar"
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            step="0.1"
            onChange={this.handleSeek}
          />
        </div>
      </div>
    );
  }
}

export default AudioPlayer;
