const express=require('express');
const path = require('path');
var compression = require('compression')


const port=process.env.PORT || 80;
const app=express();
app.use(compression())

app.use(express.static(__dirname+'/build'));
app.get('/us', (req,res) =>{
  res.sendFile('index.html', {root: path.join(__dirname, '/intro')});
});
app.get('/aboutus', (req,res) =>{
  res.sendFile('aboutus.html', {root: path.join(__dirname, '/aboutus')});
});


app.get('*', (req,res) =>{
    res.sendFile('index.html', {root: path.join(__dirname, '/build')});
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })


