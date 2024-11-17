import { Request } from 'express';
import { createRequest, createResponse } from 'node-mocks-http';
import { addIncome, addIncomeDto, deleteIncome, getIncome } from '../income';
import IncomeSchema from '../../models/incomeModel';

jest.mock('../../models/incomeModel');

describe('addIncome', () => {
  type AddIncomeRequest = Request & { body: addIncomeDto; params: addIncomeDto };

  const mockRequest = createRequest<AddIncomeRequest>({ method: 'POST' });
  let createSchemaMock: jest.Mock;
  beforeEach(() => {
    createSchemaMock = jest.fn();
    IncomeSchema.create = createSchemaMock;
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
    createSchemaMock.mockResolvedValue({
      save: jest.fn(),
    });
    const mockResponse = createResponse();
    await addIncome(mockRequest, mockResponse);

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
    createSchemaMock.mockRejectedValue(new Error('Error'));
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
  let mockRequest: Request;
  let findSchemaMock: jest.Mock;
  beforeEach(() => {
    findSchemaMock = jest.fn();
    IncomeSchema.find = findSchemaMock;
    mockRequest = createRequest({ method: 'POST' });
  });

  it('should return all incomes', async () => {
    const receivedIncomes = [
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
    ];
    const mockQuery = {
      sort: jest.fn().mockResolvedValue(receivedIncomes),
    };

    findSchemaMock.mockReturnValue(mockQuery);
    const mockResponse = createResponse();

    await getIncome(mockRequest, mockResponse);

    expect(IncomeSchema.find).toHaveBeenCalled();
    expect(mockQuery.sort).toHaveBeenCalledWith({ createAt: -1 });
    expect(mockResponse.json().statusCode).toEqual(200);
    expect(mockResponse._getJSONData()).toEqual(receivedIncomes);
  });

  it('should return 500 if there is an internal server error', async () => {
    const mockResponse = createResponse();
    await getIncome(mockRequest, mockResponse);
    expect(IncomeSchema.find).toHaveBeenCalled();
    expect(mockResponse.json().statusCode).toEqual(500);
  });
});

describe('deleteIncome', () => {
  const mockID = 'testID';
  let deleteMockRequest: Request;
  let findByIdAndDeleteMock: jest.Mock;

  beforeEach(() => {
    findByIdAndDeleteMock = jest.fn();
    IncomeSchema.findByIdAndDelete = findByIdAndDeleteMock;
    deleteMockRequest = createRequest({ method: 'DELETE', params: { id: mockID } });
  });
  it('should delete a income and return 200', async () => {
    findByIdAndDeleteMock.mockResolvedValueOnce({});
    const mockResponse = createResponse();
    await deleteIncome(deleteMockRequest, mockResponse);
    expect(IncomeSchema.findByIdAndDelete).toHaveBeenCalledWith(mockID);
    expect(IncomeSchema.findByIdAndDelete).toHaveBeenCalledWith(mockID);
    expect(mockResponse.json().statusCode).toEqual(200);
  });
  it('if an error happens should return 500', async () => {
    findByIdAndDeleteMock.mockRejectedValueOnce({});
    const mockResponse = createResponse();
    await deleteIncome(deleteMockRequest, mockResponse);
    expect(IncomeSchema.findByIdAndDelete).toHaveBeenCalledWith(mockID);
    expect(mockResponse.json().statusCode).toEqual(500);
    expect(mockResponse.json()._getJSONData()).toEqual({ message: 'Server Error' });
  });
});
