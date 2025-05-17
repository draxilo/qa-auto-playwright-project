import {test} from "../src/fixtures/base.fixture";

test("create board", async ({ homePage }) => {
    // Test Data
    const boardName = "Test Board";

    await homePage.goToPage("");

    await homePage.createBoardItem.click();
    await homePage.newBoardInput.fill(boardName);
    await homePage.createBoardButton.click();

    // Assertions
})