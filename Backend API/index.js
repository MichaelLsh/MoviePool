import app from './server.js'
import mongodb from "mongodb"
// DAO: Data Access Object -> common pattern for writing programs working with dbs 
import ReviewDAO from './dao/reviewDAO.js'

const MongoClient = mongodb.MongoClient;
// enviroment variables 
// const mongo_username = process.env.MONGO_USERNAME; 
// const mongo_password = process.env.MONGO_PASSWORD;
const mongo_username = process.env['MONGO_USERNAME']; 
const mongo_password = process.env['MONGO_PASSWORD'];

const uri = `mongodb+srv://${mongo_username}:${mongo_password}>@cluster0.w7mvivc.mongodb.net/?retryWrites=true&w=majority`

const port = 8000

// connect to the MongoDB db
MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true

    }
).catch(error => {
    console.error(error.stack);
    // console.log(error);
    process.exit(1); 
})
.then(async client => {
    await ReviewDAO.injectDB(client); // send the db connection to ReviewDAO
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    })
})