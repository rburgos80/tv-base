import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  function handleSearch(e) {
    e.preventDefault();
    console.log(e.value);
    router.push({
      pathname: `/results`,
      query: { q: searchQuery },
    });
  }

  return (
    <div className={styles.header}>
      <Link href="/">
        <a className={styles.logo}>TVbase</a>
      </Link>
      <form className={styles.search} onSubmit={(e) => handleSearch(e)}>
        <input
          id="search"
          className={styles.searchBar}
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
          required
        />
        <button type="submit" className={styles.searchBtn}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      <div>
        <Link href="/">
          <a className={styles.navBtn}>TVbase</a>
        </Link>
        <Link href="/">
          <a className={styles.navBtn}>TVbase</a>
        </Link>
      </div>
    </div>
  );
};

export default Header;
