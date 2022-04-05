import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import clientPromise from "../lib/mongodb";
import Comment from "../components/comment";

export default function Home({ data }) {
  // console.log(data);
  return (
    <>
      {data.map((comment) => (
        <Comment props={comment}/>
      ))}
    </>
  );
}

export async function getServerSideProps(ctx) {
  // Fetch data from external API
  const db = (await clientPromise).db().collection("comments");

  // formats the videoid  from url:"item/100026917_8b87bdca" to normal id: 100026917
  const video_id = parseInt(ctx.query.videoid[1].split("_")[0]);

  // console.log(video_id)

  let api_dumpert;

  const url = `https://comments.dumpert.nl/api/v1.1/articles/${ctx.query.videoid[1].replace(
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
  // console.log(api_dumpert)

  api_dumpert.forEach((key) => {
    if (key.display_content === "-weggejorist-") {
      const db_data = api_db.find((p) => {
        return p.id === key.id;
      });
      key.content = db_data.display_content
      console.log(key);

    }
    data.push(key);
  });

  // console.log(data)

  return { props: { data } };
}
