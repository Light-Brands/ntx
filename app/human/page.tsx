'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const benefits = [
  {
    title: 'Sharper Focus',
    stat: '+40%',
    description: 'Stay present and attentive in daily life, from conversations to complex tasks.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
        <circle cx="12" cy="12" r="6" strokeWidth={1.5} />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Clearer Thinking',
    stat: '-40%',
    description: 'Make better decisions with reduced mental fog and fewer cognitive errors.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Better Awareness',
    stat: '+34%',
    description: 'Expand your peripheral vision and notice more of the world around you.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: 'Lasting Energy',
    stat: '+99%',
    description: 'Build mental resilience that helps you stay sharp even when tired.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

const steps = [
  {
    number: '1',
    title: 'Take a seat',
    description: 'Find a comfortable spot with your laptop, tablet, or PC. No special equipment needed.',
    emoji: '🪑',
  },
  {
    number: '2',
    title: 'Watch the spheres',
    description: 'Follow highlighted 3D spheres as they move and mix with others on screen.',
    emoji: '👀',
  },
  {
    number: '3',
    title: 'Train your brain',
    description: 'In just 6 minutes, our adaptive system exercises your cognitive abilities.',
    emoji: '🧠',
  },
]

const testimonials = [
  {
    quote: "I feel more present in conversations and less scattered throughout the day.",
    author: "Sarah M.",
    role: "Parent & Remote Worker",
  },
  {
    quote: "After a month of training, I noticed I could track multiple things at once—kids, cooking, work calls.",
    author: "Marcus T.",
    role: "Stay-at-home Dad",
  },
  {
    quote: "It's like mental yoga. A simple daily practice that genuinely makes a difference.",
    author: "Elena K.",
    role: "Yoga Instructor",
  },
]

export default function HumanPage() {
  const [scrolled, setScrolled] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-amber-50 text-stone-900 selection:bg-amber-300/50">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-amber-50/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-amber-500/20">
              NTX
            </div>
            <div className="hidden md:block">
              <p className="font-semibold text-stone-800">NeuroTracker</p>
              <p className="text-xs text-amber-600">for Everyone</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#benefits" className="text-stone-600 hover:text-amber-700 transition-colors">Benefits</a>
            <a href="#how-it-works" className="text-stone-600 hover:text-amber-700 transition-colors">How It Works</a>
            <a href="#stories" className="text-stone-600 hover:text-amber-700 transition-colors">Stories</a>
          </div>

          <Link
            href="#start"
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-sm font-semibold rounded-full transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
          >
            Try Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Organic background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/60 to-transparent rounded-full" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-full text-sm text-amber-700 font-medium mb-8 shadow-sm">
            <span className="text-lg">🌱</span>
            Nurture your mind naturally
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 leading-tight mb-6">
            A healthier mind starts
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-emerald-600">
              with 6 minutes a day
            </span>
          </h1>

          <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            NeuroTracker is like fitness training for your brain. Simple exercises that help you think clearer, focus better, and feel more present—backed by real science.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="#start"
              className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-full transition-all shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 flex items-center justify-center gap-2"
            >
              Begin Your Journey
              <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm border border-stone-200 hover:border-amber-300 text-stone-700 font-semibold rounded-full transition-all hover:bg-white flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              See How It Works
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-stone-500">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              120+ scientific studies
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No special equipment
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Just 6 minutes daily
            </span>
          </div>
        </div>
      </section>

      {/* Social Proof - Friendly version */}
      <section className="py-12 border-y border-amber-200/50 bg-white/50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-sm text-stone-500 mb-6">
            Trusted by over 1,000 organizations worldwide, from elite sports teams to wellness centers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {['Premier League', 'NASA', 'NFL', 'Mayo Clinic'].map((name) => (
              <span key={name} className="text-stone-400 font-semibold">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-3xl mb-4 block">✨</span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
              Real benefits you can feel
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              These aren&apos;t just numbers—they&apos;re improvements in how you experience everyday life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group relative p-8 bg-white rounded-3xl border border-stone-200/80 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-100 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-emerald-100 text-amber-600 flex items-center justify-center group-hover:from-amber-200 group-hover:to-emerald-200 transition-all">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-stone-800">{benefit.title}</h3>
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full">
                        {benefit.stat}
                      </span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-3xl mb-4 block">🎯</span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
              Simple as 1-2-3
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              No complicated setup, no learning curve. Just you and 6 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-full h-px bg-gradient-to-r from-amber-300 to-transparent" />
                )}

                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-amber-100 via-white to-emerald-100 border border-amber-200/50 flex items-center justify-center text-4xl shadow-lg shadow-amber-100">
                    {step.emoji}
                  </div>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-sm mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 mb-3">{step.title}</h3>
                  <p className="text-stone-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual demo placeholder */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="aspect-video rounded-3xl bg-gradient-to-br from-stone-100 to-stone-50 border border-stone-200 flex items-center justify-center overflow-hidden relative">
              {/* Animated spheres visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  {/* Orbiting spheres */}
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-400/30" />
                  </div>
                  <div className="absolute inset-4 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-400/30" />
                  </div>
                  <div className="absolute inset-12 animate-spin" style={{ animationDuration: '6s' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-400/30" />
                  </div>
                  {/* Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-stone-300" />
                  </div>
                </div>
              </div>
              {/* Label */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-stone-600 shadow-lg">
                Track the highlighted spheres as they move
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="stories" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-3xl mb-4 block">💬</span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
              Stories from real people
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative bg-white rounded-3xl border border-stone-200 shadow-xl shadow-stone-100 p-8 md:p-12">
              {/* Quote icon */}
              <div className="absolute -top-5 left-10 w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="min-h-[120px]">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.author}
                    className={`transition-opacity duration-500 ${index === activeTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0 p-8 md:p-12'}`}
                  >
                    <blockquote className="text-xl md:text-2xl text-stone-700 leading-relaxed mb-6">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 to-emerald-200 flex items-center justify-center font-bold text-amber-700">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-stone-800">{testimonial.author}</p>
                        <p className="text-sm text-stone-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots indicator */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === activeTestimonial ? 'w-6 bg-amber-500' : 'bg-stone-300 hover:bg-stone-400'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Science credibility - friendly version */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-emerald-100 mb-4">A note on the science</p>
          <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
            &ldquo;Creating Better Humans will always be more important than creating smarter machines.&rdquo;
          </blockquote>
          <p className="text-emerald-100">
            — Gary Kasparov, World Chess Champion
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm">
            <span className="text-emerald-100">120+ peer-reviewed studies</span>
            <span className="text-emerald-100">15+ years of research</span>
            <span className="text-emerald-100">$67M in funding</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="start" className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative bg-gradient-to-br from-amber-50 via-white to-emerald-50 rounded-[2rem] border border-amber-200/50 shadow-2xl shadow-amber-100/50 p-8 md:p-12 text-center overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl" />

            <div className="relative z-10">
              <span className="text-5xl mb-6 block">🌟</span>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
                Ready to feel the difference?
              </h2>
              <p className="text-lg text-stone-600 mb-8 max-w-xl mx-auto">
                Join thousands of people who&apos;ve discovered a simple way to nurture their cognitive wellbeing. Start your free trial today.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <button className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-full transition-all shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 flex items-center justify-center gap-2 text-lg">
                  Start Free Trial
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button className="w-full sm:w-auto px-10 py-4 bg-white border border-stone-200 hover:border-amber-300 text-stone-700 font-semibold rounded-full transition-all hover:bg-amber-50 flex items-center justify-center gap-2">
                  Learn More
                </button>
              </div>

              <p className="text-sm text-stone-500">
                Works on laptop, tablet, or PC • No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-200/50 py-8 bg-white/50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              NTX
            </div>
            <span className="text-sm text-stone-500">NeuroTracker • Wellness Edition</span>
          </div>

          <Link
            href="/"
            className="text-sm text-stone-500 hover:text-amber-600 transition-colors flex items-center gap-2"
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
