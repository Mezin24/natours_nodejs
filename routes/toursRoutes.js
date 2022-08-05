const express = require('express');
const tourControllers = require('../controllers/toursControllers');
const router = express.Router();

router.param('id', tourControllers.checkId);

router
  .route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.checkBody, tourControllers.postTour);
router
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.updateTour)
  .delete(tourControllers.deleteTour);

module.exports = router;
