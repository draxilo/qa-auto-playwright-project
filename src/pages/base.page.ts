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

    async waitForUrlAndGetLastPathSegment(urlPattern: RegExp = /.*/): Promise<string> {
        // Wait for URL to match the given pattern (default: any URL)
        await this.page.waitForURL(urlPattern);
        await this.page.waitForTimeout(100); // Adjust the timeout as needed


        const urlObj = new URL(this.page.url());
        const segments = urlObj.pathname.split('/').filter(Boolean); // removes empty strings

        if (segments.length === 0) {
            throw new Error(`URL path has no segments: ${this.page.url()}`);
        }

        // Return the last segment, assuming it's the ID
        return segments[segments.length - 1];
    }



}