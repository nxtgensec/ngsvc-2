import { Mail, MessageCircle } from 'lucide-react';

const OtherSection = () => {
  return (
    <section id="other" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto rounded-2xl bg-card/80 border border-border p-8 md:p-12">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">Community + </span>
            <span className="text-gradient-primary">Contact</span>
          </h2>
          <p className="font-inter text-muted-foreground mb-8">
            Stay connected for monthly editions, announcements, and support.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href="https://chat.whatsapp.com/ILzK1asY0ISK4XjpVShM6l"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border p-4 hover:border-primary/50 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-primary mb-2" />
              <p className="font-orbitron text-sm font-bold">WhatsApp Community</p>
              <p className="font-inter text-xs text-muted-foreground mt-1">Join updates and discussion</p>
            </a>

            <a
              href="mailto:vibecoding@nxtgensec.org"
              className="rounded-xl border border-border p-4 hover:border-secondary/50 transition-colors"
            >
              <Mail className="w-5 h-5 text-secondary mb-2" />
              <p className="font-orbitron text-sm font-bold">Email Support</p>
              <p className="font-inter text-xs text-muted-foreground mt-1">vibecoding@nxtgensec.org</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherSection;
