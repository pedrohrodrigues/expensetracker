export interface addIncomeDto {
  title: string;
  category: string;
  amount: number;
  description: string;
  date: Date;
}

export interface getIncomeDto {
  _id: string;
  title: string;
  category: string;
  amount: number;
  description: string;
  date: Date;
}

export interface getExpenseDto {
  _id: string;
  title: string;
  category: string;
  amount: number;
  description: string;
  date: Date;
}
