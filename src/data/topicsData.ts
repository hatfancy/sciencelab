import { ScienceTopic } from '../types/science';

export const TOPICS_DATA: ScienceTopic[] = [
  {
    id: 'chemistry-reactions',
    title: 'Chemistry & Chemical Reactions',
    category: 'Chemistry',
    shortDesc: 'How atoms recombine, bonds break and reform, and energy is exchanged in chemical transformations.',
    beginnerExplanation: 'Everything around you is made of atoms linked together like building blocks called molecules. A chemical reaction happens when these blocks detach and rearrange into brand-new substances with totally different properties.',
    deepExplanation: 'Chemical reactions are governed by thermodynamics and kinetics. Reactant molecules must collide with sufficient activation energy ($E_a$) and favorable geometric orientation to reach the transition state. The enthalpy change ($\Delta H$) determines whether heat is absorbed (endothermic) or released (exothermic), while Gibbs free energy ($\Delta G = \Delta H - T\Delta S$) determines reaction spontaneity.',
    keyEquations: [
      { formula: 'ΔG = ΔH - TΔS', explanation: 'Gibbs Free Energy equation: determines if a chemical reaction is thermodynamically spontaneous.' },
      { formula: 'k = A · e^(-Ea / RT)', explanation: 'Arrhenius Equation: shows how temperature and activation energy dictate reaction rates.' }
    ],
    applications: ['Pharmaceutical synthesis', 'Lithium battery chemistry', 'Plastics and bio-polymers', 'Food preservation'],
    commonMisconceptions: ['Dissolving is the same as reacting (Dissolving salt in water is a physical dissociation, not a new substance synthesis).', 'Mass is lost when smoke disappears (Mass is strictly conserved according to Lavoisier’s Law).'],
    knowledgeCheck: {
      question: 'When baking soda reacts with vinegar, what gas causes the vigorous foaming?',
      options: ['Hydrogen (H₂)', 'Carbon Dioxide (CO₂)', 'Oxygen (O₂)', 'Nitrogen (N₂)'],
      correctIndex: 1,
      explanation: 'Acetic acid donates a proton to bicarbonate, forming carbonic acid which rapidly decomposes into liquid water and gaseous carbon dioxide (CO₂).'
    },
    iconName: 'FlaskConical',
    relatedTopics: ['atoms-particles', 'combustion-energy', 'water-fluids']
  },
  {
    id: 'physics-speed',
    title: 'Physics & Speed',
    category: 'Physics',
    shortDesc: 'The laws of motion, velocity vectors, acceleration, momentum, and relativistic limits.',
    beginnerExplanation: 'Speed tells you how fast an object covers distance. Velocity adds direction to speed. When velocity changes—by speeding up, slowing down, or turning—that change is called acceleration.',
    deepExplanation: 'Classical kinematics models motion through calculus relationships: $v(t) = \frac{ds}{dt}$ and $a(t) = \frac{dv}{dt}$. Under constant acceleration, the SUVAT equations describe trajectory. At extreme velocities approaching $c$ (299,792,458 m/s), special relativity dictates time dilation and relativistic momentum ($p = \gamma mv$) because nothing with invariant mass can exceed light speed.',
    keyEquations: [
      { formula: 'v = Δs / Δt', explanation: 'Average Velocity = Change in displacement divided by elapsed time.' },
      { formula: 'v = u + at', explanation: 'Final velocity under constant acceleration $a$ starting from initial velocity $u$.' },
      { formula: 's = ut + ½at²', explanation: 'Distance covered under constant acceleration over time $t$.' }
    ],
    applications: ['High-speed rail design', 'Spacecraft trajectory calculation', 'Automotive safety crumple zones', 'Aviation flight control'],
    commonMisconceptions: ['Speed and velocity are identical (Speed is a scalar quantity; velocity is a vector with direction).', 'An object requires continuous force to stay in motion (Newton’s 1st Law: objects continue at constant velocity unless acted upon by an external net force).'],
    knowledgeCheck: {
      question: 'A vehicle increases its velocity from 10 m/s to 30 m/s in 4 seconds. What is its acceleration?',
      options: ['2.5 m/s²', '5.0 m/s²', '10.0 m/s²', '80 m/s²'],
      correctIndex: 1,
      explanation: 'Acceleration $a = (v - u) / t = (30 - 10) / 4 = 20 / 4 = 5.0\\text{ m/s}^2$.'
    },
    iconName: 'Gauge',
    relatedTopics: ['forces-gravity', 'rockets-spacecraft', 'sound-light-waves']
  },
  {
    id: 'water-fluids',
    title: 'Water & Fluid Dynamics',
    category: 'Fluids',
    shortDesc: 'Pressure at depth, Archimedes’ buoyancy principle, Bernoulli flow, and anomalous water properties.',
    beginnerExplanation: 'Liquids and gases flow because their molecules can slide past one another. Objects float when the weight of the water they push aside equals their own weight, a discovery made by Archimedes.',
    deepExplanation: 'Fluid mechanics is modeled by the Navier-Stokes equations for viscous flow. In incompressible, inviscid streamline flow, Bernoulli’s principle dictates that an increase in fluid velocity occurs simultaneously with a decrease in static pressure or potential energy ($P + \frac{1}{2}\rho v^2 + \rho gh = \\text{constant}$). Water displays unique anomalous behavior because its bent polar geometry generates extensive tetrahedral hydrogen bonding, making solid ice less dense than liquid water at 4°C.',
    keyEquations: [
      { formula: 'F_b = ρ · V · g', explanation: 'Archimedes’ Principle: Buoyant force equals fluid density × displaced volume × gravitational acceleration.' },
      { formula: 'P_1 + ½ρv₁² = P_2 + ½ρv₂²', explanation: 'Bernoulli’s Equation for horizontal streamline fluid flow.' }
    ],
    applications: ['Submarine ballast tanks', 'Hydroelectric dams', 'Hydraulic braking systems', 'Municipal water distribution'],
    commonMisconceptions: ['Heavy objects always sink (A 100,000-tonne steel aircraft carrier floats because its hollow shape displaces a volume of water whose weight exceeds the ship’s total weight).', 'Water boils only when hot (Water boils at room temperature if ambient air pressure is lowered in a vacuum chamber).'],
    knowledgeCheck: {
      question: 'Why does solid ice float on liquid water?',
      options: ['Ice contains trapped air bubbles', 'Ice has an open hexagonal crystalline structure making it ~9% less dense than water', 'Liquid water has zero surface tension', 'Cold water repels solid substances'],
      correctIndex: 1,
      explanation: 'As water freezes below 4°C, hydrogen bonds lock molecules into an open hexagonal lattice with extra empty space, reducing its density to ~0.917 g/cm³ compared to liquid water’s 1.0 g/cm³.'
    },
    iconName: 'Waves',
    relatedTopics: ['wind-weather', 'chemistry-reactions', 'forces-gravity']
  },
  {
    id: 'wind-weather',
    title: 'Wind & Weather Dynamics',
    category: 'Earth & Atmosphere',
    shortDesc: 'Atmospheric pressure gradients, the Coriolis effect, cloud formation, and global climate circulation.',
    beginnerExplanation: 'Wind is air in motion caused by the Sun heating Earth unevenly. Warm air expands and rises, creating low pressure, and cooler, denser air rushes in to take its place.',
    deepExplanation: 'Global atmospheric circulation operates via three primary convection cells per hemisphere: Hadley, Ferrel, and Polar cells. As air moves across lines of latitude on a rotating sphere, the apparent Coriolis force deflects winds to the right in the Northern Hemisphere and to the left in the Southern Hemisphere, steering jet streams and rotating cyclonic weather systems.',
    keyEquations: [
      { formula: 'F_coriolis = 2m(v × ω)', explanation: 'Coriolis force vector depending on mass, wind velocity, and planetary angular rotation rate.' },
      { formula: 'F_drag = ½ · ρ · v² · C_d · A', explanation: 'Aerodynamic Drag Equation: force opposing motion through air.' }
    ],
    applications: ['Meteorological weather forecasting', 'Wind turbine renewable energy', 'Aircraft flight routing', 'Severe storm early warning systems'],
    commonMisconceptions: ['The Coriolis effect determines the direction water drains in a household sink (Sink water motion is dominated by basin geometry and initial momentum, not the microscopic Coriolis force on such a small scale).', 'Clouds are made of water vapor gas (Water vapor is completely invisible; visible clouds are liquid droplets or ice crystals suspended in air).'],
    knowledgeCheck: {
      question: 'Which atmospheric layer contains almost all of Earth’s weather and clouds?',
      options: ['Stratosphere', 'Troposphere', 'Mesosphere', 'Thermosphere'],
      correctIndex: 1,
      explanation: 'The Troposphere extends from the surface to roughly 10–15 km altitude and contains ~75% of atmospheric mass and 99% of all water vapor.'
    },
    iconName: 'Wind',
    relatedTopics: ['water-fluids', 'earth-volcanoes', 'forces-gravity']
  },
  {
    id: 'space-astronomy',
    title: 'Space & Astronomy',
    category: 'Space',
    shortDesc: 'The Solar System, stellar evolution, black holes, galactic structures, and the observable cosmos.',
    beginnerExplanation: 'Astronomy is the study of everything beyond Earth. From planets orbiting our Sun to colossal galaxies containing billions of stars, looking into space is also looking back in time because light takes time to travel.',
    deepExplanation: 'Astrophysics investigates cosmic structures governed by general relativity and nuclear physics. Stars maintain hydrostatic equilibrium balancing inward gravitational pressure with outward thermonuclear radiation pressure. High-mass stars (>8 solar masses) end in core-collapse supernovae, leaving neutron stars or stellar-mass black holes where escape velocity exceeds light speed ($r_s = \frac{2GM}{c^2}$).',
    keyEquations: [
      { formula: 'r_s = 2GM / c²', explanation: 'Schwarzschild Radius: defines the event horizon boundary of a non-rotating black hole.' },
      { formula: 'T² = (4π² / GM) · a³', explanation: 'Kepler’s Third Law relating orbital period $T$ to semi-major axis distance $a$.' }
    ],
    applications: ['GPS satellite time dilation corrections', 'Deep space communications', 'Exoplanet transit detection (Kepler & TESS)', 'Cosmic radiation monitoring'],
    commonMisconceptions: ['Seasons on Earth are caused by distance from the Sun (Seasons are caused by Earth’s 23.5° axial tilt changing the angle of incident sunlight).', 'Black holes suck in everything like cosmic vacuum cleaners (If our Sun was replaced by an equal-mass black hole, planetary orbits would remain unchanged).'],
    knowledgeCheck: {
      question: 'What is the primary nuclear fusion reaction powering the Sun during its main sequence life?',
      options: ['Carbon-nitrogen-oxygen cycle', 'Proton-proton chain fusing Hydrogen into Helium', 'Helium flash triple-alpha fusion', 'Uranium fission'],
      correctIndex: 1,
      explanation: 'In the Sun’s core at ~15 million Kelvin, the proton-proton chain fuses four hydrogen nuclei into one helium-4 nucleus, releasing energy as gamma rays and neutrinos.'
    },
    iconName: 'Sparkles',
    relatedTopics: ['rockets-spacecraft', 'forces-gravity', 'nuclear-fusion']
  },
  {
    id: 'rockets-spacecraft',
    title: 'Rockets & Spacecraft Engineering',
    category: 'Aerospace',
    shortDesc: 'Tsiolkovsky rocket equation, multi-stage orbital mechanics, specific impulse, and atmospheric re-entry.',
    beginnerExplanation: 'Rockets work by Newton’s third law: pushing hot exhaust gas backwards at tremendous speed propels the rocket forward. Because rockets must carry their own oxygen, most of their takeoff weight is propellant.',
    deepExplanation: 'Spaceflight requires achieving orbital velocity ($\sim 7.8\\text{ km/s}$ for LEO) rather than simply flying high. The fundamental limit is expressed by Tsiolkovsky’s rocket equation: $\Delta v = I_{sp} g_0 \ln\left(\frac{m_0}{m_f}\right)$. Because propellant mass increases exponentially with required $\Delta v$, staging is essential: discarding empty dry propellant tanks during flight drastically improves mass efficiency.',
    keyEquations: [
      { formula: 'Δv = I_sp · g_0 · ln(m_0 / m_f)', explanation: 'Tsiolkovsky Rocket Equation: calculates achievable velocity change from propellant mass fraction and specific impulse.' },
      { formula: 'TWR = Thrust / (Total Mass · g_0)', explanation: 'Thrust-to-Weight Ratio: must exceed 1.0 for a rocket to lift off vertically from a launch pad.' }
    ],
    applications: ['Commercial satellite deployment', 'Artemis lunar exploration', 'Interplanetary robotic probes', 'Reusable booster vertical landings'],
    commonMisconceptions: ['Rockets need atmosphere to push against (Rockets work better in vacuum because there is zero atmospheric drag to restrict exhaust expansion).', 'Astronauts in orbit float because there is zero gravity (Gravity at the ISS altitude of 400 km is ~90% of Earth surface gravity; astronauts float in perpetual free fall).'],
    knowledgeCheck: {
      question: 'What is the required velocity to achieve a stable circular Low Earth Orbit (LEO)?',
      options: ['Approximately 1,200 km/h', 'Approximately 7.8 km/s (28,000 km/h)', '11.2 km/s', '300,000 km/s'],
      correctIndex: 1,
      explanation: 'At an altitude of ~300–400 km, circular orbital speed is approximately 7.8 km/s (about 28,000 km/h). 11.2 km/s is Earth’s escape velocity.'
    },
    iconName: 'Rocket',
    relatedTopics: ['space-astronomy', 'physics-speed', 'combustion-energy']
  },
  {
    id: 'combustion-energy',
    title: 'Combustion & Energy Transformation',
    category: 'Energy',
    shortDesc: 'The fire triangle, enthalpy of reaction, thermodynamics of heat engines, and complete vs incomplete burning.',
    beginnerExplanation: 'Combustion is a rapid chemical reaction between a fuel and oxygen that releases energy as light and heat. Fire requires three things: fuel, oxygen, and heat (activation energy). Remove any one, and the fire stops.',
    deepExplanation: 'Combustion is an exothermic redox process. Hydrocarbon combustion with excess oxidizer yields complete products ($C_xH_y + (x + y/4)O_2 \to x CO_2 + (y/2)H_2O + \text{heat}$). When oxygen is limited, incomplete combustion occurs, producing toxic carbon monoxide ($CO$) and elemental carbon particulates (soot). Heat engines convert this thermal energy to mechanical work according to the Carnot efficiency limit ($\eta_{max} = 1 - T_C / T_H$).',
    keyEquations: [
      { formula: 'CH₄ + 2O₂ → CO₂ + 2H₂O + 891 kJ/mol', explanation: 'Complete stoichiometric combustion of methane releasing thermal energy.' },
      { formula: 'η_Carnot = 1 - (T_cold / T_hot)', explanation: 'Maximum theoretical thermal efficiency of any heat engine operating between two temperatures (in Kelvin).' }
    ],
    applications: ['Gas turbine power generation', 'Automotive internal combustion engines', 'Industrial furnace metallurgy', 'Spacecraft chemical thrusters'],
    commonMisconceptions: ['Heat and temperature are the same thing (Temperature measures average particle kinetic energy; heat is the total thermal energy transferred).', 'Water puts out fire by removing fuel (Water extinguishes fire primarily by absorbing heat through high latent heat of vaporization and smothering oxygen access).'],
    knowledgeCheck: {
      question: 'Which of the following is produced during incomplete combustion due to insufficient oxygen supply?',
      options: ['Carbon Monoxide (CO) and soot', 'Only harmless pure water vapor', 'Excess liquid oxygen', 'Ozone gas'],
      correctIndex: 0,
      explanation: 'When oxygen is scarce, hydrocarbon carbon cannot fully oxidize to CO₂, resulting in lethal, odorless carbon monoxide (CO) gas and unburnt carbon soot particles.'
    },
    iconName: 'Flame',
    relatedTopics: ['chemistry-reactions', 'rockets-spacecraft', 'electricity-magnetism']
  },
  {
    id: 'forces-gravity',
    title: 'Forces, Motion & Gravity',
    category: 'Physics',
    shortDesc: 'Newton’s three laws of motion, universal gravitation, friction, momentum conservation, and orbital paths.',
    beginnerExplanation: 'A force is a push or pull. Isaac Newton discovered that forces cause objects to accelerate ($F = ma$). Earth’s gravity pulls objects down, and the same gravitational force keeps the Moon orbiting Earth.',
    deepExplanation: 'Newtonian mechanics describes interactions through vectors. Newton’s Third Law states every action has an equal and opposite reaction. Universal gravitation ($F = G\frac{m_1 m_2}{r^2}$) acts along the line connecting mass centers. In Einstein’s general relativity, gravity is not a traditional force but the curvature of four-dimensional spacetime caused by mass and energy distribution ($G_{\mu\nu} = \frac{8\pi G}{c^4}T_{\mu\nu}$).',
    keyEquations: [
      { formula: 'F_net = m · a', explanation: 'Newton’s Second Law: Net force equals mass times acceleration.' },
      { formula: 'F_g = G · (m₁ · m₂) / r²', explanation: 'Newton’s Law of Universal Gravitation.' }
    ],
    applications: ['Structural engineering & bridges', 'Automotive suspension systems', 'Orbital trajectory modeling', 'Elevator counterweight design'],
    commonMisconceptions: ['Heavier objects fall faster in a vacuum (In a vacuum without air resistance, all masses experience identical gravitational acceleration $g = 9.81\\text{ m/s}^2$).', 'Centrifugal force is a real physical outward force (Centrifugal force is an apparent inertial effect observed only in a rotating, non-inertial reference frame).'],
    knowledgeCheck: {
      question: 'If you double the distance between two masses, what happens to the gravitational force between them?',
      options: ['It doubles', 'It is cut in half', 'It decreases by a factor of 4 (quarter of original)', 'It drops to zero'],
      correctIndex: 2,
      explanation: 'Gravity follows an inverse-square law ($F \propto 1/r^2$). Doubling distance ($2r$) results in $(2)^2 = 4$ times less force ($1/4$).'
    },
    iconName: 'Orbit',
    relatedTopics: ['physics-speed', 'space-astronomy', 'engineering-machines']
  },
  {
    id: 'electricity-magnetism',
    title: 'Electricity & Magnetism',
    category: 'Electromagnetism',
    shortDesc: 'Electric charges, Ohm’s law, circuits, electromagnetic induction, Maxwell’s equations, and motors.',
    beginnerExplanation: 'Electricity is the movement of tiny charged particles called electrons through conductors. Moving electric charges create magnetic fields, and changing magnetic fields create electric currents—the secret behind electric motors and power generators.',
    deepExplanation: 'Electromagnetism is unified by Maxwell’s equations. In electrical circuits, Ohm’s law relates current ($I$), voltage ($V$), and resistance ($R$) by $V = IR$. Faraday’s law of induction ($\mathcal{E} = -\frac{d\Phi_B}{dt}$) reveals that changing magnetic flux induces an electromotive force. This fundamental reciprocity enables generators to convert mechanical rotation into electrical power and motors to convert electricity into torque.',
    keyEquations: [
      { formula: 'V = I · R', explanation: 'Ohm’s Law: Voltage equals electric current times electrical resistance.' },
      { formula: 'P = V · I = I²R', explanation: 'Electric Power: rate of energy dissipation or work performed.' },
      { formula: 'ℰ = -dΦ_B / dt', explanation: 'Faraday’s Law of Electromagnetic Induction.' }
    ],
    applications: ['Electric vehicle traction motors', 'Smart electrical grids', 'Magnetic resonance imaging (MRI)', 'Semiconductor integrated chips'],
    commonMisconceptions: ['Electrons race at the speed of light through wires (Individual electron drift velocity is typically less than 1 millimeter per second; the electromagnetic field signal propagates near light speed).', 'Electricity is stored in batteries as ready-made electrons (Batteries store chemical potential energy, releasing electrons via spontaneous redox reactions when connected).'],
    knowledgeCheck: {
      question: 'What is the current flowing through a 12-ohm resistor connected across a 24-volt battery?',
      options: ['0.5 Amperes', '2.0 Amperes', '12 Amperes', '288 Amperes'],
      correctIndex: 1,
      explanation: 'By Ohm’s Law, $I = V / R = 24\\text{ V} / 12\\text{ }\\Omega = 2.0\\text{ Amperes}$.'
    },
    iconName: 'Zap',
    relatedTopics: ['atoms-particles', 'engineering-machines', 'sound-light-waves']
  },
  {
    id: 'atoms-particles',
    title: 'Atoms & Particle Physics',
    category: 'Physics',
    shortDesc: 'Subatomic structure, quarks, leptons, the Standard Model, quantum energy levels, and radioactive decay.',
    beginnerExplanation: 'Atoms are composed of a dense nucleus of protons and neutrons surrounded by a cloud of electrons. Protons and neutrons are themselves made of even smaller fundamental particles called quarks.',
    deepExplanation: 'The Standard Model classifies all known fundamental matter into 6 quarks and 6 leptons, mediated by gauge bosons (photons for electromagnetism, $W/Z$ bosons for the weak force, gluons for the strong force) and the scalar Higgs boson which grants mass through electroweak symmetry breaking. At subatomic scales, quantum mechanics dictates wave-particle duality and the Heisenberg uncertainty principle ($\Delta x \Delta p \ge \frac{\hbar}{2}$).',
    keyEquations: [
      { formula: 'E = h · ν = hc / λ', explanation: 'Planck-Einstein relation: energy of a photon proportional to its electromagnetic frequency.' },
      { formula: 'Δx · Δp ≥ ℏ / 2', explanation: 'Heisenberg’s Uncertainty Principle.' }
    ],
    applications: ['Semiconductor microchip lithography', 'Positron Emission Tomography (PET scans)', 'Electron microscopy', 'Quantum cryptography'],
    commonMisconceptions: ['Electrons orbit the nucleus like miniature planets (Electrons exist as 3D quantum probability wavefunctions / orbitals, not defined planar orbits).', 'Atoms are solid spheres (An atom is more than 99.9999999% empty space by volume; if the nucleus were a marble, the electron cloud would span a cathedral).'],
    knowledgeCheck: {
      question: 'Which fundamental particles make up a proton?',
      options: ['Two up quarks and one down quark (uud)', 'Two down quarks and one up quark (udd)', 'Three electrons', 'One positron and one neutrino'],
      correctIndex: 0,
      explanation: 'A proton consists of two up quarks (charge +2/3 each) and one down quark (charge -1/3), giving a total net positive charge of +1 ($+2/3 + 2/3 - 1/3 = +1$).'
    },
    iconName: 'Atom',
    relatedTopics: ['nuclear-fusion', 'chemistry-reactions', 'electricity-magnetism']
  },
  {
    id: 'biology-human-body',
    title: 'Biology & the Human Body',
    category: 'Life Sciences',
    shortDesc: 'Cellular biology, DNA genetics, ATP energy cycles, neurobiology, and human organ system physiology.',
    beginnerExplanation: 'The human body is an astonishing biological machine containing roughly 37 trillion cells working in harmony. Your DNA holds the biochemical instructions to build proteins that keep your heart pumping, lungs breathing, and brain thinking.',
    deepExplanation: 'Cellular physiology relies on compartmentalization and biochemical gradients. Mitochondria generate adenosine triphosphate (ATP) via the electron transport chain and chemiosmosis powered by a proton motive force across the inner mitochondrial membrane ($ADP + P_i \to ATP$). Genetic information is encoded in the antiparallel double-helix nucleotide sequence of DNA, transcribed to mRNA, and translated into polypeptide proteins by ribosomes.',
    keyEquations: [
      { formula: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ~30-32 ATP', explanation: 'Overall chemical equation for aerobic cellular respiration.' },
      { formula: '6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂', explanation: 'Oxygenic plant photosynthesis equation.' }
    ],
    applications: ['CRISPR-Cas9 gene therapy', 'mRNA vaccine technology', 'Organ transplantation immunology', 'Artificial neural interfaces'],
    commonMisconceptions: ['Humans use only 10% of their brains (Brain imaging consistently shows virtually 100% of the brain is active throughout the day).', 'Blood in human veins is blue before it hits oxygen (Deoxygenated human blood is deep dark red, never blue; veins appear blue only due to optical light scattering through human skin).'],
    knowledgeCheck: {
      question: 'Which cellular organelle is responsible for generating the majority of chemical ATP energy?',
      options: ['Golgi apparatus', 'Mitochondria', 'Lysosome', 'Endoplasmic reticulum'],
      correctIndex: 1,
      explanation: 'Mitochondria are the powerhouses of eukaryotic cells, producing the bulk of cellular ATP through oxidative phosphorylation and the Krebs citric acid cycle.'
    },
    iconName: 'HeartPulse',
    relatedTopics: ['chemistry-reactions', 'engineering-machines', 'earth-volcanoes']
  },
  {
    id: 'earth-volcanoes',
    title: 'Earth Science & Volcanoes',
    category: 'Geology',
    shortDesc: 'Tectonic plate boundaries, mantle convection, earthquake seismology, magma viscosity, and volcanology.',
    beginnerExplanation: 'Earth’s crust is cracked into massive pieces called tectonic plates that float on the hot, semi-fluid mantle beneath. When plates collide, pull apart, or grind past each other, earthquakes occur and volcanoes erupt.',
    deepExplanation: 'Plate tectonics is driven by mantle convection, slab pull at subduction zones, and radioactive decay heat in Earth’s interior ($^{238}U, ^{232}Th, ^{40}K$). Magma behavior is governed by silica content ($SiO_2$) and dissolved volatile gases ($H_2O, CO_2$). Low-silica basaltic magma has low viscosity, producing gentle effusive lava flows (e.g., Hawaii), while high-silica rhyolitic/andesitic magma is highly viscous, trapping expanding gases that generate explosive Plinian eruptions.',
    keyEquations: [
      { formula: 'v_p = √((K + 4/3G) / ρ)', explanation: 'Seismic Primary (P-wave) velocity in rock based on bulk modulus $K$, shear modulus $G$, and density $\\rho$.' },
      { formula: 'v_s = √(G / ρ)', explanation: 'Secondary (S-wave) shear wave velocity (cannot travel through liquid outer core).' }
    ],
    applications: ['Earthquake early warning networks', 'Geothermal clean energy extraction', 'Mineral and rare-earth prospecting', 'Volcanic hazard zone mapping'],
    commonMisconceptions: ['Earth’s mantle is liquid lava (The mantle is mostly solid silicate rock that behaves plastically over millions of years; magma is generated only in specific localized melting zones).', 'Earthquakes happen only during hot weather (Earthquakes originate kilometers deep along fault lines with zero connection to surface atmospheric weather).'],
    knowledgeCheck: {
      question: 'Why can seismic S-waves (shear waves) not travel through Earth’s outer core?',
      options: ['The core is too cold', 'Liquids have zero shear modulus ($G=0$) and cannot sustain shear stress', 'The magnetic field deflects them', 'S-waves are too slow'],
      correctIndex: 1,
      explanation: 'S-waves are transverse shear waves that require rigidity to propagate. Because liquids cannot resist shear stress, S-waves cannot penetrate the liquid iron-nickel outer core, creating an S-wave shadow zone that proved the core is liquid.'
    },
    iconName: 'Mountain',
    relatedTopics: ['water-fluids', 'wind-weather', 'physics-speed']
  },
  {
    id: 'engineering-machines',
    title: 'Engineering & Machines',
    category: 'Engineering',
    shortDesc: 'Simple machines, mechanical advantage, gear trains, hydraulic multiplication, and structural trusses.',
    beginnerExplanation: 'Machines do not create free energy, but they multiply our force or change its direction. Using levers, pulleys, ramps, and gears, a small force applied over a longer distance can lift tremendous loads.',
    deepExplanation: 'Mechanical advantage ($MA$) is defined as the ratio of output load force to input effort force ($MA = F_{out} / F_{in}$). By the conservation of energy and the work-energy theorem ($W = F \cdot d$), any increase in force requires a proportional increase in input distance ($F_1 d_1 = F_2 d_2$). In fluid power systems, Pascal’s principle states that pressure applied to an enclosed fluid is transmitted undiminished in all directions ($P_1 = P_2 \implies F_1/A_1 = F_2/A_2$), enabling hydraulic presses to lift heavy vehicles with minimal effort.',
    keyEquations: [
      { formula: 'MA = F_load / F_effort', explanation: 'Actual Mechanical Advantage of a machine.' },
      { formula: 'F₁ / A₁ = F₂ / A₂', explanation: 'Pascal’s Principle in hydraulic systems.' },
      { formula: 'Gear Ratio = N_driven / N_driving = τ_out / τ_in', explanation: 'Gear tooth ratio determining mechanical torque multiplication and rotational speed.' }
    ],
    applications: ['Automotive transmissions & differentials', 'Construction tower cranes', 'Robotic prosthetic limbs', 'Aerospace flight control actuators'],
    commonMisconceptions: ['Machines multiply energy (Machines can multiply force or speed, but total work/energy output is always $\\le$ work input due to friction).', 'A longer lever requires more force to lift a load (A longer effort arm increases distance, reducing the required input effort force).'],
    knowledgeCheck: {
      question: 'A hydraulic lift has an input piston area of 5 cm² and an output piston area of 500 cm². If you push down with 100 N of force, what load force is generated on the large piston?',
      options: ['10 N', '100 N', '1,000 N', '10,000 N'],
      correctIndex: 3,
      explanation: 'Force is multiplied by the area ratio: $F_2 = F_1 \times (A_2 / A_1) = 100\\text{ N} \times (500 / 5) = 100 \times 100 = 10,000\\text{ N}$.'
    },
    iconName: 'Cog',
    relatedTopics: ['forces-gravity', 'physics-speed', 'robotics-ai']
  },
  {
    id: 'sound-light-waves',
    title: 'Sound, Light & Wave Dynamics',
    category: 'Waves & Optics',
    shortDesc: 'Frequency, wavelength, acoustic resonance, Snell’s law of refraction, interference, and the electromagnetic spectrum.',
    beginnerExplanation: 'Waves carry energy from place to place without transporting matter. Sound is a mechanical compression wave travelling through air or water. Light is an electromagnetic wave that can travel through the vacuum of empty space at 300,000 km/s.',
    deepExplanation: 'Waves satisfy the fundamental wave relation $v = f\lambda$. Sound is a longitudinal mechanical wave requiring a physical medium with elasticity and inertia. Light is a transverse electromagnetic wave described by Maxwell’s equations that propagates in vacuum at $c = 1/\sqrt{\mu_0 \varepsilon_0}$. When light crosses the interface between optical media with different refractive indices, it changes speed and bends according to Snell’s law ($n_1 \sin\theta_1 = n_2 \sin\theta_2$).',
    keyEquations: [
      { formula: 'v = f · λ', explanation: 'Wave speed equals frequency times wavelength.' },
      { formula: 'n₁ · sin(θ₁) = n₂ · sin(θ₂)', explanation: 'Snell’s Law of Optical Refraction.' },
      { formula: 'f_observed = f_source · (v ± v_obs) / (v ∓ v_source)', explanation: 'Doppler Effect equation for acoustic and optical wave sources.' }
    ],
    applications: ['Fiber-optic internet telecommunications', 'Medical ultrasound imaging', 'Optical telescopes and microscopes', 'Noise-canceling audio headphones'],
    commonMisconceptions: ['Sound can travel through empty space in outer space (Sound requires physical atoms to compress and vibrate; space is a near-vacuum, so sound cannot propagate).', 'Light slows down permanently after exiting glass (Light propagates at $c/n$ inside the dielectric medium, but immediately resumes full vacuum speed $c$ upon exiting).'],
    knowledgeCheck: {
      question: 'Why does the daytime sky on Earth appear blue?',
      options: ['Oceans reflect blue light into the atmosphere', 'Air molecules scatter short-wavelength blue light much more strongly than longer red light (Rayleigh scattering)', 'Ozone gas is naturally blue', 'Dust particles absorb all red wavelengths'],
      correctIndex: 1,
      explanation: 'Rayleigh scattering intensity is inversely proportional to the fourth power of wavelength ($I \propto 1/\lambda^4$). Shorter blue wavelengths (~400 nm) scatter roughly 10 times more efficiently than red wavelengths (~700 nm).'
    },
    iconName: 'Radio',
    relatedTopics: ['physics-speed', 'electricity-magnetism', 'atoms-particles']
  },
  {
    id: 'nuclear-fusion',
    title: 'Nuclear Science & Fusion',
    category: 'Nuclear Physics',
    shortDesc: 'Nuclear fission vs fusion, mass defect ($E=mc^2$), tokamak magnetic confinement, and stellar nucleosynthesis.',
    beginnerExplanation: 'Nuclear energy comes from the very center of atoms. Nuclear fission splits heavy atomic nuclei (like uranium) to release energy. Nuclear fusion does the opposite—forcing light nuclei (like hydrogen) together under immense heat and pressure to unleash clean stellar energy.',
    deepExplanation: 'Nuclear reactions convert nuclear binding energy into kinetic energy via mass defect: $\Delta E = \Delta m \cdot c^2$. The binding energy per nucleon curve peaks at Iron-56 ($^{56}Fe$), explaining why fusing elements lighter than iron and fissioning elements heavier than iron both release net energy. Terrestrial fusion (such as ITER tokamak) primarily pursues the Deuterium-Tritium reaction ($^2H + ^3H \to ^4He + n + 17.6\text{ MeV}$) which requires overcoming the Coulomb electrostatic barrier at temperatures $>100\text{ million }^\circ\text{C}$.',
    keyEquations: [
      { formula: 'E = Δm · c²', explanation: 'Mass-Energy Equivalence: energy released equals mass defect times speed of light squared.' },
      { formula: '²H + ³H → ⁴He (3.5 MeV) + n (14.1 MeV)', explanation: 'Deuterium-Tritium fusion reaction releasing 17.6 MeV total energy.' }
    ],
    applications: ['ITER and experimental fusion reactors', 'Carbon-free nuclear power generation', 'Radiotherapy cancer treatments', 'Deep space radioisotope power (RTGs)'],
    commonMisconceptions: ['Nuclear power plants can explode like atomic bombs (Commercial nuclear reactor fuel is enriched to ~3–5% U-235, which cannot physically sustain a runaway explosive prompt critical chain reaction).', 'Nuclear fusion produces long-lived high-level radioactive waste like fission (Fusion produces harmless helium gas; radioactive activation of reactor walls decays within decades rather than millennia).'],
    knowledgeCheck: {
      question: 'Which element possesses the highest nuclear binding energy per nucleon, marking the boundary where both fusion and fission cease to release net energy?',
      options: ['Hydrogen-1', 'Carbon-12', 'Iron-56 / Nickel-62', 'Uranium-238'],
      correctIndex: 2,
      explanation: 'Iron-56 and Nickel-62 sit at the very peak of the nuclear binding energy curve. Fusing elements heavier than iron requires net energy input (which occurs in supernovae and neutron star mergers).'
    },
    iconName: 'Radiation',
    relatedTopics: ['space-astronomy', 'atoms-particles', 'combustion-energy']
  },
  {
    id: 'robotics-ai',
    title: 'Robotics, AI & Future Tech',
    category: 'Technology',
    shortDesc: 'Autonomous robotics, inverse kinematics, sensor feedback loops, neural networks, and quantum computing.',
    beginnerExplanation: 'Robots combine mechanical bodies, electronic sensors, and computer software to interact with the physical world. Artificial Intelligence allows machines to learn patterns from data and solve complex problems autonomously.',
    deepExplanation: 'Robotics merges mechanical forward/inverse kinematics, control theory (PID feedback loops), and perception (LiDAR, computer vision, SLAM). Modern artificial intelligence leverages deep neural networks trained with backpropagation to optimize weight tensors over high-dimensional loss surfaces. Emerging quantum computers leverage quantum superposition and entanglement ($|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$) to evaluate complex computational states exponentially faster than classical Turing machines for specific algorithms.',
    keyEquations: [
      { formula: 'u(t) = K_p · e(t) + K_i ∫ e(t)dt + K_d · (de/dt)', explanation: 'PID Controller Equation for closed-loop robotic feedback stabilization.' },
      { formula: 'Loss = -Σ y_i · log(ŷ_i)', explanation: 'Cross-Entropy Loss function widely used in machine learning classification.' }
    ],
    applications: ['Autonomous self-driving vehicles', 'Minimally invasive surgical robots (da Vinci)', 'Automated warehouse logistics', 'Protein structure prediction (AlphaFold)'],
    commonMisconceptions: ['Robots and AI are identical (Robots are physical machines with actuators; AI is computational software that can run on any processor).', 'Quantum computers will replace all classical computers (Quantum computers excel at specific mathematical problems like quantum simulation and factorization, not everyday web browsing or word processing).'],
    knowledgeCheck: {
      question: 'In robotics and control systems, what does a PID controller balance to maintain a system at its target state?',
      options: ['Proportional, Integral, and Derivative feedback terms', 'Pressure, Inertia, and Drag', 'Power, Input, and Output', 'Position, Intensity, and Deceleration'],
      correctIndex: 0,
      explanation: 'A PID controller continuously calculates an error value and applies corrective action based on Proportional (present error), Integral (past accumulated error), and Derivative (future predicted error) terms.'
    },
    iconName: 'Cpu',
    relatedTopics: ['engineering-machines', 'electricity-magnetism', 'atoms-particles']
  }
];
