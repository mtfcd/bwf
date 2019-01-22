const request = require('request-promise');
const cheerio = require('cheerio');

async function getIndexPage(){
  const url = 'https://bwfbadminton.cn/rankings/2/bwf-world-rankings/6/men-s-singles/2019/3/?rows=100&page_no=1';
  const indexPage = await request(url);

  const $ = cheerio.load(indexPage);
  const tbody = $('#rankings_landing_container > div > div.page-content.page-content--no-padding > div > div > div > table > tbody')

  const players = tbody.children('tr.row1').map((idx,tr) => {
    const player = {
      name: $('td:nth-child(3) > div > span > a', tr).text().trim(),
      link: $('td:nth-child(3) > div > span > a', tr).attr('href'),
      nation: $('td:nth-child(2) > div > span', tr).text().trim(),
      wins: parseInt($('td:nth-child(5)', tr).text().trim().split(' - ')[0]),
      loses: parseInt($('td:nth-child(5)', tr).text().trim().split(' - ')[1]),
    };

    player.id = player.link.match(/player\/(\d+?)\//)[1];

    return player;
  }).get();
  
  console.log(players);
}

getIndexPage();
