const database = require('./database.js')
const models = database.models;

async function register(user, pass){
    var userRecord = await userExists(user);
    if(userRecord != false){
        return {
            code : 409,
            message : "user already exists"
        };
    }
    const registerUser = async (user, pass) => {
        const newUser = new models.instance.User({
          username: user,
          user_id: { $db_function: 'uuid()' },
          password: pass,
        });
      
        try {
          await newUser.save();
          return {
            code: 200,
            message: 'successfully registered!',
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      };
    var register_result = await registerUser(user,pass);
    return register_result;
}

async function userExists(user){
    const getUserData = (user) => {
        return new Promise((resolve, reject) => {
          models.instance.User.findOne({ username: user }, (err, usr) => {
            if (err) {
              reject(err);
            } else {
              if (usr === undefined) {
                resolve(false);
              } else {
                const user_data = {
                  password: usr.password,
                  id: usr.user_id,
                };
                resolve(user_data);
              }
            }
          });
        });
      };
    
    var user_data = await getUserData(user);
    return user_data;
}

async function login(user, pass){
    data = await userExists(user);
    if(data != false){
        if(pass == data.password){
            return {
                code : 200,
                id : data.id,
                message : "successfully logged in"
            }
        }else{
            return {
                code : 401,
                message : "invalid password"
            }
        }
    }else{
        return {
            code : 404,
            message : "user does not exist"
        }
    }
}

async function addToHistory(query, depth, link, safe){
    const addImage = async (query, depth, link, safe) => {
        const newImage = new models.instance.Search_History({
            "query" : query,
            index : depth,
            url : link,
            "safe" : safe+''
          });
      
        try {
          await newImage.save();
          return {
            code: 200,
            url : link, 
            message: 'successfully added image!'
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
    };
    var image_query_result = await addImage(query, depth, link, safe);
    return image_query_result;
}
async function getFromHistory(text, depth, safe){
    const getQueryData = (text, depth, safe) => {
        return new Promise((resolve, reject) => {
          models.instance.Search_History.findOne({
            query : text, 
            index : depth, 
            "safe" : safe + ''
        }, (err, res) => {
            if (err) {
              reject(err);
            } else {
              if (res === undefined) {
                resolve(false);
              } else {
                const query_data = {
                  url : res.url
                };
                resolve(query_data);
              }
            }
          });
        });
      };
    
    var query_data = await getQueryData(text, depth, safe);
    return query_data;
}

module.exports = {register, login, addToHistory, getFromHistory};