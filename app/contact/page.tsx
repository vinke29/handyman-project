'use client';

import { motion } from 'framer-motion';
import { Wrench, ArrowLeft, Mail, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
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
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#e8a838] mb-4">Contact</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f5f0e8] leading-[1.1] mb-4">
              Get in touch.
            </h1>
            <p className="text-base text-[#888880] font-light leading-relaxed mb-12">
              Have a question about membership, want to partner with us, or just
              want to say hi? We&apos;d love to hear from you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid sm:grid-cols-3 gap-6 mb-16"
          >
            {[
              {
                icon: Mail,
                title: 'Email us',
                detail: 'hello@homefix.team',
                href: 'mailto:hello@homefix.team',
              },
              {
                icon: MapPin,
                title: 'Service area',
                detail: 'Raleigh-Durham, NC',
                href: null,
              },
              {
                icon: Clock,
                title: 'Response time',
                detail: 'Within 24 hours',
                href: null,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 bg-[#151515] border border-[#2a2a2a] rounded-2xl"
              >
                <div className="w-10 h-10 rounded-xl bg-[#e8a838]/10 flex items-center justify-center mb-4">
                  <item.icon className="h-4 w-4 text-[#e8a838]" />
                </div>
                <h3 className="text-sm font-semibold text-[#f5f0e8] mb-1.5">{item.title}</h3>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm text-[#e8a838] hover:underline"
                  >
                    {item.detail}
                  </a>
                ) : (
                  <p className="text-sm text-[#888880] font-light">{item.detail}</p>
                )}
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#151515] border border-[#2a2a2a] rounded-2xl p-8 sm:p-10 text-center"
          >
            <h2 className="text-2xl font-bold text-[#f5f0e8] mb-3">
              Ready to try HomeFix?
            </h2>
            <p className="text-sm text-[#888880] font-light mb-6">
              Your first visit is just $29 — 2 hours of real work, no commitment after.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#e8a838] text-[#0a0a0a] text-sm uppercase tracking-widest font-semibold rounded-full hover:bg-[#f5bc5c] transition-colors"
            >
              Get Started
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
