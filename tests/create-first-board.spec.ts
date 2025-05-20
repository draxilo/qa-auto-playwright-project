import {test} from "../src/fixtures/base.fixture";
import {expect} from "@playwright/test";

test.beforeEach(async ({request}) => {
    const response = await request.delete("http://localhost:3000/api/boards")

    expect(response.status()).toBe(204);
})

test('create first board', async ({ getStartedPage }) => {
    // Test Data
    const boardName = "Test Board";

    await getStartedPage.goToPage("")
    await getStartedPage.firstBoardInput.fill(boardName);

    await getStartedPage.assertFirstBoardCreated(boardName);
});
