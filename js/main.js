const incomeArea = document.querySelector('.income-area')
const expensesArea = document.querySelector('.expenses-area')

const availableMoney = document.querySelector('.available-money')

const addPanel = document.querySelector('.add-transaction-panel')
const nameInputPanel = document.querySelector('#name')
const amountInputPanel = document.querySelector('#amount')
const categoryInputPanel = document.querySelector('#category')

const addTranBtn = document.querySelector('.add-transaction')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')
const deleteBtn = document.querySelector('.delete')
const deleteAllBtn = document.querySelector('.delete-all')

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

const showPanel = () => {
    addPanel.style.display = 'flex'
}

const closePanel = () => {
    clearInputs();
}

const checkForm = () => {
    console.log(amountInputPanel.value);

    if(nameInputPanel.value !== '' && amountInputPanel.value !== '0' && categoryInputPanel.value !== 'none') {
        createNewTransaction();
    } else {
        alert('wypełnij wdszystkie pola')
    }
}

const clearInputs = () => {
    addPanel.style.display = 'none'
    nameInputPanel.value = ''
    amountInputPanel.value = ''
    categoryInputPanel.selectedIndex = 0;
    
}

const createNewTransaction = () => {
    const newTransaction = document.createElement('div')
    newTransaction.classList.add('transaction')
    newTransaction.setAttribute('id', ID)
    checkCategory(selectedCategory);

    newTransaction.innerHTML = `
    <p class="transaction-name">${categoryIcon} ${nameInputPanel.value}</p>
    <p class="transaction-amount">- ${amountInputPanel.value} zł
    <button class="delete" onclick="deleteTransaction(${ID})"><i class="fas fa-times"></i></button></p>
    
    `
    amountInputPanel.value > 0 ? incomeArea.append(newTransaction) && newTransaction.classList.add('icome') :
    expensesArea.append(newTransaction) && newTransaction.classList.add('expense');
    moneyArr.push(parseFloat(amountInputPanel.value))
    countMoney(moneyArr);

    closePanel();
    ID++;
    clearInputs();

}

const selectCategory = () => {
    selectedCategory = categoryInputPanel.options[categoryInputPanel.selectedIndex].text;
}


const checkCategory = transaction => {
    switch(transaction) {
        case '[ + ] Przychód':
            categoryIcon = '<i class="fas fa-money-bill-wave"></i>'
            break;
        case '[ - ] Zakupy':
            categoryIcon = '<i class="fas fa-cart-arrow-down"></i>'
            break;
        case '[ - ] Jedzenie':
            categoryIcon = '<i class="fas fa-hamburger"></i> '
            break;
        case '[ - ] Kino':
            categoryIcon = '<i class="fas fa-film"></i> '
            break;
    }
}

const countMoney = money => {
    const newMoney = money.reduce((a, b) => a + b);
    availableMoney.textContent = `${newMoney}zł`
}

addTranBtn.addEventListener('click', showPanel)
cancelBtn.addEventListener('click', closePanel)
saveBtn.addEventListener('click', checkForm)


