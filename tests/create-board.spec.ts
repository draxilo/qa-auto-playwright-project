import {test} from "../src/fixtures/pages.fixture";
import {expect} from "@playwright/test";
import {faker} from "@faker-js/faker";

let firstBoardId: number; // Declare a variable to store the board ID

// Set up
test.beforeEach(async ({request}) => {
    const response = await request.post("http://localhost:3000/api/boards", {
        data: {
            "name":  faker.lorem.words(3),
        },
    })

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    firstBoardId = responseBody.id; // Store the board ID
})

test("create board", async ({ homePage, listPage }) => {
    // Test Data
    const boardName =  faker.lorem.words(3);

    await homePage.goToPage("");

    await homePage.createBoardItem.click();
    await homePage.newBoardInput.fill(boardName);
    await homePage.createBoardButton.click();

    // Assertions
    await listPage.assertBoardCreated(boardName);
})

// Tear down
test.afterEach(async ({request}) => {
    const response = await request.delete("http://localhost:3000/api/boards")

    expect(response.status()).toBe(204);
})