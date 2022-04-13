import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import clientPromise from "../lib/mongodb";
import Comment from "../components/comment";
import UrlToId from "../lib/urltoid";
import Header from "../components/header";

export default function Home({ data }) {
  return (
    <>
      <Header/>
      {data.map((comment) => (
        <Comment key={comment.id} props={comment}/>
      ))}
    </>
  );
}

export async function getServerSideProps(ctx) {
  // Fetch data from external API
  const db = (await clientPromise).db().collection("comments");

  // formats to a video id as described by the api
  const video_id = UrlToId(ctx.query)

  let api_dumpert;

  const url = `https://comments.dumpert.nl/api/v1.1/articles/${video_id.replace(
    "_",
    "/"
  )}/comments/?includeitems=1`;

  await fetch(url, {
    credentials: "include",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64; rv:98.0) Gecko/20100101 Firefox/98.0",
      Accept: "application/json",
      "Accept-Language": "en-US,en;q=0.5",
      "content-type": "application/json",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    referrer: "https://www.dumpert.nl/",
    method: "GET",
    mode: "cors",
  })
    .then((res) => res.json())
    .then((rj) => (api_dumpert = rj.data.comments))
    .catch((error) => new error(error));

  const api_db = await db
    .find({ article_id: video_id }, { projection: { _id: 0 } })
    .toArray();

  let data = [];

  api_dumpert.forEach((key) => {
    if (key.display_content === "-weggejorist-") {
      const chached_comment = api_db.find((p) => {
        return p.id === key.id;
      });
      
      // check if comment is scraped 
      chached_comment ? (key.content = chached_comment.display_content) : (key.content = "-hasnt been scraped yet-")

    }
    data.push(key);
  });

  return { props: { data } };
}
