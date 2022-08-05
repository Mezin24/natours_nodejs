const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    required: [true, 'A tour must have a name'],
    unique: true,
    type: String,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  rating: {
    default: 4.5,
    type: Number,
  },
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
