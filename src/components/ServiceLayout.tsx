import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceLayoutProps {
  children: ReactNode;
  title: string;
  icon: string;
  description: string;
}

export function ServiceLayout({ children, title, icon, description }: ServiceLayoutProps) {
  return (
    <div className="service-page">
      <Link to="/" className="back-link">
        <ArrowLeft className="icon-small" />
        Back to Home
      </Link>
      <motion.div
        className="service-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="service-title">
          <span className="service-icon">{icon}</span>
          <h1>{title}</h1>
        </div>
        <p className="service-description">{description}</p>
      </motion.div>
      <motion.div
        className="service-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}