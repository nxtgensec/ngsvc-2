import { Calendar, PlayCircle, Flag, Trophy } from 'lucide-react';

const TimelineSection = () => {
  const events = [
    {
      icon: Calendar,
      date: 'Feb 1, 2026',
      title: 'Registration Opens',
      description: 'Team registration begins. Form your team of up to 2 members and secure your spot.',
      color: 'primary',
    },
    {
      icon: PlayCircle,
      date: 'Feb 20, 2026',
      title: 'Hackathon Begins',
      description: 'Kickoff event with problem statement briefing and mentor introductions.',
      color: 'secondary',
    },
    {
      icon: Flag,
      date: 'Feb 22, 2026',
      title: 'Submission Deadline',
      description: 'Final project submissions with documentation and demo videos.',
      color: 'accent',
    },
    {
      icon: Trophy,
      date: 'Feb 22, 2026',
      title: 'Results & Awards',
      description: 'Winner announcement and prize distribution ceremony.',
      color: 'primary',
    },
  ];

  return (
    <section id="timeline" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">Event </span>
            <span className="text-gradient-primary">Timeline</span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground">
            Mark your calendars! Here's everything you need to know about the event schedule.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {events.map((event, index) => (
            <div key={index} className="relative flex gap-6 pb-12 last:pb-0">
              {/* Timeline Line */}
              {index !== events.length - 1 && (
                <div className="absolute left-6 top-14 w-0.5 h-full bg-gradient-to-b from-border to-transparent" />
              )}
              
              {/* Icon */}
              <div className={`relative z-10 w-12 h-12 rounded-lg bg-${event.color}/10 border border-${event.color}/30 flex items-center justify-center flex-shrink-0`}>
                <event.icon className={`w-6 h-6 text-${event.color}`} />
              </div>
              
              {/* Content */}
              <div className="flex-1 pt-1">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-${event.color}/10 text-${event.color} mb-2`}>
                  {event.date}
                </span>
                <h3 className="font-orbitron text-xl font-bold text-foreground mb-2">{event.title}</h3>
                <p className="font-inter text-muted-foreground">{event.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Countdown or CTA */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="p-8 rounded-2xl card-gradient border border-primary/30 glow-primary text-center">
            <p className="font-orbitron text-sm text-primary mb-2 tracking-widest">3 DAYS OF INTENSE CODING</p>
            <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-foreground mb-4">
              20 - 22 February 2026
            </h3>
            <p className="font-inter text-muted-foreground mb-6">
              48+ hours to build, innovate, and compete for prizes worth ₹3,000
            </p>
            <div className="flex justify-center gap-4">
              <div className="px-4 py-2 rounded-lg bg-card border border-border">
                <span className="font-orbitron text-2xl font-bold text-primary">48+</span>
                <p className="font-inter text-xs text-muted-foreground">Hours</p>
              </div>
              <div className="px-4 py-2 rounded-lg bg-card border border-border">
                <span className="font-orbitron text-2xl font-bold text-secondary">5+</span>
                <p className="font-inter text-xs text-muted-foreground">Challenges</p>
              </div>
              <div className="px-4 py-2 rounded-lg bg-card border border-border">
                <span className="font-orbitron text-2xl font-bold text-accent">₹3K</span>
                <p className="font-inter text-xs text-muted-foreground">Prizes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
