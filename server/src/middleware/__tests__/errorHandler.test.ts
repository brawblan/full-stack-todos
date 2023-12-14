import { createRequest, createResponse } from 'node-mocks-http';
import errorHandler from '../errorHandler';

describe('errorHandler', () => {
  it('returns error message', () => {
    // given
    const error = new Error('Error');
    const request = createRequest({});
    const response = createResponse();
    const next = jest.fn();

    // when
    errorHandler(error, request, response, next);

    // then
    expect(response.statusCode).toBe(500);
  });
});
