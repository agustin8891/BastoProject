
import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {click, createAnimal, createEstablishment, getAnimals, getEstablishments, updateAnimal, deleteAnimal} from '../../actions';
import styles from './Home.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Animal from '../Animal/Animal';
import SearchBar from '../SearchBar/SearchBar';
import Pages from '../Pages/Pages';
import Swal from 'sweetalert2';
import imageBasto from "../../assets/images/imageBasto.jpg"



export default function Home() {

	const dispatch = useDispatch();

	/* When the Home component is mounted or updated, the animals and establishments are brought
	from the database */
	useEffect(() => {
		dispatch(getAnimals());
		dispatch(getEstablishments());
	},[dispatch])

	const [errors, setErrors] = useState({});
	const allEstablishments = useSelector ((state) => state.allEstablishments);
	const [newEstablishmentclick, setNewEstablishmentClick] = useState(false);
	const successfulSearch = useSelector ((state) => state.successfulSearch);
	
	/* A global state "click" is defined where the information about whether there is
	to show the create or update form */
	const clicked = useSelector ((state) => state.click);

	/* Hooks for pages are defined. Set to display 5 animals per page */
	const allAnimals = useSelector ((state) => state.animals);
	const animals = useSelector ((state) => state.animals);
	const [currentPage, setCurrentPage] = useState(1);
	const [animalsPerPage, setAnimalsPerPage] = useState(5);
	const indexOfLastAnimal=currentPage * animalsPerPage;
	const indexOfFirstAnimal = indexOfLastAnimal - animalsPerPage;
	let currentAnimals = allAnimals.slice(indexOfFirstAnimal, indexOfLastAnimal);

console.log("animales", currentAnimals)
	/* When clicking on the page number, this function changes the page*/
	const changePage = (pageNumber) => {
		setCurrentPage(pageNumber);
	};


	const today = new Date();
	const todayString= new Date().toLocaleDateString();

	const [input, setInput] = useState({
		idSenasa: "",
		establishment:"",
		type: "",
		weight: 0,
		birthDate: "",
		race: "",
		pregnant: false,
		observations: "",
		paddockName: "",
		dueDate: "",
		typeDevice: "",
		deviceNumber: 0,
	 });
	const [idAnimalUpdate, setIdAnimalUpdate] = useState("");


	  /* All the fields entered in the creation and update form are validated */
	function validate(input) {	
			let errors = {};
			let birthDate = new Date(input?.birthDate);
			if (!input.idSenasa) {
			  errors.idSenasa = "Este campo es requerido";
			} else if (input.idSenasa?.length>16) {
				errors.idSenasa = 
				"Este campo debe tener como máximo 16 caracteres " ;
			  } else if (!input.establishment) {
			  errors.establishment = "Este campo es requerido"; 
			} else if (!input.type) {
			  errors.type =  "Este campo es requerido";
			} else if (!input.birthDate) {
			  errors.birthDate =  "Este campo es requerido";
			} else if (birthDate>=today) {
			  errors.birthDate = "La fecha debe ser igual o menor a la actual";
			} else if (!input.race) {
			  errors.race =  "Este campo es requerido";
			} else if (!input.paddockName) {
			  errors.paddockName =  "Este campo es requerido";
			} else if (!input.typeDevice) {
			  errors.typeDevice =  "Este campo es requerido";
			} else if (!input.deviceNumber) {
			  errors.deviceNumber =  "Este campo es requerido";
			} else if (input.deviceNumber<0) {
				errors.deviceNumber =  "El número de dispositivo debe ser mayor que 0";
			}		
			return errors;
	};

	
	  function handleChange(e) {
		setInput({
			...input,
			[e.target.name] : e.target.value

		});
            setErrors(validate({
			...input,
			[e.target.name]: e.target.value
		}));
		}


	  
	/* The updateAnimalClicked function is sent to the "Animal" component, 
	to fetch the desired animal props to update */
	function updateAnimalClicked(
		idAnimal,
		establishment,
		idSenasa,
		type, 
		key,
		weight,
		birthDate,
		race,
		pregnant,
		observations,
		paddockName,
		dueDate,
		typeDevice,
		deviceNumber,
		) {
	
/* 			Date data is fetched from the database and formated to the type
			YYYY-MM-DD so that the form can display the correct formate */

 			let msBirthDate = Date.parse(birthDate);
 			let birthDateParse = new Date(msBirthDate);
			let dayBirthDate = birthDateParse.getDate() +1;
 			let monthBirthDate = birthDateParse.getMonth()+1;
 			let yearBirthDate = birthDateParse.getFullYear();
			let birthDateString;
			if(monthBirthDate < 10){
				if(dayBirthDate<10) {
					birthDateString=`${yearBirthDate}-0${monthBirthDate}-0${dayBirthDate}`;
				} else {
					birthDateString=`${yearBirthDate}-0${monthBirthDate}-${dayBirthDate}`;
				}
			}else{
				if(dayBirthDate<10) {
					birthDateString=`${yearBirthDate}-${monthBirthDate}-0${dayBirthDate}`;
				} else {
					birthDateString=`${yearBirthDate}-${monthBirthDate}-${dayBirthDate}`;
				}
			}
			let dueDateString;
			if(dueDate!=="") {
			let msDueDate = Date.parse(dueDate);
			let dueDateParse = new Date(msDueDate);
		   	let dayDueDate = dueDateParse.getDate() +1;
			let monthDueDate = dueDateParse.getMonth()+1;
			let yearDueDate = dueDateParse.getFullYear();
		   if(monthDueDate < 10){
			   if(dayDueDate<10) {
					dueDateString=`${yearDueDate}-0${monthDueDate}-0${dayDueDate}`;
			   } else {
				dueDateString=`${yearDueDate}-0${monthDueDate}-${dayDueDate}`;
			   }
		   }else{
			   if(dayDueDate<10) {
				dueDateString=`${yearDueDate}-${monthDueDate}-0${dayDueDate}`;
			   } else {
				dueDateString=`${yearDueDate}-${monthDueDate}-${dayDueDate}`;
			   }
		   }
			}
		setIdAnimalUpdate(idAnimal);
		setInput({
			establishment:establishment,
			idSenasa: idSenasa,
			type: type,
			weight: weight,
			birthDate: birthDateString,
			race: race,
			pregnant: pregnant,
			observations: observations,
			paddockName: paddockName,
			dueDate: dueDateString,
			typeDevice: typeDevice,
			deviceNumber: deviceNumber,
		});
/* 		the "click" action is dispatched to change the global state and so
		show update form */
		dispatch(click('update')); 
	};


	/* Clicking on "New Animal" updates the global state to show the creation form*/
	function displayNewAnimalForm(e) {
		dispatch(click('create'));     
    };

	function cancelCreateOrUpdateAnimal(e) {
		dispatch(click('nothing'));
 		setInput({
			idSenasa: "",
			establishment:"",
			type: "",
			weight: 0,
			birthDate: "",
			race: "",
			pregnant: false,
			observations: "",
			paddockName: "",
			dueDate: "",
			typeDevice: "",
			deviceNumber: 0,
		 });   
    };


	function handleSubmit(e) {
		dispatch(createAnimal(input));
		dispatch(click('nothing')); 
		setInput({
		   idSenasa: "",
		   establishment:"",
		   type: "",
		   weight: 0,
		   birthDate: "",
		   race: "",
		   pregnant: false,
		   observations: "",
		   paddockName: "",
		   dueDate: "",
		   typeDevice: "",
		   deviceNumber: 0,
		});       
	};


	/* The update form data is sent to the backend */
	function handleUpdate(e) {
		dispatch(updateAnimal(idAnimalUpdate, input));
		dispatch(click('nothing')); 
		setInput({
		   idSenasa: "",
		   establishment:"",
		   type: "",
		   weight: 0,
		   birthDate: "",
		   race: "",
		   pregnant: false,
		   observations: "",
		   paddockName: "",
		   dueDate: "",
		   typeDevice: "",
		   deviceNumber: 0,
		});     
	};


	function handleCheckBox(e) {
		if(input.pregnant) {
			setInput({
					...input,
					pregnant : false		
				}) 
			} else {
				setInput({
					...input,
					pregnant : true		
				}) 
			};
		};

		
		function handleSelect(e) {		
		/* The information of the selects "type", "typeDevice" and "establishment" is updated */
			setInput({
				...input,
				[e.target.name]: e.target.value
	
			});
				setErrors(validate({
				...input,
				[e.target.name]: e.target.value
			}));
		}

		function createNewEstablishment() {
			/* Se actualiza el estado para mostrar un input o un select del establecimiento */			
			/* The state is updated to show an input or a select of the establishment */
			if(newEstablishmentclick) setNewEstablishmentClick(false)
			else setNewEstablishmentClick(true)			
		};

		function addEstablishment() {	
/* 			A new establishment is created in the database and then updated
			to show the new establishment in the form */
			dispatch(createEstablishment(input.establishment));
			if(newEstablishmentclick) setNewEstablishmentClick(false)
			else setNewEstablishmentClick(true)		
		};

 	/* In case of deleting, it is asked to confirm */
	 function  deleteThis(idAnimal) {
		Swal.fire({
			title: 'Realmente desea eliminar el animal?',
			text: "No podrás revertir esto!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar el animal'
		  }).then((result) => {
			if (result.isConfirmed) {
			  Swal.fire(
				'Eliminado',
				'El animal se ha eliminado',
				'success'
			  )
			  dispatch(deleteAnimal(idAnimal));
			}
		  });
      };


	return (
		<div className={styles.containerAll}>
			<div className={styles.containerTextsAndSearchBar}>
				<div className={styles.containerLogoAndBastoText}>
					<img className={styles.imageBasto} src={imageBasto} alt="basto"/>
					<h3 className={styles.textBasto}>Basto</h3>
				</div>
				<div className={styles.containerGestionAndButtonCreateAndSearchbar}>
					<div className={styles.containerGestionAndButtonCreate}>
						<h1 className={styles.managementText}>Gestión de animales</h1>
						{clicked==='nothing' ? 
						<button className={styles.newAnimalButton} 
						onClick={() => displayNewAnimalForm()}>Nuevo Animal</button> :
						<button className={styles.newAnimalButton} disabled 
						onClick={() => displayNewAnimalForm()}>Nuevo Animal</button> }
						
					</div>
					{/* <div className={styles.containerSearchBar}> */}
						<SearchBar setCurrentPage={setCurrentPage} clicked={clicked}/>
					{/* </div> */}
					</div>
			</div>
		
			<div className="textListAnimals"><h4 >Lista de Animales</h4></div>
			<div className="containerHeadboardAndComponents">

					<div className="containerHeadboardAndAnimals">
						<div className="headboard">
							<div className="headboardIdSenasa"><strong>Id Senasa</strong></div>
							<div className="headboardAnimalType"><strong>Tipo de animal</strong></div>
							<div className="headboardWeight"><strong>Peso</strong></div>
							<div className="headboardBirth"><strong>Nacimiento</strong></div>
							<div className="headboardRace"><strong>Raza</strong></div>
							<div className="headboardPregnant"><strong>Preñada</strong></div>
							<div className="headboardDueDate"><strong>Fecha de parto</strong></div>
							<div className="headboardObservations"><strong>Observaciones</strong></div>
							<div className="headboardCreation"><strong>Creación</strong></div>
							<div className="headboardUpdate"><strong>Actualización</strong></div>
							<div className="headboardActions"><strong>Acciones</strong></div>
						</div> 
					</div>

		
			{/* 		The search bar modifies a global state, where it says if a search had
					success or not. Then based on that the search result is displayed on the screen */}
			{successfulSearch===false ? <h3 className={styles.AnimalsNoFound} >No se encontraron Animales</h3>
			: currentAnimals?.length!==0 ? currentAnimals?.map((a) => {
                                              return (											
/* 											For each element of the "currentAnimals" array, data
											is send to the "Animal" component */
                                                  <fragment>							
                                                      <Animal
													  idAnimal={a._id} 
													  establishment={a.establishment}
													  idSenasa={a.idSenasa} 
													  type={a.type} 
													  key={a.idAnimal} 
													  weight={a.weight} 
													  birthDate={a.birthDate} 
													  race={a.race}
													  pregnant={a.pregnant}
													  observations={a.observations}
													  paddockName={a.paddockName}
													  dueDate={a.dueDate}
													  typeDevice={a.typeDevice}
													  deviceNumber={a.deviceNumber}
													  createdAt={a.createdAt}
													  updatedAt={a.updatedAt}
													  updateAnimalClicked={updateAnimalClicked}
													  deleteThis={deleteThis}
													  clicked={clicked}
													  />
                                                  </fragment>
                                          
                                                  )
                                              }) : 
											  <h3 className={styles.AnimalsNoFound} >No hay animales para mostrar</h3>} 

			</div>
			<div class="container fatherOfPages">

{/* The "pages" function is sent to the Pages component */}
<Pages
		animalsPerPage= {animalsPerPage}
		allAnimals={animals.length}
		changePage={changePage}
		clicked={clicked}
/>
</div>
			{/* creation form */}							  
			{clicked==='create' ? <div className={styles.divCreateClicked}>
		    <form onSubmit = {(e) => handleSubmit(e)} className={styles.form}> 
						<div class="inputCreateAnimal">
						<button className={styles.closeForm} onClick = {() => cancelCreateOrUpdateAnimal()}>x</button>
							<h3>Nuevo Animal</h3>
							<p className={styles.PrymaryTextForm}>Id SENASA *</p>
								<div>  
									<input 
										className={styles.inputForm}
										type="text"	
										value={input.idSenasa}		    	
										name="idSenasa"
										onChange={(e) => handleChange(e)}
									/>
								</div>
								{errors.idSenasa && (
                           			 <p className={styles.styleError}>* {errors.idSenasa}</p>
                        		)}
					</div>
						<div class="inputCreateAnimal">
							<p className={styles.textForm}>Establecimiento al que pertenece el animal *</p>
								<div>  
								{newEstablishmentclick===true ? 
								<div>
									<div className={styles.containerInputAndButtonsForm}>
									<div>
										<input 
											className={styles.inputForm}
											type="test"	
											value={input.establishment}		    	
											name="establishment"
											onChange={(e) => handleChange(e)}
										/>
									</div>
									<div className={styles.containerButtonAddAndCanel}>
										<div className={styles.containerButtonAdd}>	
											<button className={styles.buttonAdd} onClick={() => addEstablishment()}>Añadir</button>
										</div>
										<div  className={styles.containerButtonClose}>
											<button className={styles.buttonClose} onClick={() => createNewEstablishment()}>Cancelar</button>
										</div>
									</div>
									</div>
								</div> :
								
									<div>
									<div>
									<select
										id="selectEstablishments" 
										name='establishment'
										className={styles.inputForm}
										onChange={(e) => handleSelect(e)}
										value={input.establishment}	
										
									>

										{allEstablishments.length &&
										allEstablishments.map((t) => (
											<option key={t.name} value={t.name}>
											{t.name} 
											</option>								
										))}		
									<option value="Selected" name="Selected" disabled selected>Seleccionar</option>							
									</select>
									</div>
										<button className={styles.addNewEstablishment}  
										onClick={(e) => createNewEstablishment(e)}>
											Añadir nuevo establecimiento</button>
									</div>
								}		
																	{errors.establishment && (
										<p className={styles.styleError}>* {errors.establishment}</p>
									)}				
								</div>
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textFormTypeAnimal}>Tipo Animal *</p>
								<div>  
									<select 
										name="type"
									    className={styles.styleSelect}
										onChange={(e) => handleSelect(e)}
									>
									<option value="Selected" disabled selected>Seleccionar</option>
									<option value="Novillo">Novillo</option>
									<option value="Toro">Toro</option>
									<option value="Vaquillona">Vaquillona</option>
									</select>
								</div>

								{errors.type && (
                           			 <p className={styles.styleError}>* {errors.type}</p>
                        		)}
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textFormWeight}>Peso *</p>
								<div>  
									<input 
									className={styles.inputForm}
										type="number"	
										value={input.weight}		    	
										name="weight"
										onChange={(e) => handleChange(e)}
									/>
								</div>
								{errors.weight && (
                           			 <p className={styles.styleError}>* {errors.weight}</p>
                        		)}
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textFormBirthDate}>Nacimiento *</p>
								<div>  
									<input 
									 	className={styles.inputForm}
										type="date"	
										value={input.birthDate}		    	
										name="birthDate"
										onChange={(e) => handleChange(e)}
									/>
								</div>
								{errors.birthDate && (
                           			 <p className={styles.styleError}>* {errors.birthDate}</p>
                        		)}
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textFormRace}>Raza *</p>
								<div>  
									<input 
										className={styles.inputForm}
										type="text"	
										value={input.race}		    	
										name="race"
										onChange={(e) => handleChange(e)}
									/>
								</div>
								{errors.race && (
                           			 <p className={styles.styleError}>* {errors.race}</p>
                        		)}
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textFormPregnant}>Preñada:</p>
								<div className={styles.checkboxFormPregntant}>  
									<input	
										className={styles.checkboxFormPregntant}
										type="checkbox" 
										name="pregnant"
										value={input.pregnant}
										onChange={(e) => handleCheckBox(e)}
									/>
								</div>
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textFormObservations}>Observaciones</p>
								<div>  
									<input 
										className={styles.inputForm}
										type="text"	
										value={input.observations}		    	
										name="observations"
										onChange={(e) => handleChange(e)}
									/>
								</div>
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textFormPadDockName}>Nombre de Potrero *</p>
								<div>  
									<input 
										className={styles.inputForm}
										type="text"	
										value={input.paddockName}		    	
										name="paddockName"
										onChange={(e) => handleChange(e)}
									/>
								</div>
								{errors.paddockName && (
                           			 <p className={styles.styleError}>* {errors.paddockName}</p>
                        		)}
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textDueDay}>Fecha de Parto</p>
								<div>  
									<input 
										className={styles.inputForm}
										type="date"	
										value={input.dueDate}		    	
										name="dueDate"
										onChange={(e) => handleChange(e)}
									/>
								</div>
						</div>

						<div class="inputCreateAnimal">
							<p className={styles.textDeviceType}>Tipo de Dispositivo   *</p>
								<div>  
									<select name="typeDevice"
											className={styles.inputForm}
											onChange={(e) => handleSelect(e)}>				
										<option value="Collar">Collar</option>
										<option value="Caravana">Caravana</option>
										<option value="Seleccionar" selected >Seleccionar</option>
									</select>
								</div>
								{errors.typeDevice && (
                           			 <p className={styles.styleError}>* {errors.typeDevice}</p>
                        		)}
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textDeviceNumber}>Número de Dispositivo*</p>
								<div>  
									<input 
										className={styles.inputForm}
										type="number"	
										value={input.deviceNumber}		    	
										name="deviceNumber"
										onChange={(e) => handleChange(e)}
									/>
								</div>
								{errors.deviceNumber && (
                           			 <p className={styles.styleError}>* {errors.deviceNumber}</p>
                        		)}
						</div>			
						{
						errors.idSenasa ||
						errors.establishment ||
						errors.type ||
						errors.weight ||
						errors.birthDate ||
						errors.paddockName ||
						errors.typeDevice ||
						errors.deviceNumber ||
						!input.idSenasa ||
						!input.establishment ||
						!input.type ||
						!input.race ||
						!input.birthDate ||
						!input.paddockName ||
						!input.typeDevice ||
						!input.deviceNumber ? (
						<button className={styles.buttonSubmitDisabled}  type="submit" disabled={true}>
							Crear Animal
						</button>
						) : (
						<button className={styles.buttonSubmit} type="submit">
							Crear Animal
						</button>
						)}
							</form>
			</div> :
			/* form update */
			clicked==='update' ? <div className={styles.divCreateClicked}>
		    <form onSubmit = {(e) => handleUpdate(e)} className={styles.form}> 
						<div class="inputCreateAnimal">
						<button className={styles.closeForm} onClick = {() => cancelCreateOrUpdateAnimal()}>x</button>
							<h3>Actualizar Animal</h3>
							<p className={styles.PrymaryTextForm}>Id SENASA *</p>
								<div>  
									<input 
										className={styles.inputForm}
										type="text"	
										value={input.idSenasa}		    	
										name="idSenasa"
										onChange={(e) => handleChange(e)}
									/>
								</div>
								{errors.idSenasa && (
                           			 <p className={styles.styleError}>* {errors.idSenasa}</p>
                        		)}
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textForm}>Establecimiento al que pertenece el animal *</p>
								<div>  

									{errors.establishment && (
										<p className={styles.styleError}>* {errors.establishment}</p>
									)}
								{newEstablishmentclick===true ? 
								<div>
									<div className={styles.containerInputAndButtonsForm}>
									<div>
										<input 
											className={styles.inputForm}
											type="test"	
											value={input.establishment}		    	
											name="establishment"
											onChange={(e) => handleChange(e)}
										/>
									</div>
									<div className={styles.containerButtonAddAndCanel}>
										<div className={styles.containerButtonAdd}>	
											<button className={styles.buttonAdd} onClick={() => addEstablishment()}>Añadir</button>
										</div>
										<div  className={styles.containerButtonClose}>
											<button className={styles.buttonClose} onClick={() => createNewEstablishment()}>Cancelar</button>
										</div>
									</div>
									</div>
								</div> :
								
									<div>
									<div>
									<select
										name='establishment'
										className={styles.inputForm}
										onChange={(e) => handleSelect(e)}
										value={input.establishment}	
									>
										{allEstablishments.length &&
										allEstablishments.map((t) => (
											<option key={t.name} value={t.name}>
											{t.name} 
											</option>
										))}

									</select>
									</div>
										<button className={styles.addNewEstablishment}  onClick={(e) => createNewEstablishment(e)}>Añadir nuevo establecimiento</button>
									</div>
								}						
								</div>
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textFormTypeAnimal}>Tipo Animal *</p>
								<div>  
									<select name="type"
									    className={styles.styleSelect}
										onChange={(e) => handleSelect(e)}
										value={input.type}	
									>
					
									<option value="Novillo">Novillo</option>
									<option value="Toro">Toro</option>
									<option value="Vaquillona">Vaquillona</option>
									</select>
								</div>

								{errors.type && (
                           			 <p className={styles.styleError}>* {errors.type}</p>
                        		)}
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textFormWeight}>Peso *</p>
								<div>  
									<input 
										className={styles.inputForm}
										type="number"	
										value={input.weight}		    	
										name="weight"
										onChange={(e) => handleChange(e)}
									/>
								</div>
								{errors.weight && (
                           			 <p className={styles.styleError}>* {errors.weight}</p>
                        		)}
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textFormBirthDate}>Nacimiento *</p>
								<div>  
									<input 
										className={styles.inputForm}
										type="date"	
										value={input.birthDate}		    	
										name="birthDate"
										onChange={(e) => handleChange(e)}
									/>
								</div>
								{errors.birthDate && (
                           			 <p className={styles.styleError}>* {errors.birthDate}</p>
                        		)}
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textFormRace}>Raza *</p>
								<div>  
									<input 
										className={styles.inputForm}
										type="text"	
										value={input.race}		    	
										name="race"
										onChange={(e) => handleChange(e)}
									/>
								</div>
								{errors.race && (
                           			 <p className={styles.styleError}>* {errors.race}</p>
                        		)}
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textFormPregnant}>Preñada:</p>
								<div className={styles.checkboxFormPregntant}>  
									{input.pregnant===true ?
									<input
									checked
									className={styles.checkboxFormPregntant}
									type="checkbox" 
									name="pregnant"
									value={input.pregnant}
									onChange={(e) => handleCheckBox(e)}
								/> :
									<input
										className={styles.checkboxFormPregntant}
										type="checkbox" 
										name="pregnant"
										value={input.pregnant}
										onChange={(e) => handleCheckBox(e)}
									/> 
									}




								</div>
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textFormObservations}>Observaciones:</p>
								<div>  
									<input 
										className={styles.inputForm}
										type="text"	
										value={input.observations}		    	
										name="observations"
										onChange={(e) => handleChange(e)}
									/>
								</div>
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textFormPadDockName}>Nombre de Potrero *</p>
								<div>  
									<input 
										className={styles.inputForm}
										type="text"	
										value={input.paddockName}		    	
										name="paddockName"
										onChange={(e) => handleChange(e)}
									/>
								</div>
								{errors.paddockName && (
                           			 <p className={styles.styleError}>* {errors.paddockName}</p>
                        		)}
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textDueDay}>Fecha de Parto</p>
								<div>  
									<input 
										className={styles.inputForm}
										type="date"	
										value={input.dueDate}		    	
										name="dueDate"
										onChange={(e) => handleChange(e)}
									/>
								</div>
						</div>

						<div class="inputCreateAnimal">
							<p className={styles.textDeviceType}>Tipo de Dispositivo   *</p>
							<div>  
									<select name="typeDevice"
											className={styles.styleSelect}
											onChange={(e) => handleSelect(e)}
											value={input.typeDevice}
											>		
										<option value="Collar">Collar</option>
										<option value="Caravana">Caravana</option>
									</select>
								</div>
								{errors.typeDevice && (
                           			 <p className={styles.styleError}>* {errors.typeDevice}</p>
                        		)}
						</div>
						<div class="inputCreateAnimal">
							<p className={styles.textDeviceNumber}>Número de Dispositivo*</p>
								<div>  
									<input 
										className={styles.inputForm}
										type="number"	
										value={input.deviceNumber}		    	
										name="deviceNumber"
										onChange={(e) => handleChange(e)}
									/>
								</div>
								{errors.deviceNumber && (
                           			 <p className={styles.styleError}>* {errors.deviceNumber}</p>
                        		)}
						</div>
						{
						errors.idSenasa ||
						errors.establishment ||
						errors.type ||
						errors.weight ||
						errors.birthDate ||
						errors.paddockName ||
						errors.typeDevice ||
						errors.deviceNumber ||
						!input.idSenasa ||
						!input.establishment ||
						!input.type ||
						!input.race ||
						!input.birthDate ||
						!input.paddockName ||
						!input.typeDevice ||
						!input.deviceNumber ? (
							<div className={styles.containerSubmitAndCancel}>
							<button className={styles.buttonSubmitDisabled}  type="submit" disabled={true}>
								Actualizar Animal
							</button>
						</div>
            ) : (
						<button className={styles.buttonSubmit} type="submit">
							Actualizar Animal
						</button>
            )}
				</form>
			</div> :
			null}	  
		</div>
	)

}