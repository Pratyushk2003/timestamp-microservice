const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/timestamp/:date_string?', (req, res) => {
  const { date_string } = req.params;
  let date;

  if (!date_string) {
    date = new Date();
  } else {
    date = moment.utc(date_string, moment.ISO_8601);
  }

  if (date.isValid()) {
    res.json({
      unix: date.valueOf(),
      utc: date.format('ddd, DD MMM YYYY HH:mm:ss [GMT]')
    });
  } else {
    res.json({ error: 'Invalid Date' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
