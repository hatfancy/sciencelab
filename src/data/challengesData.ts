import { ChallengeItem } from '../types/science';

export const CHALLENGES_DATA: ChallengeItem[] = [
  {
    id: 'ch-1',
    title: 'Match Chemical Symbol: Gold',
    category: 'Chemistry',
    difficulty: 'Beginner',
    question: 'What is the chemical symbol for the precious noble metal Gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correctIndex: 2,
    explanation: 'Au comes from the Latin word "Aurum", meaning shining dawn. Ag is silver (Argentum).',
    hint: 'Think of the Latin name "Aurum".',
    points: 100
  },
  {
    id: 'ch-2',
    title: 'Density & Flotation Prediction',
    category: 'Fluid Dynamics',
    difficulty: 'Beginner',
    question: 'An unknown wooden block has a density of 0.75 g/cm³. If placed into freshwater (density 1.0 g/cm³), what will it do?',
    options: ['Sink directly to the bottom', 'Float with ~75% of its volume submerged', 'Evaporate immediately', 'Remain suspended in mid-air'],
    correctIndex: 1,
    explanation: 'Because 0.75 g/cm³ is less than 1.0 g/cm³, the block floats. By Archimedes’ principle, the fraction submerged equals the ratio of densities: 0.75 / 1.0 = 75%.',
    hint: 'Compare the density of the object directly with the fluid.',
    points: 150
  },
  {
    id: 'ch-3',
    title: 'Speed, Distance & Time Calculation',
    category: 'Physics',
    difficulty: 'Intermediate',
    question: 'A high-speed maglev train travels 450 kilometers in 1.5 hours. What is its average speed in metres per second (m/s)?',
    options: ['83.3 m/s', '300 m/s', '125 m/s', '50.0 m/s'],
    correctIndex: 0,
    explanation: 'Speed = 450 km / 1.5 h = 300 km/h. To convert km/h to m/s, divide by 3.6: 300 / 3.6 = 83.33 m/s.',
    hint: 'First find the speed in km/h, then divide by 3.6.',
    points: 200
  },
  {
    id: 'ch-4',
    title: 'Balancing Chemical Equations',
    category: 'Chemistry',
    difficulty: 'Intermediate',
    question: 'In the combustion reaction: _ CH₄ + _ O₂ → _ CO₂ + _ H₂O, what are the stoichiometric coefficients?',
    options: ['1, 1 → 1, 1', '1, 2 → 1, 2', '2, 1 → 2, 2', '1, 4 → 1, 2'],
    correctIndex: 1,
    explanation: '1 CH₄ (4 hydrogens) requires 2 H₂O (4 hydrogens). This gives 2 oxygen atoms in CO₂ + 2 in H₂O = 4 oxygens total, requiring 2 O₂ molecules.',
    hint: 'Count the hydrogen atoms first to balance water.',
    points: 250
  },
  {
    id: 'ch-5',
    title: 'Ohm’s Law & Circuit Analysis',
    category: 'Electricity',
    difficulty: 'Intermediate',
    question: 'Two 6-ohm resistors are connected in PARALLEL across a 12-volt battery. What is the total current leaving the battery?',
    options: ['1 Ampere', '2 Amperes', '4 Amperes', '8 Amperes'],
    correctIndex: 2,
    explanation: 'Equivalent resistance of two identical 6-ohm resistors in parallel is R_eq = 6 / 2 = 3 ohms. Total current I = V / R = 12 V / 3 ohms = 4 Amperes.',
    hint: 'For two equal parallel resistors, equivalent resistance is half of one resistor.',
    points: 300
  },
  {
    id: 'ch-6',
    title: 'Rocket Staging & Mass Trade-offs',
    category: 'Aerospace',
    difficulty: 'Advanced',
    question: 'According to the Tsiolkovsky rocket equation, why do orbital launch vehicles discard staging tanks in flight?',
    options: [
      'To make room for additional crew members',
      'Because reducing dead dry mass (mf) exponentially increases achievable Δv',
      'To prevent the engines from overheating in space',
      'Because tanks become radioactive after fuel burns'
    ],
    correctIndex: 1,
    explanation: 'In Δv = Isp · g₀ · ln(m₀ / mf), discarding empty tanks reduces mf. Because the mass ratio sits inside the natural logarithm, dropping dead structural mass is the only practical way to achieve the high velocities required for orbit.',
    hint: 'Look at the role of final burnout mass (mf) in the Tsiolkovsky equation.',
    points: 350
  },
  {
    id: 'ch-7',
    title: 'Combustion Extinguishment Principle',
    category: 'Combustion',
    difficulty: 'Beginner',
    question: 'In the Fire Triangle (Fuel, Heat, Oxygen), what is the primary mechanism by which carbon dioxide (CO₂) fire extinguishers put out flames?',
    options: [
      'They freeze the fuel solid',
      'They displace atmospheric oxygen and smother the combustion zone',
      'They catalyze a reverse chemical reaction',
      'They chemically bond with unburnt fuel'
    ],
    correctIndex: 1,
    explanation: 'CO₂ is heavier than air and non-flammable; it smothers the flame by blanketing the burning surface and displacing the ambient oxygen necessary to maintain the chain reaction.',
    hint: 'Which side of the fire triangle does an inert heavy gas remove?',
    points: 150
  },
  {
    id: 'ch-8',
    title: 'Orbital Mechanics & Escape Velocity',
    category: 'Astronomy',
    difficulty: 'Advanced',
    question: 'How is a celestial body’s escape velocity mathematically related to its circular orbital velocity at the same radius?',
    options: [
      'v_escape = v_orbit / 2',
      'v_escape = √2 · v_orbit (approximately 1.414 times faster)',
      'v_escape = 2 · v_orbit',
      'v_escape is always exactly equal to light speed'
    ],
    correctIndex: 1,
    explanation: 'Circular orbit velocity is v_c = √(GM/r) while escape velocity (parabolic trajectory) is v_esc = √(2GM/r). Therefore v_esc = √2 · v_c ≈ 1.414 · v_c.',
    hint: 'Compare kinetic energy for an orbit with the kinetic energy needed to reach infinity with zero velocity.',
    points: 400
  }
];
