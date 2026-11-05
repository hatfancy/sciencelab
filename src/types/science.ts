export interface ElementData {
  number: number;
  symbol: string;
  name: string;
  mass: number;
  category: 
    | 'alkali-metal'
    | 'alkaline-earth'
    | 'transition-metal'
    | 'post-transition'
    | 'metalloid'
    | 'nonmetal'
    | 'halogen'
    | 'noble-gas'
    | 'lanthanide'
    | 'actinide';
  group: number;
  period: number;
  state: 'gas' | 'liquid' | 'solid';
  electronConfig: string;
  density?: number; // g/cm³
  meltingPoint?: number; // K
  boilingPoint?: number; // K
  summary: string;
  uses: string[];
  safety: string;
  isSynthetic: boolean;
  discoveredBy?: string;
  year?: number | string;
}

export interface ChemicalSubstance {
  id: string;
  name: string;
  formula: string;
  commonName: string;
  state: 'solid' | 'liquid' | 'gas' | 'aqueous';
  color: string;
  category: 'acid' | 'base' | 'salt' | 'oxide' | 'metal' | 'solvent' | 'organic';
  ph?: number;
  density?: number;
  hazard?: string;
  isIncompatibleWith?: string[];
  description: string;
}

export interface ChemicalReactionResult {
  reactants: string[]; // Substance IDs
  isReaction: boolean; // true = chemical reaction, false = physical mixture / dissolution
  name: string;
  equation: string;
  products: string[];
  type: 'neutralization' | 'precipitation' | 'gas_evolution' | 'redox' | 'combustion' | 'dissolution' | 'mixture' | 'decomposition';
  energyChange: 'exothermic' | 'endothermic' | 'neutral';
  deltaHText: string;
  colorChange: { from: string; to: string };
  gasProduced?: string;
  precipitateFormed?: string;
  temperatureDelta: number; // in Celsius
  phResult?: number;
  particleLevelExplanation: string;
  scientificExplanation: string;
  safetyHazardWarning?: string;
}

export interface PlanetData {
  id: string;
  name: string;
  type: 'star' | 'terrestrial' | 'gas-giant' | 'ice-giant' | 'dwarf' | 'moon';
  radiusKm: number;
  massKg: string;
  gravityMps2: number; // surface gravity in m/s²
  distanceFromSunKm: number;
  distanceFromSunAU: number;
  orbitalPeriodDays: number;
  rotationPeriodHours: number;
  averageTempC: number;
  atmosphere: string[];
  moonsCount: number;
  color: string;
  surfaceFeatures: string;
  explorationHistory: string;
  orbitalSpeedKmS: number;
}

export interface ScienceTopic {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  beginnerExplanation: string;
  deepExplanation: string;
  keyEquations: { formula: string; explanation: string }[];
  applications: string[];
  commonMisconceptions: string[];
  knowledgeCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  iconName: string;
  relatedTopics: string[];
}

export interface FormulaItem {
  id: string;
  name: string;
  equation: string;
  field: 'Physics' | 'Chemistry' | 'Aerospace' | 'Fluid Dynamics' | 'Electromagnetism' | 'Astronomy';
  variables: { symbol: string; meaning: string; siUnit: string }[];
  description: string;
  realWorldExample: string;
}

export interface GlossaryItem {
  term: string;
  discipline: 'Physics' | 'Chemistry' | 'Astronomy' | 'Biology' | 'Earth Science' | 'Engineering';
  definition: string;
  example: string;
  relatedFormula?: string;
}

export interface ChallengeItem {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
  points: number;
}

export interface LabNote {
  id: string;
  title: string;
  date: string;
  experimentType: string;
  question: string;
  hypothesis: string;
  independentVar: string;
  dependentVar: string;
  controlledVars: string;
  observations: string;
  conclusion: string;
  dataPoints?: { variable: string | number; result: string | number }[];
}
