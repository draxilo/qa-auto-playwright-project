import {test} from "../src/fixtures/base.fixture";
import {faker} from "@faker-js/faker";
import {Board} from "../src/interfaces/board.interface";
import {AllureParams} from "../src/utils/allure.util";

/* Allure Paramaters */
const allure: AllureParams = {
    description: "This test adds a card to a list on a board.",
    parentSuite: "Board",
    suite: "List",
    subSuite: "Card",
    tag: "add-card-to-list"
}

const board: Board = {
    name: faker.lorem.words(3),
    lists: [
        {
            name: faker.lorem.words(3),
            cards: []
        }
    ]
}

// Set up
test.beforeEach(async ({apiCreateList, apiCreateBoard}) => {
    const createBoardResponse = await apiCreateBoard(board)
    const createBoardResponseBody = await createBoardResponse.json();
    board.id = createBoardResponseBody.id; // Store the board ID

    await apiCreateList(board);
})

test("add card to list", async ({homePage, listPage }) => {
    // Test Data
    const cardTitleInput = faker.lorem.words(3); // Generate a random card title

    await test.step('Navigate to the board and add a card', async () => {
        await homePage.goToPage(`http://localhost:3000/board/${board.id}`)
    })

    await test.step('Add a card to the list', async () => {
        await listPage.addAnotherCardButton.last().click();
        await listPage.cardTitleInput.fill(cardTitleInput);
        await listPage.addCardButton.click()
    })

    await test.step('Assert Card is added to the list', async () => {
        await listPage.assertCardCreated(cardTitleInput);
    })
})

// Tear down
test.afterEach(async ({apiDeleteBoard}) => {
    await apiDeleteBoard(board)
});