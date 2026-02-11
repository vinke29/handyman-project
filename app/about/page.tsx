'use client';

import { motion } from 'framer-motion';
import { Wrench, ArrowLeft, Users, Heart, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#e8a838] rounded-lg flex items-center justify-center">
              <Wrench className="h-4 w-4 text-[#0a0a0a]" />
            </div>
            <span className="text-sm font-semibold tracking-wide uppercase text-[#f5f0e8]">
              HomeFix
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[#888880] hover:text-[#f5f0e8] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#e8a838] mb-4">About</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f5f0e8] leading-[1.1] mb-8">
              Home maintenance<br />
              <span className="text-[#888880]">shouldn&apos;t be this hard.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-base text-[#888880] font-light leading-relaxed"
          >
            <p>
              Every homeowner knows the drill. Something breaks, you Google
              &ldquo;handyman near me,&rdquo; scroll through a dozen listings, call three
              people, get one callback, and wait two weeks for someone you&apos;ve
              never met to show up and charge you $150 for an hour of work.
            </p>
            <p>
              We started HomeFix because we were tired of it too. The idea is
              simple: what if you had <em className="text-[#c8c8c0] not-italic font-medium">your own</em> handyman?
              Someone who knows your home, shows up when you need them, and
              doesn&apos;t nickel-and-dime you every time.
            </p>
            <p>
              That&apos;s HomeFix. One membership, one dedicated handyman, one flat
              monthly price. No call-out fees, no surprise quotes, no repeating
              yourself to a stranger every time something needs fixing.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid sm:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Users,
                title: 'Relationship-first',
                desc: 'Your handyman learns your home. Second visit, they already know what to bring.',
              },
              {
                icon: Heart,
                title: 'Fair pricing',
                desc: 'No call-out fees, no inflated quotes. One flat price, everything included.',
              },
              {
                icon: MapPin,
                title: 'Local to Raleigh-Durham',
                desc: 'We serve the Triangle area with plans to expand. Our pros live where you live.',
              },
            ].map((v, i) => (
              <div
                key={v.title}
                className="p-6 bg-[#151515] border border-[#2a2a2a] rounded-2xl"
              >
                <div className="w-10 h-10 rounded-xl bg-[#e8a838]/10 flex items-center justify-center mb-4">
                  <v.icon className="h-4 w-4 text-[#e8a838]" />
                </div>
                <h3 className="text-sm font-semibold text-[#f5f0e8] mb-1.5">{v.title}</h3>
                <p className="text-xs text-[#888880] leading-relaxed font-light">{v.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#e8a838] text-[#0a0a0a] text-sm uppercase tracking-widest font-semibold rounded-full hover:bg-[#f5bc5c] transition-colors"
            >
              Try It for $29
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#e8a838] rounded-md flex items-center justify-center">
              <Wrench className="h-3 w-3 text-[#0a0a0a]" />
            </div>
            <span className="text-xs font-semibold tracking-wide uppercase text-[#888880]">
              HomeFix
            </span>
          </div>
          <p className="text-xs text-[#888880]">
            &copy; {new Date().getFullYear()} HomeFix. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/about" className="text-xs text-[#888880] hover:text-[#f5f0e8] transition-colors">About</Link>
            <Link href="/contact" className="text-xs text-[#888880] hover:text-[#f5f0e8] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
