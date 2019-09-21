import { IExpense } from '../@types/state-interfaces';

export default (expenses: IExpense[], text: string) => {
  return expenses.filter((expense: IExpense) => {
    const textMatch = expense.description
      .toLowerCase()
      .includes(text.toLowerCase());
    const amountMatch = expense.amount.toString().includes(text.toLowerCase());
    const createdAtMatch = expense.createdAt
      .toLowerCase()
      .includes(text.toLowerCase());
    const noteMatch = expense.note.toLowerCase().includes(text.toLowerCase());
    return textMatch || amountMatch || createdAtMatch || noteMatch;
  });
};
