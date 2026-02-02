import { Code2, Lightbulb, Users, Zap } from 'lucide-react';
const AboutSection = () => {
  const features = [{
    icon: Code2,
    title: 'Code the Vibe',
    description: 'Build solutions that resonate with real-world problems using cutting-edge technology.',
    color: 'primary'
  }, {
    icon: Lightbulb,
    title: 'Open Problem Statement',
    description: 'Choose from provided challenges or identify problems in your surroundings to solve.',
    color: 'secondary'
  }, {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work in teams of up to 2 members. Solo participants are also welcome.',
    color: 'accent'
  }, {
    icon: Zap,
    title: 'Self-Hosted Solutions',
    description: 'Build tools that eliminate dependency on third-party services.',
    color: 'primary'
  }];
  return <section id="about" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">What is </span>
            <span className="text-gradient-primary">VibeCoding Hackathon?</span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground leading-relaxed">
            VibeCoding is a 3-day online hackathon organized by <span className="text-primary font-semibold">NxtGenSec</span> where 
            developers, students, and tech enthusiasts come together to build innovative solutions 
            that address real-world problems. Our focus is on creating self-hosted alternatives 
            to common third-party tools and solving everyday tech challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => <div key={index} className={`group p-6 rounded-xl card-gradient border border-border hover:border-${feature.color}/50 transition-all duration-300 hover:glow-${feature.color}`}>
              <div className={`w-12 h-12 rounded-lg bg-${feature.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}`} />
              </div>
              <h3 className="font-orbitron text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="font-inter text-sm text-muted-foreground">{feature.description}</p>
            </div>)}
        </div>

        {/* Who Can Participate */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-center mb-10">
            <span className="text-foreground">Who Can </span>
            <span className="text-gradient-accent">Participate?</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[{
            title: 'Students',
            emoji: '🎓',
            desc: 'School, college, or university students with a passion for coding.'
          }, {
            title: 'Professionals',
            emoji: '💼',
            desc: 'Working professionals looking to showcase their skills and innovate.'
          }, {
            title: 'Tech Enthusiasts',
            emoji: '💻',
            desc: 'Anyone with interest in technology and problem-solving.'
          }].map((item, index) => <div key={index} className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 text-center">
                <span className="text-4xl mb-4 block">{item.emoji}</span>
                <h4 className="font-orbitron text-lg font-bold text-foreground mb-2">{item.title}</h4>
                <p className="font-inter text-sm text-muted-foreground">{item.desc}</p>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;