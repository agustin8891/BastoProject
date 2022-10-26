import React from 'react';
import styles from './Pages.module.css';

	/* This component receives the number of animals per page, the total number of animals
	and the function to change pages. The number of pages is calculated and the
	change buttons are displayed */

export default function Pages ({animalsPerPage, allAnimals, changePage, clicked}) {
	const pageNumbers = [];
	for (let i=0; i<Math.ceil(allAnimals/animalsPerPage); i++) {
		pageNumbers.push(i+1);
	};
	return (	
		<div class="divPages">
			<nav class="navPages">

				{clicked==="nothing" ? 
				<ul class="pagination">
					{ pageNumbers &&			
					pageNumbers.map(number => (
							<li className="page-item pageClassItem">
									<a className="page-link" onClick={() => changePage(number)}>{number}</a>
							</li>
					))}
				</ul>
				:
				<ul class="pagination">
					{ pageNumbers &&			
					pageNumbers.map(number => (
							<li className="page-item pageClassItem">
									<a className="page-link">{number}</a>
							</li>
					))}
				</ul>

				}


			</nav>
		</div>
	)	
};