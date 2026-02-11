import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const cookie = req.cookies.get('admin_session')?.value;
  if (!adminPassword || !cookie || cookie !== await hashPassword(adminPassword)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const type = req.nextUrl.searchParams.get('type');
  if (type !== 'first-visit' && type !== 'membership') {
    return NextResponse.json({ error: 'Invalid type. Use "first-visit" or "membership".' }, { status: 400 });
  }

  try {
    const stripe = getStripe();

    if (type === 'first-visit') {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: { name: 'HomeFix First Visit' },
              unit_amount: 2900,
            },
            quantity: 1,
          },
        ],
        success_url: 'https://homefix.team?payment=success',
        cancel_url: 'https://homefix.team?payment=cancelled',
      });

      return NextResponse.json({ url: session.url });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'HomeFix Monthly Membership' },
            unit_amount: 9900,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      success_url: 'https://homefix.team?payment=success',
      cancel_url: 'https://homefix.team?payment=cancelled',
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe session creation error:', error);
    return NextResponse.json({ error: 'Failed to create payment link' }, { status: 500 });
  }
}
