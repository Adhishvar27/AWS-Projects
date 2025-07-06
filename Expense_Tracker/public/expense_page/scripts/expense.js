
import { BASE_URL } from '../../config.js'
import { authFetch } from "./authFetch.js";
const ulList = document.getElementById('ListByOrder');
const ulleaderboardList = document.getElementById('leaderlist');
const isPremiumDiv = document.getElementById('ispremium');
const paymentbtn = document.getElementById('paymentbtn');
const showLeaderBoard = document.getElementById('showLeaderBoardbtn');
const downloadReportbtn = document.getElementById('downloadReportbtn');
downloadReportbtn.addEventListener('click', download);


let currentPage = 1;
let defaultvaule = localStorage.getItem('list') || 3;

document.addEventListener('DOMContentLoaded', async () => {

    document.getElementById('addtoexpenselist').addEventListener('click', () => {
        const expensevalue = document.getElementById('viewExpense').value;
        if (expensevalue) {
            localStorage.setItem('list', expensevalue);
            defaultvaule = expensevalue;
            loadContent(1);
        }
    })

    showLeaderBoard.addEventListener('click', showLeaderBoardfunction)
    const expenseForm = document.getElementById('expenseForm');
    if (expenseForm) {
        expenseForm.addEventListener('submit', addToTheExpenses);
    }
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found, Please login');
    }

    const premium = await authFetch(`${BASE_URL}/payment/premium`)
    const data = await premium.json();
    if (data.premium) {
        isPremiumDiv.innerHTML = ` <div class="alert alert-success text-center" role="alert">
    🎉 Thank you for being a Premium Member!
  </div>`;
        paymentbtn.style.display = 'none';
        showLeaderBoard.style.display = 'block';
        downloadReportbtn.style.display = 'block';
        showdowloadtable();
    } else {
        isPremiumDiv.innerHTML = '';
        paymentbtn.style.display = 'block';
        showLeaderBoard.style.display = 'none';
        downloadReportbtn.style.display = 'none';
    }
    loadContent();
})

async function addToTheExpenses(event) {
    event.preventDefault();
    const form = event.target;
    const myObj = {
        amount: form.amount.value,
        category: form.category.value,
        description: form.description.value
    };

    try {
        const response = await authFetch(`${BASE_URL}/expense/addexpense`, {
            method: 'POST',
            body: JSON.stringify(myObj)
        });
        if (!response.ok) {
            throw new Error('Something went worng');
        }
        loadContent();
    } catch (error) {
        console.error(error);
    }

}

async function showLeaderBoardfunction() {
    try {
        const response = await authFetch(`${BASE_URL}/premium/getleaderboard`)
        const data = await response.json();
        const title = document.getElementById('LeaderBoardTitle');
        title.className = 'text-center mb-3 mt-3 row justify-content-center fw-bold'
        title.textContent = `LeaderBoard`;
        title.style.fontSize = '32px';
        ulleaderboardList.innerHTML = '';
        data.forEach((user, index) => {
            const row = document.createElement('li');
            row.className = 'list-group-item d-flex justify-content-between align-items-center';
            const listdiv = document.createElement('div');
            listdiv.innerHTML = `
                <span class="fw-semibold text-primary">#${index + 1}. ${user.name}</span>
                <span class="mx-2">—</span>
                <span class="text-capitalize fw-medium">Total Amount: ₹${user.totalAmount}</span>
            `;
            row.appendChild(listdiv);
            ulleaderboardList.appendChild(row);
        });

    } catch (error) {
        console.error(error);
    }
}

async function loadContent(page = 1) {
    try {

        const response = await authFetch(`${BASE_URL}/expense/getexpense?page=${page}&limit=${defaultvaule}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error('somthing went wrong');
        }

        ulList.innerHTML = '';
        data.expense.forEach(list => {
            const row = document.createElement('li');
            row.className = 'list-group-item d-flex justify-content-between align-items-center';
            const textDiv = document.createElement('div');
            textDiv.innerHTML = `
                <span class="fw-semibold text-primary">₹${list.amount}</span>
                <span class="mx-2">—</span>
                <span class="text-capitalize fw-medium">${list.category}</span>
                <span class="mx-2">—</span>
                <span class="text-muted">${list.description}</span>
            `;
            const delbtn = document.createElement('button');
            delbtn.className = 'btn btn-danger btn-sm';
            delbtn.textContent = 'Delete Expense'
            delbtn.onclick = (event) => deletefunction(list.id, event);
            row.appendChild(textDiv);
            row.appendChild(delbtn);
            ulList.appendChild(row);
            showpagenation(data.totalPages, page);
        });
    } catch (error) {
        console.error(error);
    }
}

function showpagenation(totalpages, activepage) {
    const pagenation = document.getElementById('pagination');
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalpages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === activepage ? 'active' : ''}`;
        const btn = document.createElement('button');
        btn.className = 'page-link';
        btn.textContent = i;
        btn.onclick = () => {
            currentPage = i;
            loadContent(i);
        }
        li.appendChild(btn);
        pagenation.appendChild(li);
    }

}

async function deletefunction(id, event) {
    try {
        const response = await authFetch(`${BASE_URL}/expense/deleteexpense`, {
            method: 'DELETE',
            body: JSON.stringify({ id })
        });
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const deleteli = event.target.closest('li');
        if (deleteli) {
            deleteli.remove();
        }
        const checkResponse = await authFetch(`${BASE_URL}/expense/getexpense?page=${currentPage}`);
        const checkData = await checkResponse.json();
        if (checkData.expense.length === 0 && currentPage > 1) {
            currentPage--;
        }
        loadContent(currentPage);
    } catch (error) {
        console.error(error);
    }
}

async function download() {
    try {
        const response = await authFetch(`${BASE_URL}/expense/downloadreport`);
        const data = await response.json();
        if (response.status === 200) {
            const a = document.createElement('a');
            a.href = data.fileURL;
            a.download = 'myexpensetracker.csv'
            a.click();
            showdowloadtable();
        }
    } catch (error) {
        console.error(error);
    }
}

const tablelist = document.getElementById('linktable-body');
const reportTableContainer = document.getElementById('reporttable-container');

function extractDateFromFilename(filename) {
    try {
        const fileDatePart = filename.split('/')[1].replace('.txt', '');
        const parsedDate = new Date(fileDatePart);
        return parsedDate.toLocaleString();
    } catch (error) {
        return 'Invalid Date';
    }
}

async function showdowloadtable() {
    try {
        const response = await authFetch(`${BASE_URL}/expense/showreportlist`);
        const data = await response.json();
         if (!data.result || data.result.length === 0) {
            reportTableContainer.style.display = 'none';
            return;
        }
        reportTableContainer.style.display = 'block';

        tablelist.innerHTML = ``;
        data.result.forEach((report) => {
            const row = document.createElement('tr');
            const dateTd = document.createElement('td');
            dateTd.textContent = extractDateFromFilename(report.filename);
            const linkTd = document.createElement('td');
            const a = document.createElement('a');
            a.href = report.link;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.textContent = "Download";
            linkTd.appendChild(a);

            row.appendChild(dateTd);
            row.appendChild(linkTd);
            tablelist.appendChild(row);
        });
        loadContent(currentPage);
    } catch (error) {
        console.error(error);
    }
}