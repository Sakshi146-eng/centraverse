// "use client"
// import { Instrument_Sans, Krub, Space_Mono } from 'next/font/google'

// const instrumentSans = Instrument_Sans({ subsets: ['latin'] })
// const krub = Krub({ weight: ['400', '700'], subsets: ['latin'] })
// const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] })

// export default function AboutSection() {
//   return (
//     <div className="w-full px-4 md:px-8 py-20">
//       <h2 className={`text-5xl md:text-6xl font-bold text-center mb-12 ${instrumentSans.className}`} style={{ color: "#F8EEDF" }}>
        
//         CENTAVERSE
//       </h2>

//       <div className="max-w-5xl mx-auto">
//         <p className={`text-lg leading-relaxed mb-6 font-light text-center ${spaceMono.className}`} style={{ color: "#F8EEDF" }}>
//           Centaverse is a short form of "Centorian Cinematic Universe". The word Centaurian comes from my sun sign sagittarius, symbolised by the centaur a blend of instinct creativity and constant pursuit of growth that is exactly what this platform resonates, my own cinematic universe where imagination meets learning and every frame tells a story. I have been capturing visuals from my iPhone, and bringing them to life using capcut. I am also stepping into the world of Adobe tools, building my way towards free lance projects and bigger creative goals.
//         </p>
//       </div>
//       </div>
    
//   )
// }
"use client"
import { Instrument_Sans, Krub, Space_Mono } from 'next/font/google'

const instrumentSans = Instrument_Sans({ subsets: ['latin'] })
const krub = Krub({ weight: ['400', '700'], subsets: ['latin'] })
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] })

export default function AboutSection() {
  return (
    <div className="w-full" style={{ 
      fontFamily: "'Geist', 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif, system-ui"
    }}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');

        :root {
          --font-size-min: 14;
          --font-size-max: 20;
          --font-ratio-min: 1.1;
          --font-ratio-max: 1.33;
          --font-width-min: 375;
          --font-width-max: 1500;
        }

        .about-section {
          width: 100%;
        }

        .about-header {
          min-height: 40vh;
          display: flex;
          place-items: center;
          width: 100%;
          padding: 0 5rem;
          justify-content: center;
        }

        .about-title {
          --font-level: 8;
          --fluid-min: calc(24 * pow(1.1, 8));
          --fluid-max: calc(20 * pow(1.33, 8));
          --fluid-preferred: calc((var(--fluid-max) - var(--fluid-min)) / (1500 - 375));
          font-size: clamp(
            calc(var(--fluid-min) / 16 * 1rem),
            calc((var(--fluid-min) / 16 * 1rem) - ((var(--fluid-preferred) * 375) / 16 * 1rem) + (var(--fluid-preferred) * 100vi)),
            calc(var(--fluid-max) / 16 * 1rem)
          );
          text-wrap: pretty;
          line-height: 0.8;
          margin: 0;
          background: linear-gradient(#F8EEDF 60%, rgba(248, 238, 223, 0.5));
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-align: center;
        }

        .content-section {
          display: flex;
          width: 100%;
          padding: 0 5rem;
          justify-content: center;
          min-height: 60vh;
          align-items: center;
        }

        .content-wrapper {
          max-width: 1280px;
          width: 100%;
        }

        .about-text {
          font-size: 1.125rem;
          line-height: 1.75;
          margin-bottom: 1.5rem;
          font-weight: 300;
          text-align: center;
          color: #F8EEDF;
        }
      `}</style>

      <main className="about-section">
        <header className="about-header">
          <h1 className={`about-title ${instrumentSans.className}`}>
            CENTAVERSE
          </h1>
        </header>
        
        <section className="content-section">
          <div className="content-wrapper">
            <p className={`about-text ${spaceMono.className}`}>
              Centaverse is a short form of "Centorian Cinematic Universe". The word Centaurian comes from my sun sign sagittarius, symbolised by the centaur a blend of instinct creativity and constant pursuit of growth that is exactly what this platform resonates, my own cinematic universe where imagination meets learning and every frame tells a story. I have been capturing visuals from my iPhone, and bringing them to life using capcut. I am also stepping into the world of Adobe tools, building my way towards free lance projects and bigger creative goals.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}