import { ShieldCheck } from 'lucide-react';

const FaqRulesSection = () => {
  const rules = [
    'Team-based registration only. Individual participation is not allowed for March edition.',
    'Each team must have exactly 2 members.',
    'Registration is free and starts from March 4, 2026.',
    'Problem statements are released only at hackathon kickoff.',
    'Teams must solve the given PS strictly within the hackathon time window (March 13-15).',
    'Evaluation runs on March 16-17. Results are declared on March 18.',
    'Any plagiarism or unfair practice leads to immediate disqualification.',
    'Judges decision is final.',
  ];

  return (
    <section id="rules" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Rules</span>
            </h2>
            <p className="font-inter text-lg text-muted-foreground">
              March edition participation rules and schedule policy.
            </p>
          </div>

          <div className="rounded-xl bg-card border border-border p-6 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <h3 className="font-orbitron text-xl font-bold">Official Rules</h3>
            </div>
            <ul className="space-y-3">
              {rules.map((rule) => (
                <li key={rule} className="font-inter text-sm text-muted-foreground">
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqRulesSection;
