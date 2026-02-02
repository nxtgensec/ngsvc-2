import { Award, BookOpen, Users, Zap, Gift, Briefcase } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Award,
      title: 'Participation Certificate',
      description: 'Every participant receives a verified digital certificate upon completion.',
      color: 'primary',
    },
    {
      icon: BookOpen,
      title: 'Expert Guidance',
      description: 'Get mentorship from industry experts and experienced developers throughout the event.',
      color: 'secondary',
    },
    {
      icon: Zap,
      title: 'Development Resources',
      description: 'Access to premium development tools, cloud credits, and learning materials.',
      color: 'accent',
    },
    {
      icon: Users,
      title: 'Networking',
      description: 'Connect with like-minded developers, students, and professionals from across the country.',
      color: 'primary',
    },
    {
      icon: Gift,
      title: 'Swag & Goodies',
      description: 'Winners receive exclusive NxtGenSec merchandise and digital goodies.',
      color: 'secondary',
    },
    {
      icon: Briefcase,
      title: 'Portfolio Project',
      description: 'Build a real-world project that you can showcase in your portfolio and resume.',
      color: 'accent',
    },
  ];

  return (
    <section id="benefits" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">What You </span>
            <span className="text-gradient-accent">Get</span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground">
            Participating in VibeCoding comes with amazing benefits beyond just prizes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl bg-${benefit.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className={`w-7 h-7 text-${benefit.color}`} />
              </div>
              <h3 className="font-orbitron text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="font-inter text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Prize Breakdown */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-center mb-10">
            <span className="text-foreground">Prize </span>
            <span className="text-gradient">Pool</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* 1st Prize */}
            <div className="relative p-6 rounded-xl bg-gradient-to-b from-accent/20 to-card border border-accent/40 text-center group hover:glow-accent transition-all duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground rounded-full font-orbitron text-xs font-bold">
                1ST PLACE
              </div>
              <span className="text-4xl block mb-4">🥇</span>
              <p className="font-orbitron text-3xl font-bold text-accent mb-2">₹1,500</p>
              <p className="font-inter text-sm text-muted-foreground">+ Certificate + Swag</p>
            </div>

            {/* 2nd Prize */}
            <div className="relative p-6 rounded-xl bg-gradient-to-b from-primary/20 to-card border border-primary/40 text-center group hover:glow-primary transition-all duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full font-orbitron text-xs font-bold">
                2ND PLACE
              </div>
              <span className="text-4xl block mb-4">🥈</span>
              <p className="font-orbitron text-3xl font-bold text-primary mb-2">₹1,000</p>
              <p className="font-inter text-sm text-muted-foreground">+ Certificate + Swag</p>
            </div>

            {/* 3rd Prize */}
            <div className="relative p-6 rounded-xl bg-gradient-to-b from-secondary/20 to-card border border-secondary/40 text-center group hover:glow-secondary transition-all duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary text-secondary-foreground rounded-full font-orbitron text-xs font-bold">
                3RD PLACE
              </div>
              <span className="text-4xl block mb-4">🥉</span>
              <p className="font-orbitron text-3xl font-bold text-secondary mb-2">₹500</p>
              <p className="font-inter text-sm text-muted-foreground">+ Certificate + Swag</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
