'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GoldDivider from '@/components/ui/GoldDivider'
import SectionReveal from '@/components/ui/SectionReveal'
import OrnamentalBorder, { TopOrnament } from '@/components/ui/OrnamentalBorder'
import { Send, Heart, Check } from 'lucide-react'

export default function RSVP() {
  const [name, setName] = useState('')
  const [guestCount, setGuestCount] = useState('1')
  const [attendance, setAttendance] = useState<'' | 'yes' | 'no'>('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const newErrors: Record<string, string> = {}
    if (!name || name.trim().length < 2) newErrors.name = 'Please enter a valid name'
    if (!attendance) newErrors.attendance = 'Please let us know if you can make it'
    if (!guestCount) newErrors.guestCount = 'Please select number of guests'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200))
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section className="bg-cream-warm section-padding relative overflow-hidden" id="rsvp">
      <SectionReveal>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="font-cormorant text-4xl sm:text-5xl text-maroon font-light tracking-wedding text-center">
            WE WOULD LOVE TO SEE YOU
          </h2>
          <p className="font-lora text-brown/60 italic text-center mt-4">
            Your presence will make our celebration even more special.
          </p>
          
          <div className="my-10">
            <GoldDivider />
          </div>
          
          <div className="max-w-lg mx-auto">
            <OrnamentalBorder>
              <div className="p-6 sm:p-10 relative min-h-[400px]">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="rsvp-form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div>
                        <label htmlFor="name" className="block font-lora text-brown/80 mb-2 text-sm uppercase tracking-wider">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="wedding-input w-full bg-transparent border-b border-brown/30 pb-2 focus:outline-none focus:border-maroon transition-colors text-brown"
                          placeholder="Your beautiful name"
                        />
                        {errors.name && <p className="font-lora text-red-800 text-xs mt-1">{errors.name}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="guests" className="block font-lora text-brown/80 mb-2 text-sm uppercase tracking-wider">
                          Number of Guests
                        </label>
                        <select
                          id="guests"
                          value={guestCount}
                          onChange={(e) => setGuestCount(e.target.value)}
                          className="wedding-input w-full bg-transparent border-b border-brown/30 pb-2 focus:outline-none focus:border-maroon transition-colors text-brown"
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                        {errors.guestCount && <p className="font-lora text-red-800 text-xs mt-1">{errors.guestCount}</p>}
                      </div>
                      
                      <div className="space-y-3 pt-2">
                        <label className="block font-lora text-brown/80 mb-2 text-sm uppercase tracking-wider">
                          Will you attend?
                        </label>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <label className={`cursor-pointer border p-4 transition-all duration-300 flex items-center justify-center text-center font-lora text-sm ${attendance === 'yes' ? 'border-gold bg-gold/5 text-maroon' : 'border-gold/30 text-brown/70 hover:border-gold/60'}`}>
                            <input
                              type="radio"
                              name="attendance"
                              value="yes"
                              checked={attendance === 'yes'}
                              onChange={() => setAttendance('yes')}
                              className="sr-only"
                            />
                            Yes, I'll be there ❤️
                          </label>
                          
                          <label className={`cursor-pointer border p-4 transition-all duration-300 flex items-center justify-center text-center font-lora text-sm ${attendance === 'no' ? 'border-gold bg-gold/5 text-maroon' : 'border-gold/30 text-brown/70 hover:border-gold/60'}`}>
                            <input
                              type="radio"
                              name="attendance"
                              value="no"
                              checked={attendance === 'no'}
                              onChange={() => setAttendance('no')}
                              className="sr-only"
                            />
                            Sorry, I can't make it
                          </label>
                        </div>
                        {errors.attendance && <p className="font-lora text-red-800 text-xs mt-1">{errors.attendance}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block font-lora text-brown/80 mb-2 text-sm uppercase tracking-wider">
                          Message for the couple (Optional)
                        </label>
                        <textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={3}
                          className="wedding-input w-full bg-transparent border-b border-brown/30 pb-2 focus:outline-none focus:border-maroon transition-colors text-brown resize-none"
                          placeholder="Share your wishes..."
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-gold w-full flex items-center justify-center gap-2 mt-8 py-3"
                      >
                        {isSubmitting ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <Send size={18} />
                            <span>SEND RSVP</span>
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-message"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-cream-warm z-20"
                    >
                      <div className="text-maroon mb-6 bg-gold/10 p-4 rounded-full">
                        <Heart size={48} className="animate-pulse" fill="currentColor" />
                      </div>
                      <h3 className="font-cormorant text-3xl text-maroon mb-4">
                        Thank you, {name.split(' ')[0]}!
                      </h3>
                      <p className="font-lora text-brown/80 italic text-lg mb-8 max-w-sm">
                        {attendance === 'yes' 
                          ? "We are thrilled you'll be joining us! We can't wait to celebrate with you." 
                          : "We will miss you dearly, but we know you'll be celebrating with us in spirit."}
                      </p>
                      <TopOrnament />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </OrnamentalBorder>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
