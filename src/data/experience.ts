/* ══════════════════════════════════════════════════════════════════
   EXPERIENCE DATA — industrial attachment, site exposure,
   laboratory & fieldwork per spec §30–34, §51
   ══════════════════════════════════════════════════════════════════ */

export const attachment = {
  role: "Civil Engineering Intern (Industrial Attachment)",
  organization: "[Company / Contractor / Consultancy — placeholder]",
  period: "May 2025 – August 2025 [placeholder]",
  department: "Site / Structural / Construction Engineering [placeholder]",
  duration: "12 weeks [placeholder]",
  summary:
    "Industrial attachment showed me how much engineering depends on communication and execution. Drawings must be interpreted correctly, dimensions must be verified, reinforcement must be placed as detailed, materials must meet specifications and every stage must be inspected before the next activity proceeds. I also learned that safety, sequencing, workmanship and documentation can affect structural performance just as much as calculations.",
  responsibilities: [
    "Assisted engineers with site inspections",
    "Read architectural and structural drawings",
    "Observed reinforcement fixing before concrete placement",
    "Supported basic measurement and quantity checks",
    "Recorded daily site activities",
    "Assisted with preparation of progress notes",
    "Observed concrete batching, placing, vibration and curing",
    "Participated in levelling and setting-out activities",
    "Helped organize material test results",
    "Observed formwork inspection",
    "Assisted with checking dimensions against drawings",
    "Participated in toolbox and safety meetings",
    "Learned how RFIs and drawing clarifications are handled",
    "Observed coordination between consultant, contractor and client representatives",
  ],
  equipmentObserved: [
    "Concrete mixers",
    "Vibrators",
    "Total station",
    "Automatic level",
    "Rebar cutting / bending",
    "Scaffolding",
    "Formwork",
    "Excavation",
    "Compaction equipment",
    "Cube testing",
    "Slump testing",
  ],
  elementsObserved: [
    "Foundations",
    "Columns",
    "Beams",
    "Slabs",
    "Retaining walls",
    "Staircases",
    "Masonry",
    "Roofs",
  ],
  image: "/images/site-attachment.png",
  imageAlt: "Site engineer in safety helmet and vest reviewing structural drawings on site.",
};

/* ── Laboratory experience (spec §33) ───────────────────────────── */
export const laboratories = [
  {
    id: "concrete",
    title: "Concrete & Materials Laboratory",
    image: "/images/lab-concrete.png",
    imageAlt: "Concrete cube compression testing machine in a materials laboratory.",
    work: [
      "Slump test",
      "Cube casting",
      "Compressive strength",
      "Aggregate grading",
      "Specific gravity",
      "Water absorption",
      "Cement tests",
    ],
    insight:
      "Watching cubes fail taught me more about concrete than any lecture slide — the brittle report of a crushing specimen is a lesson in mix discipline.",
  },
  {
    id: "soil",
    title: "Soil Mechanics Laboratory",
    image: "/images/project-geotech.png",
    imageAlt: "Geotechnical laboratory bench with sieves and sample jars.",
    work: [
      "Moisture content",
      "Sieve analysis",
      "Hydrometer",
      "Atterberg limits",
      "Proctor compaction",
    ],
    insight:
      "Index tests are the grammar of geotechnics — small, careful measurements that let you predict how kilometres of ground will behave.",
  },
  {
    id: "structural",
    title: "Structural Laboratory",
    image: "/images/detail-rebar.png",
    imageAlt: "Close-up of a neatly tied reinforcement cage at a beam-column junction.",
    work: [
      "Beam loading",
      "Stress / strain observations",
      "Deflection measurements",
      "Material behaviour",
      "Failure mode observation",
    ],
    insight:
      "Deflection dials tell a story equations can only approximate: how a member actually carries load, and where it decides to fail.",
  },
  {
    id: "hydraulics",
    title: "Hydraulics Laboratory",
    image: "/images/project-drainage.png",
    imageAlt: "Concrete stormwater channel demonstrating open-channel flow.",
    work: [
      "Flow measurement",
      "Pipe losses",
      "Open-channel flow",
      "Weirs",
      "Pumps",
    ],
    insight:
      "Water is honest. It shows you exactly where your energy losses are — you just have to measure carefully enough to see them.",
  },
];

/* ── Fieldwork (spec §34) ───────────────────────────────────────── */
export const fieldwork = [
  {
    id: "survey-camp",
    title: "Survey Camp",
    image: "/images/project-survey.png",
    imageAlt: "Surveyor with total station at golden hour.",
    items: [
      "Levelling",
      "Traversing",
      "Topographic survey",
      "Contour production",
      "Setting out",
    ],
  },
  {
    id: "geotech-field",
    title: "Geotechnical Fieldwork",
    image: "/images/project-geotech.png",
    imageAlt: "Soil sampling in the field.",
    items: [
      "Site reconnaissance",
      "Soil sampling",
      "Ground condition observations",
    ],
  },
  {
    id: "transport-survey",
    title: "Transportation Survey",
    image: "/images/project-highway.png",
    imageAlt: "Highway corridor used for traffic studies.",
    items: [
      "Traffic volume counts",
      "Spot speed survey",
      "Parking survey",
      "Road condition survey",
    ],
  },
];

/* ── Teamwork evidence (spec §41) ───────────────────────────────── */
export const teamwork = [
  {
    context: "Structural Design Team",
    body: "Worked in a four-member structural design team responsible for analysis, member design, drawing coordination and final presentation. My contribution focused on structural modelling, reinforced concrete member checks and consolidation of selected design outputs.",
  },
  {
    context: "Surveying Field Crew",
    body: "During surveying fieldwork, coordinated observations and field-book entries with team members to reduce transcription errors and maintain consistent station references.",
  },
];
