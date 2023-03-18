import React, { Component } from "react";
import AudioPlayer from "../AudioPlayer";
import "./Jukebox.css";
class Jukebox extends Component {
  state = {
    song: "",
    songs: [
      {
        name: "Fantasy Classical",
        url: "/songs/fantasy-classical.mp3",
      },
      {
        name: "Gates of Heaven",
        url: "/songs/gates-of-heaven.mp3",
      },
      {
        name: "Grand Orchestra",
        url: "/songs/grand-orchestra.mp3",
      },
      {
        name: "Piano Song",
        url: "/songs/piano-song.mp3",
      },
    ],
    isPlaying: false,
  };

  chooseSong = (song) => {
    this.setState({ song: song });
  };
  updateIsPlaying = (e) => {
    this.setState({ isPlaying: e });
  };
  render() {
    return (
      <div className="jukebox-container">
        <h1 className={`${this.state.isPlaying ? "animated" : ""}`}>
          Jukebox 🎶
        </h1>
        <div className="song-selection">
          <select
            value={this.state.song}
            onChange={(e) => this.chooseSong(e.target.value)}
          >
            <option style={{ textAlign: "center" }}>Select a song</option>
            {this.state.songs.map((song) => (
              <option value={song.url} key={song.url}>
                {song.name}
              </option>
            ))}
          </select>
          <button className="disable-songs" onClick={() => this.chooseSong("")}>
            🛑
          </button>
        </div>

        {this.state.song === "" ? (
          <p className="subtitle">🎵 Audio disabled</p>
        ) : (
          <AudioPlayer
            audioURL={this.state.song}
            updateIsPlaying={this.updateIsPlaying}
          />
        )}
      </div>
    );
  }
}
export default Jukebox;
