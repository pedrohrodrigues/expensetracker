import { Request, Response } from 'express';
import { createRequest, createResponse } from 'node-mocks-http';
import { addIncome, addIncomeDto, deleteIncome, getIncome } from '../income';
import IncomeSchema from '../../models/incomeModel';

jest.mock('../../models/incomeModel');

describe('addIncome', () => {
  type AddIncomeRequest = Request & { body: addIncomeDto; params: addIncomeDto };

  const mockRequest = createRequest<AddIncomeRequest>({ method: 'POST' });
  beforeEach(() => {
    mockRequest.body = {
      title: 'Salary',
      amount: 5000,
      description: 'Monthly salary',
      date: new Date(),
      category: 'Job',
    };
  });

  it('should return 400 if any required field is missing', async () => {
    mockRequest.body.title = '';
    const mockResponse = createResponse();

    await addIncome(mockRequest, mockResponse);
    expect(mockResponse.json().statusCode).toEqual(400);
    expect(mockResponse._getJSONData()).toEqual({
      success: false,
      message: 'Please provide all required fields',
    });
  });

  it('should save income and return 200 if all fields are valid', async () => {
    (IncomeSchema.create as jest.Mock).mockResolvedValue({
      save: jest.fn(),
    });
    const mockResponse = createResponse();

    await addIncome(mockRequest as unknown as Request<addIncomeDto>, mockResponse);

    expect(IncomeSchema.create).toHaveBeenCalledWith({
      title: 'Salary',
      category: 'Job',
      description: 'Monthly salary',
      amount: 5000,
      date: mockRequest.body.date,
    });

    expect(mockResponse.json().statusCode).toEqual(200);
    expect(mockResponse._getJSONData()).toEqual({
      success: true,
      message: 'Income has been added successfully',
    });
  });

  it('should return 500 if there is an internal server error', async () => {
    (IncomeSchema.create as jest.Mock).mockRejectedValue(new Error('Error'));
    const mockResponse = createResponse();

    await addIncome(mockRequest, mockResponse);

    expect(mockResponse.json().statusCode).toEqual(500);
    expect(mockResponse._getJSONData()).toEqual({
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
    jest.resetAllMocks();
  });

  it('should return all incomes', async () => {
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
    (IncomeSchema.findByIdAndDelete as jest.Mock).mockResolvedValueOnce({});
    await deleteIncome(deleteMockRequest as Request, mockResponse as Response);
    expect(IncomeSchema.findByIdAndDelete).toHaveBeenCalledWith(mockID);
    expect(IncomeSchema.findByIdAndDelete).toHaveBeenCalledWith(mockID);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
  it('if and error happens should return 500', async () => {
    (IncomeSchema.findByIdAndDelete as jest.Mock).mockRejectedValueOnce({});
    await deleteIncome(deleteMockRequest as Request, mockResponse as Response);
    expect(IncomeSchema.findByIdAndDelete).toHaveBeenCalledWith(mockID);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Server Error' });
  });
  it('if a wrong id is provided should return 404', async () => {
    (IncomeSchema.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);
    await deleteIncome(deleteMockRequest as Request, mockResponse as Response);
    expect(IncomeSchema.findByIdAndDelete).toHaveBeenCalledWith(mockID);
    expect(mockResponse.status).toHaveBeenCalledTimes(2);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledTimes(2);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Income not found' });
  });
});
