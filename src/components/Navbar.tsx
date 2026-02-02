import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import nxtgensecLogo from '@/assets/nxtgensec-logo.png';

const REGISTER_LINK = "https://forms.gle/cJiq3hvQQCBwmVZN8";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Challenges', href: '#challenges' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Benefits', href: '#benefits' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <img 
              src={nxtgensecLogo} 
              alt="NxtGenSec Logo" 
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-orbitron font-bold text-foreground text-sm tracking-wider">NXTGENSEC</span>
              <span className="text-[10px] text-muted-foreground tracking-widest">SECURING DIGITAL ASSETS</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <a href={REGISTER_LINK} target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="sm">
                Register Now
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a href={REGISTER_LINK} target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="sm" className="w-fit">
                  Register Now
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
