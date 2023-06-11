var models = require('express-cassandra');
const { v4: uuidv4 } = require('uuid');

//Tell express-cassandra to use the models-directory, and
//use bind() to load the models using cassandra configurations.
models.setDirectory( __dirname + '/models').bind(
    {
        clientOptions: {
            contactPoints: ['localhost'],
            localDataCenter: 'datacenter1',
            protocolOptions: { port: 9042 },
            keyspace: 'image_fetcher',
            queryOptions: {consistency: models.consistencies.one},
            socketOptions: { readTimeout: 60000 },
        },
        ormOptions: {
            defaultReplicationStrategy : {
                class: 'SimpleStrategy',
                replication_factor: 1
            },
            migration: 'safe'
        }
    },
    function(err) {
        if(err){
            console.log("err");
            throw err;
        }
        console.log('Cassandra database is up!')
    }
);

  

module.exports = {models};