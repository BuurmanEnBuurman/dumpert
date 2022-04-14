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

var E = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
    var w = 'REDACTED (Potential Email Address)';
    function k(e, t) {
      return function (e) {
        return 'string' == typeof e && - 1 !== e.indexOf('@')
      }(e) ? (u('This arg looks like an email address, redacting.'), w) : t ? T(e).replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, (function (e, t, n) {
        return t > 0 && t + e.length !== n.length && e.search(E) > - 1 && ':' !== n.charAt(t - 2) && ('-' !== n.charAt(t + e.length) || '-' === n.charAt(t - 1)) && n.charAt(t - 1).search(/[^\s-]/) < 0 ? e.toLowerCase() : e.substr(1).search(/[A-Z]|\../) > - 1 ? e : e.charAt(0).toUpperCase() + e.substr(1)
      })) : e
    }

```var E = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
    var w = 'REDACTED (Potential Email Address)';
    function k(e, t) {
      return function (e) {
        return 'string' == typeof e && - 1 !== e.indexOf('@')
      }(e) ? (u('This arg looks like an email address, redacting.'), w) : t ? T(e).replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, (function (e, t, n) {
        return t > 0 && t + e.length !== n.length && e.search(E) > - 1 && ':' !== n.charAt(t - 2) && ('-' !== n.charAt(t + e.length) || '-' === n.charAt(t - 1)) && n.charAt(t - 1).search(/[^\s-]/) < 0 ? e.toLowerCase() : e.substr(1).search(/[A-Z]|\../) > - 1 ? e : e.charAt(0).toUpperCase() + e.substr(1)
      })) : e
    }```