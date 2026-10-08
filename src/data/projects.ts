/* ══════════════════════════════════════════════════════════════════
   PROJECTS DATA — 6 case studies per spec §28 + flagship FYP §19–27
   Case-study structure per spec §29. All quantitative values are
   worked academic examples marked as placeholders where noted.
   ══════════════════════════════════════════════════════════════════ */

export type ProjectCategory =
  | "structural"
  | "geotechnical"
  | "transportation"
  | "water"
  | "construction"
  | "surveying";

export interface Calculation {
  title: string;
  lines: string[];
  note?: string;
}

export interface Project {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  type: string;
  year: number;
  duration: string;
  role: string;
  teamSize: string;
  featured: boolean;
  cover: string;
  coverAlt: string;
  tagline: string;
  brief: string;
  problem: string;
  designCriteria: string[];
  constraints: string[];
  approach: { title: string; body: string }[];
  software: string[];
  standards: string[];
  calculations: Calculation[];
  results: string[];
  limitations: string[];
  lessons: string;
  improvements: string[];
  evidence: { label: string; detail: string }[];
}

export const projects: Project[] = [
  /* ════════════════════════ 01 · FLAGSHIP FYP ═════════════════════ */
  {
    slug: "rc-building-design",
    index: "01",
    title: "Structural Design & Performance Assessment of a Multi-Storey Reinforced Concrete Building",
    shortTitle: "Multi-Storey RC Building Design",
    category: "structural",
    categoryLabel: "Structural Engineering",
    type: "Final-Year Engineering Project",
    year: 2026,
    duration: "Two semesters [placeholder]",
    role: "Structural Analysis, Design & Detailing",
    teamSize: "Individual, supervised [placeholder]",
    featured: true,
    cover: "/images/project-rc.png",
    coverAlt:
      "Low-angle view of a multi-storey reinforced concrete frame under construction with repeated column and slab grid.",
    tagline:
      "From load take-down to reinforcement detailing — the complete design flow of a reinforced concrete moment frame.",
    brief:
      "This project develops and evaluates the structural scheme for a multi-storey reinforced concrete building, progressing from load determination and structural modelling through member design, foundation sizing, serviceability considerations and selected reinforcement detailing. It demonstrates understanding of the full design flow rather than simply knowing structural software.",
    problem:
      "A building structure must transfer dead, imposed, wind and other applicable loads safely from slabs through beams and columns into the foundation and supporting soil. The design must achieve strength, stability, serviceability, durability, reasonable constructability, economical material use and clear detailing — simultaneously.",
    designCriteria: [
      "Ultimate limit state — strength of slabs, beams, columns and foundations",
      "Serviceability — deflection and crack control fundamentals",
      "Durability — cover, exposure class and concrete quality awareness",
      "Stability — load paths and frame action under gravity and lateral loads",
      "Constructability — regular grids, standard member sizes, practical detailing",
      "Design references: applicable Eurocodes / British Standards as instructed academically",
    ],
    constraints: [
      "Building type: mixed-use block [placeholder]",
      "Storeys: 5–8 [placeholder]",
      "Structural system: reinforced concrete moment frame",
      "Foundation: isolated / combined / raft depending on assumed soil parameters",
      "Floor system: RC slab-and-beam framing",
      "No site-specific soil investigation — assumed bearing parameters used",
    ],
    approach: [
      {
        title: "Structural Grid & Preliminary Sizing",
        body: "Established a regular structural grid from the architectural layout, then sized preliminary members using span-to-depth rules of thumb before any analysis — so the model started from physically sensible proportions.",
      },
      {
        title: "Load Assessment",
        body: "Compiled dead loads (self-weight, finishes, partitions), imposed loads per occupancy, and considered wind actions on the frame. Each load was traced from origin to foundation to keep the load path explicit.",
      },
      {
        title: "Analysis Modelling",
        body: "Built the 3D analytical model in ETABS: columns, beams, slabs and supports, with load combinations applied per the design basis. Ran gravity and lateral cases and extracted member forces and storey displacements.",
      },
      {
        title: "Manual Verification",
        body: "Selected a typical beam and a typical column and re-derived their forces by hand — tributary loads, bending moments, shear — then compared against software output to confirm the model was behaving as intended.",
      },
      {
        title: "Member Design",
        body: "Designed slabs, beams, columns and selected isolated footings using coursework design procedures, iterating member sizes where reinforcement percentages or detailing rules were unsatisfactory.",
      },
      {
        title: "Detailing & Documentation",
        body: "Produced representative structural drawings: floor framing plans, beam and column schedules, a slab reinforcement sheet and a foundation plan, with bar markings consistent with the calculations.",
      },
    ],
    software: ["ETABS", "AutoCAD", "Excel"],
    standards: ["EN 1990", "EN 1991", "EN 1992", "Coursework design basis"],
    calculations: [
      {
        title: "Slab self-weight (example derivation)",
        lines: [
          "w = slab thickness × concrete unit weight",
          "w = 0.150 m × 25 kN/m³  [placeholder values]",
          "w = 3.75 kN/m²",
        ],
        note: "Final values to be confirmed against the project report before publication.",
      },
      {
        title: "Selected beam — software vs hand check",
        lines: [
          "Tributary load, w = [placeholder] kN/m",
          "Effective span, L = [placeholder] m",
          "M ≈ wL²/10 (continuous, preliminary)  = [placeholder] kN·m",
          "ETABS output, M = [placeholder] kN·m",
          "Difference ≈ [placeholder] % — within expected range",
        ],
        note: "Differences arise from continuity, support stiffness and modelling assumptions. The check confirms the model is physically reasonable, not that either value is exact.",
      },
    ],
    results: [
      "Complete structural scheme with regular, buildable grid",
      "Member forces and storey displacements extracted from the global model",
      "Selected hand calculations agreeing with software output within expected limits",
      "Design of slabs, beams, columns and isolated footings",
      "Representative reinforcement schedules and structural drawings",
    ],
    limitations: [
      "Wind analysis simplified compared to a full code treatment",
      "Foundation design based on assumed — not site-tested — soil parameters",
      "No soil-structure interaction modelled",
      "Not reviewed or approved by any statutory body — academic exercise only",
    ],
    lessons:
      "The project reinforced that structural design is not simply running an analysis model. A safe solution depends on correct assumptions, load paths, member behaviour, design checks, sensible modelling, detailing and constructability. Software accelerated analysis, but engineering judgment remained essential for evaluating whether the results were physically reasonable.",
    improvements: [
      "More detailed wind analysis",
      "Seismic design where relevant",
      "Soil-structure interaction",
      "Flat slab comparison study",
      "Embodied-carbon comparison",
      "BIM coordination of drawings",
      "Construction sequence analysis",
      "Life-cycle cost evaluation",
    ],
    evidence: [
      { label: "Structural grid", detail: "Column layout and framing plan" },
      { label: "3D analytical model", detail: "ETABS frame model" },
      { label: "Load diagrams", detail: "Gravity and lateral cases" },
      { label: "Bending moment diagram", detail: "Selected frame output" },
      { label: "Shear force diagram", detail: "Selected frame output" },
      { label: "Storey displacement plot", detail: "Lateral drift check" },
      { label: "Column force summary", detail: "Axial, moment envelope" },
      { label: "Beam schedule", detail: "Bar marks and stirrups" },
      { label: "Column schedule", detail: "Longitudinal steel and links" },
      { label: "Foundation plan", detail: "Isolated footing layout" },
    ],
  },

  /* ════════════════════════ 02 · HIGHWAY ══════════════════════════ */
  {
    slug: "highway-geometric-design",
    index: "02",
    title: "Preliminary Highway Geometric Design",
    shortTitle: "Highway Geometric Design",
    category: "transportation",
    categoryLabel: "Transportation Engineering",
    type: "Academic Design Project",
    year: 2025,
    duration: "8 weeks [placeholder]",
    role: "Alignment design & earthworks",
    teamSize: "Team of four — my focus: horizontal alignment [placeholder]",
    featured: false,
    cover: "/images/project-highway.png",
    coverAlt:
      "Aerial photograph of a new two-lane highway alignment curving through golden savanna terrain.",
    tagline:
      "Balancing safety, terrain and earthworks across a road corridor between fixed control points.",
    brief:
      "Develop a preliminary road alignment between defined control points while balancing safety, terrain, earthworks and geometric standards — producing a coordinated set of plan, profile and cross-section deliverables.",
    problem:
      "An alignment that is geometrically compliant but expensive to build fails the client; one that is cheap but unsafe fails the road user. The design task is to find the alignment that respects design-speed geometry, manages gradients through rolling terrain, and keeps cut and fill volumes in balance.",
    designCriteria: [
      "Design speed and corresponding sight distances [placeholder]",
      "Maximum gradient and vertical curve standards",
      "Minimum horizontal curve radii",
      "Cross-section elements: lanes, shoulders, side drains",
      "Drainage considerations along the corridor",
    ],
    constraints: [
      "Fixed start and end control points",
      "Rolling terrain — earthwork balance concern",
      "Avoidance of identified obstacle zones",
      "Side drain outlets at natural low points",
    ],
    approach: [
      {
        title: "Corridor Study",
        body: "Reviewed the terrain between control points and identified feasible corridors, flagging constraints that would push the alignment toward cut or fill extremes.",
      },
      {
        title: "Horizontal Alignment",
        body: "Set tangent runs and curve radii to suit the design speed, checking sight distances and avoiding abrupt reversals.",
      },
      {
        title: "Vertical Profile",
        body: "Developed the profile to follow terrain while meeting gradient limits; balanced cut and fill along the corridor.",
      },
      {
        title: "Cross-Sections & Earthworks",
        body: "Generated cross-sections at regular chainages, estimated earthwork volumes, and iterated the profile to reduce imbalance.",
      },
      {
        title: "Drainage Integration",
        body: "Located side drains and culvert positions, coordinating outlets with natural drainage lines.",
      },
    ],
    software: ["Civil 3D", "AutoCAD", "Excel"],
    standards: ["Kenya road design manual references [coursework]", "Geometric design standards as instructed"],
    calculations: [
      {
        title: "Stopping sight distance (example)",
        lines: [
          "SSD = vt + v² / (2gf)  [placeholder inputs]",
          "with v = design speed, t = reaction time",
          "g = gravity, f = longitudinal friction",
          "SSD = [placeholder] m — adopted as controlling criterion",
        ],
        note: "Worked example; final values per project report.",
      },
    ],
    results: [
      "Coordinated plan, profile and cross-section set",
      "Alignment meeting design-speed criteria on all curves",
      "Earthwork volumes estimated with cut/fill balance reported",
      "Drainage strategy integrated with the corridor",
    ],
    limitations: [
      "Traffic data assumed, not measured",
      "Pavement design outside project scope",
      "No detailed hydrological modelling of culverts",
    ],
    lessons:
      "Alignment design is a negotiation between geometry and ground. Design standards define the boundary of safe; terrain and cost decide where inside that boundary the road should actually sit. Iteration — not a single pass — is how a good alignment emerges.",
    improvements: [
      "Measured traffic counts to justify design speed",
      "Detailed culvert hydrology",
      "Pavement structure design",
      "Stage-corridor public consultation simulation",
    ],
    evidence: [
      { label: "Plan / profile sheets", detail: "Alignment drawings" },
      { label: "Cross-sections", detail: "At regular chainages" },
      { label: "Alignment drawings", detail: "Curve tables and data" },
      { label: "Design criteria table", detail: "Standards checklist" },
    ],
  },

  /* ════════════════════════ 03 · GEOTECHNICAL ════════════════════ */
  {
    slug: "geotechnical-assessment",
    index: "03",
    title: "Geotechnical Site Assessment & Soil Classification",
    shortTitle: "Geotechnical Assessment",
    category: "geotechnical",
    categoryLabel: "Geotechnical Engineering",
    type: "Laboratory / Field Project",
    year: 2024,
    duration: "6 weeks [placeholder]",
    role: "Sampling, testing & interpretation",
    teamSize: "Pair work — shared field and lab duties",
    featured: false,
    cover: "/images/project-geotech.png",
    coverAlt: "Tidy geotechnical laboratory bench with sieves, sample jars and a sieve shaker.",
    tagline:
      "From disturbed samples to an engineering recommendation: classifying soil and interpreting what it means for foundations.",
    brief:
      "Investigate and classify soils from a study site through a structured laboratory programme, then interpret the results into foundation-relevant engineering commentary.",
    problem:
      "Soil does not come with a label. Before any foundation decision, the material must be identified — grain size, plasticity, compaction behaviour — and translated into parameters an engineer can design against.",
    designCriteria: [
      "Complete index property set for each sample",
      "Correct test procedures per standard methods",
      "Classification under a recognised system",
      "Bearing / foundation interpretation with stated assumptions",
    ],
    constraints: [
      "Disturbed samples only — limited strength testing meaningful",
      "Finite laboratory time window",
      "Seasonal moisture effects noted but not eliminated",
    ],
    approach: [
      {
        title: "Sampling & Field Notes",
        body: "Collected disturbed samples with location and depth records; logged ground conditions observed at recovery points.",
      },
      {
        title: "Moisture & Sieve Analysis",
        body: "Determined natural moisture contents and ran sieve analyses to produce particle-size distribution curves for each sample.",
      },
      {
        title: "Atterberg Limits",
        body: "Determined liquid and plastic limits to position the fines fraction on the plasticity chart.",
      },
      {
        title: "Compaction",
        body: "Ran a Proctor compaction test to establish the moisture–density relationship for earthworks commentary.",
      },
      {
        title: "Classification & Interpretation",
        body: "Classified the soils and prepared engineering commentary on likely bearing behaviour and foundation implications, with assumptions stated.",
      },
    ],
    software: ["Excel"],
    standards: ["Standard test methods as taught in coursework [placeholder refs]"],
    calculations: [
      {
        title: "Plasticity index",
        lines: ["PI = LL − PL", "PI = [placeholder] %", "Classification: [placeholder] per plasticity chart"],
      },
      {
        title: "Dry density (compaction)",
        lines: [
          "ρd = ρ / (1 + w)",
          "ρd = [placeholder] Mg/m³ at w_opt = [placeholder] %",
        ],
      },
    ],
    results: [
      "Particle-size distribution curves for all samples",
      "Atterberg limits and plasticity classification",
      "Compaction curve with optimum moisture content",
      "Consolidated test table and engineering recommendation",
    ],
    limitations: [
      "Disturbed sampling — no undrained strength testing",
      "Single field visit; spatial variability not fully captured",
      "Bearing interpretation indicative, not design-grade",
    ],
    lessons:
      "Laboratory numbers only matter when sampling context is preserved. A moisture content without a depth, or a sieve result without a location, is noise. Rigorous field records are what turn test data into ground truth.",
    improvements: [
      "Undisturbed sampling for strength testing",
      "Multiple borehole locations for variability",
      "CBR testing for roadworks relevance",
    ],
    evidence: [
      { label: "Particle-size distribution curve", detail: "Sieve analysis output" },
      { label: "Compaction curve", detail: "Moisture–density relationship" },
      { label: "Test table", detail: "Full index results" },
      { label: "Classification chart", detail: "Plasticity positioning" },
    ],
  },

  /* ════════════════════════ 04 · DRAINAGE ════════════════════════ */
  {
    slug: "stormwater-drainage",
    index: "04",
    title: "Stormwater Drainage Design",
    shortTitle: "Stormwater Drainage",
    category: "water",
    categoryLabel: "Water / Infrastructure",
    type: "Academic Project",
    year: 2025,
    duration: "6 weeks [placeholder]",
    role: "Hydrology & conveyance design",
    teamSize: "Individual [placeholder]",
    featured: false,
    cover: "/images/project-drainage.png",
    coverAlt: "Engineered concrete stormwater drainage channel beside a road with clean trapezoidal section.",
    tagline:
      "Estimating runoff and sizing conveyance for a defined development — connecting rainfall to hydraulics.",
    brief:
      "Estimate runoff and develop preliminary stormwater conveyance for a defined development area and road corridor, from catchment delineation through drain sizing to outlet considerations.",
    problem:
      "Every developed area seals ground that used to absorb rainfall. The engineer's task is to size a system that collects the design storm's runoff, conveys it safely at self-cleansing velocities, and discharges it without creating new problems downstream.",
    designCriteria: [
      "Design storm return period [placeholder]",
      "Self-cleansing minimum velocity in drains",
      "Freeboard in lined channel sections",
      "Outlet at a safe, legal discharge point",
    ],
    constraints: [
      "Limited rainfall data — intensity assumptions stated",
      "Fixed corridor geometry",
      "Flat sections requiring careful gradient design",
    ],
    approach: [
      {
        title: "Catchment Delineation",
        body: "Defined the contributing catchment from contour data, computing area, slope and flow paths to the discharge point.",
      },
      {
        title: "Runoff Estimation",
        body: "Applied the rational method with stated runoff coefficients and a design rainfall intensity to estimate peak flows at key points.",
      },
      {
        title: "Drain Sizing",
        body: "Sized lined drain sections using Manning's equation, checking velocity limits and adjusting gradients for self-cleansing flow.",
      },
      {
        title: "Profile & Outlets",
        body: "Developed the longitudinal profile and located outlets, checking cover, grade and discharge conditions.",
      },
    ],
    software: ["AutoCAD", "Excel", "QGIS"],
    standards: ["Coursework drainage design basis [placeholder]"],
    calculations: [
      {
        title: "Peak flow — rational method",
        lines: [
          "Q = C · i · A",
          "C = [placeholder], i = [placeholder] mm/hr, A = [placeholder] ha",
          "Q = [placeholder] m³/s",
        ],
      },
      {
        title: "Manning velocity check",
        lines: [
          "V = (1/n) · R^(2/3) · S^(1/2)",
          "n = 0.013 (concrete), R = [placeholder] m, S = [placeholder]",
          "V = [placeholder] m/s — within acceptable band",
        ],
      },
    ],
    results: [
      "Catchment plan with flow paths",
      "Peak flow estimates at key nodes",
      "Sized drain cross-sections along the corridor",
      "Longitudinal profile with outlet arrangement",
    ],
    limitations: [
      "Single design storm — no duration series analysis",
      "Return period assumed per coursework brief",
      "No sediment transport analysis",
    ],
    lessons:
      "Drainage design is where hydrology meets hydraulics, and both meet judgement. A drain sized for the wrong storm wastes concrete; sized without velocity checks silts up. Stating assumptions clearly is what makes the design defensible.",
    improvements: [
      "Alternative return period sensitivity study",
      "Detention/storage option comparison",
      "Green infrastructure integration (swales, infiltration)",
    ],
    evidence: [
      { label: "Catchment plan", detail: "Delineation and flow paths" },
      { label: "Calculations", detail: "Rational method sheets" },
      { label: "Drain section", detail: "Typical lined section" },
      { label: "Longitudinal profile", detail: "Gradient and outlets" },
    ],
  },

  /* ════════════════════════ 05 · CONSTRUCTION ════════════════════ */
  {
    slug: "construction-planning",
    index: "05",
    title: "Construction Planning Exercise",
    shortTitle: "Construction Planning",
    category: "construction",
    categoryLabel: "Construction Management",
    type: "Academic / Team Project",
    year: 2024,
    duration: "5 weeks [placeholder]",
    role: "Programme & site logistics lead",
    teamSize: "Team of five — my focus: programme and site layout",
    featured: false,
    cover: "/images/project-planning.png",
    coverAlt: "Organized construction site at dusk with tower crane, material zones and floodlights.",
    tagline:
      "Planning a small building from substructure to finishes — sequence, resources, logistics and risk.",
    brief:
      "Plan the construction of a small building project from substructure through finishes, producing a defensible programme, site layout, method sequence and risk register.",
    problem:
      "Construction fails on paper before it fails on site — or succeeds there for the same reason. The planning exercise requires sequencing trades, allocating resources and anticipating risks so that a building can be built safely, continuously and within reasonable time.",
    designCriteria: [
      "Logical work breakdown and sequence",
      "Resource assumptions stated and consistent",
      "Critical path identified and protected",
      "Site logistics: access, storage, plant positions",
      "Quality and safety considerations embedded",
    ],
    constraints: [
      "Fixed site footprint with single access",
      "Assumed crew sizes per trade [placeholder]",
      "Weather downtime allowance required",
    ],
    approach: [
      {
        title: "Work Breakdown Structure",
        body: "Decomposed the works from substructure to finishes into activitities with clear predecessors and successors.",
      },
      {
        title: "Sequencing & Programme",
        body: "Built the programme in Microsoft Project, linked activities logically, and identified the critical path and float.",
      },
      {
        title: "Resource Loading",
        body: "Assigned crews, plant and key materials to activities; smoothed peaks where resource demand exceeded availability.",
      },
      {
        title: "Site Layout",
        body: "Planned storage zones, plant positions, access and welfare so materials move short distances and trades don't clash.",
      },
      {
        title: "Risk Register",
        body: "Identified key risks — weather, supply, ground conditions — with mitigation and ownership for each.",
      },
    ],
    software: ["Microsoft Project", "AutoCAD", "Excel"],
    standards: ["Coursework planning basis [placeholder]"],
    calculations: [
      {
        title: "Programme logic (extract)",
        lines: [
          "Substructure → Frame → Roof → Services & Finishes",
          "Critical path: excavation → foundations → columns → slabs (cycle)",
          "Total duration = [placeholder] weeks incl. weather allowance",
        ],
      },
    ],
    results: [
      "Gantt programme with critical path highlighted",
      "Site layout plan with zones and access",
      "Method statement sequence for key activities",
      "Risk register with mitigations",
    ],
    limitations: [
      "Production rates assumed from coursework guidance",
      "Cost planning outside scope",
      "No contractual strategy considered",
    ],
    lessons:
      "A programme is a communication document before it is a schedule. The Gantt chart that a site engineer, a quantity surveyor and a client can all read and argue about is more valuable than a precise plan nobody can follow.",
    improvements: [
      "Cost-loaded programme",
      "Look-ahead schedule simulation",
      "Lean sequencing comparison (pull planning)",
    ],
    evidence: [
      { label: "Gantt chart", detail: "Programme with critical path" },
      { label: "Site layout", detail: "Zones, access, plant" },
      { label: "Method sequence", detail: "Key activity statements" },
      { label: "Risk register", detail: "Risks and mitigations" },
    ],
  },

  /* ════════════════════════ 06 · SURVEYING ═══════════════════════ */
  {
    slug: "surveying-project",
    index: "06",
    title: "Engineering Survey Field Project",
    shortTitle: "Surveying Field Project",
    category: "surveying",
    categoryLabel: "Engineering Surveying",
    type: "Field Project",
    year: 2023,
    duration: "2-week field camp [placeholder]",
    role: "Observer, booker & computation rotations",
    teamSize: "Crew of four — rotating roles",
    featured: false,
    cover: "/images/project-survey.png",
    coverAlt: "Surveying engineer at golden hour behind a total station on an open site.",
    tagline:
      "Levelling, traversing and mapping a site — closing the loop between field observations and computed coordinates.",
    brief:
      "Carry out a complete control and topographic survey of a defined site: establish a traverse, run levels, compute and adjust observations, and produce a contoured plan with setting-out demonstrations.",
    problem:
      "Every drawing that gets built begins as a survey. The field project requires observations precise enough to close within tolerance, field books disciplined enough to audit, and computations careful enough to turn angles and distances into a map someone can set out from.",
    designCriteria: [
      "Traverse angular and linear closure within tolerance",
      "Levelling circuit closure within tolerance",
      "Field book kept to survey convention (no erasures)",
      "Contour interval appropriate to terrain and purpose",
    ],
    constraints: [
      "Weather windows and daylight hours",
      "Shared instrument time across crews",
      "Terrain with limited intervisibility in places",
    ],
    approach: [
      {
        title: "Reconnaissance & Control",
        body: "Walked the site, selected intervisible stations, and planned the traverse loop before instrument setup.",
      },
      {
        title: "Traverse Observations",
        body: "Observed angles and distances around the loop with role rotation — observer, booker, target — and applied checks at each station.",
      },
      {
        title: "Levelling",
        body: "Ran a closed circuit of levels between benchmarks, booking rise-and-fall and checking page arithmetic as we went.",
      },
      {
        title: "Computation & Adjustment",
        body: "Computed coordinates from the traverse, distributed closures, and computed reduced levels from the booked observations.",
      },
      {
        title: "Detail & Contours",
        body: "Picked up topographic detail from control stations and compiled a contour plan of the site.",
      },
    ],
    software: ["Excel", "AutoCAD (plan compilation)"],
    standards: ["Coursework survey tolerances [placeholder]"],
    calculations: [
      {
        title: "Traverse closure (extract)",
        lines: [
          "Σ interior angles = (n − 2) × 180° ± error",
          "Angular misclosure = [placeholder]″ — within tolerance",
          "Linear misclosure = [placeholder] m",
          "Relative precision ≈ 1 : [placeholder]",
        ],
      },
    ],
    results: [
      "Closed traverse with adjusted coordinates",
      "Levelling circuit within closure tolerance",
      "Contour plan of the surveyed area",
      "Setting-out demonstration from control points",
    ],
    limitations: [
      "Short observation windows — no repeat-night observations",
      "Local grid, not tied to national control",
      "Contour interval limited by pickup density",
    ],
    lessons:
      "Surveying taught me that precision is a habit, not an instrument spec. The discipline of booking — in the field, immediately, without erasure — is what separates data from anecdote. Coordinated observations with a crew reduce transcription errors and keep station references consistent.",
    improvements: [
      "GNSS tie to national control",
      "Digital field book workflow",
      "Area and volume computations from the surface model",
    ],
    evidence: [
      { label: "Field book", detail: "Original observations" },
      { label: "Reduced levels", detail: "Rise-and-fall computation" },
      { label: "Traverse table", detail: "Angles, distances, coordinates" },
      { label: "Contour map", detail: "Topographic plan" },
    ],
  },
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
