import {test} from "../src/fixtures/pages.fixture";
import {expect} from "@playwright/test";

// Set up
test.beforeEach(async ({request}) => {
    const response = await request.post("http://localhost:3000/api/boards", {
        data: {
            "name": "SET UP BOARD",
        },
    })

    expect(response.status()).toBe(201);
})

test("create board", async ({ homePage }) => {
    // Test Data
    const boardName = "Test Board";

    await homePage.goToPage("");

    await homePage.createBoardItem.click();
    await homePage.newBoardInput.fill(boardName);
    await homePage.createBoardButton.click();

    // Assertions
})

// Tear down
test.afterEach(async ({request}) => {
    const response = await request.delete("http://localhost:3000/api/boards")

    expect(response.status()).toBe(204);
})