import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import EpisodeList from "../../components/EpisodeList";
import styles from "../../styles/ShowPage.module.css";
import Head from "next/head";
import noSignal from "../../assets/no_signal.jpg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ShowPage = () => {
  const [showData, setShowData] = useState([]);
  const router = useRouter();

  async function getData() {
    try {
      const res = await fetch(
        `https://api.tvmaze.com/shows/${router.query.id}`
        // {
        //   mode: "no-cors",
        // }
      );
      const data = await res.json();
      setShowData(data);
    } catch {
      throw new Error(
        `Show data api fetch failed. ID query: ${router.query.id}`
      );
    }
  }

  useEffect(() => {
    if (!router.query.id) {
      return;
    }

    getData();
  }, [router.query.id]);

  return (
    <>
      <Head>
        <title>{`${showData.name} - TVbase`}</title>
      </Head>
      <div className="container" className={styles.container}>
        <h1 className={styles.title}>{showData.name}</h1>
        <div className={styles.showInfo}>
          {showData.image ? (
            <img
              className={styles.image}
              src={showData.image.medium}
              width={210}
              height={295}
              alt="TV Show poster"
            />
          ) : (
            <Image
              src={noSignal}
              width={208}
              height={292}
              className={styles.image}
              alt="TV Show Poster"
            />
          )}
          <div className={styles.info}>
            <p className={styles.rating}>
              <FontAwesomeIcon icon={faStar} />{" "}
              {showData.rating && showData.rating.average
                ? showData.rating.average
                : "?"}{" "}
              <span className={styles.ratingMax}>/10</span>
            </p>
            <p className={styles.years}>
              {showData.premiered ? showData.premiered.slice(0, 4) : "?"}-
              {showData.ended && showData.ended.slice(0, 4)}
            </p>
          </div>
          <div
            className={styles.summary}
            dangerouslySetInnerHTML={{ __html: showData.summary }}
          />
        </div>
        <div className="episodeGrid">
          {showData.id && <EpisodeList showId={showData.id} />}
        </div>
      </div>
    </>
  );
};

export default ShowPage;
