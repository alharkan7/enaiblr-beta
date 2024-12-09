import { Suspense } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from '@/components/ui/loading';
import AnimatedBackground from './components/AnimatedBackground';

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <div className="relative z-10"></div>
        <Header />
        <main>
          <Suspense fallback={<Loading />}>
            <Hero />
            <Features />
            <Testimonials />
            <Pricing />
            <CTA />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}