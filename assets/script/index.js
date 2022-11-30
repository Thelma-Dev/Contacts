'use strict';

// Utility functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function getElement(selector, parent = document) {
    return parent.getElementById(selector);
}


function select(selector, parent = document) {
    return parent.querySelector(selector);
}

import Contact from './Contact.js';

const form = select('form');
const btn = select('.btn');
const storage = select('.storage');
const emailRegex = /^(?=^.{8,}$)[-_A-Za-z0-9]+([_.-][a-zA-Z0-9]+)*@[A-Za-z0-9]+([.-][a-zA-Z0-9]+)*\.[A-Za-z]{2,}$/;
const input = select('.input');
const output = select('.output p');
const savedContact = select('.display p');
const array = [];


let count = 1;
onEvent('click', btn, function() {
    
    let entry = input.value.trim();
    let entryInfo = entry.split(", ", 3);
    let contactBox = document.createElement('div');
    let contact = new Contact(...entryInfo);


    let message = '';
    let valid = true;

    if (entry.length === 0) {
        message += 'Info is required';
        valid = false;
    } else if (!emailRegex.test(entryInfo[2])) {
        message +=  'Email is Invalid\n'
        valid = false;
    }

    if (!valid) {
       output.innerText = message;
       count--; 
    } else {
        let userIdentity = contact;
        output.innerText = 'Contact Submitted';
        array.unshift(userIdentity);
        listContacts(contactBox, contact);
        validateLimit();
        savedContact.innerText = `Saved contact: ${count}` ; 
        input.value = '';
        count = count++;
    }

    count++;

    onEvent('click', contactBox, () => {
        deleteInput(contactBox, contact);
        contactBox.remove();
        savedContact.innerText = `Saved contact: ${count--}` ; 
        count--;
    });  
});

function validateLimit() {
    let numberOfShapes = storage.children.length
    if(numberOfShapes === 9) {
        btn.disabled = true;
        output.innerText = 'Contact list is full!';
        return false;
    }

    return true;
}


function listContacts(contactBox, obj) {

    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let p3 = document.createElement('p');
        
    contactBox.classList.add("box");
    p1.innerText = `Name: ${obj.fullName}`
    p2.innerText = `City: ${obj.city}`
    p3.innerText = `Email: ${obj.email}`
    contactBox.append(p1, p2, p3);
    storage.append(contactBox);
    console.log(contactBox);
}

function deleteInput(contactBox, obj) {
    let index = array.indexOf(obj);
    for( let i = 0; i < array.length; i++){ 
        if (array[i] === obj) { 
            array.splice(i, 1); 
        }
    }
    console.log(array);
    output.innerText= `Contact list Deleted`;
}









 

 