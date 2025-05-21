import {Page} from "@playwright/test";

export class BasePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async goToPage(url: string) {
        await this.page.goto(url)
    }

    async clickInTheMiddle() {
        const viewport = this.page.viewportSize();
        if (viewport) {
            const centerX = viewport.width / 2;
            const centerY = viewport.height / 2;
            await this.page.mouse.click(centerX, centerY);
        }
    }
}