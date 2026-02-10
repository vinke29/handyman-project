import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { getResend } from '@/lib/resend';

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

    // Save lead to Supabase
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from('leads').insert({
        name,
        email,
        phone: phone || null,
        zip: zip || null,
        first_fix: firstFix || null,
      });
      if (error) {
        console.error('Supabase insert error:', error);
      }
    } catch (err) {
      console.error('Supabase error:', err);
    }

    // Send notification email via Resend
    try {
      const notificationEmail = process.env.NOTIFICATION_EMAIL;
      if (notificationEmail) {
        const resend = getResend();
        await resend.emails.send({
          from: 'Leads <onboarding@resend.dev>',
          to: notificationEmail,
          subject: `New Lead: ${name}`,
          html: `
            <h2>New Lead Submitted</h2>
            <table>
              <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
              <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
              <tr><td><strong>Phone:</strong></td><td>${phone || '—'}</td></tr>
              <tr><td><strong>Zip:</strong></td><td>${zip || '—'}</td></tr>
              <tr><td><strong>First Fix:</strong></td><td>${firstFix || '—'}</td></tr>
              <tr><td><strong>Time:</strong></td><td>${new Date().toISOString()}</td></tr>
            </table>
          `,
        });
      } else {
        console.warn('NOTIFICATION_EMAIL not set — skipping email notification');
      }
    } catch (err) {
      console.error('Resend email error:', err);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Lead submission error:', error);
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
