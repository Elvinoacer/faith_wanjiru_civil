/* ══════════════════════════════════════════════════════════════════
   FAITH WANJIRU — Civil & Structural Engineering Portfolio
   Core data layer · typed per spec §61
   Verification policy per spec §2: placeholders are flagged, never
   presented as verified fact.
   ══════════════════════════════════════════════════════════════════ */

export type Proficiency =
  | "strong"
  | "working-knowledge"
  | "academic-exposure"
  | "currently-learning";

export const PROFICIENCY_LABEL: Record<Proficiency, string> = {
  strong: "Strong",
  "working-knowledge": "Working Knowledge",
  "academic-exposure": "Academic Exposure",
  "currently-learning": "Currently Learning",
};

export interface Link {
  platform: string;
  label: string;
  url: string;
}

export interface Skill {
  name: string;
  proficiency: Proficiency;
  note?: string;
}

export interface SkillGroup {
  title: string;
  description?: string;
  skills: Skill[];
}

export interface EducationModuleGroup {
  category: string;
  items: string[];
}

export interface Education {
  institution: string;
  degree: string;
  school?: string;
  location?: string;
  startYear?: number;
  graduationYear?: number;
  classification?: string;
  modules: EducationModuleGroup[];
}

/* ── Profile ────────────────────────────────────────────────────── */
export const profile = {
  fullName: "Faith Wanjiru",
  professionalTitle: "Graduate Civil & Structural Engineer",
  headline:
    "Civil & Structural Engineering Graduate focused on Structural Design, Construction and Sustainable Infrastructure",
  eyebrow: "Moi University · B.Eng. Civil & Structural Engineering",
  summary:
    "I am interested in how safe, efficient and durable infrastructure moves from calculations and drawings into real built environments. My engineering background spans structural analysis, reinforced concrete, steel design, geotechnics, construction, surveying, transportation and engineering materials.",
  availability:
    "Open to graduate engineering, site, structural design, infrastructure and trainee opportunities.",
  location: "Kenya",
  university: "Moi University",
  degree: "B.Eng. Civil & Structural Engineering",
  graduationYear: "2026",
  /* Sample contact details — replace before publishing (spec §69) */
  email: "faith.wanjiru@example.com",
  phone: "+254 7•• ••• •••",
  cvUrl: "/cv/faith-wanjiru-cv.pdf",
  portrait: "/images/portrait.png",
  aboutPortrait: "/images/about-faith.png",
  coordinates: "0°31′00″N 35°18′00″E · EL. 2100m", /* Eldoret survey reference */
  links: [
    { platform: "Email", label: "faith.wanjiru@example.com", url: "mailto:faith.wanjiru@example.com" },
    { platform: "LinkedIn", label: "/in/faith-wanjiru", url: "https://www.linkedin.com/" },
  ] as Link[],
};

/* ── About (spec §14) ───────────────────────────────────────────── */
export const about = {
  paragraphs: [
    "I am a Civil & Structural Engineering graduate from Moi University with a strong interest in structural systems, construction and the delivery of safe, durable infrastructure.",
    "My degree has exposed me to structural analysis, reinforced concrete and steel design, soil mechanics, foundations, transportation engineering, surveying, engineering materials, hydrology, construction technology and project planning.",
    "I am particularly interested in the connection between design intent and site execution: how calculations, drawings, material behaviour, workmanship, cost, safety and constructability come together in a successful project.",
    "I approach engineering by understanding the loading, constraints and ground conditions first, then developing a solution that can be calculated, detailed, built, inspected and maintained responsibly.",
    "I am looking for graduate opportunities where I can learn from experienced engineers, strengthen my design and site skills, and contribute to real infrastructure projects.",
  ],
  imageCaption:
    "Between lectures — working through structural drawings at the design studio.",
};

/* ── Snapshot (spec §13) ────────────────────────────────────────── */
export const snapshot = [
  { label: "Degree", value: "B.Eng. Civil & Structural", note: "Moi University" },
  { label: "Graduation", value: "2026", note: "Class of [placeholder]" },
  { label: "Focus", value: "Structures · Construction", note: "Infrastructure" },
  { label: "Design Projects", value: "4+", note: "Academic + field" },
  { label: "Industrial Attachment", value: "12 wks", note: "Site / consultancy" },
  { label: "Primary Software", value: "AutoCAD · ETABS", note: "Civil 3D · Excel" },
  { label: "Location", value: "Kenya", note: "Open to relocate" },
  { label: "Availability", value: "Graduate roles", note: "Immediate" },
];

/* ── Focus areas (spec §15) ─────────────────────────────────────── */
export const focusAreas = [
  {
    id: "structural",
    title: "Structural Engineering",
    positioning: "Understanding how structures carry loads safely and how analysis becomes buildable detailing.",
    topics: [
      "Structural Analysis",
      "Reinforced Concrete",
      "Steel Structures",
      "Load Paths",
      "Beams · Columns · Slabs",
      "Foundations",
      "Structural Detailing",
      "Serviceability",
    ],
  },
  {
    id: "construction",
    title: "Construction Engineering",
    positioning: "Bridging design intent, materials and site execution.",
    topics: [
      "Site Operations",
      "Construction Methods",
      "Drawings",
      "Quantity Awareness",
      "Work Sequencing",
      "Quality Control",
      "Site Safety",
      "Inspection",
    ],
  },
  {
    id: "geotechnical",
    title: "Geotechnical Engineering",
    positioning: "Understanding how structures interact with the ground supporting them.",
    topics: [
      "Soil Classification",
      "Compaction",
      "Bearing Capacity",
      "Settlement",
      "Foundation Selection",
      "Site Investigation",
      "Soil Testing",
    ],
  },
  {
    id: "transportation",
    title: "Transportation & Infrastructure",
    positioning: "Applying civil engineering principles to safe and efficient transport infrastructure.",
    topics: [
      "Highway Geometry",
      "Pavement Fundamentals",
      "Traffic Studies",
      "Drainage",
      "Earthworks",
      "Road Materials",
    ],
  },
  {
    id: "surveying",
    title: "Surveying & Geomatics",
    positioning: "Translating design geometry between drawings and physical sites.",
    topics: [
      "Levelling",
      "Traversing",
      "Total Station",
      "Setting Out",
      "Coordinate Work",
      "Contours",
      "Topographic Surveys",
    ],
  },
];

/* ── Skills (spec §16 — no percentages, levels only) ────────────── */
export const skillGroups: SkillGroup[] = [
  {
    title: "Structural Analysis",
    description: "From free-body diagrams to indeterminate frames.",
    skills: [
      { name: "Free-body diagrams", proficiency: "strong" },
      { name: "Load paths", proficiency: "strong" },
      { name: "Shear force diagrams", proficiency: "strong" },
      { name: "Bending moment diagrams", proficiency: "strong" },
      { name: "Deflection concepts", proficiency: "working-knowledge" },
      { name: "Indeterminate structures", proficiency: "working-knowledge" },
      { name: "Matrix methods", proficiency: "academic-exposure" },
      { name: "Finite element concepts", proficiency: "academic-exposure" },
    ],
  },
  {
    title: "Reinforced Concrete",
    description: "Member design and detailing fundamentals.",
    skills: [
      { name: "Beam design", proficiency: "working-knowledge" },
      { name: "Slab design", proficiency: "working-knowledge" },
      { name: "Column design", proficiency: "working-knowledge" },
      { name: "Footing design", proficiency: "working-knowledge" },
      { name: "Reinforcement detailing", proficiency: "working-knowledge" },
      { name: "Serviceability checks", proficiency: "working-knowledge" },
      { name: "Concrete durability", proficiency: "working-knowledge" },
    ],
  },
  {
    title: "Steel Design",
    description: "Member behaviour and stability concepts.",
    skills: [
      { name: "Tension members", proficiency: "working-knowledge" },
      { name: "Compression members", proficiency: "working-knowledge" },
      { name: "Beam design", proficiency: "working-knowledge" },
      { name: "Buckling concepts", proficiency: "working-knowledge" },
      { name: "Connection fundamentals", proficiency: "academic-exposure" },
    ],
  },
  {
    title: "Geotechnical",
    description: "Soil behaviour applied to foundation decisions.",
    skills: [
      { name: "Soil classification", proficiency: "strong" },
      { name: "Atterberg limits", proficiency: "working-knowledge" },
      { name: "Compaction", proficiency: "working-knowledge" },
      { name: "Shear strength", proficiency: "working-knowledge" },
      { name: "Bearing capacity", proficiency: "working-knowledge" },
      { name: "Foundation selection", proficiency: "working-knowledge" },
      { name: "Settlement fundamentals", proficiency: "academic-exposure" },
    ],
  },
  {
    title: "Construction",
    description: "Site-aware engineering practice.",
    skills: [
      { name: "Drawing interpretation", proficiency: "strong" },
      { name: "Site measurements", proficiency: "working-knowledge" },
      { name: "Concrete works", proficiency: "working-knowledge" },
      { name: "Formwork concepts", proficiency: "working-knowledge" },
      { name: "Construction sequencing", proficiency: "working-knowledge" },
      { name: "Quality control", proficiency: "working-knowledge" },
      { name: "Site safety awareness", proficiency: "working-knowledge" },
      { name: "Reinforcement inspection", proficiency: "working-knowledge", note: "site exposure" },
    ],
  },
  {
    title: "Surveying",
    description: "Field measurement and setting out.",
    skills: [
      { name: "Levelling", proficiency: "strong" },
      { name: "Traversing", proficiency: "working-knowledge" },
      { name: "Topographic surveying", proficiency: "working-knowledge" },
      { name: "Total station", proficiency: "working-knowledge", note: "field exposure" },
      { name: "Setting out", proficiency: "working-knowledge", note: "field exposure" },
      { name: "GNSS / GPS concepts", proficiency: "academic-exposure" },
    ],
  },
];

/* ── Software (spec §17) ────────────────────────────────────────── */
export const softwareGroups: SkillGroup[] = [
  {
    title: "Structural Analysis",
    skills: [
      { name: "ETABS", proficiency: "working-knowledge" },
      { name: "SAP2000", proficiency: "working-knowledge" },
      { name: "STAAD.Pro", proficiency: "academic-exposure" },
    ],
  },
  {
    title: "Drafting & BIM",
    skills: [
      { name: "AutoCAD", proficiency: "strong" },
      { name: "Revit Structure", proficiency: "working-knowledge" },
      { name: "Civil 3D", proficiency: "working-knowledge" },
    ],
  },
  {
    title: "Analysis & Calculation",
    skills: [
      { name: "Microsoft Excel", proficiency: "strong" },
      { name: "MATLAB", proficiency: "academic-exposure" },
      { name: "Python", proficiency: "academic-exposure" },
    ],
  },
  {
    title: "Planning & Construction",
    skills: [
      { name: "Microsoft Project", proficiency: "working-knowledge" },
      { name: "Primavera P6", proficiency: "academic-exposure" },
    ],
  },
  {
    title: "Survey & GIS",
    skills: [
      { name: "QGIS", proficiency: "academic-exposure" },
      { name: "Civil 3D surfaces", proficiency: "working-knowledge" },
    ],
  },
];

/* ── Education (spec §18) ───────────────────────────────────────── */
export const education: Education = {
  institution: "Moi University",
  degree: "Bachelor of Engineering in Civil & Structural Engineering",
  school: "School of Engineering",
  location: "Eldoret, Kenya",
  startYear: 2021,
  graduationYear: 2026,
  classification: "[Placeholder — classification]",
  modules: [
    {
      category: "Structural Engineering",
      items: [
        "Structural Analysis",
        "Reinforced Concrete Design",
        "Steel Structures",
        "Structural Mechanics",
        "Theory of Structures",
        "Structural Detailing",
        "Foundation Engineering",
      ],
    },
    {
      category: "Geotechnical Engineering",
      items: [
        "Soil Mechanics",
        "Engineering Geology",
        "Geotechnical Engineering",
        "Foundation Design",
      ],
    },
    {
      category: "Transportation",
      items: [
        "Highway Engineering",
        "Transportation Engineering",
        "Traffic Engineering",
        "Pavement Materials",
      ],
    },
    {
      category: "Water & Environmental",
      items: [
        "Fluid Mechanics",
        "Hydraulics",
        "Hydrology",
        "Water Resources",
        "Drainage",
        "Environmental Engineering",
      ],
    },
    {
      category: "Construction",
      items: [
        "Construction Technology",
        "Construction Management",
        "Engineering Economics",
        "Project Planning",
        "Quantity / Cost Fundamentals",
      ],
    },
    {
      category: "Surveying",
      items: [
        "Engineering Surveying",
        "Levelling",
        "Traversing",
        "Topographic Surveys",
        "Setting Out",
      ],
    },
    {
      category: "Engineering Foundations",
      items: [
        "Engineering Mathematics",
        "Engineering Drawing",
        "Mechanics",
        "Strength of Materials",
        "Materials Science",
        "Numerical Methods",
        "Computer Applications",
        "Engineering Ethics",
      ],
    },
  ],
};

/* ── Codes & standards (spec §38 — academic exposure only) ──────── */
export const standards = [
  { code: "EN 1990", title: "Eurocode 0 — Basis of structural design" },
  { code: "EN 1991", title: "Eurocode 1 — Actions on structures" },
  { code: "EN 1992", title: "Eurocode 2 — Concrete structures" },
  { code: "EN 1993", title: "Eurocode 3 — Steel structures" },
  { code: "EN 1997", title: "Eurocode 7 — Geotechnical design" },
  { code: "BS 8110", title: "British Standard — Structural use of concrete (coursework)" },
  { code: "KRBDM", title: "Kenya Road Design Manuals (where applicable)" },
];

/* ── Timeline (spec §35 — all dates placeholders) ───────────────── */
export const timeline = [
  {
    year: "2021",
    title: "Foundations",
    body: "Engineering mathematics, mechanics, technical drawing and basic sciences.",
    tag: "YEAR 01",
  },
  {
    year: "2022",
    title: "Materials & Surveying",
    body: "Strength of materials, surveying, fluids and engineering materials.",
    tag: "YEAR 02",
  },
  {
    year: "2023",
    title: "Structural & Geotechnical Development",
    body: "Structural analysis, soil mechanics, concrete and transportation subjects.",
    tag: "YEAR 03",
  },
  {
    year: "2024",
    title: "Integrated Civil Engineering",
    body: "Design-focused coursework, infrastructure systems and field projects.",
    tag: "YEAR 04",
  },
  {
    year: "2025",
    title: "Industrial Attachment",
    body: "Practical site / consultancy exposure under professional supervision.",
    tag: "PRACTICE",
  },
  {
    year: "2026",
    title: "Final-Year Design & Graduation",
    body: "Completed major structural/civil project and transitioned toward professional practice.",
    tag: "FYP",
  },
];

/* ── Currently learning (spec §37) ──────────────────────────────── */
export const currentlyLearning = [
  { item: "Advanced ETABS modelling", status: "In progress" },
  { item: "Reinforced concrete detailing", status: "In progress" },
  { item: "Eurocode design", status: "In progress" },
  { item: "Revit Structure", status: "In progress" },
  { item: "Civil 3D corridors", status: "Early" },
  { item: "BIM coordination", status: "Early" },
  { item: "Structural steel connections", status: "Early" },
  { item: "Quantity take-off", status: "Early" },
  { item: "Embodied carbon in structures", status: "Exploring" },
  { item: "Python / Excel automation", status: "Exploring" },
];

/* ── Philosophy (spec §36) ──────────────────────────────────────── */
export const philosophy = {
  mantra: [
    "Understand the loads.",
    "Understand the ground.",
    "Respect the details.",
  ],
  expanded:
    "I see civil engineering as a discipline where assumptions eventually become physical reality. Good engineering therefore requires more than correct calculations: the loads, soil, materials, detailing, construction method, safety, maintenance and environment must all be considered together.",
};

/* ── Sustainability (spec §40) ──────────────────────────────────── */
export const sustainability = {
  interests: [
    "Material efficiency",
    "Low-carbon concrete",
    "Reuse",
    "Climate-resilient infrastructure",
    "Efficient structural systems",
    "Stormwater management",
    "Lifecycle thinking",
    "Local materials",
  ],
  copy: "I am interested in how structural efficiency, material selection and good detailing can reduce environmental impact without compromising safety, durability or constructability.",
};

/* ── Target roles (spec §5, §46) ────────────────────────────────── */
export const targetRoles = [
  "Graduate Civil Engineer",
  "Graduate Structural Engineer",
  "Site Engineer",
  "Assistant Structural Engineer",
  "Junior Design Engineer",
  "Graduate Project Engineer",
  "Graduate Construction Engineer",
  "Infrastructure Graduate Trainee",
];

/* ── Documentation skills (spec §39) ────────────────────────────── */
export const documentationSkills = [
  "General arrangement drawings",
  "Structural plans",
  "Sections",
  "Reinforcement details",
  "Bar schedules",
  "Site instructions (exposure)",
  "RFIs (exposure)",
  "Method statements (exposure)",
  "Inspection requests (exposure)",
  "Progress reports",
  "Material test records",
];
