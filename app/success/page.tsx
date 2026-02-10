'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight, Wrench, Calendar, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      {/* Background glow */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-[#e8a838]/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-lg w-full text-center"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 bg-[#e8a838]/10 border border-[#e8a838]/20 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <Check className="h-9 w-9 text-[#e8a838]" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-[#f5f0e8] mb-4"
        >
          Welcome to the club.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-base text-[#888880] font-light leading-relaxed mb-10"
        >
          Your membership is active. You&apos;re one of the founding 50 — 
          your rate is locked at $99/mo for life, and your first month is on us.
        </motion.p>

        {/* What happens next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-[#151515] border border-[#2a2a2a] rounded-2xl p-8 mb-8 text-left"
        >
          <h3 className="text-sm uppercase tracking-[0.2em] text-[#e8a838] font-semibold mb-6">
            What happens next
          </h3>

          <div className="space-y-5">
            {[
              {
                icon: Phone,
                title: 'We\'ll call you within 24 hours',
                desc: 'Quick intro, learn about your home, answer any questions.',
              },
              {
                icon: Wrench,
                title: 'Meet your handyman',
                desc: 'We\'ll match you with a dedicated pro in your area.',
              },
              {
                icon: Calendar,
                title: 'Schedule your first visit',
                desc: 'Pick a time that works. We\'ll be there.',
              },
              {
                icon: MessageCircle,
                title: 'Text them directly',
                desc: 'From day one, you can message your handyman anytime.',
              },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#e8a838]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <step.icon className="h-3.5 w-3.5 text-[#e8a838]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#f5f0e8] mb-0.5">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#888880] font-light">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#888880] hover:text-[#f5f0e8] transition-colors"
          >
            Back to home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
