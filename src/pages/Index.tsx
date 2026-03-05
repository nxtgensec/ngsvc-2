import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ChallengesSection from '@/components/ChallengesSection';
import TimelineSection from '@/components/TimelineSection';
import RegistrationSection from '@/components/RegistrationSection';
import FaqRulesSection from '@/components/FaqRulesSection';
import PastWinnersSection from '@/components/PastWinnersSection';
import RegisteredTeamsSection from '@/components/RegisteredTeamsSection';
import Footer from '@/components/Footer';
import VisitorCounter from '@/components/VisitorCounter';

const Index = () => {
  return (
    <div className="min-h-screen space-shell">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ChallengesSection />
      <TimelineSection />
      <RegistrationSection />
      <FaqRulesSection />
      <PastWinnersSection />
      <RegisteredTeamsSection />
      <Footer />
      <VisitorCounter />
    </div>
  );
};

export default Index;
