import {expect} from "@playwright/test";
import {faker} from "@faker-js/faker";
import {test} from "../src/fixtures/base.fixture";
import {Board} from "../src/interfaces/board.interface";


let url: string
let createdBoardId: string
const board: Board = {
    name: faker.lorem.words(3)
}

// Set up
test.beforeEach(async ({apiCreateList, apiCreateBoard}) => {
    const createBoardResponse = await apiCreateBoard(board)
    const createBoardResponseBody = await createBoardResponse.json();
    board.id = createBoardResponseBody.id; // Store the board ID
})

test("create board", async ({ homePage, listPage, page }) => {
    // Test Data
    const boardName =  faker.lorem.words(3);

    await homePage.goToPage("");

    await homePage.createBoardItem.click();
    await homePage.newBoardInput.fill(boardName);
    await homePage.createBoardButton.click();

    createdBoardId = await homePage.waitForUrlAndGetLastPathSegment()

    // Assertions
    await listPage.assertBoardCreated(boardName);
})

// Tear down
test.afterEach(async ({apiDeleteListOfBoards}) => {
    const boardToDelete = [board.id, createdBoardId].map(Number); // Removes falsy values
    await apiDeleteListOfBoards(boardToDelete);
});
// test.afterEach(async ({request}) => {
//     expect((await request.delete(`http://localhost:3000/api/boards/${board.id}`)).status()).toBe(200);
//     expect((await request.delete(`http://localhost:3000/api/boards/${createdBoardId}`)).status()).toBe(200);
// })