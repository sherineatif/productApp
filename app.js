

const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const product = require('express-session');

const PORT = process.env.PORT || 3000;
const app = express();
const productsRouter = require('./src/routers/productsRouter');
const adminRouter = require('./src/routers/adminRouter');
const authRouter = require('./src/routers/authRouter');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(product({ secret: 'globomantics' }));

require('./src/config/passport.js')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/products', productsRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);




require('./src/config/passport.js')(app);
app.get('/',(req,res)=>{
    res.render('Home',{title:', please sign up.', name:'product' ,data:['Product Name','Product Description','Product Sponsor']});
});
app.listen(PORT, () => {
    debug(`listening on port  `);
  });