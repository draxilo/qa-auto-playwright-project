import {test} from "../src/fixtures/base.fixture";

test("add card to list", async ({homePage, listPage }) => {
    // Test Data
    const cardInput = "Text Card"

    await homePage.goToPage("");
    await homePage.lastBoardItem.click();

    await listPage.addAnotherCardButton.click();
    await listPage.newCardInput.fill(cardInput);
    await listPage.addCardButton.click()
})