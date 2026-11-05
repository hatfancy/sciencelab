import { ChemicalSubstance, ChemicalReactionResult } from '../types/science';

export const SUBSTANCES_CATALOGUE: ChemicalSubstance[] = [
  {
    id: 'vinegar',
    name: 'Acetic Acid (Dilute)',
    formula: 'CH₃COOH (aq)',
    commonName: 'Household Vinegar (5%)',
    state: 'liquid',
    color: '#F8FAFC',
    category: 'acid',
    ph: 2.4,
    description: 'Weak organic carboxylic acid commonly used in food preservation and household chemistry.'
  },
  {
    id: 'baking_soda',
    name: 'Sodium Bicarbonate',
    formula: 'NaHCO₃ (s)',
    commonName: 'Baking Soda',
    state: 'solid',
    color: '#FFFFFF',
    category: 'salt',
    ph: 8.3,
    description: 'Mildly alkaline white crystalline mineral salt that acts as a leavening agent.'
  },
  {
    id: 'water',
    name: 'Dihydrogen Monoxide',
    formula: 'H₂O (l)',
    commonName: 'Pure Water',
    state: 'liquid',
    color: '#E0F2FE',
    category: 'solvent',
    ph: 7.0,
    density: 1.0,
    description: 'The universal polar solvent essential to all biological organisms and chemical equilibria.'
  },
  {
    id: 'ice',
    name: 'Solid Water (Ice)',
    formula: 'H₂O (s)',
    commonName: 'Ice',
    state: 'solid',
    color: '#BAE6FD',
    category: 'solvent',
    ph: 7.0,
    density: 0.917,
    description: 'Crystalline solid water with open hexagonal hydrogen-bonded lattice that floats on liquid water.'
  },
  {
    id: 'table_salt',
    name: 'Sodium Chloride',
    formula: 'NaCl (s)',
    commonName: 'Table Salt',
    state: 'solid',
    color: '#F1F5F9',
    category: 'salt',
    ph: 7.0,
    description: 'Ionic lattice compound held together by strong electrostatic attractions between Na⁺ and Cl⁻ ions.'
  },
  {
    id: 'sugar',
    name: 'Sucrose',
    formula: 'C₁₂H₂₂O₁₁ (s)',
    commonName: 'Granulated Cane Sugar',
    state: 'solid',
    color: '#FFFFFF',
    category: 'organic',
    ph: 7.0,
    description: 'Disaccharide molecular crystal composed of glucose and fructose monomer subunits.'
  },
  {
    id: 'hydrochloric_acid',
    name: 'Hydrochloric Acid (0.1M)',
    formula: 'HCl (aq)',
    commonName: 'Dilute Muriatic Acid',
    state: 'liquid',
    color: '#EFF6FF',
    category: 'acid',
    ph: 1.0,
    hazard: 'Corrosive irritant; handled strictly under fume hoods in real laboratories.',
    description: 'Strong monoprotic mineral acid that completely dissociates into hydronium (H₃O⁺) and chloride ions.'
  },
  {
    id: 'sodium_hydroxide',
    name: 'Sodium Hydroxide (0.1M)',
    formula: 'NaOH (aq)',
    commonName: 'Dilute Caustic Soda / Lye',
    state: 'liquid',
    color: '#F8FAFC',
    category: 'base',
    ph: 13.0,
    hazard: 'Strongly caustic; causes rapid chemical saponification of skin oils.',
    description: 'Strong Arrhenius base that fully dissociates into sodium (Na⁺) and hydroxide (OH⁻) ions.'
  },
  {
    id: 'copper_sulfate',
    name: 'Copper(II) Sulfate Pentahydrate',
    formula: 'CuSO₄·5H₂O (aq)',
    commonName: 'Bluestone Solution',
    state: 'aqueous',
    color: '#0284C7',
    category: 'salt',
    ph: 4.5,
    description: 'Bright electric-blue transition metal coordination salt solution containing hydrated Cu²⁺ complexes.'
  },
  {
    id: 'iron_filings',
    name: 'Iron Metal',
    formula: 'Fe (s)',
    commonName: 'Iron Filings / Clean Nail',
    state: 'solid',
    color: '#64748B',
    category: 'metal',
    description: 'Elemental ferromagnetic transition metal with higher oxidation reactivity than copper.'
  },
  {
    id: 'calcium_carbonate',
    name: 'Calcium Carbonate',
    formula: 'CaCO₃ (s)',
    commonName: 'Crushed Limestone / Chalk',
    state: 'solid',
    color: '#F8FAFC',
    category: 'salt',
    ph: 9.0,
    description: 'Insoluble mineral component of limestone, marble, and marine mollusk shells.'
  },
  {
    id: 'hydrogen_peroxide',
    name: 'Hydrogen Peroxide (3%)',
    formula: 'H₂O₂ (aq)',
    commonName: 'Household Peroxide',
    state: 'liquid',
    color: '#F0FDFA',
    category: 'oxide',
    ph: 5.5,
    description: 'Thermodynamically unstable oxidizer that decomposes into water and oxygen gas.'
  },
  {
    id: 'yeast_catalase',
    name: 'Active Dry Yeast (Catalase)',
    formula: 'Enzymatic Bio-catalyst',
    commonName: 'Baker’s Yeast suspension',
    state: 'solid',
    color: '#D4D4D8',
    category: 'organic',
    description: 'Natural biological source of the high-turnover enzyme catalase, which accelerates H₂O₂ decomposition.'
  }
];

export const VERIFIED_REACTIONS: ChemicalReactionResult[] = [
  // 1. Vinegar + Baking Soda
  {
    reactants: ['vinegar', 'baking_soda'],
    isReaction: true,
    name: 'Acid-Base Gas Evolution: Acetic Acid & Sodium Bicarbonate',
    equation: 'CH₃COOH (aq) + NaHCO₃ (s) → CH₃COONa (aq) + H₂O (l) + CO₂ (g) ↑',
    products: ['Sodium Acetate solution', 'Water', 'Carbon Dioxide gas (CO₂)'],
    type: 'gas_evolution',
    energyChange: 'endothermic',
    deltaHText: '+ΔH (Endothermic: absorbs thermal energy from surrounding solution)',
    colorChange: { from: '#FFFFFF / Clear', to: 'White vigorous effervescence, then clear' },
    gasProduced: 'Carbon Dioxide (CO₂) bubbles vigorously',
    temperatureDelta: -2.8,
    phResult: 5.8,
    particleLevelExplanation: 'Protons (H⁺) from acetic acid molecules are transferred to bicarbonate ions (HCO₃⁻). This forms transient carbonic acid (H₂CO₃), which instantly decomposes into liquid H₂O and gaseous CO₂ molecules that break free from the liquid as bubbles.',
    scientificExplanation: 'A two-step chemical process: first, an acid-base proton neutralization yielding sodium acetate and unstable carbonic acid; second, spontaneous decomposition of carbonic acid into water and carbon dioxide gas. The reaction absorbs thermal kinetic energy from the solvent, causing a noticeable drop in beaker temperature.',
    safetyHazardWarning: 'Safe educational reaction. Produces non-toxic carbon dioxide gas. In closed containers, gas pressure builds up rapidly.'
  },

  // 2. Dissolving Salt in Water (Physical Solution)
  {
    reactants: ['table_salt', 'water'],
    isReaction: false,
    name: 'Physical Dissolution: Hydration of Sodium Chloride',
    equation: 'NaCl (s) + H₂O (l) → Na⁺ (aq) + Cl⁻ (aq)',
    products: ['Aqueous Sodium ions (Na⁺)', 'Aqueous Chloride ions (Cl⁻)'],
    type: 'dissolution',
    energyChange: 'endothermic',
    deltaHText: '+3.88 kJ/mol (Slightly endothermic lattice dissociation)',
    colorChange: { from: 'White crystals + Clear water', to: 'Completely clear homogenous saline solution' },
    temperatureDelta: -0.4,
    phResult: 7.0,
    particleLevelExplanation: 'Polar water molecules surround the crystalline NaCl lattice. The partial negative charge on oxygen atoms stabilizes the Na⁺ cations, while partial positive hydrogen atoms stabilize Cl⁻ anions, pulling the ionic lattice apart into hydrated ions.',
    scientificExplanation: 'This is a physical dissolution, not a chemical reaction. No new covalent chemical bonds are synthesized or broken; the ionic crystal lattice separates into solvated ions. If the water is evaporated, pure NaCl crystals reform unaltered.',
    safetyHazardWarning: 'Completely safe. Forms standard non-hazardous saltwater solution.'
  },

  // 3. Dissolving Sugar in Water (Physical Solution)
  {
    reactants: ['sugar', 'water'],
    isReaction: false,
    name: 'Physical Dissolution: Molecular Hydration of Sucrose',
    equation: 'C₁₂H₂₂O₁₁ (s) + H₂O (l) → C₁₂H₂₂O₁₁ (aq)',
    products: ['Aqueous Solvated Sucrose molecules'],
    type: 'dissolution',
    energyChange: 'endothermic',
    deltaHText: '+5.7 kJ/mol (Mild endothermic breaking of intermolecular forces)',
    colorChange: { from: 'White granules + Clear water', to: 'Clear, slightly viscous syrup' },
    temperatureDelta: -0.2,
    phResult: 7.0,
    particleLevelExplanation: 'Water molecules form extensive hydrogen bonds with the eight hydroxyl (-OH) groups of each sucrose molecule, dispersing intact neutral sugar molecules uniformly through the solvent without ionizing them.',
    scientificExplanation: 'A physical molecular dissolution. Unlike salt, sugar does not dissociate into charged ions, so the resulting solution does not conduct electrical current (non-electrolyte). The chemical identity of sucrose remains unchanged.',
    safetyHazardWarning: 'Completely safe culinary ingredient dissolution.'
  },

  // 4. Ice Melting in Water (Phase Change)
  {
    reactants: ['ice', 'water'],
    isReaction: false,
    name: 'Thermodynamic Phase Equilibrium: Ice Melting',
    equation: 'H₂O (s) + Heat → H₂O (l)',
    products: ['Liquid Water at thermal equilibrium'],
    type: 'mixture',
    energyChange: 'endothermic',
    deltaHText: '+6.01 kJ/mol (Enthalpy of fusion: Latent heat of melting)',
    colorChange: { from: 'Floating ice crystal', to: 'Liquid water' },
    temperatureDelta: -4.5,
    phResult: 7.0,
    particleLevelExplanation: 'Thermal energy transfers from warmer liquid water to the rigid hexagonal crystalline ice lattice, causing water molecules to vibrate with sufficient kinetic energy to break out of their fixed crystal positions into a denser, fluid arrangement.',
    scientificExplanation: 'A classical physical phase change governed by the latent heat of fusion (334 J/g). Ice is approximately 9% less dense than liquid water due to hydrogen bonds holding molecules apart in open hexagonal rings, which is why ice floats.',
    safetyHazardWarning: 'Completely safe non-reactive phase equilibrium.'
  },

  // 5. Strong Acid-Base Neutralization: HCl + NaOH
  {
    reactants: ['hydrochloric_acid', 'sodium_hydroxide'],
    isReaction: true,
    name: 'Strong Acid-Base Neutralization',
    equation: 'HCl (aq) + NaOH (aq) → NaCl (aq) + H₂O (l)',
    products: ['Sodium Chloride (NaCl aq)', 'Water (H₂O l)'],
    type: 'neutralization',
    energyChange: 'exothermic',
    deltaHText: '-57.3 kJ/mol (Exothermic: high heat release per mole of water formed)',
    colorChange: { from: 'Clear acidic + Clear alkaline', to: 'Clear neutral solution (hot)' },
    temperatureDelta: +6.5,
    phResult: 7.0,
    particleLevelExplanation: 'Hydronium ions (H₃O⁺ / H⁺) encounter hydroxide ions (OH⁻) with zero activation barrier, combining violently to form stable neutral water molecules: H⁺ + OH⁻ → H₂O. Spectator ions Na⁺ and Cl⁻ remain dissolved in solution.',
    scientificExplanation: 'The quintessential Arrhenius acid-base neutralization. Strong bonds form in liquid water, liberating 57.3 kJ of thermal energy per mole of H₂O formed. The pH transitions from the extremes of 1 and 13 to neutral pH 7.',
    safetyHazardWarning: 'In real labs, concentrated versions of these reagents boil violently on contact and cause extreme chemical burns. Eye protection and dilution protocols are required.'
  },

  // 6. Single Displacement: Iron in Copper Sulfate
  {
    reactants: ['copper_sulfate', 'iron_filings'],
    isReaction: true,
    name: 'Redox Single Displacement: Iron and Copper(II) Sulfate',
    equation: 'Fe (s) + CuSO₄ (aq) → FeSO₄ (aq) + Cu (s) ↓',
    products: ['Iron(II) Sulfate solution (pale green)', 'Metallic Copper coating (reddish-brown)'],
    type: 'redox',
    energyChange: 'exothermic',
    deltaHText: '-152 kJ/mol (Exothermic redox displacement)',
    colorChange: { from: 'Vibrant blue solution + grey metal', to: 'Pale greenish solution + reddish-copper deposit' },
    precipitateFormed: 'Reddish-brown elemental metallic copper (Cu) plating the iron',
    temperatureDelta: +3.2,
    phResult: 4.8,
    particleLevelExplanation: 'Iron atoms have a lower ionization energy and higher oxidation potential than copper. Metallic iron atoms donate two electrons each: Fe → Fe²⁺ + 2e⁻. Dissolved blue Cu²⁺ ions accept these electrons: Cu²⁺ + 2e⁻ → Cu, depositing as elemental copper atoms on the surface.',
    scientificExplanation: 'A classic electrochemical activity series demonstration. Iron is more reactive than copper, successfully displacing copper ions from solution. The loss of Cu²⁺ ions causes the deep blue color to fade, replaced by pale green Fe²⁺ ions.',
    safetyHazardWarning: 'Copper sulfate is an environmental hazard to aquatic ecosystems. Avoid skin contact and dispose of in heavy metal waste in real labs.'
  },

  // 7. Catalytic Decomposition: Hydrogen Peroxide + Yeast Catalase
  {
    reactants: ['hydrogen_peroxide', 'yeast_catalase'],
    isReaction: true,
    name: 'Enzyme-Catalyzed Decomposition of Hydrogen Peroxide',
    equation: '2 H₂O₂ (aq) —[Catalase Enzyme]→ 2 H₂O (l) + O₂ (g) ↑',
    products: ['Water (H₂O)', 'Oxygen gas (O₂)', 'Intact Catalase Enzyme'],
    type: 'decomposition',
    energyChange: 'exothermic',
    deltaHText: '-98.2 kJ/mol (Exothermic decomposition)',
    colorChange: { from: 'Clear liquid + tan yeast', to: 'Dense white foam / froth eruption' },
    gasProduced: 'Pure Oxygen (O₂) gas bubbles',
    temperatureDelta: +5.0,
    phResult: 6.8,
    particleLevelExplanation: 'The active heme site of the catalase enzyme binds H₂O₂ molecules and drastically reduces the activation energy for oxygen-oxygen single bond cleavage. Millions of H₂O₂ molecules per second are converted into water and gaseous oxygen without consuming the enzyme.',
    scientificExplanation: 'Catalytic decomposition. Catalysts accelerate the rate of reaction by providing an alternative reaction pathway with a lower activation energy, without being consumed or altering the final thermodynamic equilibrium. The rapid formation of O₂ creates foam.',
    safetyHazardWarning: 'Safe educational demonstration with household 3% peroxide. High-test (30%+) peroxide is a severe oxidizer hazard.'
  },

  // 8. Acid + Carbonate: Vinegar + Calcium Carbonate
  {
    reactants: ['vinegar', 'calcium_carbonate'],
    isReaction: true,
    name: 'Acid Dissolution of Limestone (Weathering Simulation)',
    equation: '2 CH₃COOH (aq) + CaCO₃ (s) → Ca(CH₃COO)₂ (aq) + H₂O (l) + CO₂ (g) ↑',
    products: ['Calcium Acetate solution', 'Water', 'Carbon Dioxide gas (CO₂)'],
    type: 'gas_evolution',
    energyChange: 'endothermic',
    deltaHText: 'Mildly endothermic gas evolution',
    colorChange: { from: 'Clear vinegar + white chalk', to: 'Effervescent dissolution of chalk' },
    gasProduced: 'Carbon Dioxide (CO₂) bubbles',
    temperatureDelta: -0.9,
    phResult: 5.5,
    particleLevelExplanation: 'Acetic acid molecules attack the solid calcium carbonate lattice. Carbonate ions (CO₃²⁻) accept protons from the acid, decomposing into water and escaping carbon dioxide gas, releasing calcium ions (Ca²⁺) into solution.',
    scientificExplanation: 'The primary chemical mechanism behind acid rain damage to historical marble monuments and ocean acidification thinning mollusk shells. Weak acid slowly converts insoluble mineral carbonate into soluble calcium salts while releasing CO₂.',
    safetyHazardWarning: 'Safe educational reaction simulating environmental geochemical weathering.'
  }
];

// Evaluator for selected substances in virtual workbench
export function evaluateMixture(selectedSubstanceIds: string[]): ChemicalReactionResult {
  const ids = [...selectedSubstanceIds].sort();

  // Look for direct match in verified reactions
  for (const reaction of VERIFIED_REACTIONS) {
    const rxnIds = [...reaction.reactants].sort();
    if (rxnIds.length === ids.length && rxnIds.every((id, idx) => id === ids[idx])) {
      return reaction;
    }
  }

  // If only 1 substance selected
  if (ids.length === 1) {
    const sub = SUBSTANCES_CATALOGUE.find(s => s.id === ids[0]);
    return {
      reactants: ids,
      isReaction: false,
      name: `Pure Sample: ${sub?.name || 'Substance'}`,
      equation: `${sub?.formula || ''} (in isolated chamber)`,
      products: [sub?.name || 'Unchanged substance'],
      type: 'mixture',
      energyChange: 'neutral',
      deltaHText: '0 kJ/mol (No thermodynamic state change)',
      colorChange: { from: sub?.color || '#fff', to: sub?.color || '#fff' },
      temperatureDelta: 0,
      phResult: sub?.ph,
      particleLevelExplanation: `Molecules or ions of ${sub?.name} remain in their standard thermal vibration state within the isolated virtual container.`,
      scientificExplanation: 'A single isolated chemical substance requires an external reactant, heat, light, or electrical potential to undergo a chemical decomposition or transformation.',
    };
  }

  // Default: Unknown or un-modelled combination
  const names = ids.map(id => SUBSTANCES_CATALOGUE.find(s => s.id === id)?.name || id).join(' and ');
  return {
    reactants: ids,
    isReaction: false,
    name: `Physical Mixture / Un-modelled Combination: ${names}`,
    equation: 'No verified chemical reaction documented under standard bench conditions',
    products: ['Heterogeneous or unreacted mixture'],
    type: 'mixture',
    energyChange: 'neutral',
    deltaHText: 'No verified enthalpy change (Model limit)',
    colorChange: { from: 'Original substances', to: 'Combined mixture' },
    temperatureDelta: 0,
    particleLevelExplanation: 'The particles of these substances mingle mechanically, but their electronic configurations do not possess a spontaneous kinetic or thermodynamic reaction pathway under standard room conditions without specific catalysts or elevated temperatures.',
    scientificExplanation: 'In accordance with scientific integrity guidelines: SciVerse does not invent imaginary chemical products or balanced equations when a combination lacks verified reference data. Some combinations simply coexist as physical mixtures without reacting.',
    safetyHazardWarning: 'Educational simulation notice: Unmodelled mixtures in a real laboratory can present unforeseen hazards. Never combine unknown chemicals without qualified supervision and certified SDS reviews.'
  };
}
