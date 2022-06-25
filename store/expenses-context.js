import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "New shoes",
        amount: 59.99,
        date: new Date("2022-4-19"),
    },
    {
        id: "e2",
        description: "Clothes",
        amount: 89.49,
        date: new Date("2022-5-29"),
    },
    {
        id: "e3",
        description: "Mieso dla Pynia",
        amount: 100000,
        date: new Date("2021-12-25"),
    },
    {
        id: "e4",
        description: "Book",
        amount: 14.99,
        date: new Date("2022-2-19"),
    },
    {
        id: "e5",
        description: "Another book",
        amount: 18.59,
        date: new Date("2022-2-20"),
    },
    {
        id: "e6",
        description: "New kicks",
        amount: 59.99,
        date: new Date("2022-4-19"),
    },
    {
        id: "e7",
        description: "Fresh threads",
        amount: 89.49,
        date: new Date("2022-5-29"),
    },
    {
        id: "e8",
        description: "Mieso dla Pynia",
        amount: 100000,
        date: new Date("2021-12-25"),
    },
    {
        id: "e9",
        description: "Book",
        amount: 14.99,
        date: new Date("2022-2-19"),
    },
    {
        id: "e10",
        description: "Another book",
        amount: 18.59,
        date: new Date("2022-2-20"),
    },
    {
        id: "e11",
        description: "Cake",
        amount: 100,
        date: new Date("2022-6-20"),
    },
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
    switch (action.type) {
        case "ADD":
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];
        case "UPDATE":
            const updateableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updateableExpense = state[updateableExpenseIndex];
            const updatedItem = { ...updateableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updateableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(
        expensesReducer,
        DUMMY_EXPENSES
    );

    function addExpense(expenseData) {
        dispatch({ type: "ADD", payload: expenseData });
    }

    function deleteExpense(id) {
        dispatch({ type: "DELETE", payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    );
}

export default ExpensesContextProvider;
