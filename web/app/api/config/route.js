// Next.js API Route that acts as a proxy to the backend server
export async function POST(request) {
  try {
    const body = await request.json();
    
    // In production, this should point to your backend server
    const apiUrl = process.env.API_URL || 'http://localhost:3002';
    
    const response = await fetch(`${apiUrl}/api/config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return Response.json({ error: 'userId required' }, { status: 400 });
    }
    
    const apiUrl = process.env.API_URL || 'http://localhost:3002';
    
    const response = await fetch(`${apiUrl}/api/config/${userId}`);
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

