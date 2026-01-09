'use client'

import Link from 'next/link'
import { useState } from 'react'

const demos = [
  {
    id: 'elite',
    name: 'ELITE',
    subtitle: 'Performance Edition',
    description: 'Dark, powerful, and aggressive. Built for elite athletes, F1 drivers, and military operators who demand the competitive edge.',
    target: 'Pro Athletes, F1, eSports, Military',
    colors: {
      primary: '#DC2626',
      secondary: '#D4AF37',
      bg: '#0A0A0A',
    },
    gradient: 'from-red-600 via-red-900 to-black',
    accent: 'hover:border-red-500 hover:shadow-red-500/30',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'clinical',
    name: 'CLINICAL',
    subtitle: 'Scientific Edition',
    description: 'Clean, trustworthy, and data-driven. Designed for healthcare professionals, researchers, and educational institutions.',
    target: 'Healthcare, Research, Education',
    colors: {
      primary: '#0066CC',
      secondary: '#5BB8B0',
      bg: '#F8FAFC',
    },
    gradient: 'from-blue-600 via-blue-800 to-slate-900',
    accent: 'hover:border-blue-500 hover:shadow-blue-500/30',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 'human',
    name: 'HUMAN',
    subtitle: 'Wellness Edition',
    description: 'Warm, inviting, and accessible. Created for everyday people seeking cognitive wellness and personal growth.',
    target: 'Wellness Centers, Individuals, Families',
    colors: {
      primary: '#D97706',
      secondary: '#059669',
      bg: '#FFFBEB',
    },
    gradient: 'from-amber-500 via-orange-600 to-emerald-800',
    accent: 'hover:border-amber-500 hover:shadow-amber-500/30',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
]

export default function HomePage() {
  const [hoveredDemo, setHoveredDemo] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-blue-900/20 via-transparent to-transparent animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-purple-900/20 via-transparent to-transparent animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8 md:px-12 lg:px-20">
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center font-black text-lg">
              NX
            </div>
            <span className="text-xl font-bold tracking-tight">NeuroTracker X</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-12 md:px-12 lg:px-20 md:py-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm md:text-base tracking-[0.3em] text-white/50 uppercase mb-4">
            Website Demo Selection
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
            Choose Your Vision
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-4">
            Three distinct approaches to presenting NeuroTracker X.
            <br className="hidden md:block" />
            Same powerful content, different emotional connections.
          </p>
          <p className="text-sm text-white/40 mb-16">
            Select one to explore the full landing page experience
          </p>
        </div>
      </section>

      {/* Demo Cards */}
      <section className="relative z-10 px-6 pb-20 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {demos.map((demo, index) => (
              <Link
                key={demo.id}
                href={`/${demo.id}`}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 ${demo.accent} hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1`}
                onMouseEnter={() => setHoveredDemo(demo.id)}
                onMouseLeave={() => setHoveredDemo(null)}
              >
                {/* Card gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${demo.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                {/* Preview area */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${demo.gradient} opacity-80`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        {demo.icon}
                      </div>
                      <p className="text-2xl md:text-3xl font-black tracking-widest">
                        {demo.name}
                      </p>
                      <p className="text-xs tracking-[0.2em] text-white/60 mt-1 uppercase">
                        {demo.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>

                {/* Card content */}
                <div className="relative p-6 md:p-8">
                  <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4">
                    {demo.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-white/40 mb-6">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>{demo.target}</span>
                  </div>

                  {/* Color palette preview */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs text-white/40 uppercase tracking-wider">Palette</span>
                    <div className="flex gap-1.5">
                      <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: demo.colors.primary }} />
                      <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: demo.colors.secondary }} />
                      <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: demo.colors.bg }} />
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                      Explore Demo
                    </span>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/10 transition-all duration-300">
                      <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Footer */}
      <section className="relative z-10 px-6 pb-20 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-white/60">All demos use consistent NTX content</span>
          </div>
          <p className="text-sm text-white/40 max-w-xl mx-auto">
            Each version presents the same core value proposition with a unique visual identity.
            Choose the one that resonates most with your target audience.
          </p>
        </div>
      </section>

      {/* Bottom decorative line */}
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  )
}
