import { useContext } from "react";
import { ExpenseTrackerContext } from "./context/context";
import { incomeCategories, expenseCategories, resetCategories } from "./constants/constants";

const useTransactions = (title) => {
    resetCategories()
    const {transactions} = useContext(ExpenseTrackerContext)
    const transactionsPerType = transactions.filter((trans)=> trans.type === title)
    const total = transactionsPerType.reduce((acc,currVal)=> acc += currVal.amount, 0)
    const categories = title === "Income" ? incomeCategories : expenseCategories ;

    transactionsPerType.forEach((trans) => {
        const category = categories.find((c)=> c.type === trans.category)
        
        if (category) category.amount += trans.amount;
    });

    const filteredCategories = categories.filter((c)=> c.amount>0)

    const chartData = {
        datasets: [{
            data: filteredCategories.map((c)=> c.amount),
            backgroundColor: filteredCategories.map((c)=> c.color)
        }],
        labels: filteredCategories.map((c)=> c.type)
    }

    return {total,chartData}

}

export default useTransactions;