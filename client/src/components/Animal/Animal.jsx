import styles from './Animal.module.css';

export default function Animal({idAnimal, establishment,  idSenasa,
    type, key,weight, birthDate, race, pregnant, observations, paddockName, dueDate,
    typeDevice, deviceNumber, createdAt, updatedAt, updateAnimalClicked, deleteThis,
    clicked }
) {
let dueDateString
    if(dueDate!=="") {
        let msDueDate = Date.parse(dueDate);
        let dueDateParse = new Date(msDueDate);
        let dayDueDate = dueDateParse.getDate() +1;
        let monthDueDate = dueDateParse.getMonth()+1;
        let yearDueDate = dueDateParse.getFullYear();
       if(monthDueDate < 10){
           if(dayDueDate<10) {
                dueDateString=`0${dayDueDate}-0${monthDueDate}-${yearDueDate}`;
           } else {
            dueDateString=`${dayDueDate}-0${monthDueDate}-${yearDueDate}`;
           }
       }else{
           if(dayDueDate<10) {
            dueDateString=`0${dayDueDate}-${monthDueDate}-${yearDueDate}`;
           } else {
            dueDateString=`${dayDueDate}-${monthDueDate}-${yearDueDate}`;
           }
       }
       console.log("is no at number?", idSenasa, dueDate)
      /*  console.log("is not at number ?",idSenasa, msDueDate, dueDateParse , dayDueDate, monthDueDate, yearCreatedAt) */
    } else {
        dueDateString="sin datos"
    }
    

    let msBirthDate = Date.parse(birthDate);
    let birthDateParse = new Date(msBirthDate);
    let dayBirthDate = birthDateParse.getDate();
    let monthBirthDate = birthDateParse.getMonth()+1;
    let yearBirthDate = birthDateParse.getFullYear();
    let birthDateString;
   if(monthBirthDate < 10){
       if(dayBirthDate<10) {
           birthDateString=`0${dayBirthDate}-0${monthBirthDate}-${yearBirthDate}`;
       } else {
           birthDateString=`${dayBirthDate}-0${monthBirthDate}-${yearBirthDate}`;
       }
   }else{
       if(dayBirthDate<10) {
           birthDateString=`0${dayBirthDate}-${monthBirthDate}-${yearBirthDate}`;
       } else {
           birthDateString=`${dayBirthDate}-${monthBirthDate}-${yearBirthDate}`;
       }
   } 


   let msUpdatedAt = Date.parse(updatedAt);
   let upddatedAtParse = new Date(msUpdatedAt);
   let dayUpdatedAt = upddatedAtParse.getDate();
   let monthUpdatedAt = upddatedAtParse.getMonth()+1;
   let yearUpdatedAt = upddatedAtParse.getFullYear();
   let updateAtString;
  if(monthUpdatedAt < 10){
      if(dayUpdatedAt<10) {
        updateAtString=`0${dayUpdatedAt}-0${monthUpdatedAt}-${yearUpdatedAt}`;
      } else {
        updateAtString=`${dayUpdatedAt}-0${monthUpdatedAt}-${yearUpdatedAt}`;
      }
  }else{
      if(dayUpdatedAt<10) {
        updateAtString=`0${dayUpdatedAt}-${monthUpdatedAt}-${yearUpdatedAt}`;
      } else {
        updateAtString=`${dayUpdatedAt}-${monthUpdatedAt}-${yearUpdatedAt}`;
      }
  }

  

  let msCreatedAt = Date.parse(createdAt);
  let createdAtParse = new Date(msCreatedAt);
  let dayCreatedAt = createdAtParse.getDate();
  let monthCreatedAt = createdAtParse.getMonth()+1;
  let yearCreatedAt = createdAtParse.getFullYear();
  let createdAtString;
 if(monthCreatedAt < 10){
     if(dayCreatedAt<10) {
        createdAtString=`0${dayCreatedAt}-0${monthCreatedAt}-${yearCreatedAt}`;
     } else {
        createdAtString=`${dayCreatedAt}-0${monthCreatedAt}-${yearCreatedAt}`;
     }
 }else{
     if(dayCreatedAt<10) {
        createdAtString=`0${dayCreatedAt}-${monthCreatedAt}-${yearCreatedAt}`;
     } else {
        createdAtString=`${dayCreatedAt}-${monthCreatedAt}-${yearCreatedAt}`;
     }
 }



    return(
        /* Los divs de este componente estarán en coordenadas absolutas para que se respeten las distancias entre si */
        
        /* The divs of this component will be in absolute coordinates so that the distances between each other are respected */
        <div className="containerboardAndAnimals">
            <div className="headboard">
                <div className="headboardIdSenasa">{idSenasa}</div>
                <div className="headboardAnimalType">{type}</div>
                <div className="headboardWeight">{weight ? weight : "SIN DATOS"}</div>
                <div className="headboardBirth">{birthDateString}</div>
                <div className="headboardRace">{race}</div>
                <div className="headboardPregnant">{pregnant ? "Si" : "No"}</div>
                <div className="headboardDueDate">{dueDate ? dueDateString : "SIN DATOS"}</div>
                <div className="headboardObservations">{observations ? observations : "SIN DATOS"}</div>
                <div className="headboardCreation">{createdAtString}</div>
                <div className="headboardUpdate">{updateAtString}</div>
                <div className="boardActions">
                    
                    {/* When you want to delete or update an animal, props are sent to home component**/}

                    {clicked==="nothing" ? 
                    <>
                    <div className={styles.containerDeleteAndUpdateIcon}>
                        <a 
                         onClick={() => updateAnimalClicked(idAnimal, establishment, idSenasa,
                            type,  key,
                            weight, birthDate,  race,
                            pregnant, observations,
                            paddockName, dueDate,
                            typeDevice, deviceNumber,
                            updateAnimalClicked)}
                        href="#" class="edit" title="Edit" data-toggle="tooltip">
                            <i class="material-icons">&#xE254;</i>
                        </a>
                     </div>
                       <div className={styles.containerDeleteIcon}>
                            <a onClick={() => deleteThis(idAnimal)} href="#" class="delete deleteIcon" title="Delete" data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xE872;</i></a>
                    </div>
                    </> :

                    <>
                    <div className={styles.containerDeleteAndUpdateIcon}>
                        <a 
                        href="#" class="edit" title="Edit" data-toggle="tooltip">
                            <i class="material-icons">&#xE254;</i>
                        </a>
                     </div>
                       <div className={styles.containerDeleteIcon}>
                            <a href="#" class="delete deleteIcon" title="Delete" data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xE872;</i></a>
                    </div>
                    </> }




                </div>
            </div> 
        </div>
    )
}/* className={styles.containerGestionAndButtonCreateAndSearchbar} */

