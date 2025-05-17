import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";

export class HomePage extends BasePage {
    readonly createBoardItem: Locator
    readonly newBoardInput: Locator;
    readonly createBoardButton: Locator;
    readonly lastBoardItem: Locator;
    readonly lastBoardItemName: Promise<string>;


    constructor(page: Page) {
        super(page);
        this.createBoardItem = page.getByTestId("create-board");
        this.newBoardInput = page.getByTestId("new-board-input");
        this.createBoardButton = page.getByTestId("new-board-create");
        this.lastBoardItem = page.getByTestId("board-item").last();
        this.lastBoardItemName = page.locator('(//div[@data-cy="board-item"]//h2)[last()]').textContent();

    }

    async clickOnBoardItemByName(boardName: string): Promise<void> {
        await this.page.locator(`//div[@data-cy="board-item" and .//h2[text()="${boardName}"]]`).click();
    }

    // Assertions
    async boardIsDeleted(boardName: string) {
        expect(await this.clickOnBoardItemByName(boardName)).toThrowError();
    }
}