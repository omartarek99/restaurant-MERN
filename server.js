const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const categoryroutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cookieParser = require('cookie-parser')

const connectDB = require('./database/db');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/API/auth', authRoutes);
app.use('/API/category', categoryroutes);
app.use('/API/product', productRoutes);
connectDB();


app.get('/', (req, res) => {
    res.send('Inside Server');

});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));
