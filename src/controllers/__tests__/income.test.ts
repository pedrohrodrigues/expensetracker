import { Request, Response } from 'express';
import { addIncome, addIncomeDto } from '../income';
import IncomeSchema from '../../models/incomeModel';

jest.mock('../../models/incomeModel'); // Mocking the mongoose model

describe('addIncome', () => {
  let mockRequest: Request;
  let mockResponse: Partial<Response>;
  const jsonMock = jest.fn();
  const statusMock = jest.fn().mockReturnThis();

  beforeEach(() => {
    mockRequest = {
      body: {
        title: 'Salary',
        amount: 5000,
        description: 'Monthly salary',
        date: new Date(),
        category: 'Job',
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

    await addIncome(mockRequest as unknown as Request<addIncomeDto>, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: 'Please provide all required fields',
    });
  });

  it('should save income and return 200 when all fields are valid', async () => {
    (IncomeSchema.create as jest.Mock).mockResolvedValue({
      save: jest.fn(),
    });

    await addIncome(mockRequest as unknown as Request<addIncomeDto>, mockResponse as Response);

    expect(IncomeSchema.create).toHaveBeenCalledWith({
      title: 'Salary',
      category: 'Job',
      description: 'Monthly salary',
      amount: 5000,
      date: mockRequest.body.date,
    });

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      success: true,
      message: 'Income has been added successfully',
    });
  });

  it('should return 500 if there is an internal server error', async () => {
    (IncomeSchema.create as jest.Mock).mockRejectedValue(new Error('Error'));

    await addIncome(mockRequest as unknown as Request<addIncomeDto>, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: 'Internal server error',
    });
  });
});
