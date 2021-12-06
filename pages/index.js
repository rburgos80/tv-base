import Head from "next/head";
import Image from "next/image";
import tv from "../assets/tv.jpg";
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
    props: { data: data.slice(0, 24) },
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
      <main>
        <div className="lcp">
          <h1>Welcome to TVBase</h1>
          <h2>Get information on 50,000+ shows</h2>
          <Image
            className="main-image"
            src={tv}
            width={600}
            height={400}
            alt="main image"
          />
        </div>
        <div className="container">
          <h1 className="catalog">Catalog</h1>
          <div className="homeGrid">
            {data.map((show) => (
              <ShowCard show={show} key={show.id} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
