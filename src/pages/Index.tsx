import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Palette, Code, Megaphone } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const Index = () => {
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

  const projects = [
    { image: project1, title: "E-Commerce Platform", category: "Web Development" },
    { image: project2, title: "Mobile Banking App", category: "App Design" },
    { image: project3, title: "Brand Identity System", category: "Branding" },
    { image: project4, title: "Digital Marketplace", category: "Full Stack" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center animate-fade-in-up">
            <div className="inline-block mb-6">
              <span className="text-accent text-sm font-semibold tracking-wider uppercase">
                Creative Digital Agency
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              We Craft
              <span className="block bg-gradient-primary bg-clip-text text-transparent animate-glow-pulse">
                Digital Excellence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Transforming bold ideas into stunning digital experiences that captivate audiences and drive results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="group">
                Start Your Project
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="glowOutline" size="lg">
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-glow opacity-20 blur-3xl" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
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
                className="group p-8 bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-glow cursor-pointer"
              >
                <service.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Featured Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A selection of our most impactful projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                    <Button variant="hero" size="sm" className="group/btn">
                      View Project
                      <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-glow opacity-10 blur-3xl" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              We're Not Just Designers.
              <span className="block bg-gradient-primary bg-clip-text text-transparent mt-4">
                We're Digital Storytellers.
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              With a passion for innovation and an eye for detail, we transform brands through 
              creative design, strategic thinking, and cutting-edge technology. Our mission is 
              to create digital experiences that not only look stunning but deliver real results.
            </p>
            <Button variant="glowOutline" size="lg">
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Ready to Start Something Great?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Let's collaborate and bring your vision to life.
            </p>
            <Button variant="hero" size="lg" className="group">
              Get In Touch
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
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
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
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
