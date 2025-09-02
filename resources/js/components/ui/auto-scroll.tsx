import { ScrollVelocity } from "@/components/ui/scroll-velocity"
import AboutCard from "@/components/ui/about-card"
import Teknindo from "../../../assets/image/Teknindo Awal.png"
import MTS from "../../../assets/image/Logo share.png"
import MSS from "../../../assets/image/Logo MSS.png"
import laigong from "../../../assets/image/Logo share (12).png"
import TSH from "../../../assets/image/Logo TSH.png"
import TAP from "../../../assets/image/Logo share (8).png"
import TTI from '../../../assets/image/Logo share (10).png'
import WYZ from '../../../assets/image/Wenzhou yunding logo.png'


const cards = [
  {
    title: "Mitra Teknindo Sejati",
    imageSrc: MTS,
    description: "A trusted distributor of heavy equipment and heavy-duty trucks, providing reliable solutions to support large-scale projects.",
    web : 'https://www.mitrateknindosejati.com'
  },
  {
    title: "Mitra Suplaindo Sejati",
    imageSrc: MSS,
    description: "Trusted partner providing industrial equipment, hardware, and lubricants to support smooth operations in mining, construction, and manufacturing sectors.",
    web : ''
  },
  {
    title: "Teknindo Super Haul",
    imageSrc: TSH,
    description: "Offering heavy equipment and dump truck rentals, along with operational vehicles, to keep mining operations running smoothly.",
    web : ''
  },
  {
    title: "LGCM Laigong Indonesia",
    imageSrc: laigong,
    description: "Focused on producing compact heavy machinery and agricultural equipment designed for productivity and versatility.",
    web : ''
  },
  {
    title: "Teknindo Adhya Pane",
    imageSrc: TAP,
    description: "Specialized in mining contractor services, particularly hauling operations with a strong commitment to reliability and safety.",
    web : ''
  },
  {
    title: "Tenrich Tyre Indonesia",
    imageSrc: TTI,
    description: "Manufacturer of durable, high-performance tires built to withstand the demands of heavy equipment and dump trucks.",
    web : ''
  },
  {
    title: "Wenzhou Yunding International",
    imageSrc: WYZ,
    description: "China-based global trading company offering diverse machinery and industrial solutions, connecting industries worldwide with reliable sourcing and competitive value.",
    web : ''
  },
]

function AutoScroll() {
  return (
    <div className="w-full py-10">
      <ScrollVelocity velocity={3}>
        {cards.map((_, i) => {
          const card = cards[i % cards.length];
          return (
            <AboutCard
              key={i}
              imageSrc={card.imageSrc}
              imageAlt={card.title}
              title={card.title}
              description={card.description}
              web = {card.web}
            />
          );
        })}
      </ScrollVelocity>
    </div>
  )
}

export { AutoScroll }
