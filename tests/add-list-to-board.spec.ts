import {expect} from "@playwright/test";
import {test} from "../src/fixtures/pages.fixture";
import {faker} from "@faker-js/faker";

const boardName =  faker.lorem.words(3);
let boardId: number; // Declare a variable to store the board ID

// Set up
test.beforeEach(async ({request}) => {
    const response = await request.post("http://localhost:3000/api/boards", {
        data: {
            "name": boardName,
        },
    })

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    boardId = responseBody.id; // Store the board ID
})

test('add list to board', async ({ homePage, listPage }) => {
    // Test Data
    const listName =  faker.lorem.words(3);

    await homePage.goToPage(`http://localhost:3000/board/${boardId}`)

    //Dirty fix for the test to work
    await listPage.clickInTheMiddle();

    await listPage.createListButton.click();

    await listPage.addListNameInput.fill(listName);
    await listPage.addListButton.click();

    await listPage.assertListCreated(listName);
})

// Tear down
test.afterEach(async ({request}) => {
    const response = await request.delete(`http://localhost:3000/api/boards/${boardId}`);
    expect(response.status()).toBe(200);
});