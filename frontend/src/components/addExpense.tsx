import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { addIncomeOrExpenseDto } from '../types/dtoTypes';
import 'react-datepicker/dist/react-datepicker.css';
import { addExpense } from '../apiRequests/expenseRequests';

interface AddExpensesAppDashboardProps {
  refreshList: () => void;
}

export interface onSubmitMessageProps {
  message: string;
  color: string;
}

export const AddExpensesAppDashboard: React.FC<
  AddExpensesAppDashboardProps
> = ({ refreshList }) => {
  const defaultExpenseValues: addIncomeOrExpenseDto = {
    title: '',
    category: '',
    amount: 0,
    description: '',
    date: new Date(),
  };

  const [inputExpenseState, setInputExpenseState] =
    useState<addIncomeOrExpenseDto>(defaultExpenseValues);
  const [onSubmitMessage, setOnSubmitMessage] = useState<onSubmitMessageProps>({
    message: '',
    color: '',
  });

  const { title, category, amount, description, date } = inputExpenseState;
  const handleInput =
    (name: keyof addIncomeOrExpenseDto) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setInputExpenseState({ ...inputExpenseState, [name]: e.target.value });
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !amount || !description || !date || !category) {
      setOnSubmitMessage({
        message: 'Please fill all required fields',
        color: 'red',
      });
      return;
    }
    const result = await addExpense(inputExpenseState);
    if (result === 200) {
      setOnSubmitMessage({
        message: 'Expense added successfully',
        color: 'green',
      });
    } else {
      setOnSubmitMessage({
        message: 'Error trying to add expense please try again',
        color: 'red',
      });
    }
    refreshList();
    return;
  };

  const handleDateChange = (date: Date | null) => {
    if (date === null) {
      setInputExpenseState({ ...inputExpenseState, date: new Date() });
    } else {
      setInputExpenseState({ ...inputExpenseState, date: date });
    }
  };
  const CustomDateInput = React.forwardRef<HTMLInputElement>((props, ref) => (
    <input data-testid="date-input" {...props} ref={ref} />
  ));

  CustomDateInput.displayName = 'date';

  return (
    <div className="w-3/4 h-full box-border p-4 rounded-lg border-2">
      <h3 className="text-1xl font-bold pb-2">Add Expense</h3>
      <div>
        <form onSubmit={handleSubmit} data-testid="add-expense-form">
          <div className="pb-2">
            <input
              data-testId={'title'}
              type="text"
              value={title}
              name={'title'}
              title="Expense Title"
              placeholder="Expense Title"
              onChange={handleInput('title')}
              className="w-full"
            />
          </div>
          <div className="pb-2">
            <select
              data-testId={'category'}
              value={category}
              name="category"
              title="Category"
              className="w-full"
              onChange={handleInput('category')}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="rent">Rent</option>
              <option value="grocery">Grocery</option>
              <option value="games">Games</option>
              <option value="gift">Gift</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="pb-2">
            <input
              data-testId={'amount'}
              type="number"
              value={amount}
              title="Number"
              name={'amount'}
              placeholder="Amount"
              onChange={handleInput('amount')}
              className="w-full"
            />
          </div>
          <div className="pb-2">
            <textarea
              data-testId={'description'}
              value={description}
              name={'description'}
              title="Description"
              placeholder="Description"
              onChange={handleInput('description')}
              className="w-full"
            ></textarea>
          </div>
          <div className="pb-2">
            <DatePicker
              aria-label="date-input"
              name={'date'}
              customInput={<CustomDateInput />}
              id="date"
              title="Date"
              placeholderText="Enter a date"
              selected={date}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => handleDateChange(date)}
              className="w-full"
            />
          </div>
          <div>
            <button
              type="submit"
              data-testId={'submit'}
              className="bg-green-400 rounded p-2"
            >
              Add Expense
            </button>
          </div>
          {onSubmitMessage.message.length > 0 && (
            <p
              data-testId={'submit-message'}
              style={{ color: onSubmitMessage.color }}
            >
              {onSubmitMessage.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
