export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    // Keep edge functions simple and fast
    const data = { message: 'Hello from the edge!' };
    
    // Always return a properly formatted response
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60, s-maxage=60',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Edge function error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}