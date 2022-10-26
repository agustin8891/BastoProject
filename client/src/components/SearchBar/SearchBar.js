import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getIdSenasaAnimal} from '../../actions';
import styles from './SearchBar.module.css'

export default function SearchBar({setCurrentPage, clicked}) {

	const dispatch = useDispatch();
	const[idSenasa,setIdSenasa] = useState("");
    
function handleInputChange(e) {
	setIdSenasa(e.target.value);
};

function handleSearch(e) {
	/* The action to search for the Senasa Animal Id in the back-end is dispatched	 */
	dispatch(getIdSenasaAnimal(idSenasa));
	setCurrentPage(1);
};

return (
		<> {clicked==="nothing" ? 
		<div className={styles.divSearch}>
			<div className={styles.divSearchTextAndInput}>
				<p className={styles.idText}><strong>ID Senasa Animal</strong></p>
				<div className={styles.containerInput}>
					<input type='text' placeholder="Buscar por Id Senasa Animal..."
					onChange = {(e) => handleInputChange(e)}
					className={styles.inputSearchClass}/>
				</div>
			</div>
			<div>
				<button onClick={(e) => handleSearch(e)} 
				className={styles.buttonSearch}>Buscar</button>
			</div>
		</div>

		: <div className={styles.divSearch}>
			<div className={styles.divSearchTextAndInput}>
				<p className={styles.idText}><strong>ID Senasa Animal</strong></p>
				<div className={styles.containerInput}>
					<input type='text' placeholder="Buscar por Id Senasa Animal..."
					onChange = {(e) => handleInputChange(e)}
					className={styles.inputSearchClass}
					disabled />
				</div>
			</div>
			<div>
				<button 
				onClick={(e) => handleSearch(e)} 
				className={styles.buttonSearch}
				disabled >Buscar</button>
			</div>
			</div>
		}
		</>
		)
};