const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t41qjji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


//--------------------------- Connect to database ------------------------//
async function connectDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Couldn't connect to database", error);
  }
}



//-------------------- Get the Database -----------------------------------//
const getDB = () => client.db("JobDekho");

module.exports = { connectDB, getDB };
