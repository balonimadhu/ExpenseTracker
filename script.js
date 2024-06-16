const  balance=Document.getElementById(' balance');
const money_plus=Document.getElementById('money_plus');
const money_minus=Document.getElementById('money_minus');
const list=Document.getElementById('list');
const form=Document.getElementById('form');
const text=Document.getElementById('text');
const amount=Document.getElementById('amount');
const incomeText=Document.getElementById('incomeText');
const expenseText=Document.getElementById('expenseText');

const localStorageTransactions = JSON.parse(
    localStorage.getItem('Transactions')    
);
let Transactions = localStorage.getItem('transactions') !== null?localStorageTransactions :

//function for when new transaction is enter
function addTransaction(e){
    e.preventDefault();

    if(incomeText.value.trim()!==" "){
        const incomeTransaction={
            id:generateId(),
            text:'Income',
            amount: +incomeText.value
        };
        Transactions.push(incomeTransaction);
        addTransactionDOM(incomeTransaction);

    }
    if(expanseText.value.trim()!==" "){
        const expenseTransaction={
            id:generateId(),
            text:'Expense',
            amount: -expenseText.value
        };
        Transactions.push(expenseTransaction);
        addTransactionDOM(expenseTransaction);

    }
    updateValues();
    updateLoaclStorage();

    incomeText.value="";
    expenseText.value="";
    document.getElementById('text').value='';
}
//function for random transaction id
function generateId(){
    return Math.floor(Math.random()*1000000);

}

function addTransactionDOM(transaction){
    const sign= transaction.amount<0 ? '-': '+' ;
    
    const item = document.createEelement('li');

    item.classList.add(transaction.amount<0 ? 'minus': 'plus');

    item.innerHTML=` 
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class ='delete-btn"  onclick = "removeTransaction(${transaction.id})">x</buttoon>
    `;
    list.appendChild(item);

}

function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc+=item),0).toFixed(2);

    const income= amounts
    .filter(item => item>0)
    .reduce((acc, item) => (acc+=item), 0)
    .tofixed(2);

    balance.innerHTML = `$${total}`;
    money_plus.innerHTML= `$${income}`;
    money_minus.innerHTML= `$${expense}`;
}

function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !==id);

    updateLoaclStorage();
    init();
}

function updateLoaclStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init(){
    list.innerHTML= '';

    transactions.forEach(addTransactionDOM);
    updateValues();
        
}

init();

document.addEventListener('DOMContentLoaded', function(){
    form.addEventListener('submit', function(e){
        e.preventDefault();

        addTransaction();

        incomeText.value = '';
        expenseText.value='';
    } );
});

form.addEventListener('submit', addTransaction);
