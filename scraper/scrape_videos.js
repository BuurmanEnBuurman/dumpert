const axios = require("axios");
const clientPromise = require("./lib/mongodb");
const rateLimit = require("axios-rate-limit");

// due to rate limiting of dumpert there is a limit of 400 request per minute, this prevents that request blocking ceiling
const http = rateLimit(axios.create(), {
  maxRequests: 200,
  perMilliseconds: 60000, // 1 minute
  maxRPS: 2,
});

console.log("start");

async function kaas() {
  let new_posts = 0;
  const db = (await clientPromise).db();

  let index = 0;
  while (true) {
    index++;
    const posts = await http.get(
      `https://api-live.dumpert.nl/mobile_api/json/latest/${index}/`
    );

    posts.data.items.forEach((post) => {
      db.collection("videos").updateOne(
        { id: post.id },
        { $set: post },
        { upsert: true },
        (err, results) => {
          if(err){
            console.error(err)
          }

          // use the callback and check if new data is found
          if (results.upsertedCount === 1) {
            new_posts++;
            console.clear();
            console.log(`found ${new_posts} new videos`);
          } else {
            // or if it exists we can kill the script since we wont find anything new
            process.exit();
          }
        }
      );
    });
  }
}

kaas();
