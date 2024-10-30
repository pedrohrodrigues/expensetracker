import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { addIncomeDto } from '../types/dtoTypes';
import 'react-datepicker/dist/react-datepicker.css';
import { addIncome } from '../apiRequests/apiRequests';

interface AddIncomesAppDashboardProps {
  refreshList: () => void;
}

interface onSubmitMessageProps {
  message: string;
  color: string;
}

export const AddIncomesAppDashboard: React.FC<AddIncomesAppDashboardProps> = ({
  refreshList,
}) => {
  const defaultIncomeValues: addIncomeDto = {
    title: '',
    category: '',
    amount: 0,
    description: '',
    date: new Date(),
  };

  const [inputIncomeState, setInputIncomeState] =
    useState<addIncomeDto>(defaultIncomeValues);
  const [onSubmitMessage, setOnSubmitMessage] = useState<onSubmitMessageProps>({
    message: '',
    color: '',
  });

  const { title, category, amount, description, date } = inputIncomeState;
  const handleInput =
    (name: keyof addIncomeDto) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setInputIncomeState({ ...inputIncomeState, [name]: e.target.value });
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await addIncome(inputIncomeState);
    console.log({ result });
    if (result === 200) {
      setOnSubmitMessage({
        message: 'Income added successfully',
        color: 'green',
      });
    } else {
      setOnSubmitMessage({
        message: 'Error trying to add income please try again',
        color: 'red',
      });
    }
    refreshList();
    return;
  };

  const handleDateChange = (date: Date | null) => {
    if (date === null) {
      setInputIncomeState({ ...inputIncomeState, date: new Date() });
    } else {
      setInputIncomeState({ ...inputIncomeState, date: date });
    }
  };
  return (
    <div className="w-3/4 h-full box-border p-4 rounded-lg border-2">
      <h3 className="text-1xl font-bold pb-2">Add Income</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="pb-2">
            <input
              type="text"
              value={title}
              name={'title'}
              placeholder="Income Title"
              onChange={handleInput('title')}
              className="w-full"
            />
          </div>
          <div className="pb-2">
            <select
              value={category}
              name="category"
              className="w-full"
              onChange={handleInput('category')}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="salary">Salary</option>
              <option value="freelancing">Freelancing</option>
              <option value="investiments">Investiments</option>
              <option value="gift">Gift</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="pb-2">
            <input
              type="number"
              value={amount}
              name={'amount'}
              placeholder="Amount"
              onChange={handleInput('amount')}
              className="w-full"
            />
          </div>
          <div className="pb-2">
            <textarea
              value={description}
              name={'description'}
              placeholder="Description"
              onChange={handleInput('description')}
              className="w-full"
            ></textarea>
          </div>
          <div className="pb-2">
            <DatePicker
              id="date"
              placeholderText="Enter a date"
              selected={date}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => handleDateChange(date)}
              className="w-full"
            />
          </div>
          <div>
            <button type="submit" className="bg-green-400 rounded p-2">
              Add Income
            </button>
          </div>
          {onSubmitMessage.message.length > 0 && (
            <p style={{ color: onSubmitMessage.color }}>
              {onSubmitMessage.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
