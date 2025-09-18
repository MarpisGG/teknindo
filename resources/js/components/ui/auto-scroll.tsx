import { ScrollVelocity } from "@/components/ui/scroll-velocity"
import AboutCard from "@/components/ui/about-card"
import { useEffect, useState } from "react"
import axios from "axios"

interface Company {
    id: number;
    name: string;
    image: string;
    description: string;
    web: string;
}




function AutoScroll() {
  const [companies, setCompanies] = useState<Company[]>([]);
  useEffect(() => {
    axios
      .get('/api/companies')
      .then((response) => setCompanies(response.data))
      .catch((error) => console.error('Error fetching companies:', error));
  }, []);

  
  
  return (
    <div className="w-full py-10">
      <ScrollVelocity velocity={1}>
        {companies.map((company, i) => {
          return (
            <AboutCard
              key={i}
              imageSrc={company.image}
              imageAlt={company.name}
              title={company.name}
              description={company.description}
              web={company.web}
            />
          );
        })}
      </ScrollVelocity>
    </div>
  )
}

export { AutoScroll }
