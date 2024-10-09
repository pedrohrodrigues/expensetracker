import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { addIncomeDto } from '../types/dtoTypes';

export const IncomesAppDashboard = () => {
  const defaultIncomeValues: addIncomeDto = {
    title: '',
    category: '',
    amount: 0,
    description: '',
    date: new Date(),
  };
  const [inputIncomeState, setInputIncomeState] =
    useState<addIncomeDto>(defaultIncomeValues);

  const { title, category, amount, description, date } = inputIncomeState;
  const handleInput =
    (name: keyof addIncomeDto) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInputIncomeState({ ...inputIncomeState, [name]: e.target.value });
    };

  const handleDateChange = (date: Date | null) => {
    if (date === null) {
      setInputIncomeState({ ...inputIncomeState, date: new Date() });
    } else {
      setInputIncomeState({ ...inputIncomeState, date: date });
    }
  };
  return (
    <div className="w-3/4 bg-white h-full box-border p-4 rounded-lg border-2">
      <h2>Incomes</h2>
      <div>
        <form>
          <div>
            <input
              type="text"
              value={title}
              name={'title'}
              placeholder="Income Title"
              onChange={handleInput('title')}
            />
          </div>
          <div>
            <select value={category} name="category">
              <option value="" disabled>
                Select Category
              </option>
              <option value="salary">Salary</option>
              <option value="freelancing">Freelancing</option>
              <option value="investiments">Investiments</option>
              <option value="gift">Gift</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              value={category}
              name={'category'}
              placeholder="Category"
              onChange={handleInput('category')}
            />
          </div>
          <div>
            <input
              type="number"
              value={amount}
              name={'amount'}
              placeholder="Amount"
              onChange={handleInput('amount')}
            />
          </div>
          <div>
            <textarea
              value={description}
              name={'description'}
              placeholder="Description"
              onChange={handleInput('description')}
            ></textarea>
          </div>
          <div>
            <DatePicker
              id="date"
              placeholderText="Enter a date"
              selected={date}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => handleDateChange(date)}
            />
          </div>
          <div>
            <button type="submit">Add Income</button>
          </div>
        </form>
      </div>
    </div>
  );
};
