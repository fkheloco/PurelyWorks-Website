import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  Users, 
  Code, 
  Brain, 
  Target, 
  TrendingUp,
  FileText,
  MessageSquare,
  ArrowRight,
  Check,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import './App.css';
import Navbar from './components/Navbar';
import { ContactForm } from './components/contact';

type Theme = 'light' | 'dark' | 'auto';

type Service = {
  icon: any;
  title: string;
  price: string;
  description: string;
  features: string[];
  color: string;
  detailedContent: {
    overview: string;
    features: string[];
    pricing: string[];
    bestFor: string;
    link?: string;
  };
};

function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'auto');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'auto') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const servicesData: Service[] = [
    {
      icon: FileText,
      title: "Training & Enablement",
      price: "$2K-$8K/mo",
      description: "Custom training programs and AI implementation support",
      features: ["Tailored curriculum", "Hands-on workshops", "Ongoing support"],
      color: "#38a169",
      detailedContent: {
        overview: "Comprehensive training and enablement services to help your team effectively implement and leverage AI technologies.",
        features: [
          "Custom curriculum development",
          "Live interactive workshops",
          "Hands-on implementation support",
          "Progress tracking & assessments",
          "Best practices & guidelines"
        ],
        pricing: [
          "Basic Training: $2,000/month",
          "Team Workshops: $5,000/month",
          "Enterprise Program: $8,000+/month"
        ],
        bestFor: "Organizations implementing new AI tools and processes",
        link: "https://www.notion.so/Training-Enablement-Services-6215c9510fd145ae83ef03a3df835d74?source=copy_link"
      }
    },
    {
      icon: FileText,
      title: "Proposals",
      price: "$8K-$18K",
      description: "AI-powered RFP responses for construction management firms",
      features: ["10-day turnaround", "90%+ compliance", "Professional graphics"],
      color: "#667eea",
      detailedContent: {
        overview: "Full-service proposal writing and production for construction management firms and government contractors.",
        features: [
          "Strategic consulting & win strategy development",
          "Professional technical writing & content development",
          "Graphic design & production (org charts, timelines)",
          "Compliance management & quality assurance",
          "Full project management & coordination"
        ],
        pricing: [
          "Monthly Retainer: $10-15k/month",
          "Single Project: $5-7k",
          "3-Proposal Bundle: $12k"
        ],
        bestFor: "Companies responding to 4-6+ RFPs per year"
      }
    },
    {
      icon: Code,
      title: "Development",
      price: "$5K-$15K/mo",
      description: "Custom software development with fractional teams",
      features: ["Full-stack teams", "Modern tech stack", "Agile delivery"],
      color: "#764ba2",
      detailedContent: {
        overview: "Dedicated software development teams working exclusively on client projects in their environment.",
        features: [
          "Full stack development (React, Node.js, Python)",
          "AI/ML integration & development",
          "System integration & APIs",
          "DevOps & cloud infrastructure",
          "Technical project management"
        ],
        pricing: [
          "Starter Team: $6,000/month",
          "Core Team: $12,000/month",
          "Full Team: $18,000+/month"
        ],
        bestFor: "Companies needing ongoing development capacity"
      }
    },
    {
      icon: Brain,
      title: "AI Consulting",
      price: "$3K-$10K/mo",
      description: "AI strategy and business advisory for growth",
      features: ["AI roadmapping", "Process optimization", "Strategic planning"],
      color: "#f093fb",
      detailedContent: {
        overview: "Strategic guidance for companies adopting AI, from initial strategy through implementation.",
        features: [
          "AI strategy development",
          "Use case identification & prioritization",
          "Technical architecture planning",
          "Implementation guidance",
          "Team training & enablement"
        ],
        pricing: [
          "Monthly Advisory: $5k/month",
          "Project-based: $5-20k per project"
        ],
        bestFor: "Organizations looking to leverage AI effectively"
      }
    },
    {
      icon: Users,
      title: "Recruiting",
      price: "$12K-$25K",
      description: "Talent acquisition with AI-enhanced matching",
      features: ["Full-cycle recruiting", "Quality candidates", "90-day guarantee"],
      color: "#4facfe",
      detailedContent: {
        overview: "AI-enhanced full-cycle recruiting delivering 60% faster time-to-hire.",
        features: [
          "AI-powered candidate sourcing",
          "Full-cycle recruitment management",
          "Skill assessment & screening",
          "Interview coordination",
          "Offer negotiation support"
        ],
        pricing: [
          "Per placement: $3-8k",
          "Monthly retainer: $4-8k/month"
        ],
        bestFor: "Companies with ongoing hiring needs (3+ positions/year)"
      }
    },
    {
      icon: TrendingUp,
      title: "Marketing",
      price: "$3K-$8K/mo",
      description: "AI-enabled content and campaign support",
      features: ["Content creation", "Social media", "SEO optimization"],
      color: "#43e97b",
      detailedContent: {
        overview: "Comprehensive marketing and content services powered by AI technology.",
        features: [
          "Content strategy & creation",
          "Social media management",
          "SEO optimization",
          "Marketing automation",
          "Analytics & reporting"
        ],
        pricing: [
          "Basic package: $3k/month",
          "Growth package: $5-8k/month"
        ],
        bestFor: "Businesses needing consistent content and marketing support"
      }
    }
  ];

  return (
    <div className="app">
      <Navbar theme={theme} onThemeChange={setTheme} />
      {/* Scroll Progress Bar */}
      <motion.div 
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <motion.section 
        className="hero"
        style={{ opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="icon-small" />
            <span>AI-Enabled Services</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="headline-container"
          >
            <span>Purely Works</span>
            <motion.div 
              className="typewriter-container"
            >
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString('for Admin')
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString('for Executives')
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString('for Managers')
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString('for Your Business')
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString('for You!')
                    .start();
                }}
                options={{
                  cursor: '_',
                  delay: 60,
                  deleteSpeed: 40,
                  wrapperClassName: 'typewriter-text'
                }}
              />
            </motion.div>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Expert teams + cutting-edge AI = exceptional results for growing businesses
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(102, 126, 234, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Your Project <ArrowRight className="icon-small" />
            </motion.button>
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See How We Work
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Animated Background Elements */}
        <div className="hero-background">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-orb"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.section>

  {/* Services Section - Reactbits styling */}
  <section className="services" id="services">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            The Big Six Services
          </motion.h2>

          <div className="services-grid">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              >
                <motion.div 
                  className="service-icon"
                  style={{ backgroundColor: `${service.color}20` }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <service.icon style={{ color: service.color }} />
                </motion.div>
                <h3>{service.title}</h3>
                <div className="service-price">{service.price}</div>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                    >
                      <Check className="icon-tiny" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  className="btn-card"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setExpandedService(expandedService === index ? null : index)}
                >
                  {expandedService === index ? 'Show Less' : 'Learn More'}
                </motion.button>

                <AnimatePresence>
                  {expandedService === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}
                    >
                      <div style={{ marginBottom: '0.75rem' }}>
                        <h4 style={{ fontWeight: 700, marginBottom: '0.25rem', color: 'var(--dark)' }}>Overview</h4>
                        <p style={{ color: '#4a5568', lineHeight: 1.6 }}>{service.detailedContent.overview}</p>
                      </div>

                      <div style={{ marginBottom: '0.75rem' }}>
                        <h4 style={{ fontWeight: 700, marginBottom: '0.25rem', color: 'var(--dark)' }}>Key Features</h4>
                        <ul style={{ paddingLeft: '1.25rem', color: '#4a5568' }}>
                          {service.detailedContent.features.map((feature, idx) => (
                            <li key={idx} style={{ marginBottom: '0.25rem' }}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      <div style={{ marginBottom: '0.75rem' }}>
                        <h4 style={{ fontWeight: 700, marginBottom: '0.25rem', color: 'var(--dark)' }}>Pricing Options</h4>
                        <ul style={{ paddingLeft: '1.25rem', color: '#4a5568' }}>
                          {service.detailedContent.pricing.map((price, idx) => (
                            <li key={idx} style={{ marginBottom: '0.25rem' }}>{price}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 style={{ fontWeight: 700, marginBottom: '0.25rem', color: 'var(--dark)' }}>Best For</h4>
                        <p style={{ color: '#4a5568', lineHeight: 1.6 }}>{service.detailedContent.bestFor}</p>
                      </div>

                      {service.detailedContent.link && (
                        <div style={{ marginTop: '0.75rem' }}>
                          <a
                            href={service.detailedContent.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 600 }}
                          >
                            View full details on Notion
                          </a>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Comparison Section */}
      <section className="comparison">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            How We're Different
          </motion.h2>

          <div className="comparison-grid">
            <motion.div
              className="comparison-column traditional"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3>Traditional Services</h3>
              <ul>
                {[
                  "Manual processes only",
                  "Fixed team sizes",
                  "US-only pricing",
                  "Vendor owns IP",
                  "Rigid contracts"
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <X className="icon-tiny" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="comparison-column modern"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3>Purely Works</h3>
              <ul>
                {[
                  "AI + human expertise",
                  "Fractional teams",
                  "Competitive global rates",
                  "You own everything",
                  "Flexible engagement"
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Check className="icon-tiny" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Our Operating Philosophy
          </motion.h2>

          <div className="philosophy-grid">
            {[
              {
                icon: Sparkles,
                title: "AI-First",
                description: "AI handles initial work, humans refine and perfect"
              },
              {
                icon: Users,
                title: "Human-Centric",
                description: "Technology amplifies human expertise, never replaces it"
              },
              {
                icon: Target,
                title: "Fractional Teams",
                description: "Right-sized teams that scale with your needs"
              },
              {
                icon: Zap,
                title: "Speed to Value",
                description: "Quick iterations, continuous improvement"
              },
              {
                icon: MessageSquare,
                title: "Transparent",
                description: "Open communication, clear pricing, no surprises"
              },
              {
                icon: Brain,
                title: "Partnership",
                description: "We're an extension of your team, not just a vendor"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="philosophy-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="philosophy-icon"
                  whileHover={{ rotate: 15 }}
                >
                  <item.icon />
                </motion.div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <motion.section
        id="contact"
        className="contact-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Get Started with Purely Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-subtitle"
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            Tell us about your business and we'll show you how AI can help
          </motion.p>
          <ContactForm />
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="cta-content"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Build Something Extraordinary?</h2>
          <p>Let's discuss how AI-enabled services can transform your business</p>
          <motion.button
            className="btn-cta"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Schedule a Discovery Call <ArrowRight className="icon-small" />
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Purely Works. All rights reserved.</p>
          <p>Helping You Build Smarter with AI</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
