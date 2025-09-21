const express = require('express');
const {
  createService,
  getServicesForClient,
  updateService,
  deleteService
} = require('../controllers/service.controller');

const router = express.Router();

router.route('/').post(createService);

router.route('/client/:clientId').get(getServicesForClient);

router.route('/:id')
  .put(updateService)
  .delete(deleteService);

module.exports = router;