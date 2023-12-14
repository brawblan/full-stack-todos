import { createRequest, createResponse } from 'node-mocks-http';
import { supabase } from '../../services/supabase';
import {
  getAllTodos,
  getTodoById,
  updateTodo,
  createTodo,
  deleteTodo,
} from '../todos-controller';

const successData = [
  {
    id: 1,
    title: 'Todo 1',
    completed: false,
  },
  {
    id: 2,
    title: 'Todo 2',
    completed: false,
  },
];

describe('TodosController', () => {
  describe('getAllTodos', () => {
    describe('on success', () => {
      it('gets all todos', async () => {
        // given
        const request = createRequest({});
        const response = createResponse();

        // when
        supabase.from = jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            data: successData,
          }),
        });
        await getAllTodos(request, response);

        // then
        expect(response.statusCode).toBe(200);
        expect(response._getData()).toEqual(successData);
      });
    });

    describe('on error', () => {
      it('returns error message', async () => {
        // given
        const request = createRequest({});
        const response = createResponse();

        // when
        supabase.from = jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            error: {
              message: 'Error',
            },
          }),
        });
        await getAllTodos(request, response);

        // then
        expect(response.statusCode).toBe(400);
        expect(response._getData()).toEqual({
          message: 'Error',
        });
      });
    });
  });

  describe('getTodoById', () => {
    describe('on success', () => {
      it('returns data', async () => {
        // given
        const request = createRequest({
          params: {
            id: 1,
          },
        });
        const response = createResponse();

        // when
        supabase.from = jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              success: true,
              data: successData,
            }),
          }),
        });
        await getTodoById(request, response);

        // then
        expect(response.statusCode).toBe(200);
        expect(response._getData()).toEqual({
          success: true,
          data: successData,
        });
      });
    });

    describe('on error', () => {
      it('no id', async () => {
        // given
        const request = createRequest({});
        const response = createResponse();

        // when
        await getTodoById(request, response);

        // then
        expect(response.statusCode).toBe(400);
        expect(response._getData()).toEqual({
          error: {
            message: 'id is required',
          },
        });
      });

      it('todo not found', async () => {
        // given
        const request = createRequest({
          params: {
            id: 1,
          },
        });
        const response = createResponse();

        // when
        supabase.from = jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              error: {
                message: 'Todo not found',
              },
            }),
          }),
        });
        await getTodoById(request, response);

        // then
        expect(response.statusCode).toBe(404);
        expect(response._getData()).toEqual({
          error: {
            message: 'Todo not found',
          },
        });
      });
    });
  });

  describe('updateTodo', () => {
    describe('on success', () => {
      it('returns success boolean', async () => {
        // given
        const request = createRequest({
          body: {
            id: 1,
          },
        });
        const response = createResponse();

        // when
        supabase.from = jest.fn().mockReturnValue({
          update: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              success: true,
            }),
          }),
        });
        await updateTodo(request, response);

        // then
        expect(response.statusCode).toBe(200);
        expect(response._getData()).toEqual({
          success: true,
        });
      });
    });

    describe('on error', () => {
      it('no id', async () => {
        // given
        const request = createRequest({});
        const response = createResponse();

        // when
        await updateTodo(request, response);

        // then
        expect(response.statusCode).toBe(400);
        expect(response._getData()).toEqual({
          error: {
            message: 'id is required',
          },
        });
      });

      it('todo not found', async () => {
        // given
        const request = createRequest({
          body: {
            id: 1,
          },
        });
        const response = createResponse();

        // when
        supabase.from = jest.fn().mockReturnValue({
          update: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              error: {
                message: 'Todo not found',
              },
            }),
          }),
        });
        await updateTodo(request, response);

        // then
        expect(response.statusCode).toBe(404);
        expect(response._getData()).toEqual({
          error: {
            message: 'Todo not found',
          },
        });
      });
    });
  });

  describe('createTodo', () => {
    describe('on success', () => {
      it('returns success boolean', async () => {
        // given
        const request = createRequest({
          body: {
            title: 'title',
          },
        });
        const response = createResponse();

        // when
        supabase.from = jest.fn().mockReturnValue({
          insert: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              success: true,
            }),
          }),
        });
        await createTodo(request, response);

        // then
        expect(response.statusCode).toBe(201);
        expect(response._getData()).toEqual({
          success: true,
        });
      });
    });

    describe('on error', () => {
      it('no id', async () => {
        // given
        const request = createRequest({});
        const response = createResponse();

        // when
        supabase.from = jest.fn().mockReturnValue({
          insert: jest.fn().mockReturnValue({
            error: {
              message: 'unable to create todo',
            },
          }),
        });
        await createTodo(request, response);

        // then
        expect(response.statusCode).toBe(400);
        expect(response._getData()).toEqual({
          message: 'unable to create todo',
        });
      });
    });
  });

  describe('deleteTodo', () => {
    describe('on success', () => {
      it('returns success boolean', async () => {
        // given
        const request = createRequest({
          params: {
            id: 1,
          },
        });
        const response = createResponse();

        // when
        supabase.from = jest.fn().mockReturnValue({
          delete: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              success: true,
            }),
          }),
        });
        await deleteTodo(request, response);

        // then
        expect(response.statusCode).toBe(200);
        expect(response._getData()).toEqual({
          success: true,
        });
      });
    });

    describe('on error', () => {
      it('returns error message when no id', async () => {
        // given
        const request = createRequest({});
        const response = createResponse();

        // when
        supabase.from = jest.fn().mockReturnValue({
          delete: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              error: {
                message: 'id is required',
              },
            }),
          }),
        });
        await deleteTodo(request, response);

        // then
        expect(response.statusCode).toBe(400);
        expect(response._getData()).toEqual({
          error: {
            message: 'id is required',
          },
        });
      });

      it('returns error message when todo not found', async () => {
        // given
        const request = createRequest({
          params: {
            id: 1,
          },
        });
        const response = createResponse();

        // when
        supabase.from = jest.fn().mockReturnValue({
          delete: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              error: {
                message: 'Todo not found',
              },
            }),
          }),
        });
        await deleteTodo(request, response);

        // then
        expect(response.statusCode).toBe(404);
        expect(response._getData()).toEqual({
          error: {
            message: 'Todo not found',
          },
        });
      });
    });
  });
});
