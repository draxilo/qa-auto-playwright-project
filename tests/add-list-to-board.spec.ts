import {expect} from "@playwright/test";
import {test} from "../src/fixtures/base.fixture";

const boardName = "Test Board";
const listName = "Test List";

test.beforeEach(async ({request}) => {
    const response = await request.post("http://localhost:3000/api/boards", {
        data: {
            "name": boardName,
        },
    })

    expect(response.status()).toBe(201);
})

test('add list to board', async ({ homePage, listPage }) => {
    // Test Data

    await homePage.goToPage("")
    await homePage.lastBoardItem.click();

    await listPage.createListButton.click();

    await listPage.addListNameInput.fill(listName);
    await listPage.addListButton.click();

    await listPage.assertListCreated(listName);
})