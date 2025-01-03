import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TemplateCardProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}

export function TemplateCard({ title, description, image, onClick }: TemplateCardProps) {
  return (
    <div 
      className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-48"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          {description}
        </p>
        <div className="mt-4 flex items-center text-indigo-600">
          <span className="text-sm font-medium">Get started</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </div>
  );
}