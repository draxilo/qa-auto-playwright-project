import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";

export class GetStartedPage extends BasePage {
    readonly firstBoardInput: Locator;

    constructor(page: Page) {
        super(page)
        this.firstBoardInput = page.getByTestId("first-board");
    }

    // Assertions
}