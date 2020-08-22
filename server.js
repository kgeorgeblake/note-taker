// Dependencies
// console.log("3");
// var http = require("http");
var express = require("express");
var path = require("path");
// -> fs can be called path. path is a seperate module
var fs = require("fs");
// const { createConnection } = require("net");
const { v4: uuidv4 } = require('uuid');

// console.log("3");
// const port = process.env.PORT || 2000;


const port = process.env.PORT || 3000;

//app object has useful methods like get put post delete -> these all correspond to http verbs
//we will use app.get to respond to a get request
var app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Static Route
app.use(express.static("public"));
//this is building the route 
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "../public/index.html"));
// });

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//post is not super specific about what CRUD it is doing...
//creating a new note -> post that note



app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"))
});
//we still need html -> even though public is static 

app.get('/api/notes', (req, res) => {
  //we read a file here
  fs.readFile('db/db.json', 'utf8', (err, notes) => {
    if (err) {
      console.log(err)
      return
    }
    res.json(JSON.parse(notes))
  })
});


app.post('/api/notes', (req, res) => {
  //could read it, make into array and pass back
  //or we could append to file
  //notes is data we got}
  fs.readFile('db/db.json', 'utf8', (err, notes) => {
    if (err) {
      console.log(err)
      return
    }
    //  res.json(JSON.parse(notes))
    console.log(req.body)
    console.log(notes)


    //req.body is what we got from page, but we need id
    //Turns array into JS
    const parse = JSON.parse(notes);

    parse.push({id: uuidv4(),title:req.body.title,text: req.body.text});
    fs.writeFile('db/db.json', JSON.stringify(parse), (err) => {
      if (err) {
        console.log(err)
        return
      }
      res.redirect("/notes")
    })
  })
});
//param is uRL
//body is in POST

///pull out fs readfile
//Delete syntax
app.delete('/api/notes/:id', (req, res) => {
  req.param.id 
  fs.readFile('db/db.json', 'utf8', (err, notes) => {
    if (err) {
      console.log(err)
      return
    }
    //  res.json(JSON.parse(notes))
    console.log(req.body)
    console.log(notes)
    //req.body is what we got from page, but we need id
    //Turns array into JS

    


    let parse = JSON.parse(notes);
    parse = parse.filter((note) => note.id != req.params.id)
    fs.writeFile('db/db.json', JSON.stringify(parse), (err) => {
      if (err) {
        console.log(err)
        return
      }
      res.redirect("/notes")
    })
  })
});
app.listen(port, () => {
  console.log(`Listening ${port}`);
});



// // Require/import the HTTP module
// var http = require("http");

// // Define a port to listen for incoming requests
// var PORT = 8080;

// // Create a generic function to handle requests and responses
// function handleRequest(request, response) {

//   // Send the below string to the client when the user visits the PORT URL
//   response.end("It Works!! Path Hit: " + request.url);
// }

// // Use the Node HTTP package to create our server.
// // Pass the handleRequest function to empower it with functionality.
// var server = http.createServer(handleRequest);

// // Start our server so that it can begin listening to client requests.
// server.listen(PORT, function() {

//   // Log (server-side) when our server has started
//   console.log("Server listening on: http://localhost:" + PORT);
// });
