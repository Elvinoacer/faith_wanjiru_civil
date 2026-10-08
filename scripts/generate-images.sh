#!/bin/bash
# Batch generate portfolio imagery — Faith Wanjiru Engineering Portfolio
set -e
cd /home/z/my-project

gen() {
  local out="$1"; local size="$2"; local prompt="$3"
  if [ -f "public/images/$out" ]; then echo "SKIP $out (exists)"; return 0; fi
  z-ai image -p "$prompt" -o "public/images/$out" -s "$size" && echo "DONE $out"
}

# Hero structural backdrop
gen "hero-structure.png" "1344x768" "Clean architectural photograph of a modern reinforced concrete frame building under construction, precise orthogonal geometry of columns and floor slabs, minimal scaffolding, soft overcast daylight, muted grey and cream palette, editorial architecture magazine photography, strong composition, high quality, detailed"

# Project 1 — RC building design
gen "project-rc.png" "1344x768" "Low angle view of a multi-storey reinforced concrete building under construction, repetitive grid of columns and slabs, timber formwork props, bright sky, disciplined geometry, architectural editorial photography, high quality"

# Project 2 — Highway geometric design
gen "project-highway.png" "1344x768" "Aerial drone photograph of a newly constructed two-lane highway alignment curving smoothly through golden savanna terrain in Kenya, crisp asphalt ribbon with edge line markings, earthworks and drainage culverts visible, late afternoon golden light, high quality, detailed"

# Project 3 — Geotechnical assessment
gen "project-geotech.png" "1024x1024" "Tidy geotechnical engineering laboratory bench with stacked soil sieves, brass sieve shaker machine, sample jars of sand and clay, soil classification chart on wall, clean neutral lighting, technical and orderly atmosphere, high quality, detailed"

# Project 4 — Stormwater drainage
gen "project-drainage.png" "1344x768" "Engineered reinforced concrete stormwater drainage channel beside a rural road, clean trapezoidal section with wingwalls, low water flow, concrete finish texture, engineered geometry, soft daylight, documentary photography, high quality"

# Project 5 — Construction planning
gen "project-planning.png" "1344x768" "Overview of an organized building construction site at dusk, tower crane silhouette, stacked materials in neat zones, concrete columns in foreground, warm site floodlights beginning to glow, cinematic documentary photography, high quality"

# Project 6 — Surveying
gen "project-survey.png" "1344x768" "Surveying engineer silhouette at golden hour standing behind a total station on a tripod, open grassland construction site with distant building frames, warm rim light, dust particles in air, cinematic documentary photography, high quality"

# Industrial attachment — site engineering
gen "site-attachment.png" "1344x768" "Young site engineer wearing a white safety helmet and high visibility vest reviewing structural drawings on a clipboard at a concrete construction site, exposed rebar columns behind, natural daylight, documentary photography, high quality"

# Materials lab
gen "lab-concrete.png" "1024x1024" "Concrete cube compression testing machine in a university materials laboratory, steel platens and dial gauge, grey concrete cube specimens on bench, clean industrial laboratory lighting, high quality, detailed"

# Rebar detailing
gen "detail-rebar.png" "1024x1024" "Close-up of a neatly tied reinforcement cage of a reinforced concrete beam-column junction, precise rebar spacing and stirrups, tying wire ties, shallow depth of field, technical construction photography, high quality, detailed"

# Concrete texture (subtle background asset)
gen "texture-concrete.png" "1024x1024" "Full-frame macro texture of board-formed architectural concrete wall, subtle tie holes and formwork joints, even soft light, minimal, light grey tones, high quality"

# About section — Faith at drawing desk
gen "about-faith.png" "768x1344" "Young Kenyan woman engineer in smart casual shirt working at a drafting desk with structural drawings and a laptop, rolled drawings in a holder, bright studio with concrete wall, natural side light, candid documentary style, shallow depth of field, high quality"

echo "ALL IMAGES COMPLETE"
