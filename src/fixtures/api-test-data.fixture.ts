import { APIResponse, expect } from '@playwright/test';
import { Board } from '@/interfaces/board.interface';
import { test as base } from '@playwright/test';
import { List } from '@/interfaces/list.interface';
import { Card } from '@interfaces/card.interface';

interface ApiTestDataFixture {
  apiGetBoard(board: Board, expectedStatus?: number): Promise<APIResponse>;
  apiGetAllBoards(expectedStatus?: number): Promise<APIResponse>;
  apiCreateBoard(board: Board, expectedStatus?: number): Promise<APIResponse>;
  apiDeleteBoard(board: Board, expectedStatus?: number): Promise<APIResponse>;
  apiDeleteMultipleBoards(boardIds: number[], expectedStatus?: number): Promise<Array<APIResponse>>;
  apiDeleteAllBoards(expectedStatus?: number): Promise<APIResponse>;
  apiCreateMultipleLists(board: Board, expectedStatus?: number): Promise<Array<APIResponse>>;
  apiGetList(list: List, expectedStatus?: number): Promise<APIResponse>;
  apiGetAllListsOfSpecificBoard(board: Board, expectedStatus?: number): Promise<APIResponse>;
  apiCreateList(board: Board, list: List, expectedStatus?: number): Promise<APIResponse>;
  apiDeleteList(list: List, expectedStatus?: number): Promise<APIResponse>;
  apiGetCard(card: Card, expectedStatus?: number): Promise<APIResponse>;
  apiCreateCard(
    board: Board,
    list: List,
    card: Card,
    expectedStatus?: number,
  ): Promise<APIResponse>;
  apiDeleteCard(card: Card, expectedStatus?: number): Promise<APIResponse>;
  apiUpdateBoard(
    board: Board,
    patch: Partial<Board>,
    expectedStatus?: number,
  ): Promise<APIResponse>;
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
  apiDeleteBoard: async ({ baseURL, request }, use) => {
    await use(async (board: Board, expectedStatus = 200) => {
      const response = await request.delete(`${baseURL}/api/boards/${board.id}`);
      expect(response.status()).toBe(expectedStatus);
      return response;
    });
  },
  apiDeleteMultipleBoards: async ({ baseURL, request }, use) => {
    await use(async (boardIds: number[], expectedStatus = 200) => {
      const responses: Array<APIResponse> = [];
      for (const id of boardIds) {
        const response = await request.delete(`${baseURL}/api/boards/${id}`);
        expect(response.status()).toBe(expectedStatus);
        responses.push(response);
      }
      return responses;
    });
  },
  apiDeleteAllBoards: async ({ baseURL, request }, use) => {
    await use(async (expectedStatus = 204) => {
      const response = await request.delete(`${baseURL}/api/boards`);
      expect(response.status()).toBe(expectedStatus);
      return response;
    });
  },
  apiCreateMultipleLists: async ({ baseURL, request }, use) => {
    await use(async (board: Board, expectedStatus = 201) => {
      const responses: Array<APIResponse> = [];
      for (const list of board.lists) {
        const response = await request.post(`${baseURL}/api/lists`, {
          data: {
            name: list.name,
            boardId: board.id,
          },
        });

        expect(response.status()).toBe(expectedStatus);
        responses.push(response);
      }
      return responses;
    });
  },
  apiGetList: async ({ baseURL, request }, use) => {
    await use(async (list: List, expectedStatus = 200) => {
      const response = await request.get(`${baseURL}/api/lists/${list.id}`);
      expect(response.status()).toBe(expectedStatus);
      return response;
    });
  },
  apiGetAllListsOfSpecificBoard: async ({ baseURL, request }, use) => {
    await use(async (board: Board, expectedStatus = 200) => {
      const response = await request.get(`${baseURL}/api/lists?boardId=${board.id}`);
      expect(response.status()).toBe(expectedStatus);
      return response;
    });
  },
  apiCreateList: async ({ baseURL, request }, use) => {
    await use(async (board: Board, list: List, expectedStatus = 201) => {
      const response = await request.post(`${baseURL}/api/lists`, {
        data: {
          name: list.name,
          boardId: board.id,
        },
      });
      expect(response.status()).toBe(expectedStatus);
      return response;
    });
  },
  apiDeleteList: async ({ baseURL, request }, use) => {
    await use(async (list: List, expectedStatus = 200) => {
      const response = await request.delete(`${baseURL}/api/lists/${list.id}`);
      expect(response.status()).toBe(expectedStatus);
      return response;
    });
  },
  apiCreateCard: async ({ baseURL, request }, use) => {
    await use(async (board: Board, list: List, card: Card, expectedStatus = 201) => {
      const response = await request.post(`${baseURL}/api/cards`, {
        data: {
          name: card.name,
          listId: list.id,
          boardId: board.id,
        },
      });
      expect(response.status()).toBe(expectedStatus);
      return response;
    });
  },
  apiGetCard: async ({ baseURL, request }, use) => {
    await use(async (card: Card, expectedStatus = 200) => {
      const response = await request.get(`${baseURL}/api/cards/${card.id}`);
      expect(response.status()).toBe(expectedStatus);
      return response;
    });
  },
  apiDeleteCard: async ({ baseURL, request }, use) => {
    await use(async (card: Card, expectedStatus = 200) => {
      const response = await request.delete(`${baseURL}/api/cards/${card.id}`);
      expect(response.status()).toBe(expectedStatus);
      return response;
    });
  },
  apiUpdateBoard: async ({ baseURL, request }, use) => {
    await use(async (board: Board, patch: Partial<Board>, expectedStatus = 200) => {
      const response = await request.patch(`${baseURL}/api/boards/${board.id}`, { data: patch });
      expect(response.status()).toBe(expectedStatus);
      return response;
    });
  },
});
