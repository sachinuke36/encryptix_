const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { connectDB } = require('./config/database');
const router = require('./routes/jobRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();
const port = 4000;

//----------------------------  Middlewares -------------------------------------------//

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());



// ---------------------------- Connect to the database -------------------------------//
connectDB();




//------------------------------------ Routes -----------------------------------//
app.use('/employer',authRouter)
app.use('/job', router);
app.use('/job_seeker',authRouter);



app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
