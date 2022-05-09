const clientPromise = require("../lib/mongodb");
const fs = require("fs");

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

  });
  await formatToCSV(results)
}

async function formatToCSV(object){
  console.log("starting csv module")

  // remove some special characters
  var regex = /[.,'"!?<>`+=_-\s]/g;
  let csv = ""

  // create table name
  csv += "count,word\r\n"

  // new collum
  object.forEach(element=>{
    csv += element.count
    csv += ","
    csv += element.word.replace(regex, '');

    // new line
    csv += "\r\n"
  })
  
  await fs.writeFileSync("./kaas.csv", csv);
  console.log("done")
}

kaas()