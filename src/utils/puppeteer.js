const puppeteer = require('puppeteer')

module.exports = (app) => {
  return {
    createImage: async (html) => {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox']
      });
      const page = await browser.newPage();
      await page.setContent(html);
      await page.setViewport({
        width: 800,
        height: 1000
      });
      await browser.close();
      return true;
    },

    createPdf: async (html) => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html);
      const pdf = await page.pdf();
      await browser.close();
      return pdf
    }
  };
};