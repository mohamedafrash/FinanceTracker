document.addEventListener('DOMContentLoaded', function() {
    const budgetInput = document.getElementById('budget-input');
    const setBudgetButton = document.getElementById('set-budget');
    const budgetDisplay = document.getElementById('budget-display');
    const descriptionInput = document.getElementById('description-input');
    const amountInput = document.getElementById('amount-input');
    const typeInput = document.getElementById('type-input');
    const addTransactionButton = document.getElementById('add-transaction');
    const transactionsList = document.getElementById('transactions');
    const incomeDisplay = document.getElementById('income-display');
    const expenseDisplay = document.getElementById('expense-display');
    const balanceDisplay = document.getElementById('balance-display');
    const exportCsvButton = document.getElementById('export-csv');

    let budget = 0;
    let totalIncome = 0;
    let totalExpense = 0;
    let transactions = [];

    setBudgetButton.addEventListener('click', function() {
        budget = parseFloat(budgetInput.value);
        budgetDisplay.textContent = `Budget: $${budget}`;
        updateBalance();
    });

    addTransactionButton.addEventListener('click', function() {
        const description = descriptionInput.value;
        const amount = parseFloat(amountInput.value);
        const type = typeInput.value;

        if (description && amount) {
            const transaction = {
                description,
                amount,
                type
            };

            transactions.push(transaction);
            displayTransaction(transaction);
            updateSummary();

            descriptionInput.value = '';
            amountInput.value = '';
        }
    });

    function displayTransaction(transaction) {
        const li = document.createElement('li');
        li.textContent = `${transaction.description}: $${transaction.amount}`;
        li.classList.add(transaction.type);
        transactionsList.appendChild(li);
    }

    function updateSummary() {
        totalIncome = transactions.filter(t => t.type === 'income')
                                  .reduce((acc, t) => acc + t.amount, 0);
        totalExpense = transactions.filter(t => t.type === 'expense')
                                   .reduce((acc, t) => acc + t.amount, 0);
        
        incomeDisplay.textContent = `Total Income: $${totalIncome}`;
        expenseDisplay.textContent = `Total Expense: $${totalExpense}`;
        updateBalance();
    }

    function updateBalance() {
        const balance = totalIncome - totalExpense;
        balanceDisplay.textContent = `Balance: $${balance}`;
    }

    exportCsvButton.addEventListener('click', function() {
        const csvContent = "data:text/csv;charset=utf-8,"
            + transactions.map(t => `${t.description},${t.amount},${t.type}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'transactions.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
