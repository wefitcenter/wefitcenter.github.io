// script.js

const editIcon = `<i class="fas fa-edit"></i>` 
const deleteIcon = `<i class="fas fa-trash"></i>` 

function clearInputs() { 
    eInput.value = ""
    setsInput.value = ""
    repsInput.value = ""
    weightInput.value = ""
} 

function addToLocalStorage(){ 
    localStorage.setItem("date", JSON.stringify(date))
    localStorage.setItem("exercise", JSON.stringify(exercise)) 
    localStorage.setItem("sets", JSON.stringify(sets)) 
    localStorage.setItem("reps", JSON.stringify(reps)) 
    localStorage.setItem("weight", JSON.stringify(weight))
} 

function activateEdit(i){ 
    eInput.value = exercise[i] 
    setsInput.value = sets[i] 
    repsInput.value = reps[i] 
    weightInput.value = weight[i] 
    editIndex = i 
    submitButton.classList.add("hidden") 
    editSection.classList.remove("hidden") 
} 

function cancelEdit() { 
    clearInputs() 
    editIndex = -1 
    submitButton.classList.remove("hidden") 
    editSection.classList.add("hidden") 
} 

function editRow(){ 
    if(editIndex == -1) return
    exercise[editIndex] = eInput.value 
    sets[editIndex] = setsInput.value 
    reps[editIndex] = repsInput.value 
    weight[editIndex] = weightInput.value 
    fillTable() 
    addToLocalStorage() 
    cancelEdit() 
} 

function deleteRow(i){ 
    if(!confirm( 
    `Confirm that you want to delete the entry: 
    \n ${exercise[i]}: ${sets[i]} sets, ${reps[i]} reps, ${weight[i]} kg`)) 
    return
    exercise.splice(i, 1) 
    sets.splice(i, 1) 
    reps.splice(i, 1) 
    weight.splice(i, 1) 
    date.splice(i, 1) // Remove corresponding date entry
    document.querySelector(`#output > tr:nth-child(${i+1})`) 
        .classList.add("delete-animation") 
    addToLocalStorage() 
    setTimeout(fillTable, 500) 
} 

function fillTable(){ 
    const tbody = document.getElementById("output") 
    const rows = Math.max(exercise.length, sets.length, reps.length, weight.length, date.length) 
    let html = ""
    for(let i = 0; i < rows; i++){ 
        let e = exercise[i] || "N/A"
        let s = sets[i] || "N/A"
        let r = reps[i] || "N/A"
        let w = weight[i] || "N/A"
        let d = date[i] || "N/A" // Add date entry here
        html += `<tr> 
            <td>${d}</td> 
            <td>${e}</td> 
            <td>${s}</td> 
            <td>${r}</td> 
            <td>${w}</td>
            <td> 
                <button onclick="activateEdit(${i})"
                        class="edit">${editIcon} 
                </button> 
            </td> 
            <td> 
                <button 
                    onclick="deleteRow(${i})"
                    class="delete">${deleteIcon} 
                </button> 
            </td> 
        </tr>`		 
    } 
    tbody.innerHTML = html; 
} 

let editIndex = -1; 

let date =  JSON.parse(localStorage.getItem("date")) || [] 
let exercise = JSON.parse(localStorage.getItem("exercise")) || [] 
let sets = JSON.parse(localStorage.getItem("sets")) || [] 
let reps = JSON.parse(localStorage.getItem("reps")) || [] 
let weight = JSON.parse(localStorage.getItem("weight")) || [] 

const eInput = document.getElementById("exercise") 
const setsInput = document.getElementById("sets") 
const repsInput = document.getElementById("reps") 
const weightInput = document.getElementById("weight") 

const submitButton = document.getElementById("submit") 
const editSection = document.getElementById("editSection") 

fillTable() 

submitButton.addEventListener("click", ()=>{ 
    console.log("Submit button clicked!");
    const e = eInput.value || null; 
    const s = setsInput.value || null; 
    const r = repsInput.value || null; 
    const w = weightInput.value || null; 
    if(e===null || s===null || r===null || w===null) { 
        alert("Please enter all the fields.") 
        return
    } 
    exercise.unshift(e) 
    sets.unshift(s) 
    reps.unshift(r) 
    weight.unshift(w) 
    let currentDate = new Date().toLocaleDateString(); // Get current date
    date.unshift(currentDate); // Add current date to the beginning
    clearInputs() 
    fillTable() 
    addToLocalStorage() 
})
import { database } from "./firebase-config.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { auth } from "./firebase-config.js";

const soldierForm = document.getElementById("soldier-form");
const soldierNameInput = document.getElementById("soldier-name");
const createSoldierBtn = document.getElementById("create-soldier-btn");
const soldierProfile = document.getElementById("soldier-profile");

createSoldierBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return;

  const soldierName = soldierNameInput.value;
  const userRef = ref(database, `users/${user.uid}/soldier`);

  await set(userRef, {
    name: soldierName,
    exp: 0,
    level: 1,
  });

  loadSoldierProfile();
});

async function loadSoldierProfile() {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = ref(database, `users/${user.uid}/soldier`);
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    const soldierData = snapshot.val();
    soldierProfile.style.display = "block";
    document.getElementById("soldier-name-display").textContent = soldierData.name;
    document.getElementById("exp-display").textContent = soldierData.exp;
    document.getElementById("level-display").textContent = soldierData.level;
    soldierForm.style.display = "none";
  }
}

loadSoldierProfile();


