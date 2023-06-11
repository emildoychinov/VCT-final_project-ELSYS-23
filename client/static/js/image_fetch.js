
async function fetch_image(query, index, safe){

    let queryImage = {
        text : query,
        depth : index,
        safe_search : safe
    }
    const params = {
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify(queryImage)
    }
    const res = await fetch('/fetch_image', params);
    var url = (await res.json()).url;
    console.log(url);
    if(url == null){
        return 'https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png';
    }else{
        return url;
    }
}

 const form = document.getElementById('search-form');
 const image = document.getElementById('result-image');
 const safeSearch = document.getElementById('safe-search');

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    console.log("safe : ", safeSearch.checked)
    const word = document.getElementById('word').value;
    const depth = document.getElementById('depth').value;
    const imageUrl = await fetch_image(word, depth, safeSearch.checked);
    if(imageUrl == null){
        alert("image couldn't be found");
    }else{
        image.src = imageUrl;
    }
   

});