const cassandra = require("cassandra-driver");

const client = new cassandra.Client({         //Connects to cassandra
    contactPoints: ['127.0.0.1'],             //replace with ip to cassandra database
    localDataCenter: 'datacenter1',
    keyspace: 'iglesia_vida_test'             //keyspace name here
  });


  module.exports = client;
