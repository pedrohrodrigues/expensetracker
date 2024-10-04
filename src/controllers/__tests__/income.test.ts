import { Request, Response } from 'express';
import { addIncome, addIncomeDto, deleteIncome, getIncome } from '../income';
import IncomeSchema from '../../models/incomeModel';

jest.mock('../../models/incomeModel');

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

describe('getIncome', () => {
  const jsonMock = jest.fn();
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      json: jsonMock,
      status: jest.fn().mockReturnThis(),
    } as Partial<Response>;
  });

  afterEach(() => {
    jsonMock.mockClear();
    jest.resetAllMocks();
  });

  it('should return all income', async () => {
    // Mocking the chainable query
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

    (IncomeSchema.find as jest.Mock).mockReturnValue(mockQuery);

    await getIncome({} as Request, mockResponse as Response);

    expect(IncomeSchema.find).toHaveBeenCalled();
    expect(mockQuery.sort).toHaveBeenCalledWith({ createAt: -1 });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it('should return 500 if there is an internal server error', async () => {
    await getIncome({} as Request, mockResponse as Response);
    expect(IncomeSchema.find).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});

describe('deleteIncome', () => {
  const mockID = 'testID';
  let mockResponse: Partial<Response>;
  const deleteMockRequest = {
    params: {
      id: mockID,
    },
  } as Partial<Request>;

  beforeEach(() => {
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as Partial<Response>;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should delete a income and return 200', async () => {
    (IncomeSchema.findByIdAndDelete as jest.Mock).mockResolvedValueOnce({});
    await deleteIncome(deleteMockRequest as Request, mockResponse as Response);
    expect(IncomeSchema.findByIdAndDelete).toHaveBeenCalledWith(mockID);
    expect(IncomeSchema.findByIdAndDelete).toHaveBeenCalledWith('testID');
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
});
