// Import Express!
// Node will look for a dependency titled 'express' in package.json and give us access to
// the express code, which is stored in the associated subfolder of 'node_modules'.
const express = require('express');
// Initialize our Express app
const app = express();
// Initialize CORS
const cors = require('cors');
app.use(cors());
// Specify port number
const port = 3000;
// MongoClient setup
const mongoUrl = 'mongodb://127.0.0.1:27017';
var MongoClient = require('mongodb').MongoClient;
app.use(express.json()); // for parsing application/json

// Define a route - this is used when sending requests to the API
// to specify what information to send or what action to perform
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET method
app.get('/blogposts', (req, res) => {
  // Open a connection to Mongo
  MongoClient.connect(mongoUrl, (err, client) => {
    // Using connected client, attempt to fetch all blog posts
    client
      .db('blog-app-db')
      .collection('posts')
      .find({})
      .toArray((err, dbRes) => {
        client.close();
        res.send(dbRes);
      });
  });
});

var ObjectID = require('mongodb').ObjectID;
// POST method
app.post('/blogpost', (req, res) => {
  // Open a connection to Mongo
  MongoClient.connect(mongoUrl, (err, client) => {
    // Using connected client, attempt insert to db collection
    var blogPost = req.body.blogPost;
    client
      .db('blog-app-db')
      .collection('posts')
      .insertOne(
        blogPost,
        // When finished with action, close connection
        (err, res) => {
          client.close();
        }
      );
    // Send inserted blog post as a response
    res.status(200).send(blogPost);
  });
});

// Start up the local server and host the Express app!
app.listen(port, () => {
  console.log(
    `Our API is now running and listening for requests at http://localhost:${port}.`
  );
});
