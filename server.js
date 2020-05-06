const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');


const app = express();

connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// import routes

const postsRoute = require('./routes/posts');

app.use('/api/posts', postsRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));