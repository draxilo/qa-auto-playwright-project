import {test} from "../src/fixtures/pages.fixture";
import {expect} from "@playwright/test";

const boardName = "Test Board";
const cardTitleInput = "Text Card"
const listName = "Test List"; // Name of the list to which the card will be added
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

    const responseList = await request.post(`http://localhost:3000/api/lists`, {
        data: {
            "name": listName,
            "boardId": boardId,
        },
    })

    expect(responseList.status()).toBe(201);
})

test("add card to list", async ({homePage, listPage }) => {
    // Test Data

    await homePage.goToPage(`http://localhost:3000/board/${boardId}`)

    await listPage.addAnotherCardButton.click();
    await listPage.cardTitleInput.fill(cardTitleInput);
    await listPage.addCardButton.click()

    //Assertions
    await listPage.assertCardCreated(cardTitleInput);
})

// Tear down
test.afterEach(async ({request}) => {
    const response = await request.delete(`http://localhost:3000/api/boards/${boardId}`);
    expect(response.status()).toBe(200);
});