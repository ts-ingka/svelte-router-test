import { json } from '@sveltejs/kit';

export async function GET() {
    console.log("[server] GET /api/metadata start: ", new Date().toISOString());
    const res = {
        params: [
            "q", "sort", "limit"
        ]
    };
    await new Promise((r) => setTimeout(r, 3000));
    console.log("[server] GET /api/metadata end: ", new Date().toISOString());
    return json(res);
}