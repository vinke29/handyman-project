'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw, LogOut, Users, CalendarCheck, Link, Check } from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  zip: string | null;
  first_fix: string | null;
  created_at: string;
}

interface Stats {
  total: number;
  todayCount: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, todayCount: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [linkLoading, setLinkLoading] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/leads');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      setLeads(data.leads);
      setStats(data.stats);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  function handleRefresh() {
    setRefreshing(true);
    fetchLeads();
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  async function generatePaymentLink(type: 'first-visit' | 'membership') {
    setLinkLoading(type);
    try {
      const res = await fetch(`/api/admin/stripe?type=${type}`, { method: 'POST' });
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      if (data.url) {
        await navigator.clipboard.writeText(data.url);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
      }
    } catch (err) {
      console.error('Failed to generate payment link:', err);
    } finally {
      setLinkLoading(null);
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8]">
      {/* Nav */}
      <nav className="border-b border-[#2a2a2a] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold">HomeFix Admin</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-[#151515] border border-[#2a2a2a] rounded-lg hover:border-[#e8a838]/30 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-[#151515] border border-[#2a2a2a] rounded-lg hover:border-red-500/30 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-6 bg-[#151515] border border-[#2a2a2a] rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-[#e8a838]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#e8a838]" />
              </div>
              <span className="text-sm text-[#888880]">Total Leads</span>
            </div>
            <p className="text-3xl font-bold">{loading ? '—' : stats.total}</p>
          </div>
          <div className="p-6 bg-[#151515] border border-[#2a2a2a] rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-[#e8a838]/10 flex items-center justify-center">
                <CalendarCheck className="w-5 h-5 text-[#e8a838]" />
              </div>
              <span className="text-sm text-[#888880]">Today&apos;s Leads</span>
            </div>
            <p className="text-3xl font-bold">{loading ? '—' : stats.todayCount}</p>
          </div>
        </div>

        {/* Payment Links */}
        <div className="mb-8 p-6 bg-[#151515] border border-[#2a2a2a] rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#e8a838]/10 flex items-center justify-center">
              <Link className="w-5 h-5 text-[#e8a838]" />
            </div>
            <h2 className="text-sm font-medium text-[#888880]">Payment Links</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => generatePaymentLink('first-visit')}
              disabled={linkLoading !== null}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#e8a838] text-[#0a0a0a] rounded-lg hover:bg-[#e8a838]/90 transition-colors disabled:opacity-50"
            >
              {copied === 'first-visit' ? (
                <><Check className="w-4 h-4" /> Copied!</>
              ) : linkLoading === 'first-visit' ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</>
              ) : (
                '$29 First Visit'
              )}
            </button>
            <button
              onClick={() => generatePaymentLink('membership')}
              disabled={linkLoading !== null}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#e8a838] text-[#0a0a0a] rounded-lg hover:bg-[#e8a838]/90 transition-colors disabled:opacity-50"
            >
              {copied === 'membership' ? (
                <><Check className="w-4 h-4" /> Copied!</>
              ) : linkLoading === 'membership' ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</>
              ) : (
                '$99/mo Membership'
              )}
            </button>
          </div>
        </div>

        {/* Leads Table */}
        {loading ? (
          <div className="text-center py-20 text-[#888880]">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="text-center py-20 text-[#888880]">No leads yet.</div>
        ) : (
          <div className="overflow-x-auto border border-[#2a2a2a] rounded-2xl">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#2a2a2a] bg-[#151515]">
                  <th className="px-4 py-3 font-medium text-[#888880]">Name</th>
                  <th className="px-4 py-3 font-medium text-[#888880]">Email</th>
                  <th className="px-4 py-3 font-medium text-[#888880] hidden md:table-cell">Phone</th>
                  <th className="px-4 py-3 font-medium text-[#888880] hidden md:table-cell">Zip</th>
                  <th className="px-4 py-3 font-medium text-[#888880] hidden md:table-cell">First Fix</th>
                  <th className="px-4 py-3 font-medium text-[#888880]">Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-[#2a2a2a] last:border-b-0 hover:bg-[#151515]/50">
                    <td className="px-4 py-3 font-medium">{lead.name}</td>
                    <td className="px-4 py-3 text-[#888880]">{lead.email}</td>
                    <td className="px-4 py-3 text-[#888880] hidden md:table-cell">{lead.phone || '—'}</td>
                    <td className="px-4 py-3 text-[#888880] hidden md:table-cell">{lead.zip || '—'}</td>
                    <td className="px-4 py-3 text-[#888880] hidden md:table-cell max-w-[200px] truncate">{lead.first_fix || '—'}</td>
                    <td className="px-4 py-3 text-[#888880] whitespace-nowrap">{formatDate(lead.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
