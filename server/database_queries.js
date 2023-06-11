const database = require('./database.js')

function register(user, pass){
    var john = new models.instance.User({
        username: user,
        user_id: { $db_function: 'uuid()' },
        password : pass
    });
    john.save(function(err){
        if(err) {
            console.log(err);
            return;
        }
        console.log('successfully registered', user);
    });
  }