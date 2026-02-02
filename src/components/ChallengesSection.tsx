import { FileType2, Image, Video, Wrench, Globe, Building2, Cpu, Heart, GraduationCap, ShoppingCart, Leaf, ArrowRight, Lock, Unlock } from 'lucide-react';
import { Button } from './ui/button';

const REGISTER_LINK = "https://forms.gle/cJiq3hvQQCBwmVZN8";

const ChallengesSection = () => {
  // NxtGenSec specific challenges - eliminating third-party dependencies
  const nxtgensecChallenges = [
    {
      icon: FileType2,
      title: 'Document Converter Suite',
      description: 'Build a self-hosted alternative to iLovePDF - Convert PDF to Word, Word to PDF, merge/split PDFs, and more.',
      features: ['PDF to Word/Excel/PPT', 'Merge & Split PDFs', 'Compress PDFs', 'Add Watermarks'],
      difficulty: 'Medium',
    },
    {
      icon: Image,
      title: 'Image Optimization Tool',
      description: 'Create tools for image compression, format conversion, resizing, and batch processing without third-party APIs.',
      features: ['Compress Images', 'Convert Formats', 'Bulk Resize', 'Remove Background'],
      difficulty: 'Easy',
    },
    {
      icon: Video,
      title: 'Media Processor',
      description: 'Build video/audio compression, format conversion, and editing tools that run locally.',
      features: ['Video Compression', 'Audio Extraction', 'Format Conversion', 'Trim & Cut'],
      difficulty: 'Hard',
    },
    {
      icon: Wrench,
      title: 'Developer Utilities',
      description: 'Create essential developer tools - JSON formatters, code beautifiers, diff checkers, regex testers.',
      features: ['JSON Formatter', 'Code Beautifier', 'Diff Checker', 'Regex Tester'],
      difficulty: 'Medium',
    },
  ];

  // Open problem statements with domains
  const openDomains = [
    {
      icon: Heart,
      domain: 'Healthcare',
      problems: ['Appointment scheduling systems', 'Medicine reminder apps', 'Health tracking dashboards', 'Telemedicine platforms'],
    },
    {
      icon: GraduationCap,
      domain: 'Education',
      problems: ['Online learning platforms', 'Assignment management', 'Virtual classroom tools', 'Student progress tracking'],
    },
    {
      icon: ShoppingCart,
      domain: 'E-Commerce',
      problems: ['Inventory management', 'Order tracking systems', 'Customer feedback tools', 'Price comparison engines'],
    },
    {
      icon: Leaf,
      domain: 'Sustainability',
      problems: ['Carbon footprint calculators', 'Waste management apps', 'Energy consumption trackers', 'Recycling guides'],
    },
    {
      icon: Building2,
      domain: 'Smart Cities',
      problems: ['Traffic management', 'Public transport trackers', 'Parking solutions', 'Civic issue reporting'],
    },
    {
      icon: Cpu,
      domain: 'Automation',
      problems: ['Task schedulers', 'Workflow automation', 'Data backup tools', 'File organization systems'],
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-secondary/20 text-secondary';
      case 'Medium':
        return 'bg-primary/20 text-primary';
      case 'Hard':
        return 'bg-accent/20 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section id="challenges" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">Problem </span>
            <span className="text-gradient">Statements</span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground mb-6">
            Choose from our curated challenges or bring your own problem to solve. 
            Focus on building self-hosted solutions that eliminate dependency on third-party services.
          </p>
          
          {/* Access Levels */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 border border-border">
              <Unlock className="w-4 h-4 text-secondary" />
              <span className="font-inter text-sm text-muted-foreground">Basic features: No login required</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
              <Lock className="w-4 h-4 text-primary" />
              <span className="font-inter text-sm text-primary">Premium features: Free with login</span>
            </div>
          </div>
        </div>

        {/* Part 1: NxtGenSec Specific Challenges */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-orbitron text-2xl font-bold text-foreground">NxtGenSec Specific</h3>
              <p className="font-inter text-sm text-muted-foreground">Solve internal challenges - No third-party dependencies</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nxtgensecChallenges.map((challenge, index) => (
              <div 
                key={index} 
                className="group p-6 rounded-xl card-gradient border border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <challenge.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>
                
                <h4 className="font-orbitron text-lg font-bold text-foreground mb-2">{challenge.title}</h4>
                <p className="font-inter text-sm text-muted-foreground mb-4">{challenge.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {challenge.features.map((feature, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-1 rounded text-xs bg-muted/50 text-muted-foreground border border-border"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Open Problem Statements */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Globe className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="font-orbitron text-2xl font-bold text-foreground">Open Problem Statements</h3>
              <p className="font-inter text-sm text-muted-foreground">Explore any domain - Not limited to these, find real-world problems!</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openDomains.map((domain, index) => (
              <div 
                key={index} 
                className="group p-6 rounded-xl card-gradient border border-border hover:border-secondary/50 transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <domain.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <h4 className="font-orbitron text-lg font-bold text-foreground">{domain.domain}</h4>
                </div>
                
                <ul className="space-y-2">
                  {domain.problems.map((problem, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start gap-2 font-inter text-sm text-muted-foreground"
                    >
                      <span className="text-secondary mt-1">•</span>
                      {problem}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="font-inter text-xs text-accent italic">+ Explore more problems in this domain</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl bg-accent/10 border border-accent/30 text-center">
            <p className="font-inter text-muted-foreground mb-2">
              <span className="text-accent font-semibold">Not limited to above domains!</span>
            </p>
            <p className="font-inter text-sm text-muted-foreground">
              Identify any real-world problem in your surroundings or tech industry and build an innovative solution.
              Research-based projects with genuine impact are highly encouraged.
            </p>
          </div>
        </div>

        <div className="text-center">
          <a href={REGISTER_LINK} target="_blank" rel="noopener noreferrer">
            <Button variant="cyber" size="lg">
              <span>Register & Choose Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;
