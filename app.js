const express = require('express');
const cookiesParser = require('cookie-parser');
require('dotenv').config();
const PORT = process.env.PORT = 8000;

const {requireAuth, checkUser } = require('./middlewares/authMiddleware');


const app = express();

// middleware 
app.use(express.json());
app.use(cookiesParser());

app.use(express.static('public'))



// View Engine Set
app.set('view engine', 'ejs');

// Router
app.get('*', checkUser);
app.get('/health', (req, res) =>{
    res.status(200).json({
        status: 'OK',
        message: 'Health is working fine'
    });
})




app.get('/', (req, res) =>{
    res.render('home');
})

app.get('/smoothies', requireAuth, (req, res) =>{
    res.render('smoothies');
})

app.use('/', require('./routes/authRoutes'));


app.listen(PORT, console.log(`Server is listening on port ${PORT}`));