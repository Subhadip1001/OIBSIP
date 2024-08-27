const title = document.getElementById("task-no");
const description = document.getElementById("description");
const addBtn = document.getElementById("add-btn");
const task = document.querySelector(".task-container");

let taskCount = 0;
addBtn.addEventListener("click", ()=>{
    if((title.value.trim() === "" && description.value.trim() === "") || (title.value === " " && description.value === " ")){
        alert("Please Enter your task...")
        title.value='';
        description.value='';
    }else{
        let taskTitle;
        if (title.value.trim() === "") {
            taskTitle = `Task ${++taskCount}`;
        } else {
            taskTitle = title.value.trim();
        }
        task.innerHTML += `
            <div class="card">
                <div id="title">${taskTitle}</div>
                <div id="task-description">${description.value.trim()}</div>
                <div id="btn-container">
                    <button class="check-btn"><i class="fa-solid fa-check"></i></button>
                    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>`

        title.value='';
        description.value='';

        const deleteBtn = document.querySelectorAll(".delete-btn");
        deleteBtn.forEach((btn) => {
            btn.addEventListener("click", function() {
                this.parentElement.parentElement.remove();
            });
        });

        const checkBtn = document.querySelectorAll(".check-btn");
        for(let i=0; i<checkBtn.length; i++){
            checkBtn[i].addEventListener("click", ()=>{
                checkBtn[i].parentElement.parentElement.classList.toggle("done");
            })
        }
    }
})