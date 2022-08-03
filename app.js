const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.use(express.json());

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const { id } = req.params;
  const tour = tours.find((item) => item.id === +id);
  console.log(tour);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newTourId = tours[tours.length - 1].id + 1;
  const newTour = { id: newTourId, ...req.body };
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: newTour,
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const tourId = +req.params.id;
  const tour = tours.find((item) => item.id === tourId);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  for (let [key, value] of Object.entries(req.body)) {
    tour[key] = value;
  }

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: { tour },
      });
    }
  );
});

app.delete('/api/v1/tours/:id', (req, res) => {
  const tourId = +req.params.id;
  const tour = tours.find((item) => item.id === tourId);
  console.log(tour);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  tours = tours.filter((item) => item.id !== tourId);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: null,
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Listenong on a port ${port}`);
});
