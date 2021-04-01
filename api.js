const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sessionMiddleware = require('./middlewares/session');
dotenv.config();

const app = express();
app.use(
  cors({
    origin: 'https://petshop-mern-client-4e2bf.web.app',
    credentials: true,
  })
);

app.use(express.json());

const db = process.env.MONGO_URI;

// Connect to Mongo
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const { connection } = mongoose;
connection.once('open', () => {
  console.log('Mongo database connection established successfully');
});
app.use(cookieParser(process.env.SESSION_SECRET));

app.use('/api/products', sessionMiddleware, require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/session', require('./routes/session'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
