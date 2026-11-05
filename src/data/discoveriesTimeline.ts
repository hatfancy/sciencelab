export interface DiscoveryEvent {
  year: string;
  scientist: string;
  discovery: string;
  field: string;
  impact: string;
}

export const DISCOVERIES_TIMELINE: DiscoveryEvent[] = [
  {
    year: 'c. 250 BCE',
    scientist: 'Archimedes of Syracuse',
    discovery: 'The Principle of Buoyancy & Hydrostatics',
    field: 'Fluid Physics',
    impact: 'Discovered that an immersed body experiences an upward buoyant force equal to the displaced fluid weight, formulating the mathematical foundation of ship design.'
  },
  {
    year: '1687',
    scientist: 'Sir Isaac Newton',
    discovery: 'Philosophiae Naturalis Principia Mathematica',
    field: 'Classical Mechanics & Gravity',
    impact: 'Established the three universal laws of motion and the law of universal gravitation, unifying terrestrial mechanics with planetary astronomy.'
  },
  {
    year: '1789',
    scientist: 'Antoine Lavoisier',
    discovery: 'Law of Conservation of Mass & Modern Chemistry',
    field: 'Chemistry',
    impact: 'Proved that mass is conserved in chemical reactions, demolished the phlogiston theory, and identified oxygen and hydrogen as discrete chemical elements.'
  },
  {
    year: '1865',
    scientist: 'James Clerk Maxwell',
    discovery: 'A Dynamical Theory of the Electromagnetic Field',
    field: 'Electromagnetism',
    impact: 'Unified electricity, magnetism, and light into four coupled differential equations, predicting radio waves and modern wireless communication.'
  },
  {
    year: '1869',
    scientist: 'Dmitri Mendeleev',
    discovery: 'The Periodic Table of the Chemical Elements',
    field: 'Chemistry',
    impact: 'Organized elements by atomic mass and recurring valence trends, accurately predicting the existence and properties of undiscovered elements like gallium and germanium.'
  },
  {
    year: '1898',
    scientist: 'Marie & Pierre Curie',
    discovery: 'Radioactivity, Polonium & Radium',
    field: 'Nuclear Physics',
    impact: 'Pioneered the study of atomic radiation, discovering that atoms are not indivisible and laying the foundation for modern nuclear medicine.'
  },
  {
    year: '1905',
    scientist: 'Albert Einstein',
    discovery: 'Special Relativity, Photoelectric Effect & E = mc²',
    field: 'Theoretical Physics',
    impact: 'Revolutionized human understanding of space, time, light quantization (photons), and the fundamental equivalence between mass and energy.'
  },
  {
    year: '1953',
    scientist: 'James Watson, Francis Crick, Rosalind Franklin',
    discovery: 'Molecular Structure of DNA (Double Helix)',
    field: 'Molecular Genetics',
    impact: 'Revealed the antiparallel double-helical structure of DNA and base pairing mechanism ($A-T, G-C$), explaining how genetic information replicates.'
  },
  {
    year: '1964',
    scientist: 'Murray Gell-Mann & George Zweig',
    discovery: 'The Quark Model of Subatomic Matter',
    field: 'Particle Physics',
    impact: 'Proposed that protons and neutrons are composite hadrons built from fundamental fractional-charge quarks, leading to the Standard Model.'
  },
  {
    year: '2015',
    scientist: 'LIGO Scientific Collaboration',
    discovery: 'Direct Detection of Gravitational Spacetime Waves',
    field: 'Astrophysics',
    impact: 'Observed ripples in the fabric of spacetime produced by the cataclysmic merger of two black holes 1.3 billion light-years away, confirming Einstein’s 1916 prediction.'
  },
  {
    year: '2022',
    scientist: 'NASA / ESA / CSA (James Webb Space Telescope)',
    discovery: 'Deepest Infrared Cosmic Imagery & Earliest Galaxies',
    field: 'Observational Astronomy',
    impact: 'Detected luminous galaxies formed just 300 million years after the Big Bang and probed the atmospheric chemical composition of transiting exoplanets.'
  }
];

export const DAILY_FACTS = [
  {
    fact: 'Neutron stars are so dense that a single sugar-cube-sized teaspoon of neutron star material would weigh approximately 1 billion tonnes on Earth.',
    source: 'NASA Goddard Space Flight Center'
  },
  {
    fact: 'Water is one of the only known non-metallic substances that expands when freezing, because hydrogen bonds lock molecules into an open hexagonal crystal lattice.',
    source: 'Royal Society of Chemistry'
  },
  {
    fact: 'If you could drive a car vertically upward at 100 km/h (62 mph), you would reach the Kármán line (the official edge of space at 100 km) in just one hour.',
    source: 'Fédération Aéronautique Internationale (FAI)'
  },
  {
    fact: 'Lightning bolts heat the air surrounding their channel to over 30,000 Kelvin (approx. 53,500°F)—five times hotter than the surface of the Sun.',
    source: 'National Oceanic and Atmospheric Administration (NOAA)'
  },
  {
    fact: 'At the International Space Station’s orbital altitude of 400 km, Earth’s gravitational force is still roughly 90% as strong as at sea level. Astronauts float because they are in continuous free-fall around Earth.',
    source: 'European Space Agency (ESA)'
  },
  {
    fact: 'Human DNA in a single cell stretched out measures roughly 2 meters (6.5 feet) long, yet is tightly supercoiled inside a cell nucleus only 6 micrometers wide.',
    source: 'National Human Genome Research Institute (NIH)'
  }
];
