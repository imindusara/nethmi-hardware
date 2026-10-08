export const fallbackSettings = {
  site_name: 'Nethmi Online Tool Shop',
  tagline: 'Everything You Need to Build, Fix and Create',
  logo_url: '/logo.png',
  phone: '+94 78 999 1624',
  phone_secondary: '+94 11 234 5678',
  whatsapp: '94789991624',
  email: 'info@nethmihardware.com',
  address: 'No. 142, Kandy Road, Kiribathgoda, Sri Lanka',
  opening_hours: 'Mon - Sat: 7:30 AM - 6:30 PM | Sunday: 8:00 AM - 1:00 PM',
  currency: 'Rs.',
  currency_code: 'LKR',
  facebook_url: 'https://facebook.com/nethmihardware',
  instagram_url: 'https://instagram.com/nethmihardware',
  tiktok_url: 'https://tiktok.com/@nethmihardware',
  hero_title: 'Everything You Need to Build & Create',
  hero_subtitle: 'Contractor-grade power tools, SLS-certified cement, steel rebars, S-Lon plumbing, and Kelani cables with unbeatable wholesale rates.',
  offer_banner_text: '⚡ Monsoon Renovation Sale: Up to 20% OFF on Selected Power Tools & Waterproofing Paints!',
  google_map_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63364.305943485015!2d79.8893632!3d6.9748682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae257f864f7a77d%3A0x6b7a59960ff14ab2!2sKiribathgoda!5e0!3m2!1sen!2slk!4v1710000000000!5m2!1sen!2slk'
};

export const fallbackCategories = [
  {
    id: 1,
    name: 'Paint, Sealant & Adhesives',
    slug: 'paint-sealant-adhesives',
    description: 'Waterproofing chemicals, M-Seal epoxy, Hasky paint brushes, and Dulux emulsions.',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
    icon: 'Paintbrush',
    product_count: 14
  },
  {
    id: 2,
    name: 'Bathroom & Plumbing',
    slug: 'bathroom-plumbing',
    description: 'S-Lon PVC pipes, brass ball valves, water pumps, overhead tanks, and tap fittings.',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80',
    icon: 'Droplets',
    product_count: 18
  },
  {
    id: 3,
    name: 'Power Tools & Machinery',
    slug: 'power-tools',
    description: 'Heavy duty cordless drills, angle grinders, cut-off saws, and demolition hammers.',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    icon: 'Wrench',
    product_count: 22
  },
  {
    id: 4,
    name: 'Building Materials & Cement',
    slug: 'building-materials',
    description: 'SLS-certified Tokyo cement, Lanwa steel rebar, binding wire, and sand blocks.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    icon: 'Building',
    product_count: 16
  },
  {
    id: 5,
    name: 'Electrical & Lighting',
    slug: 'electrical',
    description: 'Kelani & ACL cables, Orange Electric switches, circuit breakers, and conduit accessories.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    icon: 'Zap',
    product_count: 19
  },
  {
    id: 6,
    name: 'Hand Tools & Hardware',
    slug: 'hand-tools',
    description: 'Claw hammers, screwdriver sets, measuring tapes, spirit levels, and pliers.',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80',
    icon: 'Hammer',
    product_count: 15
  },
  {
    id: 7,
    name: 'Fasteners, Screws & Nails',
    slug: 'fasteners',
    description: 'GI roofing screws, rawl plugs, steel anchor bolts, drywall screws, and wire nails.',
    image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80',
    icon: 'Nut',
    product_count: 28
  },
  {
    id: 8,
    name: 'Safety Equipment & Gear',
    slug: 'safety-gear',
    description: 'Industrial safety helmets, steel-toe boots, high-visibility vests, and heavy work gloves.',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    icon: 'ShieldCheck',
    product_count: 12
  }
];

export const fallbackProducts = [
  // 1. Paint, Sealant & Adhesives (Matches exact screenshot)
  {
    id: 1,
    name: 'Cement: 2K Superseal – Water Proofer (30Kg) – Tokyo Super',
    slug: 'cement-2k-superseal-water-proofer-30kg',
    category_id: 1,
    category_slug: 'paint-sealant-adhesives',
    category_name: 'Paint, Sealant & Adhesives',
    sku: 'TOKYO-2K-30KG',
    brand: 'Tokyo Super',
    price: 45000,
    offer_price: 27000,
    is_on_offer: 1,
    is_featured: 1,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Two-component acrylic modified cementitious waterproofing coating for concrete roofs, bathrooms, and water tanks.',
    description: 'Tokyo Superseal 2K is a heavy-duty polymer modified waterproof slurry coat designed to resist positive water pressure up to 5 bar.',
    specifications: { "Weight": "30 Kg (Pack)", "Mixing Ratio": "Pre-dosed 2-Component", "Coverage": "1.5 - 2.0 kg/m² per coat" }
  },
  {
    id: 2,
    name: 'Cement: 2K Superseal – Water Proofer (15Kg) – Tokyo Super',
    slug: 'cement-2k-superseal-water-proofer-15kg',
    category_id: 1,
    category_slug: 'paint-sealant-adhesives',
    category_name: 'Paint, Sealant & Adhesives',
    sku: 'TOKYO-2K-15KG',
    brand: 'Tokyo Super',
    price: 23000,
    offer_price: 13800,
    is_on_offer: 1,
    is_featured: 1,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Compact 15kg two-part waterproofing kit ideal for residential balconies, sunken slabs, and bathroom waterproofing.',
    description: 'Provides flexible elastic seamless membrane that bridges hairline cracks in concrete structures.',
    specifications: { "Weight": "15 Kg (Pack)", "Application": "Brush / Trowel Applied", "Drying Time": "4 - 6 Hours" }
  },
  {
    id: 3,
    name: 'Adhesive: General Purpose Epoxy Compound (100g) – M-Seal By Fevicol',
    slug: 'adhesive-general-purpose-epoxy-compound-100g-mseal',
    category_id: 1,
    category_slug: 'paint-sealant-adhesives',
    category_name: 'Paint, Sealant & Adhesives',
    sku: 'MSEAL-100G',
    brand: 'M-Seal',
    price: 530,
    offer_price: 451,
    is_on_offer: 1,
    is_featured: 1,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Fast-setting two-part epoxy putty for sealing pipe leaks, joining metal, ceramics, and filling gaps.',
    description: 'M-Seal cures at room temperature to form a hard metallic mass that can be drilled, filed, and painted over.',
    specifications: { "Weight": "100g Pack", "Curing Time": "30 - 45 Minutes", "Resistant": "Water, Oil, Steam" }
  },
  {
    id: 4,
    name: 'Paint Brush: 3/4" Paint Brush – Hasky',
    slug: 'paint-brush-3-4-inch-hasky',
    category_id: 1,
    category_slug: 'paint-sealant-adhesives',
    category_name: 'Paint, Sealant & Adhesives',
    sku: 'HASKY-BRUSH-3-4IN',
    brand: 'Hasky',
    price: 400,
    offer_price: 340,
    is_on_offer: 1,
    is_featured: 0,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Pure natural bristle paint brush with solid wooden handle for trim, corners, and precision varnish work.',
    description: 'Stainless steel ferrule with high bristle retention for smooth oil and water-based paint applications.',
    specifications: { "Size": "3/4 Inch (19mm)", "Bristles": "Natural Black Boar Bristle", "Handle": "Polished Wood" }
  },
  {
    id: 5,
    name: 'Paint Brush: 1/4" Paint Brush – Hasky',
    slug: 'paint-brush-1-4-inch-hasky',
    category_id: 1,
    category_slug: 'paint-sealant-adhesives',
    category_name: 'Paint, Sealant & Adhesives',
    sku: 'HASKY-BRUSH-1-4IN',
    brand: 'Hasky',
    price: 335,
    offer_price: 285,
    is_on_offer: 1,
    is_featured: 0,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Fine detail 1/4 inch paint brush for intricate woodworking corners, window frames, and crafts.',
    description: 'Ergonomic slim grip wooden handle with durable bristles that maintain shape under solvent exposure.',
    specifications: { "Size": "1/4 Inch (6mm)", "Bristles": "Pure Fine Bristle", "Usage": "Detailing & Touch-ups" }
  },

  // 2. Bathroom & Plumbing (Matches exact screenshot)
  {
    id: 6,
    name: 'Plumbing: S-Lon PVC Ball Valve 1" – S-Lon Lanka',
    slug: 'plumbing-slon-pvc-ball-valve-1-inch',
    category_id: 2,
    category_slug: 'bathroom-plumbing',
    category_name: 'Bathroom & Plumbing',
    sku: 'SLON-BV-1IN',
    brand: 'S-Lon',
    price: 1200,
    offer_price: 980,
    is_on_offer: 1,
    is_featured: 1,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'High pressure molded uPVC full-port ball valve with smooth quarter-turn handle operation.',
    description: 'Conforms to SLS standards for cold potable water installations, leak-proof PTFE seat seals.',
    specifications: { "Size": "1 Inch (32mm)", "Material": "Lead-free uPVC", "Working Pressure": "PN16" }
  },
  {
    id: 7,
    name: 'Water Tank: 1000L Triple Layer Overhead Water Tank – National',
    slug: 'water-tank-1000l-triple-layer-overhead-national',
    category_id: 2,
    category_slug: 'bathroom-plumbing',
    category_name: 'Bathroom & Plumbing',
    sku: 'TANK-NAT-1000L',
    brand: 'National',
    price: 32000,
    offer_price: 27200,
    is_on_offer: 1,
    is_featured: 1,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Food-grade antimicrobial 3-layer UV stabilized rotomolded polyethylene water storage tank.',
    description: 'Keeps water cool during hot sunny days and prevents algae growth inside the tank with thick black carbon layer.',
    specifications: { "Capacity": "1000 Liters", "Layers": "3-Layer Antibacterial", "Warranty": "10 Years Manufacturer" }
  },
  {
    id: 8,
    name: 'Water Pump: 0.5HP Peripheral Clean Water Pump – Jialishi',
    slug: 'water-pump-0-5hp-peripheral-clean-water-jialishi',
    category_id: 2,
    category_slug: 'bathroom-plumbing',
    category_name: 'Bathroom & Plumbing',
    sku: 'PUMP-QB60-05HP',
    brand: 'Jialishi',
    price: 19500,
    offer_price: 16575,
    is_on_offer: 1,
    is_featured: 1,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Compact brass impeller domestic water booster pump with thermal overload protection.',
    description: 'Perfect for pumping well water into overhead rooftop tanks in 1-2 story domestic residences.',
    specifications: { "Power": "0.5 HP (370W)", "Max Head": "35 Meters", "Max Flow": "35 L/min" }
  },
  {
    id: 9,
    name: 'Plumbing: Brass Bib Cock Tap 1/2" Heavy – DSI Chrome',
    slug: 'plumbing-brass-bib-cock-tap-half-inch-dsi',
    category_id: 2,
    category_slug: 'bathroom-plumbing',
    category_name: 'Bathroom & Plumbing',
    sku: 'TAP-BRASS-BIB-05IN',
    brand: 'DSI Chrome',
    price: 2400,
    offer_price: 1990,
    is_on_offer: 1,
    is_featured: 0,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Solid forged brass body outdoor garden and bathroom wall-mount bib tap with triple chrome finish.',
    description: 'Tested against drip leaks with heavy-duty ceramic cartridge valve for over 100,000 turn cycles.',
    specifications: { "Thread": "1/2 Inch BSP Male", "Finish": "Mirror Chrome Plated", "Body": "Solid Brass" }
  },
  {
    id: 10,
    name: 'Plumbing: Flexible Hose Pipe 1/2" SS 450mm – S-Lon',
    slug: 'plumbing-flexible-hose-pipe-half-inch-ss-450mm',
    category_id: 2,
    category_slug: 'bathroom-plumbing',
    category_name: 'Bathroom & Plumbing',
    sku: 'SLON-FLEX-450MM',
    brand: 'S-Lon',
    price: 850,
    offer_price: 720,
    is_on_offer: 1,
    is_featured: 0,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Braided 304 stainless steel connector hose with brass hex nuts for washbasins and water geysers.',
    description: 'Burst-proof EPDM internal rubber core capable of withstanding hot water temperatures and high city pressure.',
    specifications: { "Length": "450 mm (18 inch)", "Nuts": "1/2 Inch Brass Female x Female", "Material": "SS 304" }
  },

  // 3. Power Tools & Machinery
  {
    id: 11,
    name: 'Power Tool: Bosch GSB 18V-50 Cordless Brushless Impact Drill Kit – Bosch',
    slug: 'bosch-gsb-18v-50-cordless-drill',
    category_id: 3,
    category_slug: 'power-tools',
    category_name: 'Power Tools & Machinery',
    sku: 'BOSCH-GSB-18V50',
    brand: 'Bosch',
    price: 48500,
    offer_price: 42900,
    is_on_offer: 1,
    is_featured: 1,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Heavy duty 18V brushless impact drill with 2x 2.0Ah lithium batteries, charger and carry case.',
    description: 'Delivers intelligent brushless motor efficiency for metal drilling, masonry, and high-torque screw driving.',
    specifications: { "Voltage": "18V", "Max Torque": "50 Nm", "Speed": "0 - 1,800 RPM" }
  },
  {
    id: 12,
    name: 'Power Tool: Makita 4-Inch Angle Grinder 840W Heavy Duty – Makita',
    slug: 'makita-4-inch-angle-grinder-840w',
    category_id: 3,
    category_slug: 'power-tools',
    category_name: 'Power Tools & Machinery',
    sku: 'MAKITA-9557HN',
    brand: 'Makita',
    price: 18500,
    offer_price: 16200,
    is_on_offer: 1,
    is_featured: 1,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Compact 840W industrial grinder with labyrinth dust seal for metal fabrication and concrete cutting.',
    description: 'All-ball bearing motor assembly designed for continuous contractor grinding applications.',
    specifications: { "Power": "840W", "Wheel Diameter": "100 mm (4\")", "Speed": "11,000 RPM" }
  },
  {
    id: 13,
    name: 'Power Tool: Ingco 2200W Professional Cut-Off Machine 355mm – Ingco',
    slug: 'ingco-2200w-cut-off-machine-355mm',
    category_id: 3,
    category_slug: 'power-tools',
    category_name: 'Power Tools & Machinery',
    sku: 'INGCO-COS223589',
    brand: 'Ingco',
    price: 34500,
    offer_price: null,
    is_on_offer: 0,
    is_featured: 1,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Heavy duty 14-inch metal chop saw for fast cutting of structural steel pipes and angle irons.',
    description: 'High-torque copper motor with quick-release vise lock and heavy steel stamped base.',
    specifications: { "Power": "2200W", "Blade": "355 mm (14 inch)", "No Load Speed": "3700 RPM" }
  },
  {
    id: 14,
    name: 'Power Tool: Ingco 600W Variable Speed Dust Blower – Ingco',
    slug: 'ingco-600w-variable-speed-dust-blower',
    category_id: 3,
    category_slug: 'power-tools',
    category_name: 'Power Tools & Machinery',
    sku: 'INGCO-AB6008',
    brand: 'Ingco',
    price: 8900,
    offer_price: 7500,
    is_on_offer: 1,
    is_featured: 0,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Powerful 600W electric air blower with vacuum dust bag for workshop and site cleaning.',
    description: 'Variable speed dial allows adjustment of air velocity for delicate electronics or heavy workshop debris.',
    specifications: { "Power": "600W", "Blowing Rate": "0 - 3.5 m³/min", "Variable Speed": "Yes" }
  },
  {
    id: 15,
    name: 'Power Tool: MMA-200 Inverter Arc Welding Machine IGBT – Jasic',
    slug: 'mma-200-inverter-arc-welding-machine-jasic',
    category_id: 3,
    category_slug: 'power-tools',
    category_name: 'Power Tools & Machinery',
    sku: 'JASIC-MMA-200',
    brand: 'Jasic',
    price: 38000,
    offer_price: 32300,
    is_on_offer: 1,
    is_featured: 0,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Digital display portable IGBT inverter welder with hot start and anti-stick arc control.',
    description: 'Smooth arc ignition suitable for welding mild steel, stainless steel, and alloy steel rods from 2.5mm to 4.0mm.',
    specifications: { "Current Range": "20 - 200 Amps", "Technology": "IGBT Inverter", "Weight": "4.8 kg" }
  },

  // 4. Building Materials & Cement
  {
    id: 16,
    name: 'Cement: Tokyo Super Portland Pozzolana Cement 50kg – Tokyo Super',
    slug: 'tokyo-super-cement-50kg-sls-1247',
    category_id: 4,
    category_slug: 'building-materials',
    category_name: 'Building Materials & Cement',
    sku: 'TOKYO-CEMENT-50KG',
    brand: 'Tokyo Super',
    price: 2450,
    offer_price: 2350,
    is_on_offer: 1,
    is_featured: 1,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Factory-fresh SLS 1247 certified Portland Pozzolana blended cement for residential construction.',
    description: 'Engineered for high compressive strength, low heat of hydration, and superior crack resistance.',
    specifications: { "Standard": "SLS 1247", "Weight": "50 kg Bag", "Delivery": "Lorry Delivery Available" }
  },
  {
    id: 17,
    name: 'Rebar: RB Deformed Steel Rebar 12mm x 6m – Lanwa / Melwire',
    slug: 'rb-deformed-steel-rebar-12mm-6m',
    category_id: 4,
    category_slug: 'building-materials',
    category_name: 'Building Materials & Cement',
    sku: 'STEEL-TMT-12MM-6M',
    brand: 'Lanwa / Melwire',
    price: 3650,
    offer_price: null,
    is_on_offer: 0,
    is_featured: 1,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Certified RB 500W Grade QST thermo-mechanically treated reinforcement rebars.',
    description: 'High tensile strength rebars for structural foundations, columns, beams, and suspended concrete slabs.',
    specifications: { "Diameter": "12 mm", "Length": "6 meters (20 ft)", "Standard": "SLS 375" }
  },
  {
    id: 18,
    name: 'Fastener: GI Binding Wire 20 Gauge (1kg Bundle) – SLS Certified',
    slug: 'gi-binding-wire-20-gauge-1kg',
    category_id: 4,
    category_slug: 'building-materials',
    category_name: 'Building Materials & Cement',
    sku: 'WIRE-GI-20G-1KG',
    brand: 'SLS Certified',
    price: 550,
    offer_price: 480,
    is_on_offer: 1,
    is_featured: 0,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Soft annealed galvanized iron tying wire for rebar cage tying and scaffolding.',
    description: 'Pliable and easy to tie without snapping under torsion during steel fixing.',
    specifications: { "Gauge": "20 BWG", "Coating": "Hot Dip Galvanized", "Pack": "1 kg Coil" }
  },
  {
    id: 19,
    name: 'Masonry: Concrete Hollow Blocks 4x8x16 – Premium Grade',
    slug: 'concrete-hollow-blocks-4x8x16',
    category_id: 4,
    category_slug: 'building-materials',
    category_name: 'Building Materials & Cement',
    sku: 'BLOCK-HOLLOW-4X8X16',
    brand: 'Apex Masonry',
    price: 120,
    offer_price: null,
    is_on_offer: 0,
    is_featured: 0,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Machine-vibrated steam cured concrete partition blocks for perimeter walls and internal partitions.',
    description: 'High compressive strength with uniform sharp corners for faster mortar laying.',
    specifications: { "Dimensions": "4\" x 8\" x 16\"", "Type": "Hollow Partition Block", "Strength": "> 3.5 N/mm²" }
  },
  {
    id: 20,
    name: 'Waterproofing: Dr. Fixit Super Latex SBR Waterproofing 5L – Pidilite',
    slug: 'dr-fixit-super-latex-sbr-waterproofing-5l',
    category_id: 4,
    category_slug: 'building-materials',
    category_name: 'Building Materials & Cement',
    sku: 'DRFIXIT-SBR-5L',
    brand: 'Dr. Fixit',
    price: 7800,
    offer_price: 6630,
    is_on_offer: 1,
    is_featured: 0,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Styrene Butadiene rubber polymer bonding agent for repair mortar, screeds and structural waterproofing.',
    description: 'Enhances bond strength of old-to-new concrete and increases water impermeability.',
    specifications: { "Volume": "5 Liters", "Polymer": "SBR Latex", "Dosage": "1 Liter per 50kg Cement" }
  }
];

export const fallbackTestimonials = [
  {
    id: 1,
    name: 'Kamal Perera',
    role: 'Civil Contractor, Kiribathgoda',
    comment: 'Nethmi Hardware has been our go-to partner for over 5 years. Their prompt cement and steel delivery directly to our project sites has saved us countless work hours.',
    rating: 5
  },
  {
    id: 2,
    name: 'Eng. Samantha Dias',
    role: 'Site Engineer, Kelaniya',
    comment: '100% genuine SLS certified products. I never have to worry about sub-standard cables or counterfeit power tools when buying from Nethmi Hardware.',
    rating: 5
  }
];
