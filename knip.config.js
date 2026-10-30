export default {
  ignore: ["tests/halloween-contrast.browser.mjs", "tests/halloween-effects.browser.mjs"],
  // CI installs Playwright on demand; it is intentionally not a runtime dependency.
  ignoreIssues: {
    "tests/*.browser.mjs": ["unlisted"],
  },
};
