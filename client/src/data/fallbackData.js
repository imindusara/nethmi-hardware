export const fallbackSettings = {
  site_name: 'Nethmi Hardware',
  tagline: 'Everything You Need to Build, Fix and Create',
  phone: '+94 77 123 4567',
  phone_secondary: '+94 11 234 5678',
  whatsapp: '94771234567',
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
    name: 'Power Tools',
    slug: 'power-tools',
    description: 'Heavy duty cordless drills, angle grinders, circular saws, and demolition hammers.',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    icon: 'Wrench',
    product_count: 5
  },
  {
    id: 2,
    name: 'Building Materials',
    slug: 'building-materials',
    description: 'SLS-certified Portland cement, deformed steel bars, sand, and aggregate blocks.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    icon: 'Building',
    product_count: 4
  },
  {
    id: 3,
    name: 'Hand Tools',
    slug: 'hand-tools',
    description: 'Forged hammers, screwdrivers, wrenches, measuring tapes, and mason trowels.',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    icon: 'Hammer',
    product_count: 3
  },
  {
    id: 4,
    name: 'Plumbing Supplies',
    slug: 'plumbing',
    description: 'PVC pipes, S-Lon brass ball valves, water pumps, pipe fittings, and sealants.',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80',
    icon: 'Droplets',
    product_count: 3
  },
  {
    id: 5,
    name: 'Electrical & Lighting',
    slug: 'electrical',
    description: 'Kelani cables, MCB circuit breakers, LED battens, conduit pipes, and wall sockets.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    icon: 'Zap',
    product_count: 3
  },
  {
    id: 6,
    name: 'Paint & Accessories',
    slug: 'paint-accessories',
    description: 'Dulux weather-shield emulsions, primers, rollers, scrapers, and thinner cans.',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
    icon: 'Paintbrush',
    product_count: 3
  },
  {
    id: 7,
    name: 'Fasteners & Hardware',
    slug: 'fasteners',
    description: 'Hex bolts, drywall screws, rawl bolts, SS hinges, tower bolts, and padlocks.',
    image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80',
    icon: 'Nut',
    product_count: 3
  },
  {
    id: 8,
    name: 'Safety & Protection',
    slug: 'safety-gear',
    description: 'Site safety helmets, steel-toe boots, high-vis vests, ear defenders, and masks.',
    image: 'https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?auto=format&fit=crop&w=800&q=80',
    icon: 'ShieldCheck',
    product_count: 3
  }
];

export const fallbackProducts = [
  {
    id: 1,
    name: 'Bosch GSB 18V-50 Cordless Brushless Impact Drill Kit',
    slug: 'bosch-gsb-18v-50-cordless-drill',
    category_id: 1,
    category_slug: 'power-tools',
    category_name: 'Power Tools',
    sku: 'BOSCH-GSB-18V50',
    brand: 'Bosch',
    price: 48500,
    offer_price: 42900,
    is_on_offer: 1,
    is_featured: 1,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Heavy duty 18V brushless motor impact drill with 2x 2.0Ah lithium batteries, charger and carry case.',
    description: 'The Bosch GSB 18V-50 Professional delivers powerful performance with an intelligent brushless motor that communicates directly with the electronics.',
    specifications: { "Voltage": "18V", "Max Torque": "50 Nm", "No-load Speed": "0 - 1,800 rpm", "Chuck Capacity": "1.5 - 13 mm" }
  },
  {
    id: 2,
    name: 'Makita 4-Inch Angle Grinder 840W Heavy Duty',
    slug: 'makita-4-inch-angle-grinder-840w',
    category_id: 1,
    category_slug: 'power-tools',
    category_name: 'Power Tools',
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
    short_description: 'Compact 840W industrial grinder with labyrinth construction seal to protect motor from abrasive dust.',
    description: 'Equipped with a machined bevel gear set and high heat-resistance armature for steel cutting and weld deburring.',
    specifications: { "Power Input": "840W", "Wheel Diameter": "100 mm (4 inch)", "Speed": "11,000 RPM", "Weight": "2.1 kg" }
  },
  {
    id: 3,
    name: 'Ingco 2200W Professional Cut-Off Machine 355mm',
    slug: 'ingco-2200w-cut-off-machine-355mm',
    category_id: 1,
    category_slug: 'power-tools',
    category_name: 'Power Tools',
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
    short_description: 'Heavy duty 14-inch metal chop saw for fast cutting of steel pipes, angles and rebars.',
    description: 'High-torque 2200W motor with spark deflection guard and quick-clamp vise mechanism.',
    specifications: { "Power": "2200W", "Blade Size": "355 mm (14 inch)", "No Load Speed": "3700 RPM" }
  },
  {
    id: 4,
    name: 'Tokyo Super Portland Pozzolana Cement 50kg (SLS 1247)',
    slug: 'tokyo-super-cement-50kg-sls-1247',
    category_id: 2,
    category_slug: 'building-materials',
    category_name: 'Building Materials',
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
    short_description: 'Sri Lanka standard certified blended hydraulic cement for high early strength and long-term durability.',
    description: 'Factory-fresh Tokyo Super Portland Pozzolana cement engineered for residential columns, slabs, plastering, and brick masonry.',
    specifications: { "Standard": "SLS 1247 / SLS 107", "Weight": "50 kg bag", "Delivery": "Direct site lorry delivery available" }
  },
  {
    id: 5,
    name: 'RB Deformed Steel Rebar 12mm x 6m (QST / TMT SLS 375)',
    slug: 'rb-deformed-steel-rebar-12mm-6m',
    category_id: 2,
    category_slug: 'building-materials',
    category_name: 'Building Materials',
    sku: 'STEEL-TMT-12MM-6M',
    brand: 'Melwire / Lanwa',
    price: 3650,
    offer_price: null,
    is_on_offer: 0,
    is_featured: 1,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'High-strength thermo-mechanically treated reinforcement steel bars for structural foundation work.',
    description: 'Certified 500W Grade QST steel rebars tested for high ductility, bendability and seismic performance.',
    specifications: { "Diameter": "12 mm", "Length": "6 meters (20 ft)", "Grade": "RB 500W SLS 375" }
  },
  {
    id: 6,
    name: 'S-Lon PVC Pressure Pipe 1-Inch (Class 1000 - 4m)',
    slug: 'slon-pvc-pressure-pipe-1-inch-4m',
    category_id: 4,
    category_slug: 'plumbing',
    category_name: 'Plumbing Supplies',
    sku: 'SLON-PVC-1IN-4M',
    brand: 'S-Lon',
    price: 1850,
    offer_price: null,
    is_on_offer: 0,
    is_featured: 1,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Original lead-free S-Lon drinking water supply pipe conforming to SLS 147.',
    description: 'Safe for potable drinking water, high pressure resistant, UV stabilized for outdoor and concealed plumbing.',
    specifications: { "Size": "1 Inch (32mm OD)", "Length": "4 meters", "Pressure Rating": "Class 1000 / Type 10" }
  },
  {
    id: 7,
    name: 'Kelani Single Core 7/0.67mm (2.5 sq.mm) Pure Copper Cable 100m',
    slug: 'kelani-single-core-2-5-sqmm-cable-100m',
    category_id: 5,
    category_slug: 'electrical',
    category_name: 'Electrical & Lighting',
    sku: 'KELANI-7-067-100M',
    brand: 'Kelani Cables',
    price: 24500,
    offer_price: 22800,
    is_on_offer: 1,
    is_featured: 1,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'SLS 733 certified 99.9% pure annealed copper electrical wiring coil for power socket circuits.',
    description: '100% genuine Kelani cables offering superior insulation flame retardancy and minimal voltage drop.',
    specifications: { "Conductor": "7/0.67mm (2.5mm²)", "Coil Length": "100 meters", "Voltage Grade": "450/750V" }
  },
  {
    id: 8,
    name: 'Dulux Weathershield Exterior Emulsion Paint 10L Brilliant White',
    slug: 'dulux-weathershield-exterior-paint-10l',
    category_id: 6,
    category_slug: 'paint-accessories',
    category_name: 'Paint & Accessories',
    sku: 'DULUX-WS-10L-WHITE',
    brand: 'Dulux',
    price: 32500,
    offer_price: 29800,
    is_on_offer: 1,
    is_featured: 1,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Premium exterior elastomeric paint with Smart Release algae and fungus resistant technology.',
    description: 'Engineered for tropical Sri Lankan monsoon rains and intense UV sunlight to prevent peeling and hairline cracks.',
    specifications: { "Volume": "10 Liters", "Coverage": "13 - 15 m² / Liter / coat", "Finish": "Low Sheen Smooth" }
  },
  {
    id: 9,
    name: 'Stanley Professional 8-Meter PowerLock Measuring Tape',
    slug: 'stanley-powerlock-8m-measuring-tape',
    category_id: 3,
    category_slug: 'hand-tools',
    category_name: 'Hand Tools',
    sku: 'STANLEY-33-428',
    brand: 'Stanley',
    price: 2950,
    offer_price: null,
    is_on_offer: 0,
    is_featured: 0,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Mylar coated steel blade with Tru-Zero end hook and die-cast metal chrome case.',
    description: 'The contractor standard measuring tape trusted across job sites for precise architectural measurements.',
    specifications: { "Length": "8 meters (26 ft)", "Blade Width": "25 mm", "Case": "Chrome-plated ABS" }
  },
  {
    id: 10,
    name: 'High-Tensile Hex Head Bolts M10x30 with Nylon Lock Nuts (Pack of 50)',
    slug: 'high-tensile-hex-bolts-m10x30-50pk',
    category_id: 7,
    category_slug: 'fasteners',
    category_name: 'Fasteners & Hardware',
    sku: 'BOLT-HT-M10X30-50PK',
    brand: 'Apex Fasteners',
    price: 2150,
    offer_price: 1850,
    is_on_offer: 1,
    is_featured: 0,
    stock_status: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80'
    ],
    short_description: 'Grade 8.8 zinc-plated structural hex bolts with matching washers and nyloc locking nuts.',
    description: 'Precision forged metric thread fasteners suitable for machinery, metal framing, and roof truss connections.',
    specifications: { "Size": "M10 x 30 mm", "Grade": "8.8 High Tensile Steel", "Coating": "Yellow / White Zinc Plated" }
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
