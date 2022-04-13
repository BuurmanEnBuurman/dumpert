import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  // tranforms 100027744_d54603bb to 100027744
  const video_id = parseInt(req.query.videoid.split("_")[0]);

  const db = (await clientPromise).db();

  const data = await db
    .collection("comments")
    .find({ article_id: video_id }, { projection: { _id: 0 } })
    .toArray();

    res.status(200).json(data);
}
