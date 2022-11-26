/*
This is a super handy, super simple to do list.
Each item in the list should have 2 buttons:

- One to click when the ToDo has been completed - it will apply a line-through style to the text of the ToDo.
- A second to delete the ToDo. This could be used to delete completed ToDos from the list, 
  or remove ToDos that we are no longer interested in doing.
  Add a button that users can click that will iterate through the list of ToDos and then delete them only 
  if they have been completed.
*/

// This function is executed when the text is clicked
function checkFunction() {

  let getParent = this.parentElement // this is the SPAN
  getParent = getParent.parentElement // this is the LI
  
  if (getParent.classList.contains("normalText"))
     {
            // APPLY STRIKE-THROUGH
            getParent.classList.remove("normalText") 
            getParent.classList.add("strikeThrough")
     }

     else
     {
            // REMOVE STRIKE-THROUGH
            getParent.classList.remove("strikeThrough") 
            getParent.classList.add("normalText")
     }
}

function trashFunction() {
  this.removeEventListener("click", checkFunction);
  let getParent = this.parentElement; // this is the SPAN
  // Have to remove the other EventListener
  let getChild = getParent.firstChild;
  getChild.removeEventListener("click", trashFunction);
  
  // Now remove the element
  getParent = getParent.parentElement; // this is the LI  
  getParent.remove(); // remove entire element
}

function populateTodoList(todos) {
  let list = document.getElementById("todo-list");
  // Write your code to create todo list elements with completed and delete buttons here, 
  // all todos should display inside the "todo-list" element.
  let todoClassesToAdd = "list-group-item d-flex justify-content-between align-items-center".split(' ');
  // i.e. ['list-group-item' 'd-flex' ....]
  let spanClassesToAdd = "badge bg-primary rounded-pill".split(' ');

  for (eachTodo of todos) {
        let listViewItem=document.createElement('li');
        // Apply the necessary classes
        listViewItem.classList.add(...todoClassesToAdd);

        listViewItem.innerText = eachTodo.task;
        if (!eachTodo.completed)
                // Render the text 'as is' without strike-through
                listViewItem.classList.add("normalText")
        else
                // Completed, so strike-through
                listViewItem.classList.add("strikeThrough");

/*
ADD THE FOLLOWING
                <span class="badge bg-primary rounded-pill">
                  <!-- each of these <i> tags will need an event listener when we create them in Javascript -->
                  <i class="fa fa-check" aria-hidden="true"></i>
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </span>
*/

        let myNewSpan = document.createElement("span");
        // Apply the necessary classes
        myNewSpan.classList.add(...spanClassesToAdd);       

        let myNewIcon = document.createElement("i");
        // Apply the necessary classes
        myNewIcon.classList.add("fa","fa-check");
        myNewIcon.ariaHidden=true;
        // Each 'fa-check <i>' should have an eventListener that will listen for clicks. 
        myNewIcon.addEventListener("click", checkFunction);
        // Add this to the '<span>'.
        myNewSpan.appendChild(myNewIcon);

        myNewIcon = document.createElement("i");
        // Apply the necessary classes
        myNewIcon.classList.add("fa","fa-trash");
        myNewIcon.ariaHidden=true;
        // In my opinion, these icons are too close together - so I added some padding
        myNewIcon.style.paddingLeft="1em";   

        // Each 'fa-trash <i>' should have an eventListener that will listen for clicks. 
        myNewIcon.addEventListener("click", trashFunction);
        // Add this to the '<span>'.
        myNewSpan.appendChild(myNewIcon);

        // Add this to the '<li>'.
        listViewItem.appendChild(myNewSpan);

        // Append to the list
        list.appendChild(listViewItem);
  }
}

// This function will take the value of the input field and add it as a new todo to the bottom of the todo list. 
// These new todos will need the completed and delete buttons adding like normal.
function addNewTodo(event) {
  // The code below prevents the page from refreshing when we click the 'Add Todo' button.
  event.preventDefault();
  // Write your code here... and remember to reset the input field to be blank after creating a todo!
  let newToDoInput = document.getElementById("todoInput")
  let inputText = newToDoInput.value.trim();
  newToDoInput.value = "" // reset the input field to blank 
  if (inputText) // definitely non-null
  {
      populateTodoList([{task: inputText, completed: false}])
  }

  
}

// Advanced challenge: Write a function that checks the todos in the todo list and deletes the completed ones 
// (we can check which ones are completed by seeing if they have the line-through styling applied or not).
function deleteAllCompletedTodos(event) {
     let anIcon,listUL,items,eachLI_Node,theSpan,element;
     event.preventDefault();
     listUL = document.getElementById("todo-list");
     items = listUL.getElementsByTagName("li");
   
     for (let i = 0; i < items.length; i++ ){
          eachLI_Node = items[i];
          if (eachLI_Node.classList.contains("strikeThrough")) {
          // 'strike-through' styling as been applied therefore remove it
          // however remove any Event Listeners first  
             theSpan = eachLI_Node.getElementsByTagName("span");
             if (theSpan) { // definitely exists
                            element = theSpan[0]
                            // each child is either the fa-check or the fa-trash
                            // remove the EventListener then the child in order for this loop to find the next child
                            while (element.firstChild) {
                                    element.firstChild.removeEventListener("click", checkFunction);
                                    element.firstChild.removeEventListener("click", trashFunction);
                                    element.removeChild(element.firstChild);
                          }
                                                              }
             // Now remove the actual list item               
             eachLI_Node.remove() 

 // I cannot fully explain why:
 // When the remove() function is removed it appears that 'items' list is adjusted after each removal 
 // UNLIKE JavaScript arrays
 // So i when incremented will SKIP the next item
 // Decrement i to prevent this

            --i
                                                                  }            
                                                }

}

// These are the same todos that currently display in the HTML
// You will want to remove the ones in the current HTML after you have created them using JavaScript
let todos = [
  { task: "Wash the dishes", completed: false },
  { task: "Do the shopping", completed: false },
];


populateTodoList(todos);
