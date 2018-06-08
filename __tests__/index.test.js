const fs = require('fs');
import puppeteer from 'puppeteer';
import { startServer } from 'polyserve';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const port = 8080;
const testDir = './tmp/screenshots';
const goldenDir = './__tests__/screenshots';

function compareScreenshots(fileName) {
  return new Promise((resolve, reject) => {
    const img1 = fs
      .createReadStream(`${testDir}/${fileName}.png`)
      .pipe(new PNG())
      .on('parsed', doneReading);
    const img2 = fs
      .createReadStream(`${goldenDir}/${fileName}.png`)
      .pipe(new PNG())
      .on('parsed', doneReading);

    let filesRead = 0;
    function doneReading() {
      // Wait until both files are read.
      if (++filesRead < 2) return;

      // The files should be the same size.
      expect(img1.width).toBe(img2.width);
      expect(img1.height).toBe(img2.height);

      // Do the visual diff.
      const diff = new PNG({ width: img1.width, height: img2.height });
      const numDiffPixels = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        img1.width,
        img1.height,
        { threshold: 0.1 }
      );

      // The files should look the same.
      expect(numDiffPixels).toBe(0);
      resolve();
    }
  });
}

async function takeAndCompareScreenshot(page, route, filePrefix = '') {
  // If you didn't specify a file, use the name of the route.
  const fileName = `${filePrefix}-${route}`;

  // Start the browser, go to that page, and take a screenshot.
  await page.goto(`http://127.0.0.1:${port}/${route}`);

  await page.click('.navbar-toggler');

  await page.screenshot({
    path: `${testDir}/${fileName}.png`,
  });

  // Test to see if it's right.
  return compareScreenshots(fileName);
}

describe('screenshots are correct', () => {
  let polyserve, browser, page;

  beforeAll(async function() {
    polyserve = await startServer({
      port,
    });

    if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp');
    if (!fs.existsSync('./tmp/screenshots')) fs.mkdirSync('./tmp/screenshots');
  });

  afterAll(done => polyserve.close(done));

  beforeEach(async function() {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport({
      width: 375,
      height: 667,
    });
  });

  it('opens offcanvas menu', async () => {
    await takeAndCompareScreenshot(page, 'example', 'open');
  });
});
