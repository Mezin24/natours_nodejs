const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: `${__dirname}/config.env` });
const app = require('./app');

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Db connetion successful!'));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listenong on a port ${port}`);
});
