interface EmblemProps {
  size?: number;
}

export default function Emblem({ size = 128 }: EmblemProps) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <defs>
        <path id="topArc" d="M 18,108 A 84,84 0 1,1 182,108" />
        <path id="bottomArc" d="M 182,108 A 84,84 0 1,1 18,108" />
      </defs>
      <circle
        cx="100"
        cy="100"
        r="97"
        fill="none"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <text fontSize="8.5" fill="white" letterSpacing="2.5">
        <textPath href="#topArc" startOffset="4%">
          ASSOCIAÇÃO SALVAÇÃO
        </textPath>
      </text>
      <text fontSize="8.5" fill="white" letterSpacing="2.5">
        <textPath href="#bottomArc" startOffset="6%">
          PLANTANDO OS CÉUS NA TERRA
        </textPath>
      </text>
      <g transform="translate(100,103)">
        <polygon points="-38,18 -16,-18 4,18" fill="white" fillOpacity="0.85" />
        <polygon points="-6,18 16,-12 38,18" fill="white" fillOpacity="0.65" />
        <polygon points="-28,18 -23,4 -18,18" fill="white" />
        <polygon points="20,18 25,4 30,18" fill="white" />
        <line x1="0" y1="-40" x2="0" y2="-3" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <line x1="-12" y1="-26" x2="12" y2="-26" stroke="white" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}
