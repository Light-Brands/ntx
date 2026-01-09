'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const stats = [
  { label: 'Peripheral Vision', value: '+34%', description: 'Enhanced awareness' },
  { label: 'Fatigue Resilience', value: '+99%', description: 'Sustained performance' },
  { label: 'Focus', value: '+40%', description: 'Unwavering concentration' },
  { label: 'Decision Speed', value: '-40%', description: 'Faster reactions' },
]

const clients = [
  'Premier League',
  'NFL',
  'NBA',
  'F1 Racing',
  'NASA',
  'USAF',
  'UFC',
  'NHL',
]

const steps = [
  {
    number: '01',
    title: 'CALIBRATE',
    description: 'Our patented algorithm measures your baseline cognitive performance in under 6 minutes.',
  },
  {
    number: '02',
    title: 'TRAIN',
    description: 'Adaptive 3D object tracking pushes your limits while maintaining optimal challenge threshold.',
  },
  {
    number: '03',
    title: 'DOMINATE',
    description: 'Translate enhanced cognitive abilities into real-world competitive advantage.',
  },
]

export default function ElitePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-500/30">
      {/* Fixed Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center font-black text-sm tracking-tighter transition-transform group-hover:scale-105">
              NTX
            </div>
            <div className="hidden md:block">
              <p className="font-bold tracking-tight text-sm">NEUROTRACKER</p>
              <p className="text-[10px] tracking-[0.3em] text-red-500">ELITE</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#science" className="text-white/60 hover:text-white transition-colors tracking-wide">SCIENCE</a>
            <a href="#benefits" className="text-white/60 hover:text-white transition-colors tracking-wide">BENEFITS</a>
            <a href="#method" className="text-white/60 hover:text-white transition-colors tracking-wide">METHOD</a>
          </div>

          <Link
            href="#cta"
            className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-sm font-bold tracking-wider transition-all hover:shadow-lg hover:shadow-red-600/30 rounded"
          >
            GET ACCESS
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="mb-8">
            <p className="text-xs md:text-sm tracking-[0.4em] text-red-500 uppercase mb-4 animate-fade-in">
              nothing artificial
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
              <span className="block">ENHANCING</span>
              <span className="block bg-gradient-to-r from-white via-white to-red-500 bg-clip-text text-transparent">
                HUMANS
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto tracking-wide">
              The cognitive training system trusted by elite performers worldwide.
              <span className="text-white font-semibold"> 6 minutes.</span> Measurable results.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="#cta"
              className="group px-8 py-4 bg-red-600 hover:bg-red-500 font-bold tracking-wider text-sm transition-all hover:shadow-xl hover:shadow-red-600/30 rounded flex items-center gap-3"
            >
              UNLOCK YOUR EDGE
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="#method"
              className="px-8 py-4 border border-white/20 hover:border-white/40 font-bold tracking-wider text-sm transition-all rounded hover:bg-white/5"
            >
              SEE THE METHOD
            </Link>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-red-500">120+</p>
              <p className="text-xs tracking-wider text-white/40 uppercase">Studies</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-white">1000+</p>
              <p className="text-xs tracking-wider text-white/40 uppercase">Installations</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-amber-500">57+</p>
              <p className="text-xs tracking-wider text-white/40 uppercase">Countries</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="relative py-12 border-y border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-center text-xs tracking-[0.3em] text-white/30 uppercase mb-8">
            Trusted by elite organizations worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {clients.map((client) => (
              <span
                key={client}
                className="text-lg md:text-xl font-bold tracking-wider text-white/20 hover:text-white/60 transition-colors cursor-default"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] text-red-500 uppercase mb-4">Cognitive Enhancement</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              PERFORMANCE <span className="text-red-500">METRICS</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Measurable improvements validated across 120+ peer-reviewed studies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative p-8 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-red-500/30 transition-all duration-500"
              >
                <div className="absolute top-4 right-4 text-5xl font-black text-white/[0.03] group-hover:text-red-500/10 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <p className="text-4xl md:text-5xl font-black text-red-500 mb-2">{stat.value}</p>
                <p className="text-lg font-bold tracking-wide mb-1">{stat.label}</p>
                <p className="text-sm text-white/40">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Method Section */}
      <section id="method" className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.4em] text-amber-500 uppercase mb-4">The Protocol</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8">
                6 MINUTES TO <span className="text-red-500">DOMINANCE</span>
              </h2>

              <div className="space-y-8">
                {steps.map((step) => (
                  <div key={step.number} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-red-600/20 to-transparent border border-red-500/20 flex items-center justify-center font-black text-red-500 group-hover:border-red-500/50 transition-colors">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-wider mb-2 group-hover:text-red-500 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-white/50 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-red-950/50 via-black to-black border border-white/5 flex items-center justify-center overflow-hidden">
                {/* Abstract visualization */}
                <div className="relative w-full h-full p-12">
                  {/* Center core */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-red-600/20 blur-2xl animate-pulse" />
                  </div>
                  {/* Orbiting elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full border border-white/10 animate-spin" style={{ animationDuration: '20s' }}>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-red-500" />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-72 h-72 rounded-full border border-white/5 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-500" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-white/50" />
                    </div>
                  </div>
                  {/* Center text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <p className="text-6xl font-black text-white">6</p>
                    <p className="text-xs tracking-[0.3em] text-white/50 uppercase">Minutes</p>
                  </div>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-red-500/30 rounded-br-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section id="science" className="relative py-24 md:py-32 bg-gradient-to-b from-red-950/20 via-black to-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs tracking-[0.4em] text-red-500 uppercase mb-4">Scientific Foundation</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8">
              VALIDATED BY <span className="text-amber-500">SCIENCE</span>
            </h2>

            <blockquote className="text-xl md:text-2xl text-white/80 italic mb-8 leading-relaxed">
              &ldquo;Creating Better Humans will always be more important than creating smarter machines.&rdquo;
            </blockquote>
            <p className="text-white/40 mb-12">
              — Gary Kasparov, World Chess Champion
            </p>

            <div className="grid grid-cols-3 gap-8 p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-black text-red-500">120+</p>
                <p className="text-xs tracking-wider text-white/40 uppercase mt-1">Peer-Reviewed Studies</p>
              </div>
              <div className="text-center border-x border-white/5">
                <p className="text-3xl md:text-4xl font-black text-white">$67M</p>
                <p className="text-xs tracking-wider text-white/40 uppercase mt-1">Total Funding</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-black text-amber-500">$27M</p>
                <p className="text-xs tracking-wider text-white/40 uppercase mt-1">Gov. Grants</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/30 via-transparent to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p className="text-xs tracking-[0.4em] text-red-500 uppercase mb-4">Ready to Dominate?</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            CLAIM YOUR <span className="text-red-500">EDGE</span>
          </h2>
          <p className="text-lg text-white/60 mb-12 max-w-xl mx-auto">
            Join the elite performers who trust NeuroTracker X to maintain their competitive advantage.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button className="group w-full sm:w-auto px-12 py-5 bg-red-600 hover:bg-red-500 font-bold tracking-wider transition-all hover:shadow-xl hover:shadow-red-600/30 rounded flex items-center justify-center gap-3">
              REQUEST ELITE ACCESS
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button className="w-full sm:w-auto px-12 py-5 border border-white/20 hover:border-amber-500/50 font-bold tracking-wider transition-all rounded hover:bg-amber-500/5 text-amber-500">
              SPEAK TO AN EXPERT
            </button>
          </div>

          <p className="text-xs text-white/30">
            Available on laptop, PC, and tablet. Optional 3D glasses for enhanced results.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center font-black text-xs">
              NTX
            </div>
            <span className="text-sm text-white/40">NeuroTracker X &bull; Elite Edition</span>
          </div>

          <Link
            href="/"
            className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2"
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
