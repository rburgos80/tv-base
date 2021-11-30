import Head from "next/head";
import ShowCard from "../components/ShowCard";
import api from "./api/shows";

export async function getStaticProps() {
  const res = await fetch("https://api.tvmaze.com/shows");
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data: data.slice(0, 15) },
  };
}

export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>TVbase</title>
        <meta
          name="description"
          content="Explore TV shows and view their ratings per season and episode."
        />
      </Head>
      <div className="container">
        <h1>Welcome to TVBase</h1>
        <h3>Get information on 50,000+ shows</h3>
        <div className="homeGrid">
          {data.map((show) => (
            <ShowCard show={show} key={show.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
