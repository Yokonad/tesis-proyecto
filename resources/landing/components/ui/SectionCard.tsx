import React from 'react';

interface SectionCardProps {
  title: string;
  description: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, description }) => {
  return (
    <article className="rounded-xl border border-landing-border bg-landing-card p-6 shadow-sm">
      <h3 className="mb-2 text-base font-semibold text-landing-light">{title}</h3>
      <p className="text-sm leading-relaxed text-landing-text-secondary">{description}</p>
    </article>
  );
};
