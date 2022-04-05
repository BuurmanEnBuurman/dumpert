const axios = require("axios");
const clientPromise = require("./lib/mongodb");
const rateLimit = require("axios-rate-limit");

// due to rate limiting of dumpert there is a limit of 400 request per minute, this prevents that request blocking ceiling
const http = rateLimit(axios.create(), {
  maxRequests: 200,
  perMilliseconds: 60000,
  maxRPS: 2,
});

console.log("start");

async function kaas() {
  let new_posts = 0;
  const db = (await clientPromise).db();

  for (let index = 0; index < 200; index++) {
    // fetch list videos
    const posts = await http.get(
      `https://api-live.dumpert.nl/mobile_api/json/latest/${index}/`
    );


    // console.log(posts.data.items);
    // db.collection("videos").insertMany(posts.data.items);
    posts.data.items.forEach((post) => {
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
    });
  }
}

kaas();
