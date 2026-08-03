// SVG illustration set for the "Fine-Tuning Techniques We Use" section.
// Dark navy / cyan / blue theme, abstract and technical.

const defs = (
  <defs>
    <linearGradient id="ftg-cyan" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#5FC2E3" />
      <stop offset="1" stopColor="#0077B6" />
    </linearGradient>
    <linearGradient id="ftg-blue" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#3B82F6" />
      <stop offset="1" stopColor="#1E3A8A" />
    </linearGradient>
    <radialGradient id="ftg-glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stopColor="#5FC2E3" stopOpacity="0.35" />
      <stop offset="1" stopColor="#5FC2E3" stopOpacity="0" />
    </radialGradient>
  </defs>
);

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 400 260" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {defs}
    <rect width="400" height="260" fill="url(#ftg-glow)" opacity="0.4" />
    {children}
  </svg>
);

// 1. SFT — Labeled dataset flowing into fine-tuned model
export const SFTVisual = () => (
  <Wrap>
    {/* Dataset grid */}
    <g transform="translate(30,80)">
      <text x="0" y="-8" fill="#94a3b8" fontSize="10" fontFamily="monospace">Labeled Data</text>
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect key={`${r}${c}`} x={c * 14} y={r * 14} width="10" height="10" rx="2" fill="#5FC2E3" opacity={0.3 + ((r + c) % 4) * 0.15} />
        ))
      )}
    </g>
    {/* Arrow */}
    <path d="M 120 130 L 175 130" stroke="url(#ftg-cyan)" strokeWidth="2" fill="none" markerEnd="url(#arr)" />
    <defs>
      <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#5FC2E3" />
      </marker>
    </defs>
    {/* Neural cube */}
    <g transform="translate(200,60)">
      <rect x="0" y="0" width="120" height="140" rx="10" fill="none" stroke="url(#ftg-cyan)" strokeWidth="1.5" opacity="0.6" />
      {[0, 1, 2].map((i) =>
        [0, 1, 2, 3].map((j) => {
          const x = 15 + j * 30;
          const y = 20 + i * 45;
          return <circle key={`${i}${j}`} cx={x} cy={y} r="4" fill="#5FC2E3" opacity={0.7} />;
        })
      )}
      {[0, 1, 2].map((i) =>
        [0, 1, 2].map((j) => (
          <line key={`l${i}${j}`} x1={15 + j * 30} y1={20 + i * 45} x2={45 + j * 30} y2={65 + i * 45} stroke="#5FC2E3" strokeWidth="0.6" opacity="0.35" />
        ))
      )}
    </g>
    {/* Output check */}
    <g transform="translate(345,120)">
      <circle r="18" fill="none" stroke="url(#ftg-cyan)" strokeWidth="1.5" />
      <path d="M -7 0 L -2 6 L 8 -6" stroke="#5FC2E3" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <text x="200" y="230" fill="#5FC2E3" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.7">supervised training pipeline</text>
  </Wrap>
);

// 2. LoRA — pre-trained weights + small adapters
export const LoRAVisual = () => (
  <Wrap>
    <g transform="translate(30,60)">
      <text x="0" y="-6" fill="#94a3b8" fontSize="9" fontFamily="monospace">Pre-trained</text>
      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect key={`${r}${c}`} x={c * 12} y={r * 12} width="9" height="9" rx="1.5" fill="#334155" stroke="#475569" strokeWidth="0.5" />
        ))
      )}
    </g>
    {/* Adapters */}
    <g transform="translate(160,50)">
      <text x="20" y="-6" fill="#5FC2E3" fontSize="9" fontFamily="monospace" textAnchor="middle">LoRA</text>
      <rect x="0" y="0" width="18" height="150" rx="4" fill="url(#ftg-cyan)" opacity="0.85" />
      <rect x="26" y="0" width="18" height="150" rx="4" fill="url(#ftg-cyan)" opacity="0.55" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1="9" y1={12 + i * 25} x2="35" y2={12 + i * 25} stroke="#0F172A" strokeWidth="1" opacity="0.6" />
      ))}
    </g>
    {/* Updated weights */}
    <g transform="translate(240,60)">
      <text x="0" y="-6" fill="#94a3b8" fontSize="9" fontFamily="monospace">Updated</text>
      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2, 3].map((c) => {
          const active = (r + c) % 3 === 0;
          return <rect key={`${r}${c}`} x={c * 12} y={r * 12} width="9" height="9" rx="1.5" fill={active ? "#5FC2E3" : "#334155"} opacity={active ? 0.9 : 1} />;
        })
      )}
    </g>
    <path d="M 128 130 L 158 130" stroke="#5FC2E3" strokeWidth="1.5" fill="none" />
    <path d="M 214 130 L 238 130" stroke="#5FC2E3" strokeWidth="1.5" fill="none" />
    <text x="200" y="235" fill="#5FC2E3" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.7">low-rank adapters</text>
  </Wrap>
);

// 3. QLoRA — quantized / compressed cubes → chip
export const QLoRAVisual = () => (
  <Wrap>
    {/* Compressed blocks */}
    <g transform="translate(40,90)">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${i * 20},${i * 6})`}>
          <rect x="0" y="0" width="30" height="30" rx="4" fill="#1E293B" stroke="#5FC2E3" strokeWidth="1" opacity={0.5 + i * 0.15} />
          <text x="15" y="19" fill="#5FC2E3" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.85">4-bit</text>
        </g>
      ))}
    </g>
    {/* Chip */}
    <g transform="translate(160,70)">
      <rect x="0" y="0" width="120" height="120" rx="14" fill="#0B1E36" stroke="url(#ftg-cyan)" strokeWidth="1.5" />
      <rect x="20" y="20" width="80" height="80" rx="6" fill="none" stroke="#5FC2E3" strokeWidth="1" opacity="0.6" />
      <text x="60" y="65" fill="#5FC2E3" fontSize="16" fontFamily="monospace" textAnchor="middle" fontWeight="600">QLoRA</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <line x1={-8} y1={30 + i * 20} x2={0} y2={30 + i * 20} stroke="#5FC2E3" strokeWidth="1.2" />
          <line x1={120} y1={30 + i * 20} x2={128} y2={30 + i * 20} stroke="#5FC2E3" strokeWidth="1.2" />
          <line x1={30 + i * 20} y1={-8} x2={30 + i * 20} y2={0} stroke="#5FC2E3" strokeWidth="1.2" />
          <line x1={30 + i * 20} y1={120} x2={30 + i * 20} y2={128} stroke="#5FC2E3" strokeWidth="1.2" />
        </g>
      ))}
    </g>
    {/* Small output particles */}
    <g transform="translate(300,90)">
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={(i % 3) * 18} y={Math.floor(i / 3) * 18} width="10" height="10" rx="2" fill="#5FC2E3" opacity={0.4 + i * 0.1} />
      ))}
    </g>
    <text x="200" y="230" fill="#5FC2E3" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.7">quantized · efficient</text>
  </Wrap>
);

// 4. PEFT — big model with small tuned params
export const PEFTVisual = () => (
  <Wrap>
    {/* Full model - large cube of dots */}
    <g transform="translate(50,60)">
      <text x="55" y="-8" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">Full Model</text>
      {Array.from({ length: 8 }).map((_, r) =>
        Array.from({ length: 10 }).map((_, c) => (
          <circle key={`${r}${c}`} cx={c * 12} cy={r * 14} r="2.5" fill="#334155" />
        ))
      )}
    </g>
    {/* Highlighted small params */}
    <g transform="translate(50,60)">
      {[
        [2, 3], [5, 7], [1, 6], [6, 2], [4, 9], [7, 1], [3, 4],
      ].map(([c, r], i) => (
        <circle key={i} cx={c * 12} cy={r * 14} r="4" fill="#5FC2E3">
          <animate attributeName="opacity" values="1;0.4;1" dur="2.4s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </g>
    <g transform="translate(220,110)">
      <path d="M 0 0 L 40 0" stroke="url(#ftg-cyan)" strokeWidth="1.5" />
      <text x="55" y="-10" fill="#5FC2E3" fontSize="10" fontFamily="monospace">PEFT</text>
      <text x="55" y="6" fill="#94a3b8" fontSize="8" fontFamily="monospace">few params</text>
      <text x="55" y="20" fill="#94a3b8" fontSize="8" fontFamily="monospace">max efficiency</text>
    </g>
    <text x="200" y="235" fill="#5FC2E3" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.7">selective parameter tuning</text>
  </Wrap>
);

// 5. RLHF — human ratings feeding loop
export const RLHFVisual = () => (
  <Wrap>
    {/* AI output */}
    <g transform="translate(30,90)">
      <rect x="0" y="0" width="80" height="60" rx="8" fill="none" stroke="#5FC2E3" strokeWidth="1.2" opacity="0.8" />
      <text x="40" y="26" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">AI Output</text>
      <line x1="10" y1="38" x2="70" y2="38" stroke="#5FC2E3" strokeWidth="1" opacity="0.5" />
      <line x1="10" y1="46" x2="55" y2="46" stroke="#5FC2E3" strokeWidth="1" opacity="0.5" />
    </g>
    {/* Human */}
    <g transform="translate(170,90)">
      <circle cx="30" cy="20" r="14" fill="none" stroke="url(#ftg-cyan)" strokeWidth="1.5" />
      <path d="M 8 60 Q 30 40 52 60 L 52 68 L 8 68 Z" fill="none" stroke="url(#ftg-cyan)" strokeWidth="1.5" />
      {/* Stars */}
      <g transform="translate(0,80)">
        {[0, 1, 2, 3, 4].map((i) => (
          <polygon key={i} points={`${i * 13 + 3},0 ${i * 13 + 5},4 ${i * 13 + 9},4 ${i * 13 + 6},7 ${i * 13 + 7},11 ${i * 13 + 3},9 ${i * 13 - 1},11 ${i * 13},7 ${i * 13 - 3},4 ${i * 13 + 1},4`} fill={i < 4 ? "#5FC2E3" : "#334155"} />
        ))}
      </g>
    </g>
    {/* Improved */}
    <g transform="translate(280,90)">
      <rect x="0" y="0" width="90" height="60" rx="8" fill="rgba(95,194,227,0.08)" stroke="#5FC2E3" strokeWidth="1.5" />
      <text x="45" y="26" fill="#5FC2E3" fontSize="9" fontFamily="monospace" textAnchor="middle">Improved</text>
      <line x1="10" y1="38" x2="80" y2="38" stroke="#5FC2E3" strokeWidth="1.2" />
      <line x1="10" y1="46" x2="70" y2="46" stroke="#5FC2E3" strokeWidth="1.2" />
    </g>
    {/* Loop arrow */}
    <path d="M 110 120 L 165 120" stroke="#5FC2E3" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
    <path d="M 235 120 L 275 120" stroke="#5FC2E3" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
    <path d="M 325 165 Q 200 220 75 165" stroke="#5FC2E3" strokeWidth="1.2" fill="none" strokeDasharray="3 3" opacity="0.6" />
    <text x="200" y="200" fill="#5FC2E3" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.7">human feedback loop</text>
  </Wrap>
);

// 6. DPO — two responses, user prefers one
export const DPOVisual = () => (
  <Wrap>
    <g transform="translate(30,60)">
      <rect x="0" y="0" width="90" height="60" rx="8" fill="none" stroke="#475569" strokeWidth="1.2" />
      <text x="10" y="18" fill="#94a3b8" fontSize="9" fontFamily="monospace">Response A</text>
      <line x1="10" y1="30" x2="70" y2="30" stroke="#475569" strokeWidth="1" />
      <line x1="10" y1="40" x2="60" y2="40" stroke="#475569" strokeWidth="1" />
      <line x1="10" y1="50" x2="65" y2="50" stroke="#475569" strokeWidth="1" />
    </g>
    <g transform="translate(30,140)">
      <rect x="0" y="0" width="90" height="60" rx="8" fill="rgba(95,194,227,0.1)" stroke="#5FC2E3" strokeWidth="1.5" />
      <text x="10" y="18" fill="#5FC2E3" fontSize="9" fontFamily="monospace">Response B ★</text>
      <line x1="10" y1="30" x2="70" y2="30" stroke="#5FC2E3" strokeWidth="1" />
      <line x1="10" y1="40" x2="60" y2="40" stroke="#5FC2E3" strokeWidth="1" />
      <line x1="10" y1="50" x2="65" y2="50" stroke="#5FC2E3" strokeWidth="1" />
    </g>
    {/* User */}
    <g transform="translate(170,110)">
      <circle cx="25" cy="15" r="12" fill="none" stroke="url(#ftg-cyan)" strokeWidth="1.5" />
      <path d="M 6 48 Q 25 32 44 48 L 44 55 L 6 55 Z" fill="none" stroke="url(#ftg-cyan)" strokeWidth="1.5" />
      <text x="25" y="75" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">prefers</text>
    </g>
    {/* Selected arrow */}
    <path d="M 120 90 Q 160 90 195 115" stroke="#475569" strokeWidth="1.2" fill="none" />
    <path d="M 120 170 Q 160 170 195 140" stroke="#5FC2E3" strokeWidth="1.8" fill="none" />
    {/* Aligned model */}
    <g transform="translate(280,90)">
      <rect x="0" y="0" width="90" height="80" rx="10" fill="#0B1E36" stroke="url(#ftg-cyan)" strokeWidth="1.5" />
      <circle cx="45" cy="40" r="18" fill="none" stroke="#5FC2E3" strokeWidth="1.2" opacity="0.7" />
      <circle cx="45" cy="40" r="8" fill="#5FC2E3" opacity="0.85" />
      <text x="45" y="72" fill="#5FC2E3" fontSize="9" fontFamily="monospace" textAnchor="middle">Aligned</text>
    </g>
    <text x="200" y="235" fill="#5FC2E3" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.7">preference optimization</text>
  </Wrap>
);

// 7. Instruction / Prompt tuning
export const PromptTuningVisual = () => (
  <Wrap>
    <g transform="translate(30,80)">
      <rect x="0" y="0" width="130" height="90" rx="8" fill="none" stroke="#5FC2E3" strokeWidth="1.2" opacity="0.7" />
      <text x="10" y="20" fill="#5FC2E3" fontSize="9" fontFamily="monospace">Prompt</text>
      <rect x="10" y="30" width="110" height="6" rx="2" fill="#334155" />
      <rect x="10" y="42" width="95" height="6" rx="2" fill="#334155" />
      <rect x="10" y="54" width="105" height="6" rx="2" fill="#5FC2E3" opacity="0.7" />
      <rect x="10" y="66" width="80" height="6" rx="2" fill="#334155" />
    </g>
    <path d="M 165 125 L 210 125" stroke="url(#ftg-cyan)" strokeWidth="2" fill="none" />
    {/* Brain */}
    <g transform="translate(220,80)">
      <path d="M 40 20 Q 20 20 20 40 Q 10 45 15 60 Q 15 78 35 78 Q 55 90 65 78 Q 85 78 85 60 Q 90 45 80 40 Q 80 20 60 20 Q 50 10 40 20 Z" fill="none" stroke="url(#ftg-cyan)" strokeWidth="1.5" />
      <path d="M 50 25 Q 50 50 50 75 M 30 35 Q 45 45 30 60 M 70 35 Q 55 45 70 60" stroke="#5FC2E3" strokeWidth="1" fill="none" opacity="0.7" />
      <circle cx="35" cy="42" r="2" fill="#5FC2E3" />
      <circle cx="65" cy="42" r="2" fill="#5FC2E3" />
      <circle cx="50" cy="60" r="2" fill="#5FC2E3" />
    </g>
    <text x="200" y="235" fill="#5FC2E3" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.7">instruction → better responses</text>
  </Wrap>
);

// 8. Model evaluation dashboard
export const EvaluationVisual = () => (
  <Wrap>
    <g transform="translate(40,50)">
      {/* Accuracy card */}
      <rect x="0" y="0" width="150" height="70" rx="8" fill="rgba(95,194,227,0.05)" stroke="#5FC2E3" strokeWidth="1" />
      <text x="10" y="18" fill="#94a3b8" fontSize="9" fontFamily="monospace">Accuracy</text>
      <text x="10" y="48" fill="#5FC2E3" fontSize="20" fontFamily="monospace" fontWeight="600">92.6%</text>
      <polyline points="80,55 95,45 110,50 125,35 140,40" fill="none" stroke="#5FC2E3" strokeWidth="1.5" />
      {/* Robustness */}
      <rect x="160" y="0" width="150" height="70" rx="8" fill="rgba(95,194,227,0.05)" stroke="#5FC2E3" strokeWidth="1" />
      <text x="170" y="18" fill="#94a3b8" fontSize="9" fontFamily="monospace">Robustness</text>
      <text x="170" y="48" fill="#5FC2E3" fontSize="16" fontFamily="monospace" fontWeight="600">High</text>
      <g transform="translate(275,25)">
        <path d="M 15 0 L 30 8 L 30 22 Q 30 32 15 38 Q 0 32 0 22 L 0 8 Z" fill="none" stroke="#5FC2E3" strokeWidth="1.2" />
        <path d="M 8 20 L 13 25 L 22 15" stroke="#5FC2E3" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>
      {/* Bias */}
      <rect x="0" y="82" width="150" height="70" rx="8" fill="rgba(95,194,227,0.05)" stroke="#5FC2E3" strokeWidth="1" />
      <text x="10" y="100" fill="#94a3b8" fontSize="9" fontFamily="monospace">Bias</text>
      <text x="10" y="130" fill="#5FC2E3" fontSize="16" fontFamily="monospace" fontWeight="600">Low</text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={80 + i * 15} y={140 - (i + 1) * 8} width="10" height={(i + 1) * 8} fill="#5FC2E3" opacity={0.5 + i * 0.1} />
      ))}
      {/* Reliability */}
      <rect x="160" y="82" width="150" height="70" rx="8" fill="rgba(95,194,227,0.05)" stroke="#5FC2E3" strokeWidth="1" />
      <text x="170" y="100" fill="#94a3b8" fontSize="9" fontFamily="monospace">Reliability</text>
      <text x="170" y="130" fill="#5FC2E3" fontSize="16" fontFamily="monospace" fontWeight="600">98.1%</text>
      <g transform="translate(270,110)">
        <circle cx="15" cy="15" r="15" fill="none" stroke="#334155" strokeWidth="3" />
        <circle cx="15" cy="15" r="15" fill="none" stroke="#5FC2E3" strokeWidth="3" strokeDasharray="88 100" transform="rotate(-90 15 15)" />
      </g>
    </g>
  </Wrap>
);
