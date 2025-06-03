import { mergeTests } from "@playwright/test";

import { test as pageFixture } from "../fixtures/pages.fixture";
import { test as apiTestDataFixture } from "../fixtures/api-test-data.fixture";


export const test = mergeTests(pageFixture, apiTestDataFixture);
