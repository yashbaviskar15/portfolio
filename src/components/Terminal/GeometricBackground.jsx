import './GeometricBackground.css';

export default function GeometricBackground() {
  return (
    <div className="geometric-background">
      {/* Cloud SVG Elements */}
      <svg className="bg-svg cloud-1" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 30 60 Q 20 50 30 40 Q 40 30 50 40 Q 60 30 70 40 Q 80 35 85 50 Q 90 65 75 75 Q 50 85 30 75 Z"
          fill="none"
          stroke="url(#cloudGradient1)"
          strokeWidth="2"
          opacity="0.6"
        />
        <defs>
          <linearGradient id="cloudGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      <svg className="bg-svg cloud-2" viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 25 50 Q 15 40 25 30 Q 35 20 45 30 Q 55 20 65 30 Q 75 25 80 40 Q 85 55 70 65 Q 45 73 25 65 Z"
          fill="none"
          stroke="url(#cloudGradient2)"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <defs>
          <linearGradient id="cloudGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Network/Circuit Lines */}
      <svg className="bg-svg network-lines" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.15">
          {/* Horizontal lines */}
          <line x1="0" y1="50" x2="300" y2="50" stroke="#00d4ff" strokeWidth="1" />
          <line x1="0" y1="100" x2="300" y2="100" stroke="#8b5cf6" strokeWidth="1" />
          <line x1="0" y1="150" x2="300" y2="150" stroke="#00d4ff" strokeWidth="1" />
          <line x1="0" y1="200" x2="300" y2="200" stroke="#8b5cf6" strokeWidth="1" />
          <line x1="0" y1="250" x2="300" y2="250" stroke="#00d4ff" strokeWidth="1" />

          {/* Vertical lines */}
          <line x1="50" y1="0" x2="50" y2="300" stroke="#8b5cf6" strokeWidth="1" />
          <line x1="100" y1="0" x2="100" y2="300" stroke="#00d4ff" strokeWidth="1" />
          <line x1="150" y1="0" x2="150" y2="300" stroke="#8b5cf6" strokeWidth="1" />
          <line x1="200" y1="0" x2="200" y2="300" stroke="#00d4ff" strokeWidth="1" />
          <line x1="250" y1="0" x2="250" y2="300" stroke="#8b5cf6" strokeWidth="1" />

          {/* Connection nodes */}
          <circle cx="50" cy="50" r="2" fill="#00d4ff" opacity="0.6" />
          <circle cx="150" cy="100" r="2" fill="#8b5cf6" opacity="0.6" />
          <circle cx="250" cy="150" r="2" fill="#00d4ff" opacity="0.6" />
          <circle cx="100" cy="200" r="2" fill="#8b5cf6" opacity="0.6" />
          <circle cx="200" cy="250" r="2" fill="#00d4ff" opacity="0.6" />
        </g>
      </svg>

      {/* Animated Data Flow Lines */}
      <svg className="bg-svg data-flow" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <g opacity="0.25">
          {/* Curved data paths */}
          <path
            d="M 50 200 Q 150 100 250 200"
            fill="none"
            stroke="url(#dataGradient)"
            strokeWidth="2"
          />
          <path
            d="M 100 300 Q 200 150 300 100"
            fill="none"
            stroke="url(#dataGradient)"
            strokeWidth="2"
          />
          <path
            d="M 350 250 Q 250 200 150 280"
            fill="none"
            stroke="url(#dataGradient)"
            strokeWidth="2"
          />
        </g>
      </svg>

      {/* Geometric Shapes - Hexagons */}
      <svg className="bg-svg hex-1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="50,10 90,30 90,70 50,90 10,70 10,30"
          fill="none"
          stroke="#00d4ff"
          strokeWidth="1.5"
          opacity="0.3"
        />
      </svg>

      <svg className="bg-svg hex-2" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="50,10 90,30 90,70 50,90 10,70 10,30"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="1.5"
          opacity="0.2"
        />
      </svg>

      {/* Floating Code Symbols */}
      <svg className="bg-svg code-symbol-1" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <text x="40" y="45" fontSize="32" textAnchor="middle" fill="#00d4ff" opacity="0.2">
          {'{ }'}
        </text>
      </svg>

      <svg className="bg-svg code-symbol-2" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <text x="40" y="45" fontSize="32" textAnchor="middle" fill="#8b5cf6" opacity="0.15">
          {'< >'}
        </text>
      </svg>

      {/* Pulsing Dots Network */}
      <svg className="bg-svg pulse-network" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.3">
          <circle cx="30" cy="30" r="3" fill="#00d4ff">
            <animate attributeName="r" values="3;6;3" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="170" cy="50" r="3" fill="#8b5cf6">
            <animate attributeName="r" values="3;6;3" dur="3.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="170" r="3" fill="#00d4ff">
            <animate attributeName="r" values="3;6;3" dur="2.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="150" r="3" fill="#8b5cf6">
            <animate attributeName="r" values="3;6;3" dur="3.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="170" cy="150" r="3" fill="#00d4ff">
            <animate attributeName="r" values="3;6;3" dur="2.9s" repeatCount="indefinite" />
          </circle>

          {/* Connection lines between dots */}
          <line x1="30" y1="30" x2="170" y2="50" stroke="#00d4ff" strokeWidth="1" opacity="0.4" />
          <line x1="170" y1="50" x2="100" y2="170" stroke="#8b5cf6" strokeWidth="1" opacity="0.4" />
          <line x1="100" y1="170" x2="50" y2="150" stroke="#00d4ff" strokeWidth="1" opacity="0.4" />
          <line x1="50" y1="150" x2="30" y2="30" stroke="#8b5cf6" strokeWidth="1" opacity="0.4" />
        </g>
      </svg>

      {/* Background gradient overlay */}
      <div className="bg-gradient-overlay"></div>
    </div>
  );
}
