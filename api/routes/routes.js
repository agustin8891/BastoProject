const express = require('express');
const router= express.Router();

const {
	getAnimals,
	getAnimalById,
	createAnimal,
	updateAnimal,
	deleteAnimal,
	getAnimalByIdSenasa
} = require("../controllers/animalControllers");

const {
	getAllEstablishments,
	createEstablishment,
	deleteEstablishment
} = require("../controllers/establishmentControllers");



router.get('/animals', getAnimals);
router.post('/animals', createAnimal);
router.get('/establishment', getAllEstablishments);
router.post('/establishment', createEstablishment);
/* router.delete('/establishment/:id', deleteEstablishment); */
router.delete('/animals/:id', deleteAnimal);
router.get('/animals/:id', getAnimals);
router.put('/animals/:id', updateAnimal);


module.exports=router;