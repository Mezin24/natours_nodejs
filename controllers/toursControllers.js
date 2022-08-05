const fs = require('fs');

let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  const { id } = req.params;
  const tour = tours.find((item) => item.id === +id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  next();
};

exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Tour must have name and price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestedTime,
    results: tours.length,
    data: { tours },
  });
};

exports.getTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.find((item) => item.id === +id);
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

exports.postTour = (req, res) => {
  const newTourId = tours[tours.length - 1].id + 1;
  const newTour = { id: newTourId, ...req.body };
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: newTour,
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const tourId = +req.params.id;
  const tour = tours.find((item) => item.id === tourId);

  for (let [key, value] of Object.entries(req.body)) {
    tour[key] = value;
  }

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: { tour },
      });
    }
  );
};

exports.deleteTour = (req, res) => {
  const tourId = +req.params.id;

  tours = tours.filter((item) => item.id !== tourId);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: null,
      });
    }
  );
};
