const clientPromise = require("./lib/mongodb")

async function format_db(){
    const db = (await clientPromise).db()
    console.log(`formatting db named: ${db.databaseName}`)
    
    // create both tables
    await db.createCollection("videos")
    await db.createCollection("comments")

    // configure videos
    await db.collection("videos").createIndex({"id":1})
    await db.collection("videos").createIndex({"article_id":1})
    await db.collection("videos").createIndex({"creation_datetime":1})


    // configure comments
    await db.collection("comments").createIndex({"id":1})
    await db.collection("comments").createIndex({"article_id":1})

    process.exit(1)
}


format_db()

