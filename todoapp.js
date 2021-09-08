let date = document.getElementById("date");
let input = document.getElementById("userInput");
let enterButton = document.getElementById("enter");
let ul = document.getElementById("todo");
let allDoneText = document.getElementById("allDoneText");
let clearButton = document.getElementById("clear");

const checkIfAllDone = () => {
    // Checks if all list items are have class done. If true, shows allDoneText and option to clear the list. 
    // If false or the list is empty, hides allDonetext and option to clear the list.
    let collection = document.getElementsByTagName("li");
    let listItems = Array.from(collection);
    if (listItems.length !== 0 && listItems.every((element) => element.classList.contains("done"))) {
        allDoneText.classList.remove("hidden");
        allDoneText.scrollIntoView();
    } else {
        allDoneText.classList.add("hidden");
    }
}

const createListElement = () => {
    // Creates new list element
    let li = document.createElement("li");
    
    // Sets the text from input field as the text of the list element
    li.appendChild(document.createTextNode(input.value));
    
    // Adds list element to the list
    ul.appendChild(li);

    // Clears input field
    input.value = "";

    // Click handler. Adds class "done" to list element, or removes it if already present
    const markAsDone = () => {
        li.classList.toggle("done");
        checkIfAllDone();
    }
    
    li.addEventListener("click", markAsDone);

    // Adds delete button
    let deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("X"));
    li.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {ul.removeChild(li)});

    allDoneText.classList.add("hidden");
}

const clearList = () => {
    while (ul.firstChild) {
        ul.removeChild(ul.lastChild);
    }
    allDoneText.classList.add("hidden");
}

// Click handler for enter button
const addToListClick = () => {
    // Checks that input has content. Empty input does not create a new list element.
    if (input.value.length > 0) {
        createListElement();
    }
}

// Event handler for pressing Enter
const addToListKeypress = (event) => {
    // Pressing enter (JS keycode 13) creates new list item, if input has content.
    if (input.value.length > 0 && event.which === 13) {
        createListElement();
    }
}

const dateAsString = () => {
    // returns current date as string in format DD MMMM(month abbreviation) YYYY
    let today = new Date();
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let date = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
    return date;
}

// Sets current date to h1
let dateTextNode = document.createTextNode(dateAsString());
date.appendChild(dateTextNode);

enterButton.addEventListener("click", addToListClick);

input.addEventListener("keypress", addToListKeypress);

clearButton.addEventListener("click", clearList);