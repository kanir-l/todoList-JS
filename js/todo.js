/*array of list*/
let listArr = [];
let allList = listArr;

/*array of list that are checked in LS*/
let completedList = [];
let lsCompletedList = localStorage.getItem("completedList");
if(lsCompletedList){completedList = JSON.parse(lsCompletedList);}

/*array of list that are added in LS*/
let addedList = [];
let lsAddedList = localStorage.getItem("addedList");
if(lsAddedList){addedList = JSON.parse(lsAddedList);}

/*class object*/
class ListOb {
    constructor(list, checked, permanent = false) {
        if(list){
            this.list = list;
            this.checked = checked;
            this.permanent = permanent;
            listArr.push(this);
        }else{
            alert("No list to add. Please fill in one")
            return false;
        }
    }; 
 };

new ListOb("Netflix reward", false, true);
new ListOb("Routine walk", false, true);
new ListOb("Meditation", false, true);
new ListOb("House and kids work", false, true);
new ListOb("Call mom", false, true);
new ListOb("An hour code", false, true);

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
        allList.sort(comparingList); 
        ulElement.innerHTML = "";
        toDoList(ulElement);
    });

    /*ul*/
    let ulElement = document.createElement("ul");
    container.appendChild(ulElement);

    /*li - for loop function for the list*/
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
    for (let i = 0; i < allList.length; i++) {
        let liElement = document.createElement("li");
        liElement.innerHTML = allList[i].list;

        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.name = "name";
        checkBox.value = "value";
        checkBox.id = "checkbox";

        liElement.appendChild(checkBox);

        if(!allList[i].permanent){
            let deleteButton = document.createElement("button")
            deleteButton.className = "delete-button";
            deleteButton.id = "delete-button";
            deleteButton.addEventListener("click", () => {
        
                addedList.splice(addedList.indexOf(allList[i].list), 1)
                localStorage.setItem("addedList", JSON.stringify(addedList));

                allList.splice(i, 1);
                
                ulElement.innerHTML = "";
                toDoList(ulElement)
            })

            liElement.appendChild(deleteButton);
        }

        checkBox.addEventListener("click", () => { 
            checkingList(checkBox);
        });

        if (completedList.includes(allList[i].list)) { 
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


fetch('http://localhost:8000/')
  .then(response => response.json())
  .then((data) => {
    console.log(data);
  });