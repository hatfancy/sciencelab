import { FormulaItem } from '../types/science';

export const FORMULAS_DATA: FormulaItem[] = [
  {
    id: 'newton-second-law',
    name: "Newton's Second Law of Motion",
    equation: 'F = m · a',
    field: 'Physics',
    variables: [
      { symbol: 'F', meaning: 'Net Force acting on object', siUnit: 'Newtons (N) = kg·m/s²' },
      { symbol: 'm', meaning: 'Mass of the object', siUnit: 'Kilograms (kg)' },
      { symbol: 'a', meaning: 'Acceleration produced', siUnit: 'Metres per second squared (m/s²)' }
    ],
    description: 'Relates the unbalanced force on an object to the acceleration it experiences in the direction of the force.',
    realWorldExample: 'Calculating the thrust required to accelerate a 500,000 kg rocket upward off the launch pad.'
  },
  {
    id: 'kinetic-energy',
    name: 'Kinetic Energy',
    equation: 'E_k = ½ · m · v²',
    field: 'Physics',
    variables: [
      { symbol: 'E_k', meaning: 'Kinetic Energy', siUnit: 'Joules (J)' },
      { symbol: 'm', meaning: 'Mass', siUnit: 'Kilograms (kg)' },
      { symbol: 'v', meaning: 'Velocity', siUnit: 'Metres per second (m/s)' }
    ],
    description: 'Energy possessed by an object due to its motion. Notice that kinetic energy scales with the square of velocity.',
    realWorldExample: 'Doubling a car’s speed from 50 km/h to 100 km/h quadruples the braking energy required to stop it.'
  },
  {
    id: 'mass-energy-equivalence',
    name: 'Mass-Energy Equivalence',
    equation: 'E = m · c²',
    field: 'Physics',
    variables: [
      { symbol: 'E', meaning: 'Energy equivalent of mass', siUnit: 'Joules (J)' },
      { symbol: 'm', meaning: 'Mass defect or rest mass', siUnit: 'Kilograms (kg)' },
      { symbol: 'c', meaning: 'Speed of light in vacuum (299,792,458 m/s)', siUnit: 'Metres per second (m/s)' }
    ],
    description: 'Einstein’s revelation that mass and energy are manifestations of the same physical quantity.',
    realWorldExample: 'Powers nuclear fusion in the Sun: converting 1 gram of matter into energy yields 90 trillion Joules.'
  },
  {
    id: 'archimedes-buoyancy',
    name: 'Archimedes’ Buoyant Force',
    equation: 'F_b = ρ · V · g',
    field: 'Fluid Dynamics',
    variables: [
      { symbol: 'F_b', meaning: 'Upward buoyant force', siUnit: 'Newtons (N)' },
      { symbol: 'ρ', meaning: 'Density of the fluid', siUnit: 'kg/m³' },
      { symbol: 'V', meaning: 'Submerged volume displaced', siUnit: 'm³' },
      { symbol: 'g', meaning: 'Gravitational acceleration (~9.81)', siUnit: 'm/s²' }
    ],
    description: 'Any body completely or partially submerged in a fluid at rest experiences an upward buoyant force equal to the weight of fluid displaced.',
    realWorldExample: 'Enables massive steel container ships and submarines to float and control buoyancy depth.'
  },
  {
    id: 'tsiolkovsky-rocket',
    name: 'Tsiolkovsky Rocket Equation',
    equation: 'Δv = I_sp · g_0 · ln(m_0 / m_f)',
    field: 'Aerospace',
    variables: [
      { symbol: 'Δv', meaning: 'Maximum change in vehicle velocity', siUnit: 'm/s' },
      { symbol: 'I_sp', meaning: 'Specific impulse of the rocket engine', siUnit: 'Seconds (s)' },
      { symbol: 'g_0', meaning: 'Standard Earth surface gravity (9.80665)', siUnit: 'm/s²' },
      { symbol: 'm_0', meaning: 'Initial total wet mass (with propellant)', siUnit: 'Kilograms (kg)' },
      { symbol: 'm_f', meaning: 'Final dry burnout mass (without propellant)', siUnit: 'Kilograms (kg)' }
    ],
    description: 'The foundation of astronautics: determines mission velocity budget as a function of propellant mass fraction.',
    realWorldExample: 'Calculating how many stages a lunar Saturn V or Mars transit rocket requires to reach escape velocity.'
  },
  {
    id: 'ohms-law',
    name: 'Ohm’s Law',
    equation: 'V = I · R',
    field: 'Electromagnetism',
    variables: [
      { symbol: 'V', meaning: 'Electric Potential Difference / Voltage', siUnit: 'Volts (V)' },
      { symbol: 'I', meaning: 'Electric Current', siUnit: 'Amperes (A)' },
      { symbol: 'R', meaning: 'Electrical Resistance', siUnit: 'Ohms (Ω)' }
    ],
    description: 'Fundamental relationship governing direct current through an ohmic conductor.',
    realWorldExample: 'Designing current-limiting resistors to prevent delicate LEDs from burning out in microcircuits.'
  },
  {
    id: 'ideal-gas-law',
    name: 'Ideal Gas Law',
    equation: 'P · V = n · R · T',
    field: 'Chemistry',
    variables: [
      { symbol: 'P', meaning: 'Absolute Pressure', siUnit: 'Pascals (Pa)' },
      { symbol: 'V', meaning: 'Gas Volume', siUnit: 'Cubic metres (m³)' },
      { symbol: 'n', meaning: 'Amount of substance', siUnit: 'Moles (mol)' },
      { symbol: 'R', meaning: 'Universal Gas Constant (8.314)', siUnit: 'J/(mol·K)' },
      { symbol: 'T', meaning: 'Absolute Temperature', siUnit: 'Kelvin (K)' }
    ],
    description: 'Equation of state describing hypothetical ideal gases across varying thermodynamic conditions.',
    realWorldExample: 'Explains why car tire pressure drops in cold winter weather and rises on hot summer roads.'
  },
  {
    id: 'snells-law',
    name: 'Snell’s Law of Refraction',
    equation: 'n₁ · sin(θ₁) = n₂ · sin(θ₂)',
    field: 'Physics',
    variables: [
      { symbol: 'n₁', meaning: 'Refractive index of incident medium', siUnit: 'Dimensionless' },
      { symbol: 'θ₁', meaning: 'Angle of incidence from surface normal', siUnit: 'Degrees / Radians' },
      { symbol: 'n₂', meaning: 'Refractive index of transmitting medium', siUnit: 'Dimensionless' },
      { symbol: 'θ₂', meaning: 'Angle of refraction from surface normal', siUnit: 'Degrees / Radians' }
    ],
    description: 'Describes the bending path of light waves as they pass across the boundary between two optical media.',
    realWorldExample: 'Designing optical camera lenses, eyeglasses, and total internal reflection in fiber-optic internet cables.'
  }
];
