/*array of default list*/
let listArr = [];
let defaultList = listArr;

/*array of list that are checked*/
let completedList = [];
let lsCompletedList = localStorage.getItem("completedList");
if(lsCompletedList){completedList = JSON.parse(lsCompletedList);}

/*array of list that are added*/
let addedList = [];
let lsAddedList = localStorage.getItem("addedList");
if(lsAddedList){addedList = JSON.parse(lsAddedList);}

/*class object*/
class ListOb {
    constructor(list, checked) {
        if(list){
            this.list = list;
            this.checked = checked;
            listArr.push(this);
        }else{
            alert("No list to add. Please fill in one")
            return false;
        }
    }; 
 };

new ListOb("Netflix reward", false);
new ListOb("Routine walk", false);
new ListOb("Meditation", false);
new ListOb("House and kids work", false);
new ListOb("Call mom", false);
new ListOb("An hour code", false);

/*for loop the added list*/
for (let i = 0; i < addedList.length; i++) {
    new ListOb(addedList[i])
}


window.onload = function() {
    todoIndex();
}

function todoIndex() {
    /*container*/
    let container = document.getElementById("todo-container")

    /*heading text*/
    let h1Text = document.createElement("h1");
    h1Text.innerHTML = "Daily To Do List";
    container.appendChild(h1Text);

    let h2Text = document.createElement("h2");
    h2Text.innerHTML = new Date().toISOString().slice(0, 10);
    container.appendChild(h2Text);

    /*sort button*/
    let sortButton = document.createElement("button");
    sortButton.innerHTML = "Sort";
    sortButton.className = "sort-button"
    container.appendChild(sortButton);

    sortButton.addEventListener("click", () => {  
        defaultList.sort(comparingList); 
        ulElement.innerHTML = "";
        toDoList(ulElement);
    });

    /*ul*/
    let ulElement = document.createElement("ul");
    container.appendChild(ulElement);

    /*li - for loop function for the default list*/
    toDoList(ulElement);

    /*add input*/
    let addDiv = document.createElement("div");
    addDiv.className = "add-container";
    container.appendChild(addDiv);
     
    let input = document.createElement("input");
    input.type = "text";
    input.name = "name";
    input.placeholder = "More list here";
    input.value = ""; 
    input.id = "addlist-box";
    addDiv.appendChild(input);
   
    /*add button*/
    let addButton = document.createElement("button");
    addButton.innerHTML = "Add";
    addButton.className = "add-button"
    addDiv.appendChild(addButton);
 
    addButton.addEventListener("click", () => {
        let addedValue = input.value;
        let listAdded = new ListOb(addedValue);
        
        if (listAdded.list) { 
        addedList.push(listAdded.list);
 
        localStorage.setItem("addedList", JSON.stringify(addedList));
 
        ulElement.innerHTML = "";
        input.value = ""; 
        toDoList(ulElement);
        }
     });
};

/*function*/
function toDoList(ulElement) {
    for (let i = 0; i < defaultList.length; i++) {
        let liElement = document.createElement("li");
        liElement.innerHTML = defaultList[i].list;

        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.name = "name";
        checkBox.value = "value";
        checkBox.id = "checkbox";

        liElement.appendChild(checkBox);

        checkBox.addEventListener("click", () => { 
            checkingList(checkBox);
        });

        if (completedList.includes(defaultList[i].list)) { 
            checkBox.checked = true;

            let liChecked = checkBox.parentNode;
            liChecked.style.textDecoration = "line-through";
            liChecked.style.color = "#a2a2a2";
        }

        ulElement.appendChild(liElement);
    }
};

function checkingList(checkedBox) {
    let liChecked = checkedBox.parentNode;

    if (checkedBox.checked) {
        liChecked.style.textDecoration = "line-through";
        liChecked.style.color = "#a2a2a2";

        completedList.push(liChecked.textContent);

        localStorage.setItem("completedList", JSON.stringify(completedList));
    } else {
        liChecked.style.textDecoration = "none";
        liChecked.style.color = "";

        let unCheckedIndex = completedList.indexOf(liChecked.textContent);
        completedList.splice(unCheckedIndex, 1);

        localStorage.setItem("completedList", JSON.stringify(completedList));
    }
}

function comparingList(a, b) {
    if (a.list < b.list) {
        return -1;
    } else if(a.list  > b.list) {
        return 1;
    } else {
        return 0;
    }
};