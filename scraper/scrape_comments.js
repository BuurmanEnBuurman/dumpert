const axios = require("axios");
const clientPromise = require("./lib/mongodb");
const rateLimit = require("axios-rate-limit");
const moment = require("moment");

// due to rate limiting of dumpert there is a limit of 400 request per minute, this prevents that request blocking ceiling
const http = rateLimit(axios.create(), {
  maxRequests: 200,
  perMilliseconds: 60000,
  maxRPS: 2,
});

console.log("start");

async function kaas() {
  let new_comments = 0;
  const db = (await clientPromise).db();

  // since you can only comment videos that are one day old we only want these videos
  const yesterday = moment().subtract(1, "days").toDate().toISOString()

  // get the videos of the last day
  const posts = await db
    .collection("videos")
    .find({ date: { $gte: yesterday } }, { _id: 0 })
    .toArray();

  // loop trough the videos and get the comments of each video
  posts.forEach(async (element, video_index) => {
    const id = element.id.replace("_", "/");
    // fetch comments from 1 video
    const comments = await http.get(
      `https://comments.dumpert.nl/api/v1.1/articles/${id}/comments/?includeitems=1`
    );

    // due to limitations we need to insert each comment seprate to prevent duplactation
    comments.data.data.comments.forEach((comment) => {
      // remove unessecery data
      delete html_markup;

      db.collection("comments").updateOne(
        { id: comment.id },
        { $set: comment },
        { upsert: true },
        (err, results) => {
          // get callback and check if new data is found
          if (results.upsertedCount === 1) {
            new_comments++
          }

          console.clear();
          console.log(`todo: ${posts.length - video_index} videos`);
          console.log(`found ${new_comments} new comments`);
        }
      );
    });
  });
}

kaas();

console.log("done");
