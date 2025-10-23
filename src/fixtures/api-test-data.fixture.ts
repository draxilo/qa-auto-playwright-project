import { APIResponse, expect } from '@playwright/test';
import { Board } from '@/interfaces/board.interface';
import { test as base } from '@playwright/test';
import { List } from '@/interfaces/list.interface';

interface ApiTestDataFixture {
  apiCreateBoard(board: Board): Promise<APIResponse>;
  apiDeleteBoard(board: Board): Promise<APIResponse>;
  apiDeleteListOfBoards(boardIds: number[]): Promise<Array<APIResponse>>;
  apiDeleteAllBoards(): Promise<APIResponse>;
  apiCreateList(board: Board): Promise<Array<APIResponse>>;
  apiDeleteList(list: List): Promise<APIResponse>;
}

export const test = base.extend<ApiTestDataFixture>({
  apiCreateBoard: async ({ baseURL, request }, use) => {
    await use(async (board: Board) => {
      const response = await request.post(baseURL + '/api/boards', {
        data: {
          name: board.name,
        },
      });

      expect(response.status()).toBe(201);
      return response;
    });
  },
  apiCreateList: async ({ baseURL, request }, use) => {
    await use(async (board: Board) => {
      const responses: Array<APIResponse> = [];
      for (const list of board.lists) {
        const response = await request.post(`${baseURL}/api/lists`, {
          data: {
            name: list.name,
            boardId: board.id,
          },
        });

        expect(response.status()).toBe(201);
        responses.push(response);
      }
      return responses;
    });
  },
  apiDeleteBoard: async ({ baseURL, request }, use) => {
    await use(async (board: Board) => {
      const response = await request.delete(`${baseURL}/api/boards/${board.id}`);
      expect(response.status()).toBe(200);
      return response;
    });
  },
  apiDeleteListOfBoards: async ({ baseURL, request }, use) => {
    await use(async (boardIds: number[] | Board[]) => {
      const responses: Array<APIResponse> = [];
      for (const id of boardIds) {
        const response = await request.delete(`${baseURL}/api/boards/${id}`);
        expect(response.status()).toBe(200);
        responses.push(response);
      }
      return responses;
    });
  },
  apiDeleteAllBoards: async ({ baseURL, request }, use) => {
    await use(async () => {
      const response = await request.delete(`${baseURL}/api/boards`);
      expect(response.status()).toBe(204);
      return response;
    });
  },
  apiDeleteList: async ({ baseURL, request }, use) => {
    await use(async (list: List) => {
      const response = await request.delete(`${baseURL}/api/lists/${list.id}`);
      expect(response.status()).toBe(200);
      return response;
    });
  },
});
