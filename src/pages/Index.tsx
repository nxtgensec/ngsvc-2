import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ChallengesSection from '@/components/ChallengesSection';
import TimelineSection from '@/components/TimelineSection';
import BenefitsSection from '@/components/BenefitsSection';
import RegistrationSection from '@/components/RegistrationSection';
import Footer from '@/components/Footer';
import VisitorCounter from '@/components/VisitorCounter';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ChallengesSection />
      <TimelineSection />
      <BenefitsSection />
      <RegistrationSection />
      <Footer />
      <VisitorCounter />
    </div>
  );
};

export default Index;
