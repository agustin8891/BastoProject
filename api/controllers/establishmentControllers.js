const Establishment = require('../models/Establishment');


const createEstablishment = async (req, res) => {
  try {
    const parameter=req.params;
    const {name} = req.body;
    if (!name) {
      return res.status(404).json({
        msg: "All fields are required",
      });
    }
    const establishment =  new Establishment ({
      name
    });
    await establishment.save();
    res.send('Establishment created successfully');
    } catch (error) {
      res.status(404).json({
      msg: "Couldn't create Establishment",
      error: error,
    });
    }
}


const getAllEstablishments = async (req, res) => {
  try {
    const establishments = await Establishment.find();
    res.json(establishments);
    } catch (error) {
        res.status(404).json({
        msg: "There are no establishments to show",
        error: error,
      });
    }
}


module.exports = {
    createEstablishment,
    getAllEstablishments,
    
  };