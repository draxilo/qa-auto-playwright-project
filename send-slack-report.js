import fs from 'fs';

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const CI_PAGES_URL = process.env.CI_PAGES_URL;
const CI_PIPELINE_ID = process.env.CI_PIPELINE_ID;

if (!SLACK_WEBHOOK_URL) {
  console.error('Missing SLACK_WEBHOOK_URL');
  process.exit(1);
}

const ALLURE_URL = `${CI_PAGES_URL}/allure-report-${CI_PIPELINE_ID}`;

// Paths to result files
const WEB_RESULTS = 'reports/web-results.json';
const API_RESULTS = 'reports/api-results.json';

// Load JSON safely
function loadJson(path) {
  if (!fs.existsSync(path)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

const webJson = loadJson(WEB_RESULTS) ?? {};
const apiJson = loadJson(API_RESULTS) ?? {};

function extractStats(name, json) {
  if (!json) {
    return {
      name,
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      missing: true,
    };
  }

  const passed = json.stats.expected ?? 0;
  const failed = json.stats.unexpected ?? 0;
  const skipped = json.stats.skipped ?? 0;

  return {
    name,
    passed,
    failed,
    skipped,
    total: passed + failed + skipped,
    missing: false,
  };
}

const statsWeb = extractStats('WEB', webJson);
const statsApi = extractStats('API', apiJson);

// Combined totals
const totalPassed = statsWeb.passed + statsApi.passed;
const totalFailed = statsWeb.failed + statsApi.failed;
const totalSkipped = statsWeb.skipped + statsApi.skipped;
const totalTests = totalPassed + totalFailed + totalSkipped;

const allPassed = totalFailed === 0;

// Build Slack message text
function suiteLine(stats) {
  if (stats.missing) return `*${stats.name}:* _not executed_`;

  const icon = stats.failed === 0 ? ':white_check_mark:' : ':x:';
  return `${icon} *${stats.name}:* ${stats.passed}/${stats.total} passed`;
}

const payload = {
  blocks: [
    // {
    //   type: 'section',
    //   text: {
    //     type: 'mrkdwn',
    //     text: allPassed
    //       ? ':white_check_mark: *All test suites passed!*'
    //       : ':x: *Some test suites failed!*',
    //   },
    // },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: suiteLine(statsWeb) + '\n' + suiteLine(statsApi),
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*TOTAL:* ${totalPassed}/${totalTests} passed  
• Passed: ${totalPassed}  
• Failed: ${totalFailed}  
• Skipped: ${totalSkipped}`,
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: { type: 'plain_text', text: 'Open Allure Report' },
          url: ALLURE_URL,
          style: allPassed ? 'primary' : 'danger',
        },
      ],
    },
  ],
};

// Send to Slack
await fetch(SLACK_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

console.log('Slack message sent !');
