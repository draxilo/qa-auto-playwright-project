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