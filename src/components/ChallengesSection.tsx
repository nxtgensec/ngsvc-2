import { FileType2, Image, Video, Wrench, Globe, Lock, Unlock, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
const ChallengesSection = () => {
  const challenges = [{
    icon: FileType2,
    title: 'Document Converter Suite',
    description: 'Build a self-hosted alternative to iLovePDF - Convert PDF to Word, Word to PDF, merge/split PDFs, and more.',
    features: ['PDF to Word/Excel/PPT', 'Merge & Split PDFs', 'Compress PDFs', 'Add Watermarks'],
    difficulty: 'Medium',
    color: 'primary'
  }, {
    icon: Image,
    title: 'Image Optimization Tool',
    description: 'Create tools for image compression, format conversion, resizing, and batch processing without third-party APIs.',
    features: ['Compress Images', 'Convert Formats', 'Bulk Resize', 'Remove Background'],
    difficulty: 'Easy',
    color: 'secondary'
  }, {
    icon: Video,
    title: 'Media Processor',
    description: 'Build video/audio compression, format conversion, and editing tools that run locally.',
    features: ['Video Compression', 'Audio Extraction', 'Format Conversion', 'Trim & Cut'],
    difficulty: 'Hard',
    color: 'accent'
  }, {
    icon: Wrench,
    title: 'Developer Utilities',
    description: 'Create essential developer tools - JSON formatters, code beautifiers, diff checkers, regex testers.',
    features: ['JSON Formatter', 'Code Beautifier', 'Diff Checker', 'Regex Tester'],
    difficulty: 'Medium',
    color: 'primary'
  }, {
    icon: Globe,
    title: 'Open Problem Statement',
    description: 'Identify a real problem in your surroundings or tech industry and build an innovative solution.',
    features: ['Research Based', 'Real-World Impact', 'Your Own Idea', 'Creative Freedom'],
    difficulty: 'Variable',
    color: 'secondary'
  }];
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
  return <section id="challenges" className="relative py-24 overflow-hidden">
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
          
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {challenges.map((challenge, index) => <div key={index} className={`group p-6 rounded-xl card-gradient border border-border hover:border-${challenge.color}/50 transition-all duration-500 hover:-translate-y-1`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-${challenge.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <challenge.icon className={`w-6 h-6 text-${challenge.color}`} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
              </div>
              
              <h3 className="font-orbitron text-lg font-bold text-foreground mb-2">{challenge.title}</h3>
              <p className="font-inter text-sm text-muted-foreground mb-4">{challenge.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {challenge.features.map((feature, idx) => <span key={idx} className="px-2 py-1 rounded text-xs bg-muted/50 text-muted-foreground border border-border">
                    {feature}
                  </span>)}
              </div>
            </div>)}
        </div>

        <div className="text-center">
          <Button variant="cyber" size="lg">
            <span>View Full Challenge Details</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>;
};
export default ChallengesSection;