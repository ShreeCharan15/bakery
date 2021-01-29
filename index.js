const express=require('express');
const path = require('path');
var compression = require('compression')


const port=process.env.PORT || 80;
const app=express();
app.use(compression())

app.use(express.static(__dirname+'/build'));
app.get('/us', (req,res) =>{
  res.sendFile('index.html', {root: path.join(__dirname, '/we')});
});
app.get('/aboutus', (req,res) =>{
  res.sendFile('aboutus.html', {root: path.join(__dirname, '/aboutus')});
});
app.get('*', (req,res) =>{
    res.sendFile('index.html', {root: path.join(__dirname, '/build')});
});

/*
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');
require('firebase/performance');
require('firebase/storage');

var firebaseConfig = {
  apiKey: "AIzaSyCDRMXUhPXi9XVQ0vrv3iXeHzhBsqzqgtU",
  authDomain: "bakery-a9c04.firebaseapp.com",
  projectId: "bakery-a9c04",
  storageBucket: "bakery-a9c04.appspot.com",
  messagingSenderId: "175876821083",
  appId: "1:175876821083:web:b810884c7d4ed05dcc2f7e",
  measurementId: "G-156196JB3C"
};

  firebase.initializeApp(firebaseConfig);
let csvToJson = require('convert-csv-to-json');

let a=csvToJson.fieldDelimiter('\t').formatValueByType().getJsonFromCsv('./data - Sheet1.tsv')
var db = firebase.firestore();
var batch = db.batch()

a.filter((v)=>v.type==="cake").forEach((doc) => {
  var docRef = db.collection("Cakes").doc(doc.name); 
  batch.set(docRef, doc);
});

a.filter((v)=>v.type==="cookie").forEach((doc) => {
    var docRef = db.collection("Cookies").doc(doc.name); 
    batch.set(docRef, doc);
  });

  a.filter((v)=>v.type==="others").forEach((doc) => {
    var docRef = db.collection("Others").doc(doc.name); 
    batch.set(docRef, doc);
  });
batch.commit().then(()=>console.log("done")).catch((err)=>console.log(err))

*/

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })


