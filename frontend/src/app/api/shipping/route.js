export async function GET() {
  const rates = {
    flatRate: 10.0,
    localPickup: 0.0,
    currency: 'USD',
  }
  return new Response(JSON.stringify(rates), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
