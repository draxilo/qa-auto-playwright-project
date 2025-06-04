import {test} from "../src/fixtures/base.fixture";
import { faker } from '@faker-js/faker';
import {Board} from "../src/interfaces/board.interface";

const board: Board = {
    name: faker.lorem.words(3),
}
// Set up
test.beforeEach(async ({apiCreateList, apiCreateBoard}) => {
    const createBoardResponse = await apiCreateBoard(board)
    const createBoardResponseBody = await createBoardResponse.json();
    board.id = createBoardResponseBody.id; // Store the board ID
})


test("delete board", async ({ page, homePage, listPage }) => {
    // Test Data

    await homePage.goToPage(`http://localhost:3000/board/${board.id}`)

    await listPage.boardOptionsButton.click();
    await listPage.deleteBoardButton.click();

    await page.reload()
    // Assertions
    await homePage.boardIsDeleted(board.name);
})