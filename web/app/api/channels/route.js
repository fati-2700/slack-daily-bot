// Next.js API Route that acts as a proxy to get Slack channels
export async function GET(request) {
  try {
    // In production, this should point to your Railway backend server
    // Make sure to set API_URL in Vercel environment variables
    const apiUrl = process.env.API_URL;
    
    if (!apiUrl) {
      console.error('❌ API_URL not configured in Vercel environment variables');
      return Response.json({ 
        error: 'API_URL not configured. Go to Vercel → Settings → Environment Variables and add: API_URL = https://your-railway-app.railway.app' 
      }, { status: 500 });
    }
    
    console.log('Proxying channels request to:', `${apiUrl}/api/channels`);
    
    const response = await fetch(`${apiUrl}/api/channels`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

