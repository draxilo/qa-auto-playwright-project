import {test} from "../src/fixtures/base.fixture";
import {faker} from "@faker-js/faker";
import {AllureParams} from "../src/utils/allure.util";

/* Allure Parameters */
const allure: AllureParams = {
    description: "This test creates the first board.",
    parentSuite: "Board",
    suite: "Create",
    tag: "create-first-board"
}

// Set up
test.beforeEach(async ({apiDeleteAllBoards}) => {
    await apiDeleteAllBoards();
})

test('create first board', async ({ page, getStartedPage, listPage }) => {
    // Test Data
    const boardName =  faker.lorem.words(3);

    await test.step("Navigate to the get started page", async () => {
        await getStartedPage.goToPage("")

    })
    await test.step("Create the first board", async () => {
        await getStartedPage.firstBoardInput.fill(boardName);
        await page.keyboard.press("Enter");;
    });

    await test.step('Assert Board created', async () => {
        await listPage.assertBoardCreated(boardName);
    })
});

// Tear down
test.afterEach(async ({apiDeleteAllBoards}) => {
    await apiDeleteAllBoards()
})