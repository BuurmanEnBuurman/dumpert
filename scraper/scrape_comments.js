const axios = require("axios");
const clientPromise = require("./lib/mongodb");
const rateLimit = require("axios-rate-limit");
const moment = require("moment");
const format_comment = require("./lib/format_comment");

// due to rate limiting of dumpert there is a limit of 400 request per minute, this prevents that request blocking ceiling
const http = rateLimit(axios.create(), {
  maxRequests: 200,
  perMilliseconds: 60000,
  maxRPS: 2,
});

console.log("start");

async function scrape_comments() {
  let new_comments = 0;
  const db = (await clientPromise).db();

  const ScrapingPeriod = moment().subtract(15, "days").toDate().toISOString();

  // get all the videos so we can scrape them
  const posts = await db
    .collection("videos")
    .find({ upload_date: { $gte: ScrapingPeriod } }, { _id: 0 })
    .sort({ upload_date: -1 })
    .toArray();

  // loop trough the videos and get the comments of each video
  for (let index = 0; index < posts.length; index++) {
    const element = posts[index];

    const id = element.id.replace("_", "/");
    // fetch comments from 1 video
    const comments = await http.get(
      `https://comments.dumpert.nl/api/v1.1/articles/${id}/comments/?includeitems=1`
    );

    // due to limitations we need to insert each comment seprate to prevent duplactation
    comments.data.data.comments.forEach(async (comment) => {
      // remove unessecery data
      comment = format_comment(comment);

      await db
        .collection("comments")
        .updateOne(
          { "id": parseInt(comment.id) },
          { $set: comment },
          { upsert: true },
          (err, results) => {
            if (err) {
              console.error(err);
            }


            
            // get callback and check if a new comment is found
            if (results.upsertedCount === 1) {
              new_comments++;
            }

            console.clear();
            console.log(`todo: ${posts.length - index} videos`);
            console.log(`found ${new_comments} new comments`);
          }
        );
    });
  }
  process.exit(1)
}

scrape_comments();

