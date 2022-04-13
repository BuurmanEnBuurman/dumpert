import clientPromise from "../lib/mongodb";
import Comment from "../components/comment";
import UrlToId from "../lib/urltoid";
import Header from "../components/header";

export default function Detail({data}) {
  // console.log(api_dumpert)
  // console.log(api_db)

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
  const dumpert_id = video_id.replace("_","/")
  await fetch(`https://comments.dumpert.nl/api/v1.1/articles/${dumpert_id}/comments/?includeitems=1`).then(res => res.json()).then(res => api_dumpert = res.data.comments)

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
      chached_comment ? (key.original_content = chached_comment.display_content) : (key.original_content = "-hasnt been scraped yet-")

    }
    data.push(key);
  });

  return { props: { data } };
}
