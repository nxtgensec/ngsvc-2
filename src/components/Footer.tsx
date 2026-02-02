import { Shield, Mail, Globe, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-border">
      <div className="absolute inset-0 circuit-pattern opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-orbitron font-bold text-foreground text-sm tracking-wider">NXTGENSEC</span>
                <span className="text-[10px] text-muted-foreground tracking-widest">SECURING DIGITAL ASSETS</span>
              </div>
            </div>
            <p className="font-inter text-sm text-muted-foreground max-w-md mb-4">
              NxtGenSec is dedicated to fostering innovation and building a community of developers 
              who create self-hosted solutions for everyday problems.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Challenges', 'Timeline', 'Benefits', 'Register'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-orbitron font-bold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:contact@nxtgensec.com" className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  contact@nxtgensec.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <a href="#" className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  www.nxtgensec.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-sm text-muted-foreground">
            © 2026 NxtGenSec. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="font-orbitron text-xs text-primary tracking-wider">VIBECODING</span>
            <span className="text-muted-foreground">|</span>
            <span className="font-inter text-xs text-muted-foreground">February Edition 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
