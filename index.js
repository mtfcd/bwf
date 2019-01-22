const request = require('request-promise');
const cheerio = require('cheerio');

async function getIndexPage(){
  const url = 'https://bwfbadminton.cn/rankings/2/bwf-world-rankings/6/men-s-singles/2019/3/?rows=100&page_no=1';
  const indexPage = await request(url);

  const $ = cheerio.load(indexPage);
  const tbody = $('#rankings_landing_container > div > div.page-content.page-content--no-padding > div > div > div > table > tbody')

  console.log(indexPage);
}

getIndexPage();
