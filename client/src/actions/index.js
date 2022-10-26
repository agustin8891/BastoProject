import axios from 'axios'


export function getAnimals() {
	return async function(dispatch){
		var json = await axios ("http://localhost:3001/animals");
		return dispatch({
			type:'GET_ANIMALS',
			payload:json.data
		});
	}
};


export function getEstablishments() {
	return async function(dispatch){
		var json = await axios ("http://localhost:3001/establishment");
		return dispatch({
			type:'GET_ESTABLISHMENT',
			payload:json.data
		});
	}
};

/* En esta acción luego de crear el nuevo establecimiento se hace una petición para actualizar los
establecimientos en el front-end */

/* In this action, after creating the new establishment, a request is made to update the
establishments on the front end */
export function createEstablishment (name) {
	return async function(dispatch){
		const response = await axios.post('http://localhost:3001/establishment', {name});
		var json = await axios ("http://localhost:3001/establishment");
		return dispatch({
			type:'CREATE_ESTABLISHMENT',
			payload:json.data
		});
	}
};

export function createAnimal (input) {
	return async function(dispatch){
		const response = await axios.post('http://localhost:3001/animals', input);
		/* const response ="response" */
		var json = await axios ("http://localhost:3001/animals");
		return dispatch({
			type:'GET_ANIMALS',
			payload:json.data
		});
	}
};

export function updateAnimal (idAnimalUpdate, input) {
	return async function(dispatch){
		const response = await axios.put('http://localhost:3001/animals/' + idAnimalUpdate, input);
		/* const response ="response" */
		var json = await axios ("http://localhost:3001/animals");
		return dispatch({
			type:'GET_ANIMALS',
			payload:json.data
		});
	}
};



export function deleteAnimal(idAnimal) {
	return async function(dispatch){
		var json = await axios.delete("http://localhost:3001/animals/" + idAnimal);
		let response = await axios ("http://localhost:3001/animals");
		return dispatch({
			type:'DELETE_ANIMAL',
			payload:response.data
		});
	}
};



export function click(clicked) {
	return{
		type: 'CLICK',
		payload:clicked
	}
};



export function getIdSenasaAnimal(idSenasa) {
	return async function (dispatch) {
		try{
			var json=await axios.get("http://localhost:3001/animals?idSenasa=" + idSenasa);
			return dispatch ({
				type: "GET_ID_SENASA",
				payload: json.data
				
			});
		} catch(error) {
			alert("Id Senasa No encontrado");
		}
	}	
};