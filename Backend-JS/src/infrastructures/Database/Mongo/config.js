const { MongoClient } = require('mongodb');
const url = `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@${process.env.MONGOHOST}:${process.env.MONGOPORT}/?authMechanism=DEFAULT&authSource=${process.env.MONGODB}`
const client = new MongoClient(url);
const dbName = process.env.MONGODB;
var dbs;
const connect = async() => {
  await client.connect();
  const db = client.db(dbName);
  dbs = db;
}

const get = async() => {
  return dbs;
}
connect();
module.exports = get;
