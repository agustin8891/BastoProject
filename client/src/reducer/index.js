const initialState = {
	animals : [],
	allAnimals: [],
	allEstablishments: [],
	click: 'nothing',
	successfulSearch:true
}

function rootReducer(state=initialState, action) {
	switch(action.type) {
		case 'GET_ANIMALS':
			return{
				...state,
				animals:action.payload,				
				allAnimals: action.payload
			}
			case 'GET_ESTABLISHMENT':
				return{
					...state,
					allEstablishments:action.payload,				
				}			
			case 'DELETE_ANIMAL':
				console.log("reducer delete animal", action.payload)
				return {
				...state,
				allAnimals: action.payload,
				animals :  action.payload,
			}
			case 'CLICK':
				return {
				...state,
				click: action.payload		
			}

			case 'GET_ID_SENASA':
				let foundItem = action.payload.length>0 ? true : false
			return {
				...state,
				animals: action.payload,
				successfulSearch:foundItem
			}
			case 'CREATE_ESTABLISHMENT':			
			return {
				...state,
				allEstablishments: action.payload
			}
			default:
					return state;
			}
}

export default rootReducer;




