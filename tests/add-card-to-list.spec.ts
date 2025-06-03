import {test} from "../src/fixtures/pages.fixture";
import {expect} from "@playwright/test";
import {faker} from "@faker-js/faker";
import {Board} from "../src/interfaces/board.interface";

const board: Board = {
    name: faker.lorem.words(3)
}

const listName = faker.lorem.words(3); // Name of the list to which the card will be added

// Set up
test.beforeEach(async ({request}) => {
    const response = await request.post("http://localhost:3000/api/boards", {
        data: {
            "name": board.name,
        },
    })

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    board.id = responseBody.id; // Store the board ID

    const responseList = await request.post(`http://localhost:3000/api/lists`, {
        data: {
            "name": listName,
            "boardId": board.id,
        },
    })

    expect(responseList.status()).toBe(201);
})

test("add card to list", async ({homePage, listPage }) => {
    // Test Data
    const cardTitleInput = faker.lorem.words(3); // Generate a random card title

    await test.step('Navigate to the board and add a card', async () => {
        await homePage.goToPage(`http://localhost:3000/board/${board.id}`)
    })

    await test.step('Add a card to the list', async () => {
        await listPage.addAnotherCardButton.click();
        await listPage.cardTitleInput.fill(cardTitleInput);
        await listPage.addCardButton.click()
    })

    await test.step('Assert Card is added to the list', async () => {
        await listPage.assertCardCreated(cardTitleInput);
    })
})

// Tear down
test.afterEach(async ({request}) => {
    const response = await request.delete(`http://localhost:3000/api/boards/${board.id}`);
    expect(response.status()).toBe(200);
});