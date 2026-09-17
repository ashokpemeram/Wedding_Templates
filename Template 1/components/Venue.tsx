'use client'

import { wedding } from '@/data/wedding'
import { motion } from 'framer-motion'
import { MapPin, Navigation, CalendarPlus, ExternalLink } from 'lucide-react'
import GoldDivider from '@/components/ui/GoldDivider'
import SectionReveal from '@/components/ui/SectionReveal'
import OrnamentalBorder from '@/components/ui/OrnamentalBorder'

function generateICS(): string {
  const start = '20261025T090000'
  const end = '20261025T130000'
  return `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${start}\nDTEND:${end}\nSUMMARY:Arjun & Priya Wedding\nLOCATION:${wedding.venue.name}, ${wedding.venue.address}\nDESCRIPTION:Wedding ceremony of Arjun Kumar & Priya Sharma\nEND:VEVENT\nEND:VCALENDAR`
}

function downloadICS() {
  const data = generateICS()
  const blob = new Blob([data], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'arjun-priya-wedding.ics'
  a.click()
  URL.revokeObjectURL(url)
}

export default function Venue() {
  return (
    <section className="bg-maroon-dark section-padding relative overflow-hidden" id="venue">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <SectionReveal>
          <h2 className="font-cormorant text-4xl sm:text-5xl text-cream font-light tracking-wedding text-center">
            THE VENUE
          </h2>
          
          <div className="my-8">
            <GoldDivider />
          </div>
          
          <div className="max-w-4xl mx-auto">
            <OrnamentalBorder>
              <div className="p-8 sm:p-12 text-center">
                <h3 className="font-cormorant text-3xl sm:text-4xl text-gold font-light mb-4">
                  {wedding.venue.name}
                </h3>
                
                <p className="font-lora text-cream/70 text-sm sm:text-base mb-2">
                  {wedding.venue.address}
                </p>
                
                <p className="font-lora text-gold/80 text-sm mb-8">
                  {wedding.events?.[0]?.date || 'October 25, 2026'} | {wedding.events?.[0]?.time || '09:00 AM'}
                </p>
                
                <a 
                  href={wedding.venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative bg-brown/50 border border-gold/20 h-64 sm:h-80 flex items-center justify-center mb-8 group overflow-hidden transition-all duration-300 hover:border-gold/50"
                  aria-label="View on Google Maps"
                >
                  <div className="absolute inset-0 bg-maroon-dark/20 group-hover:bg-maroon-dark/40 transition-colors z-0"></div>
                  <div className="relative z-10 flex flex-col items-center justify-center text-cream group-hover:text-gold transition-colors">
                    <MapPin size={48} strokeWidth={1} className="mb-4 opacity-80" />
                    <span className="font-lora tracking-widest text-sm uppercase flex items-center gap-2">
                      View on Google Maps <ExternalLink size={14} />
                    </span>
                  </div>
                </a>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href={wedding.venue.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <Navigation size={18} />
                    <span>GET DIRECTIONS</span>
                  </a>
                  
                  <button
                    onClick={downloadICS}
                    className="btn-outline-gold flex items-center gap-2 w-full sm:w-auto justify-center"
                    aria-label="Add to Calendar"
                  >
                    <CalendarPlus size={18} />
                    <span>ADD TO CALENDAR</span>
                  </button>
                </div>
              </div>
            </OrnamentalBorder>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
