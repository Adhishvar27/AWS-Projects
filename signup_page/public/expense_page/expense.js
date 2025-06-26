
import { authFetch } from "./authFetch.js";
const ulList=document.getElementById('ListByOrder');

document.addEventListener('DOMContentLoaded',()=>{
    const expenseForm=document.getElementById('expenseForm');
    if(expenseForm){
        expenseForm.addEventListener('submit',addToTheExpenses);
    }
    const token=localStorage.getItem('token');
    if(!token){
        throw new Error('No token found, Please login');
    }
    loadContent();
})

async function addToTheExpenses(event){
    event.preventDefault();
    const form=event.target;
    const myObj={
        amount:form.amount.value,
        category:form.category.value,
        description:form.description.value
    };

    try {
        const response=await authFetch('http://localhost:3000/expense/addexpense',{
            method:'POST',
            body:JSON.stringify(myObj)
        });
        if(!response.ok){
            throw new Error('Something went worng');
        }
        loadContent();
    } catch (error) {
        console.error(error);
    }

}

async function loadContent() {
    try {
        const response=await authFetch('http://localhost:3000/expense/getexpense');
        const data=await response.json();
        if(!response.ok){
            throw new Error('somthing went wrong');
        }
        ulList.innerHTML = ''; 
        data.forEach(list => {
            const row=document.createElement('li');
            row.textContent=`${list.amount} - ${list.category} - ${list.description}`;
            const delbtn= document.createElement('button');
            delbtn.textContent='Delete Expense'
            delbtn.onclick=(event)=>deletefunction(list.id,event);
            row.appendChild(delbtn);
            ulList.appendChild(row);            
        });
    } catch (error) {
        console.error(error);
    }
}

async function deletefunction(id,event){
    try {
        const response=await authFetch(`http://localhost:3000/expense/deleteexpense`,{
        method:'DELETE',
        body:JSON.stringify({id})
    });
    if(!response.ok){
        throw new Error('Something went wrong');
    }
    const deleteli=event.target.closest('li');
    if(deleteli){
        deleteli.remove();
    }
    } catch (error) {
        console.error(error);
    }
}