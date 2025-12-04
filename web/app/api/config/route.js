// Next.js API Route that acts as a proxy to the backend server
export async function POST(request) {
  try {
    const body = await request.json();
    
    // In production, this should point to your Railway backend server
    // Make sure to set API_URL in Vercel environment variables
    const apiUrl = process.env.API_URL;
    
    if (!apiUrl) {
      console.error('❌ API_URL not configured in Vercel environment variables');
      return Response.json({ 
        error: 'API_URL not configured. Go to Vercel → Settings → Environment Variables and add: API_URL = https://your-railway-app.railway.app' 
      }, { status: 500 });
    }
    
    console.log('Proxying request to:', `${apiUrl}/api/config`);
    
    const response = await fetch(`${apiUrl}/api/config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Railway API error:', errorText);
      return Response.json({ 
        error: `Railway API error: ${response.status} - ${errorText}` 
      }, { status: response.status });
    }
    
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return Response.json({ 
      error: `Failed to connect to Railway: ${error.message}. Make sure API_URL is set correctly.` 
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return Response.json({ error: 'userId required' }, { status: 400 });
    }
    
    const apiUrl = process.env.API_URL;
    
    if (!apiUrl) {
      return Response.json({ 
        error: 'API_URL not configured. Please set API_URL in Vercel environment variables.' 
      }, { status: 500 });
    }
    
    const response = await fetch(`${apiUrl}/api/config/${userId}`);
    
    if (!response.ok) {
      return Response.json({ 
        error: `Railway API error: ${response.status}` 
      }, { status: response.status });
    }
    
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ 
      error: `Failed to connect to Railway: ${error.message}` 
    }, { status: 500 });
  }
}

