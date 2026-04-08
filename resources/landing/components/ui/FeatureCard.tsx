import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon, delay = 0 }) => {
  return (
    <article 
      className="group relative overflow-hidden rounded-2xl border border-landing-border bg-landing-card p-6 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-landing-border-hover hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(234,88,12,0.15)] animate-landing-slide-up"
      style={{ animationDelay: `${delay}ms`, opacity: 0, animationFillMode: 'forwards' }}
    >
      {/* Glow background effect */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-landing-primary-glow blur-3xl transition-all duration-500 group-hover:bg-landing-primary/30"></div>
      
      {/* Icon Wrapper */}
      <div className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-landing-darker border border-landing-border shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:border-landing-primary/50 group-hover:rotate-3">
        <Icon className="h-6 w-6 text-landing-primary transition-colors duration-300 group-hover:text-landing-primary-light" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="mb-3 text-lg font-bold text-landing-light transition-colors group-hover:text-white">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-landing-text-secondary transition-colors group-hover:text-landing-light/80">
          {description}
        </p>
      </div>
    </article>
  );
};
