import { ElementData } from '../types/science';

export const ELEMENTS_DATA: ElementData[] = [
  {
    number: 1, symbol: 'H', name: 'Hydrogen', mass: 1.008, category: 'nonmetal', group: 1, period: 1, state: 'gas',
    electronConfig: '1s¹', summary: 'Most abundant chemical substance in the universe, powering stars through nuclear fusion.',
    uses: ['Rocket propellant', 'Ammonia synthesis', 'Fuel cells', 'Petroleum refining'],
    safety: 'Extremely flammable gas. Forms explosive mixtures with air.', isSynthetic: false, year: 1766
  },
  {
    number: 2, symbol: 'He', name: 'Helium', mass: 4.0026, category: 'noble-gas', group: 18, period: 1, state: 'gas',
    electronConfig: '1s²', summary: 'Colorless, odorless noble gas; second most abundant element in the cosmos.',
    uses: ['Cryogenics for MRI magnets', 'Deep-sea diving gas', 'Lifting gas in airships'],
    safety: 'Asphyxiant in high concentrations; non-toxic and non-flammable.', isSynthetic: false, year: 1868
  },
  {
    number: 3, symbol: 'Li', name: 'Lithium', mass: 6.94, category: 'alkali-metal', group: 1, period: 2, state: 'solid',
    electronConfig: '[He] 2s¹', summary: 'Soft, silvery-white alkali metal; lightest metal and least dense solid element.',
    uses: ['Rechargeable lithium-ion batteries', 'Mood-stabilizing pharmaceuticals', 'Heat-resistant glass'],
    safety: 'Reacts vigorously with moisture/water releasing hydrogen; corrosive.', isSynthetic: false, year: 1817
  },
  {
    number: 4, symbol: 'Be', name: 'Beryllium', mass: 9.0122, category: 'alkaline-earth', group: 2, period: 2, state: 'solid',
    electronConfig: '[He] 2s²', summary: 'High melting point and high stiffness-to-weight ratio metal, transparent to X-rays.',
    uses: ['James Webb Space Telescope primary mirror', 'Aerospace components', 'X-ray tube windows'],
    safety: 'Chronic inhalation causes berylliosis; carcinogenic in dust form.', isSynthetic: false, year: 1798
  },
  {
    number: 5, symbol: 'B', name: 'Boron', mass: 10.81, category: 'metalloid', group: 13, period: 2, state: 'solid',
    electronConfig: '[He] 2s² 2p¹', summary: 'Low-abundance metalloid produced by cosmic ray spallation rather than stellar fusion.',
    uses: ['Borosilicate glassware (Pyrex)', 'Nuclear reactor control rods', 'Fiberglass'],
    safety: 'Low acute toxicity; borates regulated in water supplies.', isSynthetic: false, year: 1808
  },
  {
    number: 6, symbol: 'C', name: 'Carbon', mass: 12.011, category: 'nonmetal', group: 14, period: 2, state: 'solid',
    electronConfig: '[He] 2s² 2p²', summary: 'The chemical basis of all known organic life due to its tetravalent bonding flexibility.',
    uses: ['Structural carbon fiber', 'Graphite lubricants & electrodes', 'Diamond abrasives', 'Organic polymers'],
    safety: 'Elemental forms are generally safe; carbon monoxide (CO) is lethal.', isSynthetic: false, year: 'Ancient'
  },
  {
    number: 7, symbol: 'N', name: 'Nitrogen', mass: 14.007, category: 'nonmetal', group: 15, period: 2, state: 'gas',
    electronConfig: '[He] 2s² 2p³', summary: 'Makes up 78% of Earth’s atmosphere as diatomic N₂ with a powerful triple covalent bond.',
    uses: ['Fertilizer production (Haber-Bosch)', 'Liquid nitrogen cryogenics', 'Inert food packaging'],
    safety: 'Liquid N₂ causes immediate cryogenic burns; simple asphyxiant gas.', isSynthetic: false, year: 1772
  },
  {
    number: 8, symbol: 'O', name: 'Oxygen', mass: 15.999, category: 'nonmetal', group: 16, period: 2, state: 'gas',
    electronConfig: '[He] 2s² 2p⁴', summary: 'Highly reactive nonmetal and oxidizing agent essential for aerobic respiration and combustion.',
    uses: ['Medical respiratory therapy', 'Steel manufacturing', 'Liquid rocket oxidizer (LOX)', 'Water chemistry'],
    safety: 'Vigorously accelerates combustion; liquid O₂ is a cryogenic oxidizer hazard.', isSynthetic: false, year: 1774
  },
  {
    number: 9, symbol: 'F', name: 'Fluorine', mass: 18.998, category: 'halogen', group: 17, period: 2, state: 'gas',
    electronConfig: '[He] 2s² 2p⁵', summary: 'The most electronegative and chemically reactive of all elements in the periodic table.',
    uses: ['Teflon (PTFE) production', 'Dental fluoride', 'Uranium hexafluoride enrichment'],
    safety: 'Extremely toxic and corrosive gas; causes severe chemical burns.', isSynthetic: false, year: 1886
  },
  {
    number: 10, symbol: 'Ne', name: 'Neon', mass: 20.180, category: 'noble-gas', group: 18, period: 2, state: 'gas',
    electronConfig: '[He] 2s² 2p⁶', summary: 'Colorless noble gas that glows bright reddish-orange in high-voltage electrical discharge.',
    uses: ['High-voltage indicators', 'Neon lighting', 'Cryogenic refrigerant'],
    safety: 'Non-toxic, chemically inert noble gas; asphyxiant in closed spaces.', isSynthetic: false, year: 1898
  },
  {
    number: 11, symbol: 'Na', name: 'Sodium', mass: 22.990, category: 'alkali-metal', group: 1, period: 3, state: 'solid',
    electronConfig: '[Ne] 3s¹', summary: 'Soft, highly reactive alkali metal that tarnishes rapidly in air and reacts explosively with water.',
    uses: ['Table salt (NaCl)', 'Sodium-vapor street lamps', 'Heat transfer in fast reactors'],
    safety: 'Violent exothermic reaction with water produces caustic NaOH and hydrogen.', isSynthetic: false, year: 1807
  },
  {
    number: 12, symbol: 'Mg', name: 'Magnesium', mass: 24.305, category: 'alkaline-earth', group: 2, period: 3, state: 'solid',
    electronConfig: '[Ne] 3s²', summary: 'Shiny gray solid; eighth most abundant element in the Earth crust and essential in chlorophyll.',
    uses: ['Lightweight aerospace alloys', 'Automotive parts', 'Flares and fireworks'],
    safety: 'Finely divided magnesium powder burns with brilliant, blinding white light.', isSynthetic: false, year: 1755
  },
  {
    number: 13, symbol: 'Al', name: 'Aluminum', mass: 26.982, category: 'post-transition', group: 13, period: 3, state: 'solid',
    electronConfig: '[Ne] 3s² 3p¹', summary: 'Lightweight, corrosion-resistant metal protected naturally by a microscopic oxide passivation film.',
    uses: ['Aircraft fuselages', 'Beverage cans', 'High-voltage transmission lines'],
    safety: 'Passivated bulk metal is biologically inert and food-safe.', isSynthetic: false, year: 1825
  },
  {
    number: 14, symbol: 'Si', name: 'Silicon', mass: 28.085, category: 'metalloid', group: 14, period: 3, state: 'solid',
    electronConfig: '[Ne] 3s² 3p²', summary: 'The cornerstone semiconductor of modern computing and microelectronics.',
    uses: ['Integrated circuits & microprocessors', 'Photovoltaic solar cells', 'Silicone sealants'],
    safety: 'Respirable crystalline silica dust causes silicosis; bulk silicon is inert.', isSynthetic: false, year: 1824
  },
  {
    number: 15, symbol: 'P', name: 'Phosphorus', mass: 30.974, category: 'nonmetal', group: 15, period: 3, state: 'solid',
    electronConfig: '[Ne] 3s² 3p³', summary: 'Essential to all living organisms as part of the DNA backbone and ATP energy storage.',
    uses: ['Agricultural fertilizers', 'Safety match striker strips', 'Steel deoxidizers'],
    safety: 'White phosphorus is pyrophoric and toxic; red phosphorus is relatively stable.', isSynthetic: false, year: 1669
  },
  {
    number: 16, symbol: 'S', name: 'Sulfur', mass: 32.06, category: 'nonmetal', group: 16, period: 3, state: 'solid',
    electronConfig: '[Ne] 3s² 3p⁴', summary: 'Bright yellow crystalline solid found native near volcanic fumaroles and hot springs.',
    uses: ['Sulfuric acid (most produced chemical)', 'Vulcanizing natural rubber', 'Fungicides'],
    safety: 'Elemental sulfur is low toxicity; burning produces toxic SO₂ gas.', isSynthetic: false, year: 'Ancient'
  },
  {
    number: 17, symbol: 'Cl', name: 'Chlorine', mass: 35.45, category: 'halogen', group: 17, period: 3, state: 'gas',
    electronConfig: '[Ne] 3s² 3p⁵', summary: 'Yellow-green halogen gas with an intense suffocating odor; strong oxidizing disinfectant.',
    uses: ['Drinking water chlorination', 'PVC plastic synthesis', 'Bleaching and pharmaceuticals'],
    safety: 'Toxic gas that irritates lungs; causes severe pulmonary edema at high levels.', isSynthetic: false, year: 1774
  },
  {
    number: 18, symbol: 'Ar', name: 'Argon', mass: 39.948, category: 'noble-gas', group: 18, period: 3, state: 'gas',
    electronConfig: '[Ne] 3s² 3p⁶', summary: 'Third most abundant gas in Earth atmosphere (0.93%), inert shielding gas.',
    uses: ['TIG & MIG arc welding shield', 'Incandescent light bulb fill', 'Double-glazing thermal insulation'],
    safety: 'Non-reactive, non-flammable; simple asphyxiant in enclosed spaces.', isSynthetic: false, year: 1894
  },
  {
    number: 19, symbol: 'K', name: 'Potassium', mass: 39.098, category: 'alkali-metal', group: 1, period: 4, state: 'solid',
    electronConfig: '[Ar] 4s¹', summary: 'Soft silvery alkali metal; essential electrolyte for neural nerve impulse transmission.',
    uses: ['Potash fertilizers (NPK)', 'Electrolyte homeostasis', 'Soaps & detergents'],
    safety: 'Violent water reaction with purple flame; highly caustic hydroxide byproduct.', isSynthetic: false, year: 1807
  },
  {
    number: 20, symbol: 'Ca', name: 'Calcium', mass: 40.078, category: 'alkaline-earth', group: 2, period: 4, state: 'solid',
    electronConfig: '[Ar] 4s²', summary: 'Fifth most abundant element in the human body, vital for structural bone and shell formation.',
    uses: ['Cement & concrete (calcium oxide)', 'Metallurgical flux', 'Dietary bone structural health'],
    safety: 'Reacts moderately with water releasing heat and hydrogen.', isSynthetic: false, year: 1808
  },
  {
    number: 21, symbol: 'Sc', name: 'Scandium', mass: 44.956, category: 'transition-metal', group: 3, period: 4, state: 'solid',
    electronConfig: '[Ar] 3d¹ 4s²', summary: 'Light transition metal used to strengthen aluminum alloys for aerospace.',
    uses: ['Aerospace aluminum alloys', 'High-intensity stadium metal-halide lamps'],
    safety: 'Low toxicity in bulk metal form.', isSynthetic: false, year: 1879
  },
  {
    number: 22, symbol: 'Ti', name: 'Titanium', mass: 47.867, category: 'transition-metal', group: 4, period: 4, state: 'solid',
    electronConfig: '[Ar] 3d² 4s²', summary: 'Low density, high tensile strength, and exceptional biocompatibility in human tissue.',
    uses: ['Surgical implants and joint replacements', 'Jet engines & airframes', 'Titanium dioxide (white pigment)'],
    safety: 'Non-toxic and biocompatible in bulk form.', isSynthetic: false, year: 1791
  },
  {
    number: 26, symbol: 'Fe', name: 'Iron', mass: 55.845, category: 'transition-metal', group: 8, period: 4, state: 'solid',
    electronConfig: '[Ar] 3d⁶ 4s²', summary: 'Most abundant element on Earth by mass (forming the core) and foundation of global industry.',
    uses: ['Structural steel production', 'Hemoglobin oxygen transport in blood', 'Magnetic cores & transformers'],
    safety: 'Safe in bulk; iron powder can be combustible; iron oxide (rust) is non-toxic.', isSynthetic: false, year: 'Ancient'
  },
  {
    number: 28, symbol: 'Ni', name: 'Nickel', mass: 58.693, category: 'transition-metal', group: 10, period: 4, state: 'solid',
    electronConfig: '[Ar] 3d⁸ 4s²', summary: 'Corrosion-resistant ferromagnetic metal used in stainless steel and modern EV battery cathodes.',
    uses: ['Stainless steel formulation', 'EV battery chemistry (NMC)', 'Electroplating coatings'],
    safety: 'Common contact skin allergen; nickel carbonyl gas is highly toxic.', isSynthetic: false, year: 1751
  },
  {
    number: 29, symbol: 'Cu', name: 'Copper', mass: 63.546, category: 'transition-metal', group: 11, period: 4, state: 'solid',
    electronConfig: '[Ar] 3d¹⁰ 4s¹', summary: 'Exceptional electrical and thermal conductor with antimicrobial oligodynamic properties.',
    uses: ['Electrical wiring & grid infrastructure', 'Plumbing pipes', 'Integrated circuit interconnects'],
    safety: 'Essential micronutrient; excessive soluble copper salts are toxic to aquatic life.', isSynthetic: false, year: 'Ancient'
  },
  {
    number: 30, symbol: 'Zn', name: 'Zinc', mass: 65.38, category: 'transition-metal', group: 12, period: 4, state: 'solid',
    electronConfig: '[Ar] 3d¹⁰ 4s²', summary: 'Bluish-white metal vital for galvanizing steel against corrosion and enzymatic biochemistry.',
    uses: ['Hot-dip galvanizing for steel protection', 'Brass alloys (Cu-Zn)', 'Zinc-carbon batteries'],
    safety: 'Essential nutrient; metal fume fever from inhaling hot zinc oxide fumes.', isSynthetic: false, year: 1746
  },
  {
    number: 36, symbol: 'Kr', name: 'Krypton', mass: 83.798, category: 'noble-gas', group: 18, period: 4, state: 'gas',
    electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁶', summary: 'Noble gas formerly used to define the international standard meter based on its orange spectral line.',
    uses: ['High-performance insulated glazing', 'Airport runway flashing lamps', 'Ion thruster propellant'],
    safety: 'Chemically inert noble gas; simple asphyxiant in high concentration.', isSynthetic: false, year: 1898
  },
  {
    number: 47, symbol: 'Ag', name: 'Silver', mass: 107.87, category: 'transition-metal', group: 11, period: 5, state: 'solid',
    electronConfig: '[Kr] 4d¹⁰ 5s¹', summary: 'Highest electrical conductivity, thermal conductivity, and optical reflectivity of all metals.',
    uses: ['Photovoltaic conductive silver paste', 'Electronics contacts', 'Jewelry and mirrors'],
    safety: 'Non-toxic in metallic form; excessive silver ingestion causes argyria.', isSynthetic: false, year: 'Ancient'
  },
  {
    number: 54, symbol: 'Xe', name: 'Xenon', mass: 131.29, category: 'noble-gas', group: 18, period: 5, state: 'gas',
    electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁶', summary: 'Heavy noble gas used in deep-space satellite ion thrusters due to its high atomic mass.',
    uses: ['Hall-effect satellite ion thrusters', 'IMAX projection lamps', 'General anesthesia'],
    safety: 'Chemically unreactive under standard conditions; powerful non-toxic anesthetic.', isSynthetic: false, year: 1898
  },
  {
    number: 79, symbol: 'Au', name: 'Gold', mass: 196.97, category: 'transition-metal', group: 11, period: 6, state: 'solid',
    electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', summary: 'Noble metal that does not tarnish or oxidize; synthesized in neutron star mergers.',
    uses: ['Corrosion-free semiconductor bonding wire', 'Infrared spacecraft shielding', 'Bullion and jewelry'],
    safety: 'Biologically inert and non-toxic in pure metallic state.', isSynthetic: false, year: 'Ancient'
  },
  {
    number: 80, symbol: 'Hg', name: 'Mercury', mass: 200.59, category: 'transition-metal', group: 12, period: 6, state: 'liquid',
    electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', summary: 'The only metallic element liquid at standard room temperature and pressure.',
    uses: ['Historical thermometers & barometers', 'Fluorescent lighting', 'Dental amalgam'],
    safety: 'Severe neurotoxin; bioaccumulates as methylmercury in food webs.', isSynthetic: false, year: 'Ancient'
  },
  {
    number: 92, symbol: 'U', name: 'Uranium', mass: 238.03, category: 'actinide', group: 3, period: 7, state: 'solid',
    electronConfig: '[Rn] 5f³ 6d¹ 7s²', summary: 'Naturally radioactive actinide; primary fuel for commercial nuclear fission power plants.',
    uses: ['Nuclear power generation (U-235)', 'Radioisotope thermoelectric generators', 'Armor-piercing tank penetrators (DU)'],
    safety: 'Radioactive alpha emitter and toxic heavy metal kidney hazard.', isSynthetic: false, year: 1789
  },
  {
    number: 94, symbol: 'Pu', name: 'Plutonium', mass: 244, category: 'actinide', group: 3, period: 7, state: 'solid',
    electronConfig: '[Rn] 5f⁶ 7s²', summary: 'Transuranic actinide capable of sustaining a prompt nuclear fission chain reaction.',
    uses: ['Deep space probe RTGs (Pu-238 on Voyager & Curiosity)', 'Nuclear deterrent devices'],
    safety: 'Severe radiological and chemical toxic hazard; pyrophoric in air.', isSynthetic: true, year: 1940
  },
  {
    number: 118, symbol: 'Og', name: 'Oganesson', mass: 294, category: 'noble-gas', group: 18, period: 7, state: 'gas',
    electronConfig: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', summary: 'Superheavy synthetic element with highest atomic number on the periodic table.',
    uses: ['Fundamental nuclear physics research into relativistic quantum effects'],
    safety: 'Extremely radioactive with millisecond half-life; synthetic only.', isSynthetic: true, year: 2002
  }
];

// Helper to get element by number or symbol
export function getElement(query: number | string): ElementData | undefined {
  if (typeof query === 'number') {
    return ELEMENTS_DATA.find(e => e.number === query);
  }
  const q = query.trim().toLowerCase();
  return ELEMENTS_DATA.find(e => e.symbol.toLowerCase() === q || e.name.toLowerCase() === q);
}
