this is all the fuckery and notes


100 pages gaat tot 2022-02-25


found 8760 new videos
/home/constantijn/zooimap/dumpertunremover (copy)/scraper/scrape_videos.js:25
    posts.data.items.forEach((post) => {
                     ^

TypeError: Cannot read properties of undefined (reading 'forEach')
    at kaas (/home/constantijn/zooimap/dumpertunremover (copy)/scraper/scrape_videos.js:25:22)
    at runMicrotasks (<anonymous>)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)

Node.js v17.6.0

add video to comment
`db.videos.aggregate([{$lookup:{from:"videos",localField:"article_id",foreignField:"article_id",as:"video"}}])`

`db.videos.aggregate([{$lookup:{from:"videos",localField:"article_id",foreignField:"article_id",as:"video"}},{$project:{date:1,upload_date:1,_id:0}}])`

``db.videos.aggregate([{$lookup:{from:"videos",localField:"article_id",foreignField:"article_id",as:"video"}},{$group:{date_diff:{$subtract:[upload_date,date]}}}])
``

`db.createUser({ user: "baas" , pwd: "baas", roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]})`