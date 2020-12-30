window.onload = function() {
    toDoList();
}

let lists = ["Work on the assignment", "Netflix reward", "Routine walk", "Meditation", "House and kids work", "Call Mom"]

let completedList = [];
let savedArr = JSON.parse(localStorage.getItem("checkedBox"));
if (savedArr) {
    completedList = savedArr;
}

function toDoList() {
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
    let sort = document.createElement("button");
    sort.innerHTML = "Sort";
    sort.className = "sort-button"
    container.appendChild(sort);
    sort.addEventListener("click", () => { sortLists(lists); });

    /*list*/
    let uiElement = document.createElement("ul");

    for (let i = 0; i < lists.length; i++) {
       
        let liElement = document.createElement("li");
        liElement.innerHTML = lists[i];

        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.name = "name";
        checkBox.value = "value";
        checkBox.id = "checkbox";
        liElement.appendChild(checkBox);

        if(completedList.indexOf(lists[i]) > -1) {
            liElement.style.textDecoration = "line-through";
            checkBox.checked = true;
        }

        checkBox.addEventListener("click", (checkEvent) => { checkedLists(checkEvent.target); });
        

        uiElement.appendChild(liElement);
    }
    container.appendChild(uiElement);

    /*input button add*/
    let addContainer = document.createElement("div");
    addContainer.className = "add-container";
    container.appendChild(addContainer);

    let input = document.createElement("input");
    input.type = "text";
    input.name = "name";
    input.placeholder = "More list here";
    input.value = ""; 
    input.id = "addlist-box";
    addContainer.appendChild(input);

    let add = document.createElement("button");
    add.innerHTML = "Add";
    add.className = "add-button"
    addContainer.appendChild(add);
    add.addEventListener("click", () => { addLists(input.value); });
}

function checkedLists(checkedBox) {
    let liChecked = checkedBox.parentNode;

    if (checkedBox.checked == true) {
        liChecked.style.textDecoration = "line-through";
        completedList.push(liChecked.textContent);
        localStorage.setItem("checkedBox", JSON.stringify(completedList));
      } else {
        checkedBox.checked = false;
        liChecked.style.textDecoration = "none";
        let completedValue = checkedBox.parentNode.textContent;
        let completedListIndex = completedList.indexOf(completedValue);

        completedList.splice(completedListIndex, 1);

        localStorage.setItem("checkedBox", JSON.stringify(completedList));
        
      }
}


function addLists(value) {
    if (value) {
        lists.push(value);
        document.getElementById("todo-container").innerHTML = "";
        toDoList();
    
    }
    else {
        alert("No list to add!")
    }
}

function sortLists() {
    lists.sort();
    document.getElementById("todo-container").innerHTML = "";
    toDoList();
}

