import { Award, BookOpen, Users, Zap, Gift, Briefcase } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Award,
      title: 'Participation Certificate',
      description: 'Every team receives a verified digital certificate.',
      color: 'primary',
    },
    {
      icon: BookOpen,
      title: 'Mentor Guidance',
      description: 'Get practical mentoring from experienced builders and reviewers.',
      color: 'secondary',
    },
    {
      icon: Zap,
      title: 'Real Build Pressure',
      description: 'Solve the hackathon PS in the official time window and ship fast.',
      color: 'accent',
    },
    {
      icon: Users,
      title: 'Peer Network',
      description: 'Connect with committed builders from monthly editions.',
      color: 'primary',
    },
    {
      icon: Gift,
      title: 'Top Performer Rewards',
      description: 'Top performers may get extreme useful sources and growth resources.',
      color: 'secondary',
    },
    {
      icon: Briefcase,
      title: 'Portfolio Outcome',
      description: 'Showcase a production-minded project in your profile and resume.',
      color: 'accent',
    },
  ];

  return (
    <section id="benefits" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">Why </span>
            <span className="text-gradient-accent">Join</span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground">
            Outcomes, recognition, and resources for serious participants.
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

        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-center mb-10">
            <span className="text-foreground">Prize Pool </span>
            <span className="text-gradient">Up to Rs.5,000</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative p-6 rounded-xl bg-gradient-to-b from-accent/20 to-card border border-accent/40 text-center group hover:glow-accent transition-all duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground rounded-full font-orbitron text-xs font-bold">
                WINNER
              </div>
              <p className="font-orbitron text-3xl font-bold text-accent mb-2 mt-3">Rs.2,500</p>
            </div>

            <div className="relative p-6 rounded-xl bg-gradient-to-b from-primary/20 to-card border border-primary/40 text-center group hover:glow-primary transition-all duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full font-orbitron text-xs font-bold">
                RUNNER
              </div>
              <p className="font-orbitron text-3xl font-bold text-primary mb-2 mt-3">Rs.1,500</p>
            </div>

            <div className="relative p-6 rounded-xl bg-gradient-to-b from-secondary/20 to-card border border-secondary/40 text-center group hover:glow-secondary transition-all duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary text-secondary-foreground rounded-full font-orbitron text-xs font-bold">
                RUNNER 2
              </div>
              <p className="font-orbitron text-3xl font-bold text-secondary mb-2 mt-3">Rs.1,000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
