const google = require('googlethis');

async function fetch_image(text, index, safe_search){
    const images = await google.image(text, { safe: safe_search });
    return images[index].url;
}
