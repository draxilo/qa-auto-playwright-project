import {test} from "../src/fixtures/base.fixture";

test("delete board", async ({ homePage, listPage }) => {
    // Test Data

    await homePage.goToPage("");

    await homePage.lastBoardItem.click();
    await listPage.boardOptionsButton.click();
    await listPage.deleteBoardButton.click();

    // Assertions
    await homePage.boardIsDeleted(await homePage.lastBoardItemName);
})