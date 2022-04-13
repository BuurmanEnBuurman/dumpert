import clientPromise from "../lib/mongodb";
import Comment from "../components/comment";
import UrlToId from "../lib/urltoid";
import Header from "../components/header";

export default function Detail(props) {
  return (
    <>
      <Header />
      <>
        <div>
          <div>
            locked?: {props.api_dumpert.summary.can_comment ? "no" : "yes"}
          </div>
          <div>comments: {props.api_dumpert.summary.comment_count}</div>
          <div>last moderated: {props.api_dumpert.summary.moderated_at}</div>
        </div>
        {props.comments.map((comment) => (
          <Comment key={comment.id} props={comment} />
        ))}
      </>
    </>
  );
}

export async function getServerSideProps(ctx) {
  // Fetch data from external API
  const db = (await clientPromise).db().collection("comments");

  // formats to a video id as described by the api
  const video_id = UrlToId(ctx.query);

  let api_dumpert;
  const dumpert_id = video_id.replace("_", "/");
  await fetch(
    `https://comments.dumpert.nl/api/v1.1/articles/${dumpert_id}/comments/?includeitems=1`
  )
    .then((res) => res.json())
    .then((res) => (api_dumpert = res));

  const api_db = await db
    .find({ article_id: video_id }, { projection: { _id: 0 } })
    .toArray();

  let comments = [];

  api_dumpert.data.comments.forEach((key) => {
    if (key.display_content === "-weggejorist-") {
      const chached_comment = api_db.find((p) => {
        return p.id === key.id;
      });

      // check if comment is scraped
      chached_comment
        ? (key.original_content = chached_comment.display_content)
        : (key.original_content = "-hasnt been scraped yet-");
    }
    comments.push(key);
  });

  return { props: { comments, api_dumpert } };
}
