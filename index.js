const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // CSS file-kku

let employees = []; 

app.get('/', (req, res) => {
    res.render('login'); });


app.get('/auth/login', (req, res) => {
    res.render('login'); 
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '1234') {
        res.render('dashboard', { employees });
    } else {
        res.send('<script>alert("Invalid Credentials"); window.location="/";</script>');
    }
});

app.post('/add', (req, res) => {
    employees.push(req.body);
    res.render('dashboard', { employees });
});

app.post('/delete/:index', (req, res) => {
    employees.splice(req.params.index, 1);
    res.render('dashboard', { employees });
});
// View route: 
app.get('/view/:index', (req, res) => {
    const index = req.params.index;
    res.render('view', { employee: employees[index] });
});

// Edit route (GET):
app.get('/edit/:index', (req, res) => {
    const index = req.params.index;
    res.render('edit', { employee: employees[index], index: index });
});

// Edit route (POST): 
app.post('/edit/:index', (req, res) => {
    const index = req.params.index;
    employees[index] = req.body;
    res.redirect('/auth/login');
});

app.listen(5000, () => console.log('Server started on http://localhost:5000'));