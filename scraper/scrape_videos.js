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
  let new_posts = 0;
  let run_scraping = true;
  const db = (await clientPromise).db();

  const now = moment().toISOString();

  // get the last scraped video so we dont scrape what we already have
  const latest_scraped_video = await db
    .collection("videos")
    .find({ date: { $lt: now } }, { _id: 0 })
    .sort({ date: -1 })
    .limit(1)
    .toArray();

    let index = 0;
  while (run_scraping === true) {
    index++
    // fetch list videos
    const posts = await http.get(
      `https://api-live.dumpert.nl/mobile_api/json/latest/${index}/`
    );
      posts.data.items.forEach((post) => {
        // console.log(post)

      // check the current video to our archive if we already have it and if we do we can stop scraping
      if (post.upload_id == latest_scraped_video.upload_id) {
        run_scraping = false;
        console.log("done")
      }

        db.collection("videos").updateOne(
          { id: post.id },
          { $set: post },
          { upsert: true },
          (err, results) => {
            // get callback and check if new data is found
            if (results.upsertedCount === 1) {
              new_posts++;
              console.clear();
              console.log(`found ${new_posts} new videos`);
            }
          }
        );
      }
    );
  }
}

kaas();
