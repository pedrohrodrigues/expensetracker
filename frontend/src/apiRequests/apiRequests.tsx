import { addIncomeDto } from '../types/dtoTypes';
const axios = require('axios');
const BASE_URL = 'http://localhost:5000/api/';

const addIncome = async (income: addIncomeDto) => {
  const response = await axios
    .post(`${BASE_URL}add-income`, income)
    .catch((err: any) => {
      console.log(err.response.data.message);
    });
};

const getIncome = async () => {
  const response = await axios
    .get(`${BASE_URL}add-income`)
    .catch((err: any) => {
      console.log(err.response.data.message);
    });
};
