import React from 'react';

// Default SVG helper props to ensure perfect aspect ratio and no squishing
const defaultSvgProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  style: { flexShrink: 0, aspectRatio: '1 / 1' }
};

export function CalendarIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

export function LocationIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export function TicketIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  );
}

export function SourceIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export function SearchIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

export function FilterIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  );
}

export function ConstellationIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
    </svg>
  );
}

export function GridIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
    </svg>
  );
}

export function ListIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function TimelineIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function LightningIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

export function DatabaseIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="2" {...defaultSvgProps} {...props}>
      <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}

export function ExternalLinkIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export function BookmarkIcon({ className = "w-4 h-4", filled = false, ...props }) {
  return (
    <svg
      className={className}
      strokeWidth="1.8"
      {...defaultSvgProps}
      fill={filled ? "currentColor" : "none"}
      {...props}
    >
      <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  );
}

export function ShareIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  );
}

export function CloseIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="2" {...defaultSvgProps} {...props}>
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function CheckIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="2.2" {...defaultSvgProps} {...props}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function TerminalIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

export function SparklesIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

// Category Specific Icons
export function MusicIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12 0c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  );
}

export function TheatreIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function TalksIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

export function WorkshopsIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M7 21a4 4 0 01-4-4c0-1.48.8-2.77 2-3.46a4 4 0 010-7.08C3.8 5.77 3 4.48 3 3a4 4 0 014 4c0 1.48-.8 2.77-2 3.46a4 4 0 010 7.08c1.2.69 2 1.98 2 3.46z" />
    </svg>
  );
}

export function FoodIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
    </svg>
  );
}

export function NightlifeIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export function SportsIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

export function FamilyIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} strokeWidth="1.8" {...defaultSvgProps} {...props}>
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

// Helper to render Category SVG Icon dynamically
export function CategoryGlyph({ category, className = "w-4 h-4", ...props }) {
  const c = String(category || '').toLowerCase();
  if (c.includes('music') || c.includes('concert') || c.includes('singles')) {
    return <MusicIcon className={className} {...props} />;
  }
  if (c.includes('theatre') || c.includes('art') || c.includes('comedy') || c.includes('dance')) {
    return <TheatreIcon className={className} {...props} />;
  }
  if (c.includes('talk') || c.includes('meetup') || c.includes('conference') || c.includes('literary') || c.includes('idea')) {
    return <TalksIcon className={className} {...props} />;
  }
  if (c.includes('workshop') || c.includes('class') || c.includes('learning') || c.includes('pottery')) {
    return <WorkshopsIcon className={className} {...props} />;
  }
  if (c.includes('food') || c.includes('drink') || c.includes('baking') || c.includes('coffee')) {
    return <FoodIcon className={className} {...props} />;
  }
  if (c.includes('nightlife') || c.includes('club') || c.includes('dj') || c.includes('techno')) {
    return <NightlifeIcon className={className} {...props} />;
  }
  if (c.includes('sport') || c.includes('outdoor') || c.includes('fitness') || c.includes('cycling') || c.includes('trek')) {
    return <SportsIcon className={className} {...props} />;
  }
  if (c.includes('kid') || c.includes('family') || c.includes('children')) {
    return <FamilyIcon className={className} {...props} />;
  }
  return <SparklesIcon className={className} {...props} />;
}
