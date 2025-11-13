import { APIResponse, expect } from '@playwright/test';
import { Board } from '@/interfaces/board.interface';
import { test as base } from '@playwright/test';
import { List } from '@/interfaces/list.interface';
import { Card } from '@interfaces/card.interface';

interface ApiTestDataFixture {
  apiGetBoard(board: Board): Promise<APIResponse>;
  apiGetAllBoards(): Promise<APIResponse>;
  apiCreateBoard(board: Board): Promise<APIResponse>;
  apiDeleteBoard(board: Board): Promise<APIResponse>;
  apiDeleteMultipleBoards(boardIds: number[]): Promise<Array<APIResponse>>;
  apiDeleteAllBoards(): Promise<APIResponse>;
  apiCreateMultipleLists(board: Board): Promise<Array<APIResponse>>;
  apiGetAllListsOfSpecificBoard(board: Board): Promise<APIResponse>;
  apiDeleteList(list: List): Promise<APIResponse>;
  apiCreateCard(board: Board): Promise<APIResponse>;
  apiDeleteCard(card: Card): Promise<APIResponse>;
}

export const test = base.extend<ApiTestDataFixture>({
  apiGetBoard: async ({ baseURL, request }, use) => {
    await use(async (board: Board, expectedStatus = 200) => {
      const response = await request.get(`${baseURL}/api/boards/${board.id}`);
      expect(response.status()).toBe(expectedStatus);
      return response;
    });
  },
  apiGetAllBoards: async ({ baseURL, request }, use) => {
    await use(async (expectedStatus = 200) => {
      const response = await request.get(`${baseURL}/api/boards`);
      expect(response.status()).toBe(expectedStatus);
      return response;
    });
  },
  apiCreateBoard: async ({ baseURL, request }, use) => {
    await use(async (board: Board, expectedStatus = 201) => {
      const response = await request.post(`${baseURL}/api/boards`, {
        data: {
          name: board.name,
        },
      });
      expect(response.status()).toBe(expectedStatus);
      return response;
    });
  },
  apiCreateMultipleLists: async ({ baseURL, request }, use) => {
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
  apiGetAllListsOfSpecificBoard: async ({ baseURL, request }, use) => {
    await use(async (board: Board) => {
      return await request.get(`${baseURL}/api/lists?boardId=${board.id}`);
    });
  },
  apiDeleteBoard: async ({ baseURL, request }, use) => {
    await use(async (board: Board) => {
      const response = await request.delete(`${baseURL}/api/boards/${board.id}`);
      expect(response.status()).toBe(200);
      return response;
    });
  },
  apiDeleteMultipleBoards: async ({ baseURL, request }, use) => {
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
  apiCreateCard: async ({ baseURL, request }, use) => {
    await use(async (board: Board) => {
      const response = await request.post(`${baseURL}/api/cards`, {
        data: {
          name: board.lists[0].cards[0].name,
          listId: board.lists[0].id,
          boardId: board.id,
        },
      });

      expect(response.status()).toBe(201);
      return response;
    });
  },
  apiDeleteCard: async ({ baseURL, request }, use) => {
    await use(async (card: Card) => {
      const response = await request.delete(`${baseURL}/api/cards/${card.id}`);
      expect(response.status()).toBe(200);
      return response;
    });
  },
});
