import Hero from '@/components/sections/Hero';
import ServicesGrid from '@/components/sections/ServicesGrid';
import TrustBar from '@/components/sections/TrustBar';
import CallToAction from '@/components/sections/CallToAction';
import { getAllServices } from '@/lib/services';

export default function HomePage() {
  const services = getAllServices();

  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid services={services} />
      <CallToAction />
    </>
  );
}
