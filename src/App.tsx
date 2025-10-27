import { motion, useScroll, useTransform } from 'framer-motion';
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
import Typewriter from 'typewriter-effect';
import './App.css';

function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div className="app">
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
            >
              Start Your Project <ArrowRight className="icon-small" />
            </motion.button>
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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

      {/* Services Section - The Big Five */}
      <section className="services">
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
            The Big Five Services
          </motion.h2>

          <div className="services-grid">
            {[
              {
                icon: FileText,
                title: "Proposals",
                price: "$8K-$18K",
                description: "AI-powered RFP responses for construction management firms",
                features: ["10-day turnaround", "90%+ compliance", "Professional graphics"],
                color: "#667eea"
              },
              {
                icon: Code,
                title: "Development",
                price: "$5K-$15K/mo",
                description: "Custom software development with fractional teams",
                features: ["Full-stack teams", "Modern tech stack", "Agile delivery"],
                color: "#764ba2"
              },
              {
                icon: Brain,
                title: "Consulting",
                price: "$3K-$10K/mo",
                description: "AI strategy and business advisory for growth",
                features: ["AI roadmapping", "Process optimization", "Strategic planning"],
                color: "#f093fb"
              },
              {
                icon: Users,
                title: "Recruiting",
                price: "$12K-$25K",
                description: "Talent acquisition with AI-enhanced matching",
                features: ["Full-cycle recruiting", "Quality candidates", "90-day guarantee"],
                color: "#4facfe"
              },
              {
                icon: TrendingUp,
                title: "Marketing",
                price: "$3K-$8K/mo",
                description: "AI-enabled content and campaign support",
                features: ["Content creation", "Social media", "SEO optimization"],
                color: "#43e97b"
              }
            ].map((service, index) => (
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
                >
                  Learn More
                </motion.button>
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
