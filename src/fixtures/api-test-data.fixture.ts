import {APIResponse, expect} from "@playwright/test";
import {Board} from "../interfaces/board.interface";
import { test as base } from "@playwright/test";


interface ApiTestDataFixture {
    apiCreateBoard(board: Board): Promise<APIResponse>;
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
    }
})
