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
  const db = (await clientPromise).db();

  for (let index = 0; index < 200; index++) {
    console.log(index);

    // fetch list videos
    const posts = await http
      .get(`https://api-live.dumpert.nl/mobile_api/json/latest/${index}/`)
      .catch((err) => console.error(err));

    if (posts.data) {
      posts.data.items.forEach(async (post) => {
        db.collection("videos").updateOne(
          { id: post.id },
          { $set: post },
          { upsert: true }
        );
      });
    }

    // loop trough the videos and get the comments of each video
    posts.data.items.forEach(async (element) => {
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
          { upsert: true }
        );
      });
    });
  }
  console.log("done");
}

kaas();
