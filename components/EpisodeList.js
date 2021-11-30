import { useState, useEffect } from "react";
import EpisodeCard from "./EpisodeCard.js";

const EpisodeList = ({ showId }) => {
  const [displaySeason, setDisplaySeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [seasons, setSeasons] = useState([]);

  const fetchSeasonData = async () => {
    try {
      const seasonRes = await fetch(
        `https://api.tvmaze.com/shows/${showId}/seasons`
      );
      const seasonData = await seasonRes.json();
      setSeasons(seasonData);
    } catch (err) {
      throw new Error(
        `${err}\nSeason data api fetch failed: showID = ${showId}`
      );
    }
  };

  const fetchEpisodeData = async () => {
    try {
      const epRes = await fetch(
        `https://api.tvmaze.com/seasons/${displaySeason}/episodes`
      );
      const epData = await epRes.json();
      setEpisodes(epData);
    } catch (err) {
      throw new Error(
        `${err} \n Episode data api fetch failed: season: ${displaySeason}`
      );
    }
  };

  useEffect(() => {
    if (showId) {
      fetchSeasonData();
    }
  }, []);

  useEffect(() => {
    if (seasons.length > 0) {
      setDisplaySeason(seasons[0].id);
    }
  }, [seasons]);

  useEffect(() => {
    if (displaySeason) {
      fetchEpisodeData(displaySeason);
    }
  }, [displaySeason]);

  return (
    <div>
      <h1 className="episodes-heading">Episodes</h1>
      <select
        name="seasons"
        id="seasons"
        className="season-select"
        onChange={(e) => setDisplaySeason(e.target.value)}
      >
        {seasons.map((s) => (
          <option key={s.id} value={s.id}>
            Season {s.number}
          </option>
        ))}
      </select>
      {displaySeason
        ? episodes.map((episode) => (
            <EpisodeCard episode={episode} key={episode.id} />
          ))
        : null}
    </div>
  );
};

export default EpisodeList;
