import { PlanetData } from '../types/science';

export const PLANETS_DATA: PlanetData[] = [
  {
    id: 'sun',
    name: 'The Sun',
    type: 'star',
    radiusKm: 696340,
    massKg: '1.989 × 10³⁰ kg (333,000 Earth masses)',
    gravityMps2: 274.0, // 27.9g
    distanceFromSunKm: 0,
    distanceFromSunAU: 0,
    orbitalPeriodDays: 0,
    rotationPeriodHours: 600, // 25 days at equator
    averageTempC: 5500, // Photosphere (Core is 15M °C)
    atmosphere: ['73% Hydrogen', '25% Helium', 'Oxygen', 'Carbon', 'Neon', 'Iron'],
    moonsCount: 0,
    color: '#F59E0B',
    surfaceFeatures: 'G-type main-sequence yellow dwarf star powered by proton-proton chain nuclear fusion in its core, surrounded by a boiling convective photosphere with sunspots and coronal mass ejections.',
    explorationHistory: 'Studied by NASA Parker Solar Probe (closest approach to a star), ESA Solar Orbiter, SOHO, and SDO.',
    orbitalSpeedKmS: 0
  },
  {
    id: 'mercury',
    name: 'Mercury',
    type: 'terrestrial',
    radiusKm: 2439.7,
    massKg: '3.301 × 10²³ kg (0.055 Earths)',
    gravityMps2: 3.7, // 0.38g
    distanceFromSunKm: 57910000,
    distanceFromSunAU: 0.387,
    orbitalPeriodDays: 88.0,
    rotationPeriodHours: 1407.6, // 58.6 Earth days
    averageTempC: 167, // -180°C at night to 430°C by day
    atmosphere: ['Oxygen', 'Sodium', 'Hydrogen', 'Helium', 'Potassium (Exosphere)'],
    moonsCount: 0,
    color: '#94A3B8',
    surfaceFeatures: 'Heavily cratered silicate crust resembling Earth’s Moon, with immense tectonic compression scarps and a disproportionately massive metallic iron core making up 85% of its radius.',
    explorationHistory: 'Visited by Mariner 10 (1974), NASA MESSENGER orbital mission (2011–2015), and ESA/JAXA BepiColombo currently en route.',
    orbitalSpeedKmS: 47.4
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'terrestrial',
    radiusKm: 6051.8,
    massKg: '4.867 × 10²⁴ kg (0.815 Earths)',
    gravityMps2: 8.87, // 0.904g
    distanceFromSunKm: 108200000,
    distanceFromSunAU: 0.723,
    orbitalPeriodDays: 224.7,
    rotationPeriodHours: -5832.5, // 243 days retrograde rotation
    averageTempC: 464, // Hottest planet due to runaway greenhouse effect
    atmosphere: ['96.5% Carbon Dioxide', '3.5% Nitrogen', 'Sulfuric Acid clouds'],
    moonsCount: 0,
    color: '#EAB308',
    surfaceFeatures: 'Crushing atmospheric surface pressure of 92 bar (equivalent to 900m deep in Earth oceans), blanketed by opaque reflective sulfuric acid cloud decks over volcanic basalt plains.',
    explorationHistory: 'Explored by Soviet Venera landers (first surface photos), NASA Magellan radar orbiter, Akatsuki, and upcoming NASA VERITAS / DAVINCI missions.',
    orbitalSpeedKmS: 35.0
  },
  {
    id: 'earth',
    name: 'Earth',
    type: 'terrestrial',
    radiusKm: 6371.0,
    massKg: '5.972 × 10²⁴ kg',
    gravityMps2: 9.807, // 1.0g
    distanceFromSunKm: 149600000,
    distanceFromSunAU: 1.0,
    orbitalPeriodDays: 365.25,
    rotationPeriodHours: 23.934,
    averageTempC: 15,
    atmosphere: ['78.08% Nitrogen', '20.95% Oxygen', '0.93% Argon', '0.04% Carbon Dioxide'],
    moonsCount: 1,
    color: '#38BDF8',
    surfaceFeatures: 'Dynamic active plate tectonics, liquid water oceans covering 70.8% of the surface, strong geomagnetic dipolar shield against cosmic radiation, and a thriving biosphere.',
    explorationHistory: 'Continuous remote sensing and Earth observation fleet including Landsat, Sentinel, Aqua, Terra, and International Space Station research.',
    orbitalSpeedKmS: 29.8
  },
  {
    id: 'moon',
    name: 'The Moon (Luna)',
    type: 'moon',
    radiusKm: 1737.4,
    massKg: '7.342 × 10²² kg (0.0123 Earths)',
    gravityMps2: 1.62, // 0.165g
    distanceFromSunKm: 149600000,
    distanceFromSunAU: 1.0,
    orbitalPeriodDays: 27.3,
    rotationPeriodHours: 655.7, // Tidally locked
    averageTempC: -20, // -130°C to +120°C
    atmosphere: ['Extremely thin trace exosphere: Helium, Neon, Hydrogen'],
    moonsCount: 0,
    color: '#CBD5E1',
    surfaceFeatures: 'Silicate highland regolith and ancient volcanic dark basaltic maria; formed ~4.5 billion years ago from the giant Theia protoplanet impact.',
    explorationHistory: 'Apollo human landings (1969–1972), Soviet Luna probes, Chang’e sample returns, and NASA Artemis program.',
    orbitalSpeedKmS: 1.02
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'terrestrial',
    radiusKm: 3389.5,
    massKg: '6.417 × 10²³ kg (0.107 Earths)',
    gravityMps2: 3.72, // 0.38g
    distanceFromSunKm: 227900000,
    distanceFromSunAU: 1.524,
    orbitalPeriodDays: 687.0,
    rotationPeriodHours: 24.623,
    averageTempC: -63,
    atmosphere: ['95.3% Carbon Dioxide', '2.6% Nitrogen', '1.9% Argon'],
    moonsCount: 2, // Phobos & Deimos
    color: '#EF4444',
    surfaceFeatures: 'Red iron oxide (rust) dust desert, Olympus Mons (tallest planetary shield volcano in the solar system, 21.9 km high), and Valles Marineris canyon system spanning 4,000 km.',
    explorationHistory: 'NASA Viking landers, Mars Exploration Rovers (Spirit & Opportunity), Curiosity, Perseverance with Ingenuity helicopter, and ESA ExoMars.',
    orbitalSpeedKmS: 24.1
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'gas-giant',
    radiusKm: 69911,
    massKg: '1.898 × 10²⁷ kg (317.8 Earths)',
    gravityMps2: 24.79, // 2.53g
    distanceFromSunKm: 778500000,
    distanceFromSunAU: 5.204,
    orbitalPeriodDays: 4332.6, // 11.86 Earth years
    rotationPeriodHours: 9.925, // Fastest spinning planet
    averageTempC: -110,
    atmosphere: ['89.8% Hydrogen', '10.2% Helium', 'Methane', 'Ammonia crystals'],
    moonsCount: 95, // Io, Europa, Ganymede, Callisto
    color: '#F97316',
    surfaceFeatures: 'Turbulent banded ammonia-cloud cloud deck with anticyclonic storm systems including the centuries-old Great Red Spot; immense metallic hydrogen interior producing a titan magnetosphere.',
    explorationHistory: 'Pioneer 10/11, Voyager 1/2, Galileo orbital mission (1995–2003), NASA Juno orbiter, and ESA JUICE en route to Jovian icy moons.',
    orbitalSpeedKmS: 13.1
  },
  {
    id: 'saturn',
    name: 'Saturn',
    type: 'gas-giant',
    radiusKm: 58232,
    massKg: '5.683 × 10²⁶ kg (95.2 Earths)',
    gravityMps2: 10.44, // 1.06g
    distanceFromSunKm: 1433500000,
    distanceFromSunAU: 9.582,
    orbitalPeriodDays: 10759.2, // 29.45 Earth years
    rotationPeriodHours: 10.55,
    averageTempC: -140,
    atmosphere: ['96.3% Hydrogen', '3.25% Helium', 'Methane', 'Ammonia'],
    moonsCount: 146, // Titan, Enceladus, Mimas
    color: '#FDE047',
    surfaceFeatures: 'Spectacular planetary ring system composed of 99% pure water ice particles spanning up to 282,000 km in width but only 10 meters thick; hexagonal polar atmospheric jet stream.',
    explorationHistory: 'Voyager 1/2, NASA/ESA Cassini-Huygens orbiter and Titan lander mission (2004–2017) revealing subsurface ocean cryovolcanoes on Enceladus.',
    orbitalSpeedKmS: 9.7
  },
  {
    id: 'uranus',
    name: 'Uranus',
    type: 'ice-giant',
    radiusKm: 25362,
    massKg: '8.681 × 10²⁵ kg (14.5 Earths)',
    gravityMps2: 8.69, // 0.89g
    distanceFromSunKm: 2872500000,
    distanceFromSunAU: 19.20,
    orbitalPeriodDays: 30685.4, // 84 Earth years
    rotationPeriodHours: -17.24, // Retrograde & tilted on its side
    averageTempC: -195, // Coldest planetary atmosphere recorded (-224°C)
    atmosphere: ['82.5% Hydrogen', '15.2% Helium', '2.3% Methane (gives cyan tint)'],
    moonsCount: 28, // Miranda, Titania, Oberon
    color: '#22D3EE',
    surfaceFeatures: 'Extreme 97.77° axial tilt meaning it orbits the Sun rolling on its side, resulting in 42 years of continuous sunlight followed by 42 years of polar night.',
    explorationHistory: 'Visited only once by NASA Voyager 2 flyby in January 1986; prioritized for future flagship orbital exploration.',
    orbitalSpeedKmS: 6.8
  },
  {
    id: 'neptune',
    name: 'Neptune',
    type: 'ice-giant',
    radiusKm: 24622,
    massKg: '1.024 × 10²⁶ kg (17.1 Earths)',
    gravityMps2: 11.15, // 1.14g
    distanceFromSunKm: 4495100000,
    distanceFromSunAU: 30.05,
    orbitalPeriodDays: 60190.0, // 164.8 Earth years
    rotationPeriodHours: 16.11,
    averageTempC: -200,
    atmosphere: ['80% Hydrogen', '19% Helium', '1.5% Methane', 'Hydrogen deuteride'],
    moonsCount: 16, // Triton (retrograde cryovolcanic moon)
    color: '#3B82F6',
    surfaceFeatures: 'Deep supersonic storm bands with the most violent winds in the solar system exceeding 2,100 km/h; vast interior mantle of high-pressure water, ammonia, and methane ices.',
    explorationHistory: 'Discovered through mathematical orbital perturbation calculations by Le Verrier and Adams (1846); flyby by Voyager 2 in August 1989.',
    orbitalSpeedKmS: 5.4
  },
  {
    id: 'pluto',
    name: 'Pluto',
    type: 'dwarf',
    radiusKm: 1188.3,
    massKg: '1.303 × 10²² kg (0.0022 Earths)',
    gravityMps2: 0.62, // 0.063g
    distanceFromSunKm: 5906400000,
    distanceFromSunAU: 39.48,
    orbitalPeriodDays: 90560.0, // 248 Earth years
    rotationPeriodHours: -153.3, // 6.39 Earth days
    averageTempC: -229,
    atmosphere: ['Nitrogen', 'Methane', 'Carbon Monoxide (expands at perihelion)'],
    moonsCount: 5, // Charon, Styx, Nix, Kerberos, Hydra
    color: '#D8B4FE',
    surfaceFeatures: 'Kuiper Belt dwarf planet featuring the vast heart-shaped nitrogen ice glacier Tombaugh Regio, water-ice cryovolcanic mountain ranges, and binary tidal lock with its large moon Charon.',
    explorationHistory: 'Explored by NASA New Horizons spacecraft during historic high-speed flyby on July 14, 2015.',
    orbitalSpeedKmS: 4.7
  }
];

// Gravity comparison calculator
export function calculateWeightOnBody(massKg: number, planetId: string): { weightN: number; relativeWeightKg: number } {
  const planet = PLANETS_DATA.find(p => p.id === planetId) || PLANETS_DATA[3]; // default Earth
  const earthGravity = 9.807;
  const weightN = massKg * planet.gravityMps2;
  const relativeWeightKg = (weightN / earthGravity);
  return { weightN: Number(weightN.toFixed(1)), relativeWeightKg: Number(relativeWeightKg.toFixed(1)) };
}
