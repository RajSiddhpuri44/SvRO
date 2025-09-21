const Service = require('../models/Service.model');
const Client = require('../models/Client.model');

// @route   POST /api/services
exports.createService = async (req, res) => {
  try {
    const { client: clientId } = req.body;

    const clientExists = await Client.findById(clientId);
    if (!clientExists) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route   GET /api/services/client/:clientId
exports.getServicesForClient = async (req, res) => {
  try {
    const { search } = req.query;
    let query = { client: req.params.clientId };

    if (search) {
      query.serviceDescription = { $regex: search, $options: 'i' };
    }

    const services = await Service.find(query).sort({ serviceDate: -1 });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @route   PUT /api/services/:id
exports.updateService = async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service record not found' });
    }
    
    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route DELETE /api/services/:id
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service record not found' });
    }

    await service.deleteOne();
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};