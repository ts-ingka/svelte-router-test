import { json } from '@sveltejs/kit';

export async function GET() {
    console.log("[server] GET /api/search start: ", new Date().toISOString());
    const res = {
        "data": "..."
    };
    await new Promise((r) => setTimeout(r, 3000));
    console.log("[server] GET /api/search end: ", new Date().toISOString());
    return json(res);
}