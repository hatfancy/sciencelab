import { GlossaryItem } from '../types/science';

export const GLOSSARY_DATA: GlossaryItem[] = [
  {
    term: 'Combustion',
    discipline: 'Chemistry',
    definition: 'A high-temperature exothermic redox chemical reaction between a fuel and an oxidant (usually atmospheric oxygen) that produces oxidized gaseous products, heat, and light.',
    example: 'Burning natural methane gas on a kitchen cooktop to produce water vapor, carbon dioxide, and heat.',
    relatedFormula: 'CH₄ + 2O₂ → CO₂ + 2H₂O + Heat'
  },
  {
    term: 'Momentum',
    discipline: 'Physics',
    definition: 'The product of the mass and velocity of an object. In a closed physical system with no external forces, total linear momentum is strictly conserved.',
    example: 'A heavy bowling ball carries far more momentum at 10 m/s than a lightweight tennis ball at the same speed.',
    relatedFormula: 'p = m · v'
  },
  {
    term: 'Molecule',
    discipline: 'Chemistry',
    definition: 'An electrically neutral group of two or more atoms held together by chemical bonds (covalent bonds).',
    example: 'A water molecule (H₂O) consists of two hydrogen atoms sharing electron pairs with one oxygen atom.'
  },
  {
    term: 'Orbital Velocity',
    discipline: 'Astronomy',
    definition: 'The speed at which an astronomical body or spacecraft must travel along its path to maintain a balance between gravitational pull and inertial motion.',
    example: 'The International Space Station must maintain an orbital velocity of ~7.66 km/s at 400 km altitude to avoid falling to Earth.',
    relatedFormula: 'v_orb = √(GM / r)'
  },
  {
    term: 'Pressure',
    discipline: 'Physics',
    definition: 'The perpendicular force applied per unit area over the surface of an object.',
    example: 'Atmospheric pressure at sea level is approximately 101,325 Pascals (101.3 kPa) due to the weight of the air column above.',
    relatedFormula: 'P = F / A'
  },
  {
    term: 'Activation Energy',
    discipline: 'Chemistry',
    definition: 'The minimum energy required to initiate a chemical reaction by breaking reactant bonds and forming the transition state.',
    example: 'Striking a match against the abrasive strip provides frictional heat energy to overcome the activation barrier.'
  },
  {
    term: 'Buoyancy',
    discipline: 'Physics',
    definition: 'An upward force exerted by a fluid that opposes the weight of an immersed or partially immersed object.',
    example: 'A hollow steel cargo ship floats because the buoyant force of the displaced water equals the ship’s total weight.',
    relatedFormula: 'F_b = ρ · V · g'
  },
  {
    term: 'Specific Impulse (Isp)',
    discipline: 'Engineering',
    definition: 'A measure of how efficiently a rocket engine utilizes its propellant, defined as thrust per unit weight flow rate of propellant.',
    example: 'Liquid hydrogen/oxygen engines achieve a high specific impulse of ~450 seconds, while solid rocket boosters achieve ~250–270 seconds.',
    relatedFormula: 'I_sp = Thrust / (ṁ · g_0)'
  },
  {
    term: 'Refraction',
    discipline: 'Physics',
    definition: 'The redirection of a wave as it passes from one medium to another, caused by a change in wave propagation speed.',
    example: 'A straight drinking straw appearing bent or broken when placed in a glass of water.',
    relatedFormula: 'n₁ · sin(θ₁) = n₂ · sin(θ₂)'
  },
  {
    term: 'pH',
    discipline: 'Chemistry',
    definition: 'A logarithmic scale used to specify the acidity or basicity of an aqueous solution, defined as the negative logarithm of hydronium ion concentration.',
    example: 'Pure water has neutral pH 7, lemon juice has acidic pH ~2, and bleach has basic pH ~12.',
    relatedFormula: 'pH = -log₁₀[H⁺]'
  },
  {
    term: 'Doppler Effect',
    discipline: 'Physics',
    definition: 'The change in frequency or wavelength of a wave in relation to an observer moving relative to the wave source.',
    example: 'The siren of an approaching ambulance sounds higher in pitch and drops to a lower pitch as it speeds away.'
  },
  {
    term: 'Entropy',
    discipline: 'Physics',
    definition: 'A thermodynamic measure of the molecular disorder or randomness of a system, which inexorably increases in any isolated spontaneous process according to the Second Law of Thermodynamics.',
    example: 'An ice cube melting spontaneously into a puddle of liquid water increases the system’s entropy.'
  },
  {
    term: 'Enzyme',
    discipline: 'Biology',
    definition: 'A biological catalyst (usually a specialized globular protein) that accelerates biochemical reactions by lowering activation energy without being permanently altered.',
    example: 'Catalase converts toxic cellular hydrogen peroxide into harmless water and oxygen at millions of molecules per second.'
  },
  {
    term: 'Subduction Zone',
    discipline: 'Earth Science',
    definition: 'A geological region where one tectonic plate is pushed or pulled underneath another into the mantle, frequently generating megathrust earthquakes and volcanic arcs.',
    example: 'The Pacific "Ring of Fire" subduction trenches around Japan and South America.'
  },
  {
    term: 'Mechanical Advantage',
    discipline: 'Engineering',
    definition: 'The factor by which a simple machine multiplies the input effort force to overcome an output load force.',
    example: 'A 2-meter crowbar pivoting on a 0.1-meter fulcrum delivers a 20:1 mechanical advantage to pry open heavy crates.',
    relatedFormula: 'MA = F_output / F_input'
  }
];
