import Hero from '../../components/Hero';
import Services from '../../components/Services';
import Features from '../../components/Features';
import About from '../../components/About';
import CTA from '../../components/CTA';
import Testimonials from '../../components/Testimonials';
import FAQ from '../../components/FAQ';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Features />
      <About />
      <CTA />
      <Testimonials />
      <FAQ />
    </>
  );
}
