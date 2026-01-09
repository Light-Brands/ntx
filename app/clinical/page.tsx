'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const stats = [
  { label: 'Peripheral Vision', value: '+34%', icon: 'eye' },
  { label: 'Fatigue Resilience', value: '+99%', icon: 'battery' },
  { label: 'Focus & Productivity', value: '+40%', icon: 'target' },
  { label: 'Decision Errors', value: '-40%', icon: 'check' },
]

const researchStats = [
  { number: '120+', label: 'Peer-reviewed studies', sublabel: 'Published research' },
  { number: '15+', label: 'Years of research', sublabel: 'Since 2009' },
  { number: '50+', label: 'Universities', sublabel: 'Research partners' },
  { number: '1000+', label: 'Installations', sublabel: 'Worldwide' },
]

const institutions = [
  { name: 'NASA', type: 'Aerospace' },
  { name: 'USAF', type: 'Military' },
  { name: 'Premier League', type: 'Sports Science' },
  { name: 'Mayo Clinic', type: 'Healthcare' },
  { name: 'Harvard', type: 'Research' },
  { name: 'MIT', type: 'Research' },
]

const applications = [
  {
    title: 'Clinical Assessment',
    description: 'Objective cognitive baseline measurement for patient evaluation and treatment monitoring.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: 'Research Protocol',
    description: 'Standardized methodology for cognitive research with comprehensive data collection.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: 'Rehabilitation',
    description: 'Evidence-based cognitive rehabilitation for TBI, concussion, and neurological conditions.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Performance Science',
    description: 'Quantitative cognitive enhancement training for athletic and professional performance.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

export default function ClinicalPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500/20">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
              NTX
            </div>
            <div className="hidden md:block">
              <p className="font-semibold text-slate-900 text-sm">NeuroTracker X</p>
              <p className="text-xs text-blue-600 font-medium">Clinical Edition</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#research" className="text-slate-600 hover:text-blue-600 transition-colors">Research</a>
            <a href="#applications" className="text-slate-600 hover:text-blue-600 transition-colors">Applications</a>
            <a href="#evidence" className="text-slate-600 hover:text-blue-600 transition-colors">Evidence</a>
          </div>

          <Link
            href="#contact"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-blue-600/25"
          >
            Request Demo
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.08),transparent_50%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-sm text-blue-700 font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Evidence-Based Cognitive Training
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Scientifically Validated
              <span className="block text-blue-600">Cognitive Assessment</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl">
              NeuroTracker X provides objective, standardized cognitive measurement and training validated by over 120 peer-reviewed studies across clinical, research, and performance applications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/25 gap-2"
              >
                Start Your Assessment
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="#research"
                className="inline-flex items-center justify-center px-8 py-4 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 font-semibold rounded-xl transition-all hover:bg-blue-50 gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                View Research
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                HIPAA Compliant
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                IRB Approved
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                FDA Registered
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Stats */}
      <section id="research" className="relative py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {researchStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-1">{stat.number}</p>
                <p className="font-semibold text-slate-900">{stat.label}</p>
                <p className="text-sm text-slate-500">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cognitive Metrics */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase mb-3">Measurable Outcomes</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Quantified Cognitive Improvement
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Statistically significant improvements documented across multiple cognitive domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="relative p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white">
                    {stat.icon === 'eye' && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                    {stat.icon === 'battery' && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                    {stat.icon === 'target' && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" strokeWidth={2} />
                        <circle cx="12" cy="12" r="6" strokeWidth={2} />
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                      </svg>
                    )}
                    {stat.icon === 'check' && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                </div>
                <p className="font-semibold text-slate-900">{stat.label}</p>
                <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-teal-500 h-1.5 rounded-full transition-all duration-1000 group-hover:w-full"
                    style={{ width: index === 3 ? '60%' : `${30 + index * 20}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section id="applications" className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase mb-3">Applications</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Multi-Domain Clinical Applications
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                NeuroTracker X serves diverse clinical and research needs with standardized protocols and comprehensive data analytics.
              </p>

              <div className="space-y-6">
                {applications.map((app) => (
                  <div key={app.title} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {app.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {app.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{app.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data visualization placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 p-8 overflow-hidden">
                {/* Chart visualization */}
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-slate-500">Cognitive Performance Index</p>
                      <p className="text-2xl font-bold text-slate-900">87.4 <span className="text-green-500 text-sm">+12.3%</span></p>
                    </div>
                    <div className="flex gap-1">
                      {['1W', '1M', '3M', '1Y'].map((period, i) => (
                        <button key={period} className={`px-3 py-1 text-xs font-medium rounded-lg ${i === 2 ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Simple line chart visualization */}
                  <div className="flex-1 relative">
                    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                      {/* Grid lines */}
                      {[0, 1, 2, 3, 4].map((i) => (
                        <line key={i} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="#e2e8f0" strokeWidth="1" />
                      ))}
                      {/* Chart line */}
                      <path
                        d="M0,150 C50,140 100,120 150,100 S250,60 300,50 S350,40 400,30"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Gradient fill */}
                      <path
                        d="M0,150 C50,140 100,120 150,100 S250,60 300,50 S350,40 400,30 L400,200 L0,200 Z"
                        fill="url(#fillGradient)"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#14b8a6" />
                        </linearGradient>
                        <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.02" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Data points */}
                    <div className="absolute top-[12%] right-[5%] w-3 h-3 bg-teal-500 rounded-full border-2 border-white shadow-lg" />
                  </div>

                  {/* Bottom metrics */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-500">Sessions</p>
                      <p className="font-semibold text-slate-900">24</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Avg. Score</p>
                      <p className="font-semibold text-slate-900">2.4</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Improvement</p>
                      <p className="font-semibold text-green-600">+34%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Clinical Grade</p>
                  <p className="text-sm font-semibold text-slate-900">Data Export Ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence & Partners */}
      <section id="evidence" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase mb-3">Trusted Partners</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Deployed Across Leading Institutions
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {institutions.map((inst) => (
              <div
                key={inst.name}
                className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all text-center group"
              >
                <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                  {inst.name}
                </p>
                <p className="text-xs text-slate-500">{inst.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <svg className="w-12 h-12 mx-auto mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
            &ldquo;Creating Better Humans will always be more important than creating smarter machines.&rdquo;
          </blockquote>
          <p className="text-white/70">
            Gary Kasparov, World Chess Champion
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 md:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Schedule a Clinical Demo
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
              See how NeuroTracker X can enhance your clinical practice or research program with a personalized demonstration.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/25 flex items-center justify-center gap-2">
                Request Clinical Demo
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="w-full sm:w-auto px-8 py-4 border border-slate-300 hover:border-blue-300 text-slate-700 font-semibold rounded-xl transition-all hover:bg-blue-50 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Research Summary
              </button>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Available on laptop, PC, and tablet platforms
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white font-bold text-xs">
              NTX
            </div>
            <span className="text-sm text-slate-500">NeuroTracker X &bull; Clinical Edition</span>
          </div>

          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            View Other Demos
          </Link>
        </div>
      </footer>
    </div>
  )
}
