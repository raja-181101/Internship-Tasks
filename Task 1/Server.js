const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.get('/',(req,res)=>{
    res.render('index');
});

app.post('/register',(req,res)=>{
    const {name, email, age, gender, city   } = req.body;
   console.log(`Name: ${name}, Email: ${email}, Age: ${age}, Gender: ${gender}, City: ${city}`);
   res.render('response', {name: name});

});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});