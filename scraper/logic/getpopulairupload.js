const clientPromise = require("../lib/mongodb");

async function kaas(){
    const db = (await clientPromise).db();
    const data = await db.collection("comments").aggregate([ { $lookup: { from: "videos", localField: "article_id", foreignField: "article_id", as: "comments" } }])
    .toArray()
    console.log(data.length)
}

kaas()
