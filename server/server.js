const express = require('express')
const app = express()
const port = 80
const database = require('./database_queries.js')
const bodyParser = require('body-parser')
const google = require('googlethis');
 

app.use(express.static('./client/static'));
app.get('/', (req, res) => {
  res.sendFile('/client/html/index.html', { root: './' });
})
app.get('/sign_in', (req, res) => {
  res.sendFile('/client/html/login.html', { root: './' });
})
app.get('/sign_up', (req, res) => {
  res.sendFile('/client/html/register.html', { root: './' });
})

app.post('/fetch_image',bodyParser.json(), async (req, res) => {
  var queryImage = req.body;
  var images;
  var image_query_result = await database.getFromHistory(queryImage.text, queryImage.depth, queryImage.safe_search);
  if(image_query_result != false){
    res.status(200).send(image_query_result);
    return;
  }
  try {
    images = await google.image(queryImage.text, { safe: queryImage.safe_search });
  } catch (error){
    console.log('caught');
    res.status(404).json({url : null})
    return;
  }
  images = await google.image(queryImage.text, { safe: queryImage.safe_search });
  if(images[queryImage.depth] === undefined){
    console.log('caught');
    res.status(404).json({url : null})
    return;
  }
  var url = images[queryImage.depth].url;
  image_query_result = await database.addToHistory(queryImage.text, queryImage.depth, url, queryImage.safe_search);
  res.status(image_query_result.code).send(image_query_result);
})

app.post('/login', bodyParser.json(), async (req, res) => {
  user_data = req.body;
  console.log(user_data);
  var login_result = await database.login(user_data.username, user_data.password);
  res.status(login_result.code).send(login_result);
});

app.post('/register', bodyParser.json(), async (req, res) => {
  user_data = req.body;
  console.log(user_data);
  var register_result = await database.register(user_data.username, user_data.password);
  console.log(register_result);
  res.status(register_result.code).send(register_result);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
