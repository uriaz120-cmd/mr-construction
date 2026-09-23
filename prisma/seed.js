const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding MR. Construction database...");

  // 1. Create Default Admin User
  const defaultPassword = process.env.INITIAL_ADMIN_PASSWORD || "Admin@MRConstruction2026!";
  const passwordHash = bcrypt.hashSync(defaultPassword, 10);

  const admin = await prisma.adminUser.upsert({
    where: { username: "admin" },
    update: { passwordHash: passwordHash },
    create: {
      username: "admin",
      name: "Muhammad Raaziq",
      email: "raaziq@mrconstruction.pk",
      passwordHash: passwordHash,
      role: "superadmin",
    },
  });
  console.log("Admin user created/verified:", admin.username);

  // 2. Initial Site Settings
  const defaultSettings = [
    { key: "company_name", value: "MR. Construction", group: "general", description: "Official Company Name" },
    { key: "owner_name", value: "Muhammad Raaziq", group: "general", description: "Company Owner / CEO" },
    { key: "owner_role", value: "Founder & Chief Executive", group: "general", description: "Designation" },
    { key: "office_address", value: "Office 133, Near Police Station, Sector 9-C, Hawksbay, Musharaf Colony, Karachi, Pakistan.", group: "contact", description: "Registered Head Office" },
    { key: "phone", value: "+92 342 2427006", group: "contact", description: "Primary Phone Number" },
    { key: "whatsapp", value: "+92 342 2427006", group: "contact", description: "WhatsApp Contact Number" },
    { key: "email", value: "info@mrconstruction.pk", group: "contact", description: "Official Email Address" },
    { key: "working_hours", value: "Monday - Saturday: 8:00 AM - 7:00 PM", group: "contact", description: "Business Hours" },
    { key: "google_maps_embed", value: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.049405629167!2d66.8963874!3d24.8914835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb313000ea6c841%3A0x4091ae8bb35e5c46!2sMR.Construction%20Company!5e0!3m2!1sen!2spk!4v1710000000000!5m2!1sen!2spk", group: "contact", description: "Google Maps Embed URL" },
    { key: "hero_badge", value: "Leading Infrastructure & Civil Contractor in Pakistan", group: "hero", description: "Hero Top Badge" },
    { key: "hero_title", value: "Building Roads. Building Infrastructure. Building Pakistan.", group: "hero", description: "Main Hero Headline" },
    { key: "hero_subtitle", value: "MR. Construction provides professional road, highway, building, civil and demolition services across Pakistan.", group: "hero", description: "Hero Subheading" },
    { key: "hero_cta_primary", value: "View Our Projects", group: "hero", description: "Primary CTA Label" },
    { key: "hero_cta_secondary", value: "Request a Quote", group: "hero", description: "Secondary CTA Label" },
    { key: "hero_image", value: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1920&q=85", group: "hero", description: "Hero Background Image URL" },
    { key: "stats_km_roads", value: "150+", group: "stats", description: "Kilometers of Road Built" },
    { key: "stats_heavy_machinery", value: "45+", group: "stats", description: "Heavy Machinery Units" },
    { key: "stats_projects_completed", value: "85+", group: "stats", description: "Projects Completed" },
    { key: "stats_years_experience", value: "14+", group: "stats", description: "Years of Industry Experience" },
    { key: "meta_title", value: "MR. Construction | Heavy Civil, Highway & Road Construction Pakistan", group: "seo", description: "Default Meta Title" },
    { key: "meta_description", value: "MR. Construction is a premier Pakistan-based civil engineering and construction contractor specializing in highways, roads, earthworks, and infrastructure.", group: "seo", description: "Default Meta Description" },
    { key: "meta_keywords", value: "MR Construction, MR Construction Karachi, Road construction Pakistan, Highway construction N25, Civil contractor Karachi, Muhammad Raaziq", group: "seo", description: "Default Meta Keywords" },
    { key: "footer_about", value: "MR. Construction delivers excellence across highway, road, building, civil and demolition projects throughout Pakistan with trusted institutional track record.", group: "general", description: "Footer About Statement" }
  ];

  for (const s of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, group: s.group, description: s.description },
      create: s,
    });
  }
  console.log("Default settings seeded.");

  // 3. Initial Services
  const services = [
    {
      slug: "road-construction",
      title: "Road Construction",
      icon: "Route",
      shortDescription: "End-to-end arterial, urban, and rural road construction with precision grading, durable sub-base preparation, and superior asphalt laying.",
      fullDescription: "MR. Construction delivers full-lifecycle road construction services across Pakistan. From initial site clearance and geometric surveying to earthworks, subgrade stabilization, aggregate base compaction, and multi-course asphalt paving, our engineering team ensures optimal load-bearing capacity and long-term durability under demanding traffic conditions.",
      featuresListJson: JSON.stringify([
        "Rigid & Flexible Pavement Construction",
        "Urban Roadway Modernization & Widening",
        "Rural Access Roads & Industrial Corridors",
        "Integrated Stormwater Drainage & Culverts",
        "Thermoplastic Road Marking & Highway Signage"
      ]),
      equipmentJson: JSON.stringify(["Vögele Asphalt Pavers", "Hamm Tandem & Pneumatic Rollers", "CAT Motor Graders", "Bitumen Sprayers"]),
      featuredImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
      order: 1,
      isFeatured: true
    },
    {
      slug: "highway-construction",
      title: "Highway & Expressway Works",
      icon: "Milestone",
      shortDescription: "Large-scale inter-provincial highway development, dualization, geometric upgrades, and heavy infrastructure alignment in challenging terrains.",
      fullDescription: "Specializing in heavy-duty national corridor execution, MR. Construction partners with premier infrastructure authorities including the Frontier Works Organization (FWO) on strategic national projects like the N-25 Karachi–Chaman Highway. We deploy advanced heavy machinery and stringent quality control compliant with National Highway Authority (NHA) standards.",
      featuresListJson: JSON.stringify([
        "High-Volume National Highway Dualization",
        "Mountainous Terrain & Cut-and-Fill Alignments",
        "Prestressed Concrete Bridges & Box Culverts",
        "Crash Barrier & Road Safety Infrastructure",
        "Heavy Duty Sub-base and Asphalt Wear Courses"
      ]),
      equipmentJson: JSON.stringify(["Heavy Excavators (CAT 330/336)", "Heavy Duty Dump Trucks", "Dynamic Compaction Rigs", "Asphalt Batching Plants"]),
      featuredImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80",
      order: 2,
      isFeatured: true
    },
    {
      slug: "building-construction",
      title: "Building & Structural Construction",
      icon: "Building2",
      shortDescription: "Commercial, industrial, and institutional building construction with reinforced concrete framing, steel structures, and complete civil finishes.",
      fullDescription: "We provide comprehensive building construction solutions including multi-storey institutional complexes, industrial warehouses, commercial facilities, and residential developments. Our civil engineering teams supervise strict reinforcement detailing, slump testing, shuttering integrity, and seismic-resistant structural framing.",
      featuresListJson: JSON.stringify([
        "Reinforced Concrete Frame Structures (RCC)",
        "Industrial Sheds & Pre-Engineered Buildings (PEB)",
        "Deep Foundation Piling & Raft Foundations",
        "Masonry, Waterproofing & Thermal Insulation",
        "Turnkey Architectural & MEP Coordination"
      ]),
      equipmentJson: JSON.stringify(["Tower Cranes", "Mobile Concrete Pumps", "Transit Mixers", "Steel Bending & Cutting Machines"]),
      featuredImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      order: 3,
      isFeatured: true
    },
    {
      slug: "civil-works",
      title: "Civil Engineering Works",
      icon: "HardHat",
      shortDescription: "Engineered civil infrastructure including drainage canals, retaining walls, box culverts, retaining structures, and site development.",
      fullDescription: "MR. Construction executes diverse civil engineering projects for defense, municipal, and private sector clients. Our structural and hydraulic works portfolio includes heavy gravity retaining walls, stormwater collection networks, underground utility trenches, and concrete paving for heavy logistics hubs.",
      featuresListJson: JSON.stringify([
        "RCC Retaining Walls & Slope Stabilization",
        "Drainage Canals, Siphons & Hydraulic Outfalls",
        "Underground Utility Duct Banks & Manholes",
        "Boundary Walls & Security Infrastructure",
        "Heavy Duty Concrete Hardstanding & Aprons"
      ]),
      equipmentJson: JSON.stringify(["Hydraulic Breakers", "Boom Pumps", "Total Stations & GPS Rovers", "Trenchers"]),
      featuredImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
      order: 4,
      isFeatured: true
    },
    {
      slug: "demolition-works",
      title: "Controlled Demolition Services",
      icon: "ShieldAlert",
      shortDescription: "Safe, systematic mechanical demolition, structural dismantling, concrete crushing, and hazardous material site remediation.",
      fullDescription: "Our specialized demolition team conducts controlled structural dismantling and site clearing for old highway bridges, commercial complexes, and industrial installations. All operations prioritize zero-incident site safety, debris crushing, and environmental recycling.",
      featuresListJson: JSON.stringify([
        "High-Reach Mechanical Excavator Demolition",
        "Heavy Reinforced Concrete Hydraulic Crushing",
        "Bridge & Elevated Structure Dismantling",
        "Controlled Structural Strip-Outs",
        "Debris Segregation & Concrete Recycling"
      ]),
      equipmentJson: JSON.stringify(["High-Reach Excavators with Shear Attachments", "Hydraulic Rock Breakers", "Pulverizers", "Skid Steers"]),
      featuredImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80",
      order: 5,
      isFeatured: true
    },
    {
      slug: "earthwork-excavation",
      title: "Earthwork & Deep Excavation",
      icon: "Tractor",
      shortDescription: "Mass site grading, heavy mountain cut-and-fill operations, foundation pit excavation, and soil stabilization.",
      fullDescription: "With a modern fleet of high-tonnage excavators, bulldozers, and articulated dump trucks, MR. Construction handles complex mass earth moving operations across challenging terrains, desert tracks, and rocky mountain corridors across Sindh, Balochistan, and throughout Pakistan.",
      featuresListJson: JSON.stringify([
        "Mass Cut & Fill Earthmoving Operations",
        "Deep Foundation Pit Excavation & Shoring",
        "Rock Excavation & Hydraulic Breaking",
        "Embankment Construction & Compaction",
        "Land Reclamation & Site Leveling"
      ]),
      equipmentJson: JSON.stringify(["CAT D8/D9 Bulldozers", "CAT 336 & Komatsu PC300 Excavators", "Vibratory Padfoot Rollers", "Dump Trucks"]),
      featuredImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80",
      order: 6,
      isFeatured: true
    },
    {
      slug: "subgrade-subbase-works",
      title: "Subgrade & Sub-base Preparation",
      icon: "Layers",
      shortDescription: "High-density roadbed stabilization, non-expansive soil treatment, and moisture-controlled aggregate sub-base compaction.",
      fullDescription: "The longevity of any roadway lies in its foundation. We execute rigorous subgrade stabilization using lime/cement treatments, geogrid reinforcements, and graded aggregate sub-bases compacted to 98-100% Modified AASHTO density standards.",
      featuresListJson: JSON.stringify([
        "Soil Improvement & Chemical Stabilization",
        "Water Bound Macadam (WBM) Placement",
        "Crushed Aggregate Sub-base (ASB) Compaction",
        "Geotextile & Geogrid Reinforcement Layers",
        "Nuclear Density & In-situ Moisture Testing"
      ]),
      equipmentJson: JSON.stringify(["Motor Graders (CAT 140K/140M)", "Pneumatic Tired Rollers (PTR)", "Heavy Water Bowsers", "Soil Compactors"]),
      featuredImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
      order: 7,
      isFeatured: false
    },
    {
      slug: "aggregate-works",
      title: "Aggregate Processing & Crushing",
      icon: "Boxes",
      shortDescription: "Quarry management, graded stone aggregate production, screening, and supply for asphalt and concrete batching plants.",
      fullDescription: "MR. Construction operates quarry extraction and crushing units to produce high-spec crushed stone aggregates meeting strict ASTM and NHA Los Angeles Abrasion and Flakiness specifications.",
      featuresListJson: JSON.stringify([
        "Mobile Jaw & Cone Crushing Operations",
        "Screened Aggregate for Asphaltic Concrete",
        "Riprap & Stone Pitching for River Training",
        "Continuous Laboratory Quality Sieve Testing",
        "Bulk Logistics & Quarry Site Management"
      ]),
      equipmentJson: JSON.stringify(["Mobile Jaw Crushers", "Cone Crushers", "Vibrating Screens", "Wheel Loaders (CAT 966/950)"]),
      featuredImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
      order: 8,
      isFeatured: false
    },
    {
      slug: "asphalt-road-works",
      title: "Asphalt Paving & Surfacing Works",
      icon: "Flame",
      shortDescription: "Hot Mix Asphalt (HMA) production, prime coating, tack coating, and precision asphalt concrete laying for high-speed corridors.",
      fullDescription: "Equipped with advanced sensor-guided paving machines, we apply dense-graded Asphalt Base Course (ABC) and Asphalt Concrete Wearing Course (ACWC) engineered for heavy axle loads, resistance to rutting, and superior skid resistance in extreme weather conditions.",
      featuresListJson: JSON.stringify([
        "Hot Mix Asphalt Base & Wearing Courses",
        "Bituminous Prime Coat & Tack Coat Application",
        "Asphalt Milling, Profiling & Resurfacing",
        "Airport Runway & Highway High-Friction Overlays",
        "Core Extraction & Marshall Stability Testing"
      ]),
      equipmentJson: JSON.stringify(["Sensor Asphalt Pavers", "Tandem Steel Wheel Rollers", "Rubber-Tired Rollers", "Cold Milling Machines"]),
      featuredImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80",
      order: 9,
      isFeatured: false
    },
    {
      slug: "other-construction-services",
      title: "Specialized Infrastructure & Plant Hire",
      icon: "Truck",
      shortDescription: "Heavy machinery rental, specialized drainage structures, culvert engineering, and custom civil contracting.",
      fullDescription: "We provide auxiliary civil construction services including heavy equipment fleet leasing with certified operators, culvert fabrication, flood barrier construction, and turnkey infrastructure packages for mega industrial parks and government installations.",
      featuresListJson: JSON.stringify([
        "Heavy Earthmoving & Road Equipment Fleet Hire",
        "Box & Pipe Culvert Fabrication & Launching",
        "Perimeter Security & Perimeter Roads",
        "Emergency Highway Repair & Landslide Clearance",
        "Turnkey Site Development Packages"
      ]),
      equipmentJson: JSON.stringify(["Low-Bed Trailers", "Hydraulic Cranes", "Water Tankers", "Survey Equipment"]),
      featuredImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      order: 10,
      isFeatured: false
    }
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log("Services seeded.");

  // 4. Initial Projects (including N-25 with FWO, DHA, NLC)
  const projects = [
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
      scopeListJson: JSON.stringify([
        "Strategic work partnership with Frontier Works Organization (FWO)",
        "Mass cut-and-fill earthworks along challenging rocky corridors",
        "Subgrade stabilization, Aggregate Sub-base (ASB) & Water Bound Macadam (WBM)",
        "Construction of reinforced concrete box culverts and roadside drainage channels",
        "Deployment of high-capacity earthmoving and road construction machinery",
        "Rigorous quality control and adherence to national highway engineering standards"
      ]),
      specsJson: JSON.stringify({
        "Client / Partner": "Frontier Works Organization (FWO)",
        "Highway Category": "National Corridor (N-25)",
        "Our Role": "Contractor / Work Partner",
        "Machinery Deployed": "Heavy Excavators, CAT Graders, Vibratory Rollers, Dumpers",
        "Project Status": "Active & Ongoing Execution",
        "Scope": "Earthwork, Subgrade, Base Course, Culverts"
      }),
      featuredImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80",
      order: 1,
      images: [
        {
          imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80",
          caption: "N-25 Highway Corridor - Earthmoving and Subgrade Alignment",
          altText: "N-25 Karachi Chaman Highway construction site with heavy machinery",
          order: 1
        },
        {
          imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
          caption: "Road base compaction and aggregate leveling on N-25 section",
          altText: "Compactor working on highway sub-base",
          order: 2
        },
        {
          imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
          caption: "Heavy CAT Grader grading the road alignment corridor",
          altText: "Motor grader on highway project",
          order: 3
        }
      ]
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
      scopeListJson: JSON.stringify([
        "Over 18 km of dual-carriage arterial and sector roads",
        "RCC Box Culverts and underground storm drainage trunk lines",
        "High-durability Asphalt Wearing Course paving",
        "Interlocking paver walkways and curbstone alignment",
        "Subgrade soil improvement and compaction testing"
      ]),
      specsJson: JSON.stringify({
        "Organization": "Defence Housing Authority (DHA)",
        "Sector Type": "Urban Residential & Commercial Infrastructure",
        "Length": "18+ Kilometers of Paved Roads",
        "Asphalt Volume": "32,000 Metric Tons",
        "Status": "Successfully Handed Over"
      }),
      featuredImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
      order: 2,
      images: [
        {
          imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
          caption: "Completed high-durability asphalt sector roadway",
          altText: "Urban asphalt road completed by MR Construction",
          order: 1
        }
      ]
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
      scopeListJson: JSON.stringify([
        "Over 450,000 cubic meters of cut, fill, and site leveling",
        "High-density dynamic compaction for heavy axle loading",
        "Reinforced concrete apron paving (RCC Hardstanding)",
        "Perimeter security walls and stormwater catchment ponds"
      ]),
      specsJson: JSON.stringify({
        "Organization": "National Logistics Cell (NLC)",
        "Facility Type": "Freight & Logistics Terminal",
        "Earthmoving": "450,000+ m³",
        "Concrete Pavement": "65,000 m²",
        "Status": "Completed"
      }),
      featuredImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
      order: 3,
      images: [
        {
          imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
          caption: "Logistics apron paving and site stabilization works",
          altText: "NLC logistics terminal earthwork and paving",
          order: 1
        }
      ]
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
      scopeListJson: JSON.stringify([
        "Precision structural dismantling of 5-storey RCC frame",
        "Safe removal and recycling of 15,000 tons of reinforced concrete",
        "Deep foundation removal and site backfilling",
        "100% zero-incident safety record during operations"
      ]),
      specsJson: JSON.stringify({
        "Location": "Karachi Coastal Belt",
        "Structure Type": "Reinforced Concrete Multi-storey",
        "Total Crushed Debris": "15,000+ Tons",
        "Safety Record": "Zero Incidents / ISO Compliant"
      }),
      featuredImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80",
      order: 4,
      images: [
        {
          imageUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80",
          caption: "Mechanical high-reach demolition excavator in operation",
          altText: "Controlled structural demolition in Karachi",
          order: 1
        }
      ]
    }
  ];

  for (const p of projects) {
    const { images, ...projectData } = p;
    const createdProject = await prisma.project.upsert({
      where: { slug: p.slug },
      update: projectData,
      create: projectData,
    });

    if (images && images.length > 0) {
      // Clear existing project images to avoid duplicates on re-seed
      await prisma.projectImage.deleteMany({ where: { projectId: createdProject.id } });
      for (const img of images) {
        await prisma.projectImage.create({
          data: {
            projectId: createdProject.id,
            imageUrl: img.imageUrl,
            caption: img.caption,
            altText: img.altText,
            order: img.order,
          },
        });
      }
    }
  }
  console.log("Projects seeded.");

  // 5. Initial Organizations (FWO, NLC, DHA)
  const orgs = [
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

  await prisma.organization.deleteMany();
  for (const org of orgs) {
    await prisma.organization.create({ data: org });
  }
  console.log("Organizations seeded.");

  // 6. Initial Gallery
  const gallery = [
    {
      title: "N-25 Highway Earthworks & Alignment",
      caption: "Heavy excavators cutting and grading highway alignment on N-25 project with FWO.",
      category: "Highway Projects",
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80",
      altText: "Highway construction heavy earthmoving in Pakistan",
      order: 1
    },
    {
      title: "Precision Asphalt Paving Operation",
      caption: "Hot mix asphalt paving with sensor-guided asphalt paver on arterial road.",
      category: "Road Construction",
      imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
      altText: "Asphalt paver laying bituminous concrete",
      order: 2
    },
    {
      title: "Sub-base Compaction & Grading",
      caption: "Heavy CAT motor grader and vibratory compactor preparing crushed aggregate base.",
      category: "Machinery",
      imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
      altText: "CAT Motor Grader working on road sub-base",
      order: 3
    },
    {
      title: "Reinforced Concrete Civil Structure",
      caption: "RCC foundation and column structural construction for commercial facility.",
      category: "Building Construction",
      imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      altText: "Reinforced concrete building construction",
      order: 4
    },
    {
      title: "Heavy Controlled Demolition",
      caption: "Hydraulic breaker and shear excavator dismantling reinforced concrete structure.",
      category: "Site Work",
      imageUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80",
      altText: "Hydraulic breaker dismantling concrete structure",
      order: 5
    },
    {
      title: "Logistics Hub Ground Engineering",
      caption: "Comprehensive deep soil stabilization and drainage apron construction.",
      category: "Completed Projects",
      imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
      altText: "Industrial ground engineering and pavement works",
      order: 6
    }
  ];

  await prisma.galleryItem.deleteMany();
  for (const item of gallery) {
    await prisma.galleryItem.create({ data: item });
  }
  console.log("Gallery seeded.");

  // 7. Initial Client Reviews / Testimonials
  const testimonials = [
    {
      authorName: "Engr. Tariq Mahmood",
      authorTitle: "Senior Project Coordinator",
      company: "National Highway & Infrastructure Partner",
      quote: "MR. Construction's fleet deployment and asphalt paving precision on our highway corridor sections have been exemplary. Their adherence to NHA and AASHTO compaction specifications delivered a superior road surface ahead of schedule.",
      rating: 5,
      order: 1,
      isActive: true,
    },
    {
      authorName: "Khurram Shahzad",
      authorTitle: "Resident Engineer",
      company: "Karachi Sector Urban Development",
      quote: "Exceptional earthmoving and subgrade stabilization capability. Muhammad Raaziq and his team mobilized CAT graders and vibratory rollers within 24 hours of contract award. Outstanding civil engineering integrity.",
      rating: 5,
      order: 2,
      isActive: true,
    },
    {
      authorName: "Hamza Farooq",
      authorTitle: "Operations Director",
      company: "Sindh Logistics & Freight Terminal Hub",
      quote: "High-tonnage dynamic compaction and concrete hardstanding aprons executed with zero safety incidents. The quality of aggregate base and storm drainage culverts surpassed our structural audits.",
      rating: 5,
      order: 3,
      isActive: true,
    },
    {
      authorName: "Bilal Ahmed Khan",
      authorTitle: "Managing Partner",
      company: "Coastal Commercial Development",
      quote: "Controlled mechanical structural demolition executed flawlessly in high-density urban Karachi. Debris crushing and dust suppression misting systems met strict environmental standards. Highly recommended.",
      rating: 5,
      order: 4,
      isActive: true,
    }
  ];

  await prisma.testimonial.deleteMany();
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log("Testimonials seeded.");

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
