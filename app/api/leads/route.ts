import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, zip, firstFix } = body as {
      name?: string;
      email?: string;
      phone?: string;
      zip?: string;
      firstFix?: string;
    };

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    // Log the lead — visible in Vercel deployment logs
    console.log('═══════════════════════════════════════');
    console.log('🔔 NEW LEAD');
    console.log('═══════════════════════════════════════');
    console.log(`Name:      ${name}`);
    console.log(`Email:     ${email}`);
    console.log(`Phone:     ${phone || '—'}`);
    console.log(`Zip:       ${zip || '—'}`);
    console.log(`First Fix: ${firstFix || '—'}`);
    console.log(`Time:      ${new Date().toISOString()}`);
    console.log('═══════════════════════════════════════');

    // TODO: Wire up to a real backend when ready:
    // - Send notification email via Resend
    // - Save to Google Sheets via API
    // - Store in a database (Vercel Postgres, Supabase, etc.)
    //
    // For now, leads are logged and visible in Vercel's
    // deployment logs: vercel.com → project → Logs

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Lead submission error:', error);
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
