import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { plan, email } = body as { plan?: string; email?: string };

    const isAnnual = plan === 'annual';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3003';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: isAnnual
                ? 'Handyman Club — Annual Membership'
                : 'Handyman Club — Monthly Membership',
              description: isAnnual
                ? '1 visit/month (up to 2 hrs). Billed annually at $1,008/yr. Save 15%.'
                : '1 visit/month (up to 2 hrs). Cancel anytime.',
            },
            unit_amount: isAnnual ? 100800 : 9900, // $1,008/year or $99/month
            recurring: {
              interval: isAnnual ? 'year' : 'month',
            },
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#pricing`,
      metadata: {
        plan: isAnnual ? 'annual' : 'monthly',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Stripe checkout error:', error);
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
