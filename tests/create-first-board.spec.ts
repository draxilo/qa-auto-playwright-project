import {test} from "../src/fixtures/base.fixture";
import {expect} from "@playwright/test";
import {faker} from "@faker-js/faker";

// Set up
test.beforeEach(async ({apiDeleteAllBoards}) => {
    await apiDeleteAllBoards();
})

test('create first board', async ({ page, getStartedPage, listPage }) => {
    // Test Data
    const boardName =  faker.lorem.words(3);

    await getStartedPage.goToPage("")
    await getStartedPage.firstBoardInput.fill(boardName);
    await page.keyboard.press("Enter");

    await listPage.assertBoardCreated(boardName);
});

// Tear down
test.afterEach(async ({apiDeleteAllBoards}) => {
    await apiDeleteAllBoards()
})