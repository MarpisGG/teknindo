import { ScrollVelocity } from "@/components/ui/scroll-velocity"
import AboutCard from "@/components/ui/about-card"
import Teknindo from "../../../assets/image/Teknindo Awal.png"
import MTS from "../../../assets/image/LOGO MTS HD.png"
import MSS from "../../../assets/image/Logo MSS.png"
import laigong from "../../../assets/image/logo_laigong_padded_40_percent.png"
import TSH from "../../../assets/image/Logo TSH.png"


const cards = [
  {
    title: "Mitra Teknindo Sejati",
    imageSrc: MTS,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
  },
  {
    title: "Mitra Suplaindo Sejati",
    imageSrc: MSS,
    description: "Elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer.",
  },
  {
    title: "Teknindo Super Haul",
    imageSrc: TSH,
    description: "Vitae tortor condimentum lacinia quis vel eros donec ac odio tempor.",
  },
  {
    title: "Laigong",
    imageSrc: laigong,
    description: "Eget gravida cum sociis natoque penatibus et magnis dis parturient montes.",
  },
]

function AutoScroll() {
  return (
    <div className="w-full py-10">
      <ScrollVelocity velocity={3}>
        {[...Array(10)].map((_, i) => {
          const card = cards[i % cards.length];
          return (
            <AboutCard
              key={i}
              imageSrc={card.imageSrc}
              imageAlt={card.title}
              title={card.title}
              description={card.description}
            />
          );
        })}
      </ScrollVelocity>
    </div>
  )
}

export { AutoScroll }
