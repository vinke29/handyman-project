import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function GET(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const cookie = req.cookies.get('admin_session')?.value;
  if (!adminPassword || !cookie || cookie !== await hashPassword(adminPassword)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const supabase = getSupabase();

    const { data: leads, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    const today = new Date().toISOString().split('T')[0];
    const todayCount = (leads ?? []).filter(
      (lead) => lead.created_at?.startsWith(today)
    ).length;

    return NextResponse.json({
      leads: leads ?? [],
      stats: {
        total: leads?.length ?? 0,
        todayCount,
      },
    });
  } catch (error) {
    console.error('Leads fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
