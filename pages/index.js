import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Results from "../components/Results";
import requests from "../utils/requests";
import axios from "axios";

export default function Home({ results }) {
  return (
    <div>
      <Head>
        <title>Hulu</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Nav />
      <Results results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;
  try {
    const request = await axios.get(
      `https://api.themoviedb.org/3${
        requests[genre]?.url || requests?.fetchTrending.url
      }`
    );
    return {
      props: {
        results: request.data.results,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        results: [],
      },
    };
  }
}
