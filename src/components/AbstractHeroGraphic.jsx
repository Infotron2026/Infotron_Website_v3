import React from 'react';

const AbstractHeroGraphic = () => {
  return (
    <div className="relative w-full h-full">
      {/* Animated Gradient Orbs */}
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
      
      {/* SVG Abstract Shapes */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 800 600" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flowing Lines */}
        <path 
          d="M 0 300 Q 200 100, 400 300 T 800 300" 
          stroke="url(#gradient1)" 
          strokeWidth="2" 
          fill="none"
          opacity="0.3"
          className="animate-pulse"
        />
        <path 
          d="M 0 350 Q 200 150, 400 350 T 800 350" 
          stroke="url(#gradient2)" 
          strokeWidth="2" 
          fill="none"
          opacity="0.2"
          style={{animationDelay: '1s'}}
          className="animate-pulse"
        />
        
        {/* Geometric Shapes */}
        <circle cx="650" cy="150" r="100" fill="url(#radialGradient1)" opacity="0.1" />
        <circle cx="150" cy="450" r="80" fill="url(#radialGradient2)" opacity="0.1" />
        
        {/* Grid Pattern */}
        <g opacity="0.05">
          {[...Array(20)].map((_, i) => (
            <line 
              key={`v-${i}`}
              x1={i * 40} 
              y1="0" 
              x2={i * 40} 
              y2="600" 
              stroke="url(#gradient1)" 
              strokeWidth="1" 
            />
          ))}
          {[...Array(15)].map((_, i) => (
            <line 
              key={`h-${i}`}
              x1="0" 
              y1={i * 40} 
              x2="800" 
              y2={i * 40} 
              stroke="url(#gradient2)" 
              strokeWidth="1" 
            />
          ))}
        </g>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <radialGradient id="radialGradient1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="radialGradient2">
            <stop offset="0%" stopColor="#9333ea" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      
      {/* Floating Geometric Elements */}
      <div 
        className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-blue-500 rounded-lg opacity-10"
        style={{
          animation: 'float-medium 15s ease-in-out infinite',
          transform: 'rotate(45deg)'
        }}
      />
      <div 
        className="absolute bottom-1/3 left-1/3 w-24 h-24 border-2 border-purple-500 rounded-full opacity-10"
        style={{
          animation: 'float-medium 18s ease-in-out infinite',
          animationDelay: '2s'
        }}
      />
    </div>
  );
};

export default AbstractHeroGraphic;
