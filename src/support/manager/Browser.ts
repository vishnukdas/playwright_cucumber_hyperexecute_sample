import { chromium, ChromiumBrowser, firefox, FirefoxBrowser, LaunchOptions, webkit, WebKitBrowser } from "@playwright/test";
import BrowserConstants from "../constants/BrowserConstants";

const browserOptions: LaunchOptions = {
    slowMo: 50,
    args: ["--start-maximized", "--disable-extensions", "--disable-plugins"],
    firefoxUserPrefs: {
        'media.navigator.streams.fake': true,
        'media.navigator.permission.disabled': true,
    },
    headless: false,
    timeout: Number.parseInt(process.env.BROWSER_LAUNCH_TIMEOUT, 10),
    downloadsPath: "./test-results/downloads",
};

export default class Browser {
    public static async launch() {
        const capabilities = {
            'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
            'browserVersion': 'latest',
            'LT:Options': {
              'platform': 'Windows 10',
              'build': 'Playwright Cucumber-JS Build',
            //   'name': scenario.pickle.name,
              'user': process.env.LT_USERNAME,
              'accessKey': process.env.LT_ACCESS_KEY,
              'network': true,
              'video': true,
              'console': true,
              'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
            //   'tunnelName': '', // Optional
            //   'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
            //   'playwrightClientVersion': playwrightClientVersion
            }
          }
        const browserType = process.env.BROWSER;
        let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
        // if (BrowserConstants.FIREFOX === browserType) {
        //     browser = await firefox.launch(browserOptions);
        // } else if (BrowserConstants.WEBKIT === browserType) {
        //     browser = await webkit.launch(browserOptions);
        // } else {
            // browser = await chromium.launch(browserOptions);
            browser = await chromium.connect({
                wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
              })
        // }
        return browser;
    }
    /*
        public static channel() {
            const browser = process.env.BROWSER.toLowerCase();
            let browserChannel;
            if (browser === BrowserConstants.CHROME) {
                browserChannel = BrowserConstants.CHROME;
            } else if (browser === BrowserConstants.EDGE) {
                browserChannel = BrowserConstants.MSEDGE;
            } else {
                browserChannel = BrowserConstants.BLANK;
            }
            return browserChannel;
        }   */
}
