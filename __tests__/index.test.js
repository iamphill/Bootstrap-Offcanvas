import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { startServer } from 'polyserve';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const port = 8080;
const currentDir = './tmp/screenshots';
const baselineDir = './__tests__/screenshots';

describe('screenshots are correct', () => {
  let polyserve, browser, page;

  beforeAll(async function() {
    polyserve = await startServer({
      port,
      root: path.join(__dirname, '..'),
      moduleResolution: 'node',
    });

    if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp');
    if (!fs.existsSync('./tmp/screenshots')) fs.mkdirSync('./tmp/screenshots');
  });

  afterAll(async done => {
    polyserve.close(done);
  });

  beforeEach(async function() {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport({
      width: 375,
      height: 667,
    });
  });

  afterEach(() => browser.close());

  it('opens offcanvas menu', async () => {
    await takeAndCompareScreenshot(
      () => page.click('.navbar-toggler'),
      page,
      'example',
      'open'
    );
  });
});

async function takeAndCompareScreenshot(action, page, route, filePrefix) {
  // If you didn't specify a file, use the name of the route.
  let fileName = filePrefix + '-' + (route ? route : 'index');

  await page.goto(`http://127.0.0.1:${port}/${route}`);

  await action();

  await page.screenshot({ path: `${currentDir}/${fileName}.png` });

  return compareScreenshots(fileName);
}

function compareScreenshots(view) {
  return new Promise((resolve, reject) => {
    const img1 = fs
      .createReadStream(`${currentDir}/${view}.png`)
      .pipe(new PNG())
      .on('parsed', doneReading);
    const img2 = fs
      .createReadStream(`${baselineDir}/${view}.png`)
      .pipe(new PNG())
      .on('parsed', doneReading);

    fs.createReadStream(`${currentDir}/${view}.png`, { encoding: 'base64' })
      .on('data', function(data) {
        console.log('got data', data);
      })
      .on('end', function() {
        console.log('\n\n');
      });

    let filesRead = 0;
    function doneReading() {
      // Wait until both files are read.
      if (++filesRead < 2) return;

      // The files should be the same size.
      expect(img1.width).toEqual(img2.width);
      expect(img1.height).toEqual(img2.height);

      // Do the visual diff.
      const diff = new PNG({ width: img1.width, height: img1.height });

      // Skip the bottom/rightmost row of pixels, since it seems to be
      // noise on some machines :/
      const width = img1.width - 1;
      const height = img1.height - 1;

      const numDiffPixels = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        width,
        height,
        { threshold: 0.2 }
      );
      const percentDiff = (numDiffPixels / (width * height)) * 100;

      const stats = fs.statSync(`${currentDir}/${view}.png`);
      const fileSizeInBytes = stats.size;
      console.log(
        `📸 ${view}.png => ${fileSizeInBytes} bytes, ${percentDiff}% different`
      );

      //diff.pack().pipe(fs.createWriteStream(`${currentDir}/${view}-diff.png`));
      expect(numDiffPixels).toEqual(0);
      resolve();
    }
  });
}
