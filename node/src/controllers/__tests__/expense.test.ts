import { Request, Response } from 'express';
import { addExpense, addExpenseDto, deleteExpense, getExpense } from '../expense';
import ExpenseSchema from '../../models/expenseModel';

jest.mock('../../models/expenseModel');

describe('addExpense', () => {
  let mockRequest: Request;
  let mockResponse: Partial<Response>;
  const jsonMock = jest.fn();
  const statusMock = jest.fn().mockReturnThis();

  beforeEach(() => {
    mockRequest = {
      body: {
        title: 'Rent',
        amount: 5000,
        description: 'Monthly Rent',
        date: new Date(),
        category: 'House',
      },
    } as Request;

    mockResponse = {
      json: jsonMock,
      status: statusMock,
    } as Partial<Response>;

    jsonMock.mockClear();
    statusMock.mockClear();
  });

  it('should return 400 if any required field is missing', async () => {
    mockRequest.body.title = '';

    await addExpense(mockRequest as unknown as Request<addExpenseDto>, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: 'Please provide all required fields',
    });
  });

  it('should save expense and return 200 when all fields are valid', async () => {
    (ExpenseSchema.create as jest.Mock).mockResolvedValue({
      save: jest.fn(),
    });

    await addExpense(mockRequest as unknown as Request<addExpenseDto>, mockResponse as Response);

    expect(ExpenseSchema.create).toHaveBeenCalledWith({
      title: 'Rent',
      category: 'House',
      description: 'Monthly Rent',
      amount: 5000,
      date: mockRequest.body.date,
    });

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      success: true,
      message: 'Expense has been added successfully',
    });
  });

  it('should return 500 if there is an internal server error', async () => {
    (ExpenseSchema.create as jest.Mock).mockRejectedValue(new Error('Error'));

    await addExpense(mockRequest as unknown as Request<addExpenseDto>, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: 'Internal server error',
    });
  });
});

describe('getExpense', () => {
  const jsonMock = jest.fn();
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      json: jsonMock,
      status: jest.fn().mockReturnThis(),
    } as Partial<Response>;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return all expenses', async () => {
    const mockQuery = {
      sort: jest.fn().mockResolvedValue([
        {
          _id: '66fdb7f2e60d41e17ea339ce',
          title: 'test',
          amount: 2,
          type: 'income',
          date: '2022-10-10T03:00:00.000Z',
          category: 'income',
          description: 'test',
          createdAt: '2024-10-02T21:15:30.922Z',
          updatedAt: '2024-10-02T21:15:30.922Z',
          __v: 0,
        },
      ]),
    };

    (ExpenseSchema.find as jest.Mock).mockReturnValue(mockQuery);

    await getExpense({} as Request, mockResponse as Response);

    expect(ExpenseSchema.find).toHaveBeenCalled();
    expect(mockQuery.sort).toHaveBeenCalledWith({ createAt: -1 });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it('should return 500 if there is an internal server error', async () => {
    await getExpense({} as Request, mockResponse as Response);
    expect(ExpenseSchema.find).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});

describe('deleteExpense', () => {
  const mockID = 'testID';
  const jsonDeleteMock = jest.fn();

  let mockResponse: Partial<Response>;
  const deleteMockRequest = {
    params: {
      id: mockID,
    },
  } as Partial<Request>;

  beforeEach(() => {
    mockResponse = {
      json: jsonDeleteMock,
      status: jest.fn().mockReturnThis(),
    } as Partial<Response>;
  });

  afterEach(() => {
    jsonDeleteMock.mockClear();
    jest.resetAllMocks();
  });

  it('should delete a income and return 200', async () => {
    (ExpenseSchema.findByIdAndDelete as jest.Mock).mockResolvedValueOnce({});
    await deleteExpense(deleteMockRequest as Request, mockResponse as Response);
    expect(ExpenseSchema.findByIdAndDelete).toHaveBeenCalledWith(mockID);
    expect(ExpenseSchema.findByIdAndDelete).toHaveBeenCalledWith(mockID);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
  it('if and error happens should return 500', async () => {
    (ExpenseSchema.findByIdAndDelete as jest.Mock).mockRejectedValueOnce({});
    await deleteExpense(deleteMockRequest as Request, mockResponse as Response);
    expect(ExpenseSchema.findByIdAndDelete).toHaveBeenCalledWith(mockID);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Server Error' });
  });
  it('if a wrong id is provided should return 404', async () => {
    (ExpenseSchema.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);
    await deleteExpense(deleteMockRequest as Request, mockResponse as Response);
    expect(ExpenseSchema.findByIdAndDelete).toHaveBeenCalledWith(mockID);
    expect(mockResponse.status).toHaveBeenCalledTimes(2);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledTimes(2);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Expense not found' });
  });
});
