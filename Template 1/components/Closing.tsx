'use client'

import { wedding } from '@/data/wedding'
import { motion } from 'framer-motion'
import { Share2, Heart } from 'lucide-react'
import FlowerPetals from '@/components/FlowerPetals'
import GoldDivider from '@/components/ui/GoldDivider'
import SectionReveal from '@/components/ui/SectionReveal'

export default function Closing() {
  function shareInvitation() {
    const text = `You are warmly invited to celebrate the wedding of ${wedding.groom.shortName || wedding.groom.name} & ${wedding.bride.shortName || wedding.bride.name} ❤️\n\nView the invitation:\n${wedding.websiteUrl}`
    if (navigator.share) {
      navigator.share({ title: 'Wedding Invitation', text, url: wedding.websiteUrl }).catch(() => {})
    } else {
      const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
      window.open(waUrl, '_blank')
    }
  }

  return (
    <section className="relative overflow-hidden bg-maroon-dark min-h-[90vh] flex flex-col" id="closing">
      <FlowerPetals count={16} />
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(circle_at_center,rgba(201,162,39,0.1)_0%,transparent_70%)] rounded-full"></div>
      </div>
      
      <div className="flex-grow flex items-center justify-center relative z-10 w-full px-4 sm:px-6">
        <SectionReveal className="w-full text-center max-w-3xl mx-auto">
          <h2 className="font-cormorant text-5xl sm:text-7xl text-cream font-light tracking-ceremony mb-6">
            THANK YOU
          </h2>
          
          <p className="font-lora text-gold/70 italic text-sm sm:text-base mb-12">
            for being a part of our journey
          </p>
          
          <div className="my-8 flex justify-center">
            <GoldDivider />
          </div>
          
          <div className="my-12 flex flex-col items-center justify-center gap-4">
            <h3 className="font-cormorant text-3xl sm:text-4xl text-cream font-light">
              {wedding.groom.shortName || wedding.groom.name.split(' ')[0]}
            </h3>
            <span className="text-gold italic font-cormorant text-2xl">
              &
            </span>
            <h3 className="font-cormorant text-3xl sm:text-4xl text-cream font-light">
              {wedding.bride.shortName || wedding.bride.name.split(' ')[0]}
            </h3>
          </div>
          
          <p className="font-lora text-cream/60 text-sm italic mt-6 mb-12 flex items-center justify-center gap-2">
            With love, Our Families <Heart size={14} fill="currentColor" />
          </p>
          
          <button 
            onClick={shareInvitation}
            className="btn-outline-gold flex items-center gap-3 mx-auto"
            aria-label="Share the invitation"
          >
            <Share2 size={18} />
            <span>SHARE THE INVITATION</span>
          </button>
        </SectionReveal>
      </div>
      
      <div className="w-full relative z-10 pb-4">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-4"></div>
        <p className="font-lora text-cream/30 text-xs text-center flex items-center justify-center gap-1">
          Made with love <Heart size={10} fill="currentColor" className="text-maroon/50" />
        </p>
      </div>
    </section>
  )
}
