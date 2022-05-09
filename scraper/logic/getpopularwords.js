const clientPromise = require("../lib/mongodb");
const fs = require("fs");
const { WordCloud } = require("d3-cloud");

let results = [];

async function kaas() {
  const db = (await clientPromise).db();
  const data = await db
    .collection("comments")
    .find({}, { projection: { _id: 0, display_content: 1 } })
    // .limit(100)
    .toArray();
  console.log(`comments: ${data.length}`);

  // loop trough the sentences
  data.forEach((sentence,index) => {
    console.log(index)
    // loop trough the words
    sentence.display_content
      .toLowerCase()
      .split(" ")
      .forEach((element) => {
        if (!results.some((word) => word.word === element)) {
          const soufle = {
            word: element,
            count: 1,
          };

          results.push(soufle);
        } else {
          results.find((_word) => {
            if (_word.word === element) {
              _word.count++;
              return true;
            }
          });
        }
      });

    // fs.writeFileSync("./kaas.json", JSON.stringify(results));
  });
  // console.log(results);
  await formatToCSV(results)
}

async function formatToCSV(object){
  console.log("starting csv module")

  var regex = /[.,'"!?<>`+=_-\s]/g;
  let csv = ""

  // create table name
  csv += "count,word\r\n"

  object.forEach(element=>{
    const word = element.word.replace(regex, '');

    csv += element.count
    csv += ","
    csv += word

    // new line
    csv += "\r\n"
  })
  
  await fs.writeFileSync("./kaas.csv", csv);
  console.log("done")
}

kaas()