import {test} from "../src/fixtures/pages.fixture";
import {expect} from "@playwright/test";

// Set up
test.beforeEach(async ({request}) => {
    const response = await request.delete("http://localhost:3000/api/boards")

    expect(response.status()).toBe(204);
})

test('create first board', async ({ page, getStartedPage, listPage }) => {
    // Test Data
    const boardName = "Test Board";

    await getStartedPage.goToPage("")
    await getStartedPage.firstBoardInput.fill(boardName);
    await page.keyboard.press("Enter");

    await listPage.assertFirstBoardCreated(boardName);
});

// Tear down
test.afterEach(async ({request}) => {
    const response = await request.delete("http://localhost:3000/api/boards")

    expect(response.status()).toBe(204);
})