/** @type {import('./$types').RequestHandler} */

export async function GET() {
  let output: any = {
    comics: []
  };

  return new Response(JSON.stringify(output));
}
