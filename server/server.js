import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import template from './../template';
import devBundle from './devBundle';

const app = express();
// SHOULD BE COMMENTED OUT WHEN BUILDING THE APPLICATION CODE FOR PRODUCTION
devBundle.compile(app);
// SHOULD BE COMMENTED OUT WHEN BUILDING THE APPLICATION CODE FOR PRODUCTION

const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));


// DATABASE CONNECTION URL
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/newDB';
// USE CONNECT METHOD TO CONNECT TO THE SERVER
mongoose.connect('mongodb://localhost:27017/newDB', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

app.get('/', (req, res) => {
  res.status(200).send(template());
});


let port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('Server started on port %s.', port);
});
