/**
 * 
 * @param {string} query 
 * converts the id in the uri to valid id 
 */

export default function UrlToId(query){
    console.log(query)
    // formats the videoid  from url:"item/100026917_8b87bdca" to normal id: 100026917
  const id = parseInt(query.videoid[1].split("_")[0]);

    return id;
}