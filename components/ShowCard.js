import styles from "../styles/ShowCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import noSignal from "../assets/no_signal.jpg";
import { useRouter } from "next/router";
import Image from "next/image";

const ShowCard = ({ show }) => {
  const router = useRouter();

  const goToShowPage = () => {
    router.push(`/show/${show.id}`);
  };

  return (
    <div className={styles.card} onClick={goToShowPage}>
      {show.image ? (
        <img
          className={styles.picture}
          src={show.image.original}
          alt="TV Show poster"
        />
      ) : (
        <Image src={noSignal} width={208} height={292} />
      )}
      <h5 className={styles.title}>{show.name}</h5>
      <div className={styles.info}>
        <p className={styles.rating}>
          <FontAwesomeIcon icon={faStar} /> {show.rating.average || "?"}{" "}
          <span className={styles.ratingMax}>/10</span>
        </p>
        <p className={styles.years}>
          {show.premiered ? show.premiered.slice(0, 4) : "?"}-
          {show.ended && show.ended.slice(0, 4)}
        </p>
      </div>
    </div>
  );
};

export default ShowCard;
