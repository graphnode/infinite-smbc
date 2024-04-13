import * as cheerio from 'cheerio';

const getComic = async (id: string = '') => {
  console.log(`Grabbing https://www.smbc-comics.com/${id}`);
  
  const response = await fetch(`https://www.smbc-comics.com/${id}`);

  const $ = cheerio.load(await response.text());

  const comicEl = $('#cc-comic');

  return {
    id: $('#permalinktext').attr('value')?.replace('http://smbc-comics.com/', ''),
    src: comicEl.attr('src'),
    title: comicEl.attr('title'),
    previous: $('#navtop a.cc-prev').attr('href')?.replace('https://www.smbc-comics.com/', ''),
  };
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const before = url.searchParams.get('before') ?? '';
  const limit = 5;

  let id = before;
  let output = [];

  for(let i = 0; i < limit; i++) {
    const comic = await getComic(id);
    output.push(comic);
    if (!comic.previous) break;
    id = comic.previous;
  }

  return new Response(JSON.stringify(output));
}
