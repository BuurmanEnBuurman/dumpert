// import { clientPromise } from "../lib/mongodb";
const http = require("http");
const mock_comment = require("./mockdata/comment.json")

test("check if scrapes", async () => {
  // const db = (await clientPromise).db();

  http
    .createServer((req, res) => {
      res.write(mock_comment); //write a response to the client
      res.end(); //end the response
    })
    .listen(8080); //the server object listens on port 8080
});
