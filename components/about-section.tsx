"use client"
import { Instrument_Sans, Krub, Space_Mono } from 'next/font/google'

const instrumentSans = Instrument_Sans({ subsets: ['latin'] })
const krub = Krub({ weight: ['400', '700'], subsets: ['latin'] })
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] })

export default function AboutSection() {
  return (
    <div className="w-full px-4 md:px-8 py-20">
      <h2 className={`text-5xl md:text-6xl font-bold text-center mb-12 ${instrumentSans.className}`} style={{ color: "#F8EEDF" }}>
        
        CENTAVERSE
      </h2>

      <div className="max-w-3xl mx-auto">
        <div
          className="p-8 md:p-12 rounded-2xl border"
          style={{
            backgroundColor: "rgba(232, 201, 153, 0.05)",
            borderColor: "rgba(142, 22, 22, 0.3)",
          }}
        >
          <p className={`text-lg leading-relaxed mb-6 font-light text-center ${spaceMono.className}`} style={{ color: "#F8EEDF" }}>
            Centaverse is a short form of "Centorian Cinematic Universe". The word Centaurian comes from my sun sign sagittarius, symbolised by the centaur a blend of instinct creativity and constant pursuit of growth that is exactly what this platform resonates, my own cinematic universe where imagination meets learning and every frame tells a story. I have been capturing visuals from my iPhone, and bringing them to life using capcut. I am also stepping into the world of Adobe tools, building my way towards free lance projects and bigger creative goals.
          </p>
          

          

          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 pt-8 border-t"
            style={{ borderColor: "rgba(142, 22, 22, 0.3)" }}
          >
            {["Editing", "Color Grade", "Motion Design", "Logo Design", "VFX", "Sound Design"].map((skill) => (
              <div
                key={skill}
                className="px-4 py-2 rounded-lg text-sm font-medium text-center"
                style={{
                  backgroundColor: "rgba(142, 22, 22, 0.2)",
                  color: "#8E1616",
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
