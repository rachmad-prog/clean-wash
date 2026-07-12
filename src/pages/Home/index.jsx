import Hero from '../../components/Hero';
import Services from '../../components/Services';
import About from '../../components/About';
import Features from '../../components/Features';
import CTA from '../../components/CTA';
import FAQ from '../../components/FAQ';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Features />
      <About />
      <CTA />
      <FAQ />
    </>
  );
}
