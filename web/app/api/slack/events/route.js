// Webhook endpoint for Slack events
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // URL verification challenge
    if (body.type === 'url_verification') {
      return NextResponse.json({ challenge: body.challenge });
    }
    
    // Handle events
    if (body.type === 'event_callback') {
      // Process events here if needed
      console.log('Event received:', body.event);
    }
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

