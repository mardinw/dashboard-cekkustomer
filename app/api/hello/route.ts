export async function GET() {
  try {
    // No external data fetching required for "hello" response
    const message = 'hello';

    // Return a successful JSON response with the "hello" message
    return new Response(JSON.stringify({ message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200, // Explicitly set success status code
    });
  } catch (error) {
    console.error('Error:', error);

    // Return a proper error response if an unexpected error occurs
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500, // Standard internal server error code
    });
  }
}