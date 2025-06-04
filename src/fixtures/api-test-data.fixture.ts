import {APIResponse, expect} from "@playwright/test";
import {Board} from "../interfaces/board.interface";
import { test as base } from "@playwright/test";
import {List} from "../interfaces/list.interface";


interface ApiTestDataFixture {
    apiCreateBoard(board: Board): Promise<APIResponse>;
    apiDeleteBoard(board: Board): Promise<APIResponse>;
    apiCreateList(board: Board): Promise<Array<APIResponse>>;
}

export const test = base.extend<ApiTestDataFixture>({
    apiCreateBoard: async ({ baseURL, request }, use) => {
        await use(async (board: Board) => {
            const response = await request.post(baseURL+"/api/boards", {
                data: {
                    "name": board.name,
                },
            })

            expect(response.status()).toBe(201);
            return response;
        })
    },
    apiDeleteBoard: async ({ baseURL, request }, use) => {
        await use(async (board: Board) => {
            const response = await request.delete(`${baseURL}/api/boards/${board.id}`);
            expect(response.status()).toBe(200);
            return response;
        })
    },
    apiCreateList: async ({ baseURL, request }, use) => {
        await use(async (board: Board) => {
            const responses: Array<APIResponse> = []
            for (const list of board.lists) {
                const response = await request.post(`${baseURL}/api/lists`, {
                    data: {
                        "name": list.name,
                        "boardId": board.id,
                    },
                });

                expect(response.status()).toBe(201);
                responses.push(response);
            }
            return responses;
        })
    }
})
