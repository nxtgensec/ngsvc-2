import { MapPin, Users, Ticket, FileQuestion, Trophy, Calendar, Wifi } from 'lucide-react';
import { Button } from './ui/button';

const HeroSection = () => {
  const highlights = [
    { icon: Wifi, text: 'Online', color: 'text-secondary' },
    { icon: Users, text: 'Max 2 Members', color: 'text-primary' },
    { icon: Ticket, text: '₹50 Per Team', color: 'text-accent' },
    { icon: FileQuestion, text: 'Open Problem Statement', color: 'text-secondary' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 circuit-pattern" />
      
      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Online Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6 animate-slide-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-orbitron text-sm text-accent font-semibold tracking-wider">ONLINE HACKATHON</span>
          </div>

          {/* Main Title */}
          <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-gradient">VIBECODING</span>
          </h1>
          <h2 className="font-orbitron text-3xl md:text-5xl lg:text-6xl font-bold mb-2 text-foreground animate-slide-in" style={{ animationDelay: '0.2s' }}>
            HACKATHON 2K26
          </h2>
          <div className="inline-block px-6 py-2 bg-accent/20 border border-accent/40 rounded-lg mb-6 animate-slide-in" style={{ animationDelay: '0.3s' }}>
            <span className="font-orbitron text-xl md:text-2xl font-bold text-accent">FEB EDITION</span>
          </div>

          {/* Tagline */}
          <p className="font-inter text-lg md:text-xl text-muted-foreground italic mb-8 animate-slide-in" style={{ animationDelay: '0.4s' }}>
            "Code the vibe. Solve real problems."
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-slide-in" style={{ animationDelay: '0.5s' }}>
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-card/50 border border-border backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="font-inter text-sm text-foreground">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Prize & Dates */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
            {/* Cash Prize */}
            <div className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/40 glow-accent animate-slide-in" style={{ animationDelay: '0.6s' }}>
              <p className="font-inter text-sm text-accent mb-1">CASH PRIZES WORTH</p>
              <p className="font-orbitron text-3xl md:text-4xl font-bold text-accent">₹3,000</p>
            </div>

            {/* Dates */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-in" style={{ animationDelay: '0.7s' }}>
              <div className="px-6 py-4 rounded-xl bg-card border border-primary/30">
                <p className="font-inter text-xs text-muted-foreground mb-1">REGISTRATION OPENS</p>
                <p className="font-orbitron text-xl font-bold text-primary">FEB 1</p>
              </div>
              <div className="px-6 py-4 rounded-xl bg-card border border-secondary/30">
                <p className="font-inter text-xs text-muted-foreground mb-1">HACKATHON</p>
                <p className="font-orbitron text-xl font-bold text-secondary">20 - 22 FEB 2026</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in" style={{ animationDelay: '0.8s' }}>
            <Button variant="hero" size="xl">
              <Trophy className="w-5 h-5" />
              Register Your Team
            </Button>
            <Button variant="heroOutline" size="xl">
              <Calendar className="w-5 h-5" />
              View Challenges
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
