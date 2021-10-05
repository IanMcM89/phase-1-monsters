document.addEventListener('DOMContentLoaded', () => {
    createForm();
    getMonsters(integer);
    nextPage();
    previousPage();

    //Log first page in the console:
    console.log('Page ' + integer);
});

//Glabally define integer for first page:
let integer = 1;

//Submit event handler:
function handleSubmit(e) {
    e.preventDefault();
    let monsterObject = {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.description.value
    };

    createMonster(monsterObject)
    postMonster(monsterObject);
}

// Create a new form with three inputs and a submit button:
function createForm() {
    let newForm = document.createElement('form');
    newForm.id = 'monster-form';
    newForm.innerHTML = `
        <input id='name' placeholder='Name'>
        <input id='age' placeholder='Age'>
        <input id='description' placeholder='Description'>
        <button type=submit id='submit-button'>Create</button>
    `
    //Add a submit event listener to the submit button:
    newForm.addEventListener('submit', (e) => {
        handleSubmit(e);
    });

    //Append new form to DOM:
    document.querySelector('#create-monster').appendChild(newForm);
}

// GET monsters from the API:
function getMonsters(integer) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${integer}`)
    .then(resp => resp.json())
    .then(json => json.forEach(monster => createMonster(monster)))
}

//Create a new div element for each monster with tags for name, age, and description:
function createMonster(monster){
    let div = document.createElement('div');
    div.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>${monster.age}</h4>
        <p>${monster.description}</p>
    `

    //Append new monster div to DOM:
    document.querySelector('#monster-container').appendChild(div);
}

//POST a new monster to the API:
function postMonster(monster) {
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(monster)
    })
    .then(resp => resp.json()
    .then(monster => console.log(monster)))
}

//Change page number, clear monster div container and re-fetch monsters:
function pageChanger(direction) {
    document.querySelector(`button#${direction}`).addEventListener('click', () => {
        document.querySelector('div#monster-container').innerHTML = '';
        direction === 'forward' ? integer++ : integer--;
        getMonsters(integer);
        //Log current page number in the console:
        console.log('Page ' + integer);
    });
}

//Increase page number integer by 1:
function nextPage() {
    pageChanger('forward');
}

//Decrease page number integer by 1:
function previousPage() {
    pageChanger('back');
}