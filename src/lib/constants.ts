export const COMPANY_INFO = {
  name: "MR. Construction",
  owner: "Muhammad Raaziq",
  role: "Founder & Chief Executive",
  address: "Office 133, Near Police Station, Sector 9-C, Hawksbay, Musharaf Colony, Karachi, Pakistan.",
  city: "Karachi",
  province: "Sindh",
  country: "Pakistan",
  serviceArea: "All Pakistan",
  phone: "+92 300 1234567", // default placeholder, editable in Admin
  whatsapp: "+92 300 1234567", // default placeholder, editable in Admin
  email: "info@mrconstruction.pk",
  workingHours: "Monday - Saturday: 8:00 AM - 7:00 PM",
  yearEstablished: "2012",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115858.91090123512!2d66.8668962239486!3d24.89679261730079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb36a9cf1863583%3A0xe54e19ea81ee28e2!2sHawksbay%2C%20Karachi%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s",
};

export const INITIAL_SERVICES = [
  {
    slug: "road-construction",
    title: "Road Construction",
    icon: "Route",
    shortDescription: "End-to-end arterial, urban, and rural road construction with precision grading, durable sub-base preparation, and superior asphalt laying.",
    fullDescription: "MR. Construction delivers full-lifecycle road construction services across Pakistan. From initial site clearance and geometric surveying to earthworks, subgrade stabilization, aggregate base compaction, and multi-course asphalt paving, our engineering team ensures optimal load-bearing capacity and long-term durability under demanding traffic conditions.",
    features: [
      "Rigid & Flexible Pavement Construction",
      "Urban Roadway Modernization & Widening",
      "Rural Access Roads & Industrial Corridors",
      "Integrated Stormwater Drainage & Culverts",
      "Thermoplastic Road Marking & Highway Signage"
    ],
    equipment: ["Vögele Asphalt Pavers", "Hamm Tandem & Pneumatic Rollers", "CAT Motor Graders", "Bitumen Sprayers"],
    featuredImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    order: 1
  },
  {
    slug: "highway-construction",
    title: "Highway & Expressway Works",
    icon: "Milestone",
    shortDescription: "Large-scale inter-provincial highway development, dualization, geometric upgrades, and heavy infrastructure alignment in challenging terrains.",
    fullDescription: "Specializing in heavy-duty national corridor execution, MR. Construction partners with premier infrastructure authorities including the Frontier Works Organization (FWO) on strategic national projects like the N-25 Karachi–Chaman Highway. We deploy advanced heavy machinery and stringent quality control compliant with National Highway Authority (NHA) standards.",
    features: [
      "High-Volume National Highway Dualization",
      "Mountainous Terrain & Cut-and-Fill Alignments",
      "Prestressed Concrete Bridges & Box Culverts",
      "Crash Barrier & Road Safety Infrastructure",
      "Heavy Duty Sub-base and Asphalt Wear Courses"
    ],
    equipment: ["Heavy Excavators (CAT 330/336)", "Heavy Duty Dump Trucks", "Dynamic Compaction Rigs", "Asphalt Batching Plants"],
    featuredImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80",
    order: 2
  },
  {
    slug: "building-construction",
    title: "Building & Structural Construction",
    icon: "Building2",
    shortDescription: "Commercial, industrial, and institutional building construction with reinforced concrete framing, steel structures, and complete civil finishes.",
    fullDescription: "We provide comprehensive building construction solutions including multi-storey institutional complexes, industrial warehouses, commercial facilities, and residential developments. Our civil engineering teams supervise strict reinforcement detailing, slump testing, shuttering integrity, and seismic-resistant structural framing.",
    features: [
      "Reinforced Concrete Frame Structures (RCC)",
      "Industrial Sheds & Pre-Engineered Buildings (PEB)",
      "Deep Foundation Piling & Raft Foundations",
      "Masonry, Waterproofing & Thermal Insulation",
      "Turnkey Architectural & MEP Coordination"
    ],
    equipment: ["Tower Cranes", "Mobile Concrete Pumps", "Transit Mixers", "Steel Bending & Cutting Machines"],
    featuredImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    order: 3
  },
  {
    slug: "civil-works",
    title: "Civil Engineering Works",
    icon: "HardHat",
    shortDescription: "Engineered civil infrastructure including drainage canals, retaining walls, box culverts, retaining structures, and site development.",
    fullDescription: "MR. Construction executes diverse civil engineering projects for defense, municipal, and private sector clients. Our structural and hydraulic works portfolio includes heavy gravity retaining walls, stormwater collection networks, underground utility trenches, and concrete paving for heavy logistics hubs.",
    features: [
      "RCC Retaining Walls & Slope Stabilization",
      "Drainage Canals, Siphons & Hydraulic Outfalls",
      "Underground Utility Duct Banks & Manholes",
      "Boundary Walls & Security Infrastructure",
      "Heavy Duty Concrete Hardstanding & Aprons"
    ],
    equipment: ["Hydraulic Breakers", "Boom Pumps", "Total Stations & GPS Rovers", "Trenchers"],
    featuredImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
    order: 4
  },
  {
    slug: "demolition-works",
    title: "Controlled Demolition Services",
    icon: "ShieldAlert",
    shortDescription: "Safe, systematic mechanical demolition, structural dismantling, concrete crushing, and hazardous material site remediation.",
    fullDescription: "Our specialized demolition team conducts controlled structural dismantling and site clearing for old highway bridges, commercial complexes, and industrial installations. All operations prioritize zero-incident site safety, debris crushing, and environmental recycling.",
    features: [
      "High-Reach Mechanical Excavator Demolition",
      "Heavy Reinforced Concrete Hydraulic Crushing",
      "Bridge & Elevated Structure Dismantling",
      "Controlled Structural Strip-Outs",
      "Debris Segregation & Concrete Recycling"
    ],
    equipment: ["High-Reach Excavators with Shear Attachments", "Hydraulic Rock Breakers", "Pulverizers", "Skid Steers"],
    featuredImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80",
    order: 5
  },
  {
    slug: "earthwork-excavation",
    title: "Earthwork & Deep Excavation",
    icon: "Tractor",
    shortDescription: "Mass site grading, heavy mountain cut-and-fill operations, foundation pit excavation, and soil stabilization.",
    fullDescription: "With a modern fleet of high-tonnage excavators, bulldozers, and articulated dump trucks, MR. Construction handles complex mass earth moving operations across challenging terrains, desert tracks, and rocky mountain corridors across Sindh, Balochistan, and throughout Pakistan.",
    features: [
      "Mass Cut & Fill Earthmoving Operations",
      "Deep Foundation Pit Excavation & Shoring",
      "Rock Excavation & Hydraulic Breaking",
      "Embankment Construction & Compaction",
      "Land Reclamation & Site Leveling"
    ],
    equipment: ["CAT D8/D9 Bulldozers", "CAT 336 & Komatsu PC300 Excavators", "Vibratory Padfoot Rollers", "Dump Trucks"],
    featuredImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80",
    order: 6
  },
  {
    slug: "subgrade-subbase-works",
    title: "Subgrade & Sub-base Preparation",
    icon: "Layers",
    shortDescription: "High-density roadbed stabilization, non-expansive soil treatment, and moisture-controlled aggregate sub-base compaction.",
    fullDescription: "The longevity of any roadway lies in its foundation. We execute rigorous subgrade stabilization using lime/cement treatments, geogrid reinforcements, and graded aggregate sub-bases compacted to 98-100% Modified AASHTO density standards.",
    features: [
      "Soil Improvement & Chemical Stabilization",
      "Water Bound Macadam (WBM) Placement",
      "Crushed Aggregate Sub-base (ASB) Compaction",
      "Geotextile & Geogrid Reinforcement Layers",
      "Nuclear Density & In-situ Moisture Testing"
    ],
    equipment: ["Motor Graders (CAT 140K/140M)", "Pneumatic Tired Rollers (PTR)", "Heavy Water Bowsers", "Soil Compactors"],
    featuredImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
    order: 7
  },
  {
    slug: "aggregate-works",
    title: "Aggregate Processing & Crushing",
    icon: "Boxes",
    shortDescription: "Quarry management, graded stone aggregate production, screening, and supply for asphalt and concrete batching plants.",
    fullDescription: "MR. Construction operates quarry extraction and crushing units to produce high-spec crushed stone aggregates (Base Course, Sub-base, 1/2\", 3/4\", 3/8\", and manufactured sand) meeting strict ASTM and NHA Los Angeles Abrasion and Flakiness specifications.",
    features: [
      "Mobile Jaw & Cone Crushing Operations",
      "Screened Aggregate for Asphaltic Concrete",
      "Riprap & Stone Pitching for River Training",
      "Continuous Laboratory Quality Sieve Testing",
      "Bulk Logistics & Quarry Site Management"
    ],
    equipment: ["Mobile Jaw Crushers", "Cone Crushers", "Vibrating Screens", "Wheel Loaders (CAT 966/950)"],
    featuredImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    order: 8
  },
  {
    slug: "asphalt-road-works",
    title: "Asphalt Paving & Surfacing Works",
    icon: "Flame",
    shortDescription: "Hot Mix Asphalt (HMA) production, prime coating, tack coating, and precision asphalt concrete laying for high-speed corridors.",
    fullDescription: "Equipped with advanced sensor-guided paving machines, we apply dense-graded Asphalt Base Course (ABC) and Asphalt Concrete Wearing Course (ACWC) engineered for heavy axle loads, resistance to rutting, and superior skid resistance in extreme weather conditions.",
    features: [
      "Hot Mix Asphalt Base & Wearing Courses",
      "Bituminous Prime Coat & Tack Coat Application",
      "Asphalt Milling, Profiling & Resurfacing",
      "Airport Runway & Highway High-Friction Overlays",
      "Core Extraction & Marshall Stability Testing"
    ],
    equipment: ["Sensor Asphalt Pavers", "Tandem Steel Wheel Rollers", "Rubber-Tired Rollers", "Cold Milling Machines"],
    featuredImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80",
    order: 9
  },
  {
    slug: "other-construction-services",
    title: "Specialized Infrastructure & Plant Hire",
    icon: "Truck",
    shortDescription: "Heavy machinery rental, specialized drainage structures, culvert engineering, and custom civil contracting.",
    fullDescription: "We provide auxiliary civil construction services including heavy equipment fleet leasing with certified operators, culvert fabrication, flood barrier construction, and turnkey infrastructure packages for mega industrial parks and government installations.",
    features: [
      "Heavy Earthmoving & Road Equipment Fleet Hire",
      "Box & Pipe Culvert Fabrication & Launching",
      "Perimeter Security & Perimeter Roads",
      "Emergency Highway Repair & Landslide Clearance",
      "Turnkey Site Development Packages"
    ],
    equipment: ["Low-Bed Trailers", "Hydraulic Cranes", "Water Tankers", "Survey Equipment"],
    featuredImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    order: 10
  }
];

export const INITIAL_PROJECTS = [
  {
    slug: "n25-karachi-chaman-highway",
    title: "N-25 Karachi–Chaman Highway Project",
    category: "Highway & Road Works",
    clientOrPartner: "Frontier Works Organization (FWO)",
    partnerRole: "Work Partner / Contractor",
    location: "N-25 Highway Corridor (Sindh & Balochistan Sections)",
    status: "Ongoing",
    isFeatured: true,
    isCurrentProject: true,
    startDate: "2023",
    completionDate: "In Progress",
    shortDescription: "Strategic national highway execution and dualization works on the critical N-25 corridor in working partnership with Frontier Works Organization (FWO).",
    fullDescription: "MR. Construction is actively engaged as a work partner with Frontier Works Organization (FWO) on the critical N-25 National Highway (Karachi–Chaman) project. This vital trade artery connects Karachi to Quetta and Chaman, facilitating crucial inter-provincial commerce and international transit trade. Our deployment encompasses heavy earthmoving, extensive cut-and-fill operations, rock excavation, subgrade preparation, aggregate base course placement, and robust stormwater culvert structures adhering to high engineering specifications.",
    scopeList: [
      "Strategic work partnership with Frontier Works Organization (FWO)",
      "Mass cut-and-fill earthworks along challenging rocky corridors",
      "Subgrade stabilization, Aggregate Sub-base (ASB) & Water Bound Macadam (WBM)",
      "Construction of reinforced concrete box culverts and roadside drainage channels",
      "Deployment of high-capacity earthmoving and road construction machinery",
      "Rigorous quality control and adherence to national highway engineering standards"
    ],
    specs: {
      "Client / Partner": "Frontier Works Organization (FWO)",
      "Highway Category": "National Corridor (N-25)",
      "Our Role": "Contractor / Work Partner",
      "Machinery Deployed": "Heavy Excavators, CAT Graders, Vibratory Rollers, Dumpers",
      "Project Status": "Active & Ongoing Execution",
      "Scope": "Earthwork, Subgrade, Base Course, Culverts"
    },
    featuredImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80",
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80",
        caption: "N-25 Highway Corridor - Earthmoving and Subgrade Alignment",
        altText: "N-25 Karachi Chaman Highway construction site with heavy machinery"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
        caption: "Road base compaction and aggregate leveling on N-25 section",
        altText: "Compactor working on highway sub-base"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
        caption: "Heavy CAT Grader grading the road alignment corridor",
        altText: "Motor grader on highway project"
      }
    ],
    order: 1
  },
  {
    slug: "dha-infrastructure-road-network",
    title: "DHA Sector Infrastructure & Arterial Roads",
    category: "Road & Civil Works",
    clientOrPartner: "Defence Housing Authority (DHA)",
    partnerRole: "Civil Infrastructure Contractor",
    location: "Karachi, Sindh",
    status: "Completed",
    isFeatured: true,
    isCurrentProject: false,
    startDate: "2022",
    completionDate: "2024",
    shortDescription: "Comprehensive sector road network, underground drainage trenches, and heavy asphalt surfacing across residential and commercial sectors.",
    fullDescription: "MR. Construction executed comprehensive civil and road infrastructure works across key DHA sectors. The project entailed precision sub-base laying, asphalt concrete wearing courses, extensive RCC stormwater drainage channels, boundary walling, and curbstone installations tailored for high-end urban living.",
    scopeList: [
      "Over 18 km of dual-carriage arterial and sector roads",
      "RCC Box Culverts and underground storm drainage trunk lines",
      "High-durability Asphalt Wearing Course paving",
      "Interlocking paver walkways and curbstone alignment",
      "Subgrade soil improvement and compaction testing"
    ],
    specs: {
      "Organization": "Defence Housing Authority (DHA)",
      "Sector Type": "Urban Residential & Commercial Infrastructure",
      "Length": "18+ Kilometers of Paved Roads",
      "Asphalt Volume": "32,000 Metric Tons",
      "Status": "Successfully Handed Over"
    },
    featuredImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
        caption: "Completed high-durability asphalt sector roadway",
        altText: "Urban asphalt road completed by MR Construction"
      }
    ],
    order: 2
  },
  {
    slug: "nlc-logistics-terminal-earthwork",
    title: "NLC Logistics Freight Terminal Civil Works",
    category: "Civil Works & Earthmoving",
    clientOrPartner: "National Logistics Cell (NLC)",
    partnerRole: "Earthworks & Civil Contractor",
    location: "Sindh Logistics Hub",
    status: "Completed",
    isFeatured: true,
    isCurrentProject: false,
    startDate: "2021",
    completionDate: "2023",
    shortDescription: "Mass site development, heavy load hardstanding concrete aprons, and deep foundation excavations for terminal freight handling.",
    fullDescription: "Executed in collaboration with National Logistics Cell (NLC), this project required deep excavation, high-tonnage soil stabilization, and reinforced heavy concrete pavements designed to support heavy freight container trailers and reach stackers.",
    scopeList: [
      "Over 450,000 cubic meters of cut, fill, and site leveling",
      "High-density dynamic compaction for heavy axle loading",
      "Reinforced concrete apron paving (RCC Hardstanding)",
      "Perimeter security walls and stormwater catchment ponds"
    ],
    specs: {
      "Organization": "National Logistics Cell (NLC)",
      "Facility Type": "Freight & Logistics Terminal",
      "Earthmoving": "450,000+ m³",
      "Concrete Pavement": "65,000 m²",
      "Status": "Completed"
    },
    featuredImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
        caption: "Logistics apron paving and site stabilization works",
        altText: "NLC logistics terminal earthwork and paving"
      }
    ],
    order: 3
  },
  {
    slug: "karachi-coastal-commercial-demolition",
    title: "Coastal Commercial Complex Demolition & Site Prep",
    category: "Demolition & Site Preparation",
    clientOrPartner: "Commercial Developer",
    partnerRole: "Lead Demolition Contractor",
    location: "Karachi Coastline",
    status: "Completed",
    isFeatured: false,
    isCurrentProject: false,
    startDate: "2023",
    completionDate: "2023",
    shortDescription: "Controlled mechanical dismantling of a multi-storey structural complex with zero collateral damage and complete material salvage.",
    fullDescription: "A high-precision controlled mechanical demolition project in dense coastal Karachi. Utilized long-reach hydraulic shear excavators, dust suppression misting systems, and on-site concrete crushing for sustainable aggregate recycling.",
    scopeList: [
      "Precision structural dismantling of 5-storey RCC frame",
      "Safe removal and recycling of 15,000 tons of reinforced concrete",
      "Deep foundation removal and site backfilling",
      "100% zero-incident safety record during operations"
    ],
    specs: {
      "Location": "Karachi Coastal Belt",
      "Structure Type": "Reinforced Concrete Multi-storey",
      "Total Crushed Debris": "15,000+ Tons",
      "Safety Record": "Zero Incidents / ISO Compliant"
    },
    featuredImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80",
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80",
        caption: "Mechanical high-reach demolition excavator in operation",
        altText: "Controlled structural demolition in Karachi"
      }
    ],
    order: 4
  }
];

export const INITIAL_ORGANIZATIONS = [
  {
    name: "Frontier Works Organization (FWO)",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Frontier_Works_Organization_logo.png/600px-Frontier_Works_Organization_logo.png",
    description: "MR. Construction works actively as a contractor / work partner with FWO on major national corridors including the N-25 Karachi–Chaman Highway.",
    order: 1
  },
  {
    name: "National Logistics Cell (NLC)",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/National_Logistics_Cell_Logo.png/600px-National_Logistics_Cell_Logo.png",
    description: "Previous project experience executing earthworks, terminal grading, and heavy freight infrastructure with NLC.",
    order: 2
  },
  {
    name: "Defence Housing Authority (DHA)",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Defence_Housing_Authority%2C_Karachi_logo.png/220px-Defence_Housing_Authority%2C_Karachi_logo.png",
    description: "Contracting experience on urban road networks, sector drainage systems, and civil infrastructure developments.",
    order: 3
  }
];

export const INITIAL_GALLERY = [
  {
    title: "N-25 Highway Earthworks & Alignment",
    caption: "Heavy excavators cutting and grading highway alignment on N-25 project with FWO.",
    category: "Highway Projects",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80",
    altText: "Highway construction heavy earthmoving in Pakistan"
  },
  {
    title: "Precision Asphalt Paving Operation",
    caption: "Hot mix asphalt paving with sensor-guided asphalt paver on arterial road.",
    category: "Road Construction",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    altText: "Asphalt paver laying bituminous concrete"
  },
  {
    title: "Sub-base Compaction & Grading",
    caption: "Heavy CAT motor grader and vibratory compactor preparing crushed aggregate base.",
    category: "Machinery",
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
    altText: "CAT Motor Grader working on road sub-base"
  },
  {
    title: "Reinforced Concrete Civil Structure",
    caption: "RCC foundation and column structural construction for commercial facility.",
    category: "Building Construction",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    altText: "Reinforced concrete building construction"
  },
  {
    title: "Heavy Controlled Demolition",
    caption: "Hydraulic breaker and shear excavator dismantling reinforced concrete structure.",
    category: "Site Work",
    imageUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80",
    altText: "Hydraulic breaker dismantling concrete structure"
  },
  {
    title: "Logistics Hub Ground Engineering",
    caption: "Comprehensive deep soil stabilization and drainage apron construction.",
    category: "Completed Projects",
    imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
    altText: "Industrial ground engineering and pavement works"
  }
];
