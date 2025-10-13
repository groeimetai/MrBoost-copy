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
  const tickerProjects = [
    "Website experience INFOCASTER",
    "Vormgeven Gin etiketten RBL-ANN",
    "Re-branding DOUCHE-CONCURRENT",
    "Videocommercial GOVOLT",
    "Website lancering Europa Park",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % tickerProjects.length);
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
        <div className="flex items-center h-10">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="text-xs font-medium tracking-wider px-8">
                NOW CREATING &nbsp;&nbsp; Website experience INFOCASTER &nbsp;|&nbsp; Vormgeven Gin etiketten RBL-ANN &nbsp;|&nbsp; Re-branding DOUCHE-CONCURRENT &nbsp;|&nbsp; Videocommercial GOVOLT &nbsp;|&nbsp; Website lancering Europa Park &nbsp;|&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Navigation */}
      <div className="fixed top-12 left-0 right-0 z-40 px-6 py-6 bg-background/80 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="border border-foreground w-10 h-10 flex items-center justify-center">
            <span className="text-xl font-bold">B</span>
          </div>
          
          {/* Menu */}
          <button className="border border-foreground w-10 h-10 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300">
            <div className="flex flex-col gap-1">
              <div className="w-5 h-px bg-current"></div>
              <div className="w-5 h-px bg-current"></div>
              <div className="w-5 h-px bg-current"></div>
            </div>
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
        <div className="absolute bottom-12 right-12 flex flex-col items-center gap-3 cursor-pointer group">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-accent flex items-center justify-center group-hover:bg-accent group-hover:text-background transition-all duration-300">
              <ArrowRight className="w-6 h-6 rotate-[-45deg]" />
            </div>
          </div>
          <span className="text-xs font-medium tracking-wider text-accent">
            Scroll down
          </span>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-32 relative border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-medium tracking-[0.2em] uppercase mb-8 border-b border-border inline-block pb-4 px-8">
              Awards
            </h2>
          </div>
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-bold italic mb-16">
              IT'S NOT JUST OUR MOMS WHO THINK WE'RE GREAT.
            </h3>
            <div className="flex justify-center items-center gap-16">
              <div className="flex flex-col items-center">
                <div className="text-6xl font-bold mb-4">W.</div>
                <span className="text-sm text-muted-foreground">Awwwards</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-6xl font-bold mb-4">CSSDA</div>
                <span className="text-sm text-muted-foreground">CSSDA</span>
              </div>
            </div>
          </div>
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
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold mb-8 italic leading-tight">
                  READY FOR A BOOST?
                </h2>
                <Button variant="outline" size="lg" className="group">
                  Get In Touch
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="aspect-[4/3] bg-muted rounded-none overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" 
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                © All Rights Reserved
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm">Beschikbaar voor nieuwe projecten</span>
              </div>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 7.5c0-.3-.2-.5-.5-.5h-3c-.3 0-.5.2-.5.5v9c0 .3.2.5.5.5h3c.3 0 .5-.2.5-.5v-9zm-4-2c0-.3-.2-.5-.5-.5h-3c-.3 0-.5.2-.5.5v11c0 .3.2.5.5.5h3c.3 0 .5-.2.5-.5v-11zm-8-3c0-.3-.2-.5-.5-.5h-3c-.3 0-.5.2-.5.5v16c0 .3.2.5.5.5h3c.3 0 .5-.2.5-.5v-16z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-300 shadow-lg hover:scale-110"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
};

export default Index;
