const request = require('request-promise');
const cheerio = require('cheerio');

const db = require('./sqlite');


async function getOnePage(url){
  const indexPage = await request(url);

  const $ = cheerio.load(indexPage);
  const tbody = $('#rankings_landing_container > div > div.page-content.page-content--no-padding > div > div > div > table > tbody')

  const players = tbody.children('tr').not('.tr-ranking-detail').map((idx,tr) => {
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
  
  console.log('got ', players.length, 'players')
  const res = await db.insertMany(players);
  return $('div.player-next.rankings_next_page > a').attr('href');
}

async function init() {
  let url = 'https://bwfbadminton.cn/rankings/2/bwf-world-rankings/6/men-s-singles/2017/1?rows=100&page_no=1';
  while(url){
    console.log('get page', url.match(/page_no\=(\d+)/)[1] );
    url = await getOnePage(url);
  }
  console.log('done')
}

init();