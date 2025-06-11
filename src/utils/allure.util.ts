import * as allure from "allure-js-commons";

/**
 * Interface representing the parameters for Allure reporting.
 */
export interface AllureParams {
    description?: string;
    parentSuite?: string;
    suite?: string;
    subSuite?: string;
    tag?: string;
    tags?: string[];
}

/**
 * Adds Allure reporting parameters.
 *
 * @param {AllureParams} params - The parameters for Allure reporting.
 * @param {string} [params.description] - The description for the test.
 * @param {string} [params.parentSuite] - The parent suite name.
 * @param {string} [params.suite] - The suite name.
 * @param {string} [params.subSuite] - The sub-suite name.
 */
export const addAllure = async (params: AllureParams) => {
    if (params.parentSuite) {
        await allure.parentSuite(params.parentSuite);
    }
    if (params.suite) {
        await allure.suite(params.suite);
    }
    if (params.subSuite) {
        await allure.subSuite(params.subSuite);
    }
    if (params.description) {
        await allure.description(params.description);
    }
};
