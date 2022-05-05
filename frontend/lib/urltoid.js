/**
 * 
 * @param {string} query 
 * converts the id in the uri to valid id 
 */

export default function UrlToId(query){
    let id;
    if(query.selectedId){
      // query is selectedId=100027744_d54603bb
      id = query.selectedId
    }else{
        // query is /item/100027744_d54603bb
        id = query.videoid[0];
    }
    // formats the videoid  from url:"item/100026917_8b87bdca" to normal id: 100026917
  
    return id;
}