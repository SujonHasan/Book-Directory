if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// built 
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');

app.use(methodOverride('_method'));  
// set ejs & ejs layouts
app.set('view engine', 'ejs');
// app.set('views', __dirname + 'views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);

// set static file
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));

//mongoose 
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.log(error));
db.once('open', ()=> console.log('Connected To Mongoose'));


app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Listening Port ${PORT}`);
})