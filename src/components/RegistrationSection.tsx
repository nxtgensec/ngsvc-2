import { ArrowRight, CheckCircle, Shield } from 'lucide-react';
import { Button } from './ui/button';

const RegistrationSection = () => {
  const steps = [
    'Form a team (solo or duo)',
    'Pay entry fee of ₹50 per team',
    'Choose your challenge',
    'Start building!',
  ];

  return (
    <section id="register" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-20" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-b from-card to-background border border-primary/30">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 mb-6">
                <CheckCircle className="w-4 h-4 text-secondary" />
                <span className="font-orbitron text-sm text-secondary font-semibold">REGISTRATIONS OPEN FEB 1</span>
              </div>
              
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
                <span className="text-foreground">Ready to </span>
                <span className="text-gradient">Join?</span>
              </h2>
              <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
                Register your team now and be part of the most exciting hackathon of February 2026. 
                Limited slots available!
              </p>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-4 gap-4 mb-10">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary font-orbitron font-bold text-sm flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="font-inter text-sm text-foreground">{step}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Register Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span className="font-inter text-sm">Entry Fee: ₹50 per team</span>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-10 pt-8 border-t border-border">
              <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  <span className="font-inter text-sm">Online Event</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  <span className="font-inter text-sm">Open to All</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  <span className="font-inter text-sm">Expert Mentors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  <span className="font-inter text-sm">₹3,000 Prizes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
