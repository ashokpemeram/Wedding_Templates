'use client'

import { wedding } from '@/data/wedding'
import { motion } from 'framer-motion'
import GoldDivider from '@/components/ui/GoldDivider'
import SectionReveal, { StaggerReveal, StaggerItem } from '@/components/ui/SectionReveal'
import OrnamentalBorder, { TopOrnament } from '@/components/ui/OrnamentalBorder'

export default function Family() {
  return (
    <section className="bg-cream section-padding relative overflow-hidden" id="family">
      <SectionReveal>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex justify-center mb-6">
            <TopOrnament />
          </div>
          
          <h2 className="font-cormorant text-3xl sm:text-4xl text-maroon font-light tracking-wedding text-center leading-snug">
            WITH THE BLESSINGS OF OUR FAMILIES
          </h2>
          <p className="font-lora text-brown/50 italic text-sm text-center mt-4">
            Together with their beloved families
          </p>
          
          <div className="my-10">
            <GoldDivider />
          </div>
          
          <p className="font-lora text-brown/70 text-center max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-16">
            With immense joy and the blessings of our elders, we invite you to witness and celebrate this sacred union.
          </p>
          
          <StaggerReveal className="flex flex-col md:flex-row justify-center items-stretch max-w-4xl mx-auto">
            {/* Groom's Family */}
            <StaggerItem className="flex-1 text-center md:text-right md:pr-10">
              <h3 className="font-cormorant text-2xl text-maroon font-light tracking-wedding mb-2">
                Groom's Family
              </h3>
              <p className="font-lora text-brown/60 text-sm italic mb-4">
                {wedding.groom.parents}
              </p>
              <ul className="font-lora text-brown/80 text-sm leading-loose space-y-1">
                {wedding.groom.family.map((member, i) => (
                  <li key={i}>{member}</li>
                ))}
              </ul>
            </StaggerItem>
            
            {/* Center Divider */}
            <StaggerItem className="hidden md:flex flex-col items-center justify-center px-8 relative">
              <div className="h-full w-[1px] bg-gold/40 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cream p-2 text-gold">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                  </svg>
                </div>
              </div>
            </StaggerItem>
            
            {/* Mobile Divider */}
            <StaggerItem className="md:hidden py-8">
              <GoldDivider variant="flower" />
            </StaggerItem>
            
            {/* Bride's Family */}
            <StaggerItem className="flex-1 text-center md:text-left md:pl-10">
              <h3 className="font-cormorant text-2xl text-maroon font-light tracking-wedding mb-2">
                Bride's Family
              </h3>
              <p className="font-lora text-brown/60 text-sm italic mb-4">
                {wedding.bride.parents}
              </p>
              <ul className="font-lora text-brown/80 text-sm leading-loose space-y-1">
                {wedding.bride.family.map((member, i) => (
                  <li key={i}>{member}</li>
                ))}
              </ul>
            </StaggerItem>
          </StaggerReveal>
          
          <div className="flex justify-center mt-16 text-gold/60">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c-3.3-3-9-9.5-9-14a5 5 0 0 1 10-2.3 5 5 0 0 1 10 2.3c0 4.5-5.7 11-9 14z" />
            </svg>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
