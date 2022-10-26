const Animal = require('../models/animal');


const getAnimals = async (req, res) => {
	const idSenasa= req.query.idSenasa;
  let animal;
	if(idSenasa) {  
      /* if an id was passed through the query, an animal with that id is retrive.*/  
    try {
          animal = await Animal.find({"idSenasa":idSenasa});
          res.send(animal);
					}          
    catch (error) {
      res.status(404).json({
      msg: "There are no animals to show",
      error: error,
      });
    }
	} else {
    /* Otherwise all animals are retrive.*/
    const animals = await Animal.find();
    res.json(animals); 
	}
}


const createAnimal = async (req, res) => {
  try {
      const {
        idSenasa,
        establishment, 
        type, 
        weight, 
        birthDate,
        race, 
        pregnant, 
        dueDate, 
        observations, 
        paddockName, 
        typeDevice, 
        deviceNumber,
      } = req.body;

      if (
        !idSenasa ||
        !establishment ||
        !type ||
        !birthDate ||
        !race ||
        !typeDevice ||
        !deviceNumber 
      ) {
        console.log(idSenasa,establishment,type,birthDate,race,typeDevice,deviceNumber)
        return res.status(404).json({
          msg: "All fields are required",
        });
      }
      /* Si las validaciones están bien, se guarda el animal en la base de datos    */   
     /*  If the validations are correct, the animal is saved in the database */
      const animal =  new Animal ({
        idSenasa,
        establishment, 
        type, 
        weight, 
        birthDate,
        race, 
        pregnant, 
        dueDate, 
        observations, 
        paddockName, 
        typeDevice, 
        deviceNumber,
      });
      await animal.save();
      /* res.send('Animal created successfully');  */
      res.status(200).json(animal);
    } catch (error) {
    res.status(404).json({
    msg: "Couldn't create animal",
    error: error,
  });
}
}


const updateAnimal = async (req, res) => {
  const {
    idSenasa,
    establishment, 
    type, 
    weight, 
    birthDate,
    race, 
    pregnant, 
    dueDate, 
    observations, 
    paddockName, 
    typeDevice, 
    deviceNumber,
  } = req.body;
  try{
    const {
      idSenasa,
      establishment, 
      type, 
      weight, 
      birthDate,
      race, 
      pregnant, 
      dueDate, 
      observations, 
      paddockName, 
      typeDevice, 
      deviceNumber,
    } = req.body;
    if (
      !idSenasa ||
      !establishment ||
      !type ||
      !birthDate ||
      !race ||
      !typeDevice ||
      !deviceNumber  
    ) {
      return res.status(404).json({
        msg: "All fields are required",
      });
    }
    if (
      weight < 0
    ) {
      return res.status(404).json({
        msg: "Weight cannot be negative",
      });
    }
    const newAnimal = {
      idSenasa,
      establishment, 
      type, 
      weight, 
      birthDate,
      race, 
      pregnant, 
      dueDate, 
      observations, 
      paddockName, 
      typeDevice, 
      deviceNumber,
    };
    await Animal.findByIdAndUpdate(req.params.id, newAnimal);
    res.json({status: 'Animal Updated'});
  } catch (error) {
      res.status(404).json({
      msg: "Couldn't update animal",
      error: error,
    });
}
}


const deleteAnimal = async (req, res) => {
  try {
    await Animal.findByIdAndRemove(req.params.id);
    res.json({status:'Animal Deleted'});
  } catch (error) {
    res.status(404).json({
    msg: "Couldn't remove animal",
    error: error,
    });
  }
}

module.exports = {
    getAnimals,
    /* getAnimalById, */
    createAnimal,
    updateAnimal,
    deleteAnimal,
    /* getAnimalByIdSenasa */
  };