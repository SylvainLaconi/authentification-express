const express = require('express');
const app = express();
const port = process.env.PORT || 4040;
const pool = require('./conf');
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.use('/', homeRouter)
// app.use('/courses', coursesRouter)


pool.getConnection((err) => {
   if (err) {
    console.error('error connecting to db', err
  );
} else {
  console.log('connected to db');
}
});


app.listen(port, (err) => {
  if(err){
    throw new Error('Something had happened', err)
  }
  console.log(`server is listening on port ${port}`)
});
