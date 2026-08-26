const express = require('express');
const app = express();
const port = 3000;
const users = [];

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static("css"));
app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/register',(req,res)=>{
    res.render('register', {errors:[],formData:{}});
});

app.post('/register',(req,res)=>{
    const {name, email, age, gender, city, password, confirmPassword} = req.body;
    const errors = [];
    if(!name || name.trim().length < 3 ){
        errors.push('Name must be at least 3 characters long.');
    }
    if(!email || !/^\S+@\S+\.\S+$/.test(email)){
        errors.push('Invalid email format.');
    }
    if(!age || isNaN(age) || age < 18 || age > 100){
        errors.push('Age must be a number between 18 and 100.');
    }
    if(!gender){
        errors.push('Please select a gender.');
    }

    if(!city){
        errors.push('Please select a city.');
    }
    if(!password || password.length < 6){
        errors.push('Password must be at least 6 characters long.');
    }
    if(password !== confirmPassword){
        errors.push('Passwords do not match.');
    }
    if(errors.length > 0){
        res.render('index', { errors, formData: req.body });
    } else {
        const user ={
            id: users.length + 1,
            name: name.trim(),
            email: email.trim(),
            age: Number(age),
            gender,
            city: city
        };
        users.push(user);
        res.render('response', user);
        console.log(users);
    }
    

});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});