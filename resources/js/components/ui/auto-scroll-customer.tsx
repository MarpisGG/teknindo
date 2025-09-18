import { ScrollVelocity } from "@/components/ui/scroll-velocity"
import { useEffect, useState } from "react"
import axios from "axios"

interface Customer {
  id: number;
  image: string;
  web: string;
}

function AutoScrollCustomer() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    axios
      .get('/api/customers')
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error('Error fetching customers:', error));
  }, []);

  const half = Math.floor(customers.length / 2);
  const firstHalf = customers.slice(0, half);
  const secondHalf = customers.slice(half);

  return (
    <div className="w-full max-w-6xl mx-auto pt-4 pb-8 space-y-10">
      {/* Scroll ke kanan */}
      <ScrollVelocity velocity={3}>
        {firstHalf.map((customer, i) => (
          <img
            key={customer.id}
            src={`/storage/${customer.image}`}
            alt={`Customer ${i}`}
            className="h-32 w-auto mx-4 object-contain"
          />
        ))}
      </ScrollVelocity>

      {/* Scroll ke kiri */}
      <ScrollVelocity velocity={-3}>
        {secondHalf.map((customer, i) => (
          <img
            key={customer.id}
            src={`/storage/${customer.image}`}
            alt={`Customer ${i + half}`}
            className="h-32 w-auto mx-4 object-contain"
          />
        ))}
      </ScrollVelocity>
    </div>
  );
}

export { AutoScrollCustomer }
