import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Palette, Code, Megaphone, Menu, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const Index = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const projects = [
    "Website experience INFOCASTER",
    "Vormgeven Gin etiketten R&L-ANN",
    "Re-branding DOUCHE-CONCURRENT",
    "Videocommercial GOVOLT",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Cutting-edge websites and applications built with the latest technologies.",
    },
    {
      icon: Palette,
      title: "Brand Design",
      description: "Memorable visual identities that resonate with your audience.",
    },
    {
      icon: Sparkles,
      title: "Digital Experience",
      description: "Immersive experiences that engage and delight users.",
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      description: "Strategic campaigns that drive growth and visibility.",
    },
  ];

  const portfolioProjects = [
    { image: project1, title: "E-Commerce Platform", category: "Web Development" },
    { image: project2, title: "Mobile Banking App", category: "App Design" },
    { image: project3, title: "Brand Identity System", category: "Branding" },
    { image: project4, title: "Digital Marketplace", category: "Full Stack" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Ticker */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border overflow-hidden">
        <div className="flex items-center h-10 whitespace-nowrap">
          <span className="text-xs font-medium tracking-wider px-4 animate-marquee inline-block">
            NOW CREATING &nbsp;&nbsp;&nbsp; {projects[currentProject]}
          </span>
        </div>
      </div>

      {/* Fixed Navigation */}
      <div className="fixed top-12 left-0 right-0 z-40 px-6 py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="border border-foreground px-4 py-2">
            <span className="text-2xl font-bold italic">B</span>
          </div>
          
          {/* Menu */}
          <button className="border border-foreground p-3 hover:bg-foreground hover:text-background transition-all duration-300">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Radial gradient background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, transparent 45%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.03) 45.5%, transparent 45.5%), radial-gradient(circle at center, transparent 0%, transparent 48%, rgba(255,255,255,0.03) 48%, rgba(255,255,255,0.03) 48.5%, transparent 48.5%), radial-gradient(circle at center, transparent 0%, transparent 51%, rgba(255,255,255,0.03) 51%, rgba(255,255,255,0.03) 51.5%, transparent 51.5%), radial-gradient(circle at center, transparent 0%, transparent 54%, rgba(255,255,255,0.03) 54%, rgba(255,255,255,0.03) 54.5%, transparent 54.5%), radial-gradient(circle at center, transparent 0%, transparent 57%, rgba(255,255,255,0.03) 57%, rgba(255,255,255,0.03) 57.5%, transparent 57.5%), radial-gradient(circle at center, transparent 0%, transparent 60%, rgba(255,255,255,0.03) 60%, rgba(255,255,255,0.03) 60.5%, transparent 60.5%)',
            }}
          />
          {/* Radial lines emanating from center */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="radial-lines" x="50%" y="50%" width="100%" height="100%" patternUnits="userSpaceOnUse">
                {[...Array(24)].map((_, i) => {
                  const angle = (i * 15) * Math.PI / 180;
                  const x2 = Math.cos(angle) * 2000;
                  const y2 = Math.sin(angle) * 2000;
                  return (
                    <line
                      key={i}
                      x1="0"
                      y1="0"
                      x2={x2}
                      y2={y2}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                  );
                })}
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#radial-lines)" transform="translate(50%, 50%)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-12">
              <span className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
                Creative agency
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-16 leading-[1.1] italic">
              WE DESIGN UNIQUE
              <br />
              GRAPHIC AND WEB
              <br />
              EXPERIENCES
            </h1>
            <div className="flex flex-col sm:flex-row gap-0 justify-center items-center max-w-md mx-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] rounded-none border-t border-l border-r sm:border-r-0 border-b-0">
                Cases
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] rounded-none border-l border-r border-b">
                Contact
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 right-12 flex flex-col items-center gap-2 cursor-pointer group">
          <div className="border border-foreground rounded-full p-3 group-hover:bg-foreground group-hover:text-background transition-all duration-300">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>
          <span className="text-xs font-medium tracking-wider uppercase writing-mode-vertical rotate-180">
            Scroll down
          </span>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative border-t border-border">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 italic">
              What We Do
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Full-spectrum digital services tailored to elevate your brand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="group p-8 bg-card border-border hover:border-foreground transition-all duration-300 cursor-pointer"
              >
                <service.icon className="w-12 h-12 text-foreground mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-32 relative border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 italic">
              Featured Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A selection of our most impactful projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioProjects.map((project, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden cursor-pointer border border-border hover:border-foreground transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center p-8">
                    <span className="text-muted-foreground text-sm font-medium tracking-wider uppercase mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-3xl font-bold mb-4 italic">{project.title}</h3>
                    <Button variant="outline" size="sm">
                      View Project
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 relative border-t border-border">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 italic">
              We're Not Just Designers.
              <span className="block mt-4">
                We're Digital Storytellers.
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              With a passion for innovation and an eye for detail, we transform brands through 
              creative design, strategic thinking, and cutting-edge technology. Our mission is 
              to create digital experiences that not only look stunning but deliver real results.
            </p>
            <Button variant="outline" size="lg">
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative border-t border-border">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 italic">
              Ready to Start Something Great?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Let's collaborate and bring your vision to life.
            </p>
            <Button variant="outline" size="lg">
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground mb-4 md:mb-0">
              © 2025 Creative Agency. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
