import {test} from "../src/fixtures/pages.fixture";
import {expect} from "@playwright/test";

const boardName = "Test Board";
let boardId: number;

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


test("delete board", async ({ page, homePage, listPage }) => {
    // Test Data

    await homePage.goToPage(`http://localhost:3000/board/${boardId}`)

    await listPage.boardOptionsButton.click();
    await listPage.deleteBoardButton.click();

    await page.reload()
    // Assertions
    await homePage.boardIsDeleted(boardName);
})