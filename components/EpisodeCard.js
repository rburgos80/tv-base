import noSignal from "../assets/no_signal.jpg";
import styles from "../styles/EpisodeCard.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const EpisodeCard = ({ episode }) => {
  return (
    <div className={styles.card}>
      <div>
        {episode.image ? (
          <img src={episode.image.medium} alt="Episode poster" />
        ) : (
          <Image
            src={noSignal}
            width={250}
            height={140}
            layout="fixed"
            alt="Episode poster"
          />
        )}
      </div>
      <div>
        <h3 className={styles.title}>{episode.name}</h3>
        <p
          dangerouslySetInnerHTML={{ __html: episode.summary }}
          className={styles.summary}
        />
        <p className={styles.rating}>
          <FontAwesomeIcon icon={faStar} />
          {episode.rating && episode.rating.average
            ? episode.rating.average
            : " ?"}{" "}
          <span className={styles.ratingMax}>/10</span>
        </p>
        <p className={styles.airdate}>{episode.airdate}</p>
        <p className={styles.number}>{`s${episode.season}e${
          episode.number ? episode.number : "?"
        }`}</p>
      </div>
    </div>
  );
};

export default EpisodeCard;
