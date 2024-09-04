'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  { name: 'Owdy', handle: '@Hadeel_Naily', content: 'A major shoutout to Jenni Ai for straight up saving my life ❤️', date: '16 Jan' },
  { name: 'Rosh', handle: '@sonofgorkhali', content: 'I started with Jenni-who & Jenni-what. But now I can\'t write without Jenni. I love Jenni AI and am amazed to see how far Jenni has come. Kudos to Jenni.AI team', date: '23 Aug' },
  { name: 'Mushtaq', handle: '@Mushtaq Bilal', content: 'Jenni, the AI assistant for academic writing, just got BETTER and SMARTER.', date: '25 Mar' },
  { name: 'Gachoki', handle: '@gachoki_munene', content: 'This one is a game changer, Doc, especially on that small matter of lacking words or writer\'s block. I am definitely introducing it to my students asap.', date: '1 Aug' },
  { name: 'Andy Tom', handle: '@angrytomtweets', content: 'I thought ChatGPT was a good writing assistant. But when I found Jenni AI - It blew my mind. It\'s 10x more advanced than I thought.', date: '18 Oct' },
  { name: 'Hason Toor', handle: '@hasantoxr', content: 'I thought AI writing was useless. Then I found Jenni AI. It turned out to be much more advanced than I ever could have imagined. Jenni AI = ChatGPT x 10.', date: '26 Aug' },
  { name: 'Oscar Duran', handle: '@duranoscarf', content: 'herramienta de auto completado de textos. Usando inteligencia artificial te permite escribir de manera rápida y mas eficiente (hay que revisar igual)', date: '30 Jul' },
  { name: 'Rahul', handle: '@sairahul1', content: 'Jenni is perfect for writing research docs, SOPs, study projects presentations 👌🏽', date: '28 Jul' },
  { name: 'Xavier', handle: '@xaviercaffrey13', content: 'Copyai is alright but have you tried @whoisjenniai?', date: '19 Aug' },
]

export function CustomerLove() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-4">CUSTOMER LOVE</h2>
          <p className="text-xl text-center mb-8">Join 3 million empowered writers</p>
          <p className="text-lg text-center mb-12">Jenni has helped write over 970 million words. From academic essays, journals, to top-ranking blog posts</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="mr-2">
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.handle}</p>
                    </div>
                  </div>
                  <p className="mb-2">{testimonial.content}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

