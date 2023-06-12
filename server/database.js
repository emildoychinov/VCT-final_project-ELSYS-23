var models = require('express-cassandra');

models.setDirectory( __dirname + '/models').bind(
    {
        clientOptions: {
            contactPoints: ['cassandra-service'],
            localDataCenter: 'datacenter1',
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
            throw err;
        }
        console.log('database is up and running');
        
    }
);

  

module.exports = {models};