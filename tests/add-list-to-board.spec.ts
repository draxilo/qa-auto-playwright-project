import {expect} from "@playwright/test";
import {test} from "../src/fixtures/base.fixture";
import {faker} from "@faker-js/faker";
import {Board} from "../src/interfaces/board.interface";

const board: Board = {
    name: faker.lorem.words(3)
}

// Set up
test.beforeEach(async ({ apiCreateBoard }) => {
    const response = await apiCreateBoard(board);
    const responseBody = await response.json();
    board.id = responseBody.id; // Store the board ID
})

test('add list to board', async ({ homePage, listPage }) => {
    // Test Data
    const listName =  faker.lorem.words(3);

    await homePage.goToPage(`http://localhost:3000/board/${board.id}`)

    //Dirty fix for the test to work
    await listPage.clickInTheMiddle();

    await listPage.createListButton.click();

    await listPage.addListNameInput.fill(listName);
    await listPage.addListButton.click();

    await listPage.assertListCreated(listName);
})

// Tear down
test.afterEach(async ({apiDeleteBoard}) => {
    await apiDeleteBoard(board)
});