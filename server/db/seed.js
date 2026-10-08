import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { getDb, run, query, saveDb } from './database.js';

dotenv.config();

export async function seedDatabase() {
  console.log('🌱 Seeding Nethmi Hardware database...');
  const db = await getDb();

  // 1. Admin Seeding
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(adminPassword, salt);

  const existingAdmin = await query('SELECT * FROM admins WHERE username = ?', [adminUsername]);
  if (existingAdmin.length === 0) {
    await run('INSERT INTO admins (username, password_hash) VALUES (?, ?)', [adminUsername, passwordHash]);
    console.log(`✅ Default admin created: ${adminUsername} (Password: ${adminPassword})`);
  } else {
    console.log(`ℹ️ Admin user ${adminUsername} already exists.`);
  }

  // 2. Settings Seeding
  const defaultSettings = [
    { key: 'site_name', value: 'Nethmi Online Tool Shop' },
    { key: 'tagline', value: 'Everything You Need to Build, Fix and Create' },
    { key: 'phone', value: '+94 78 999 1624' },
    { key: 'phone_secondary', value: '+94 11 234 5678' },
    { key: 'whatsapp', value: '94789991624' },
    { key: 'email', value: 'info@nethmihardware.com' },
    { key: 'address', value: 'No. 142, Kandy Road, Kiribathgoda, Sri Lanka' },
    { key: 'opening_hours', value: 'Mon - Sat: 7:30 AM - 6:30 PM | Sunday: 8:00 AM - 1:00 PM' },
    { key: 'currency', value: 'Rs.' },
    { key: 'currency_code', value: 'LKR' },
    { key: 'facebook_url', value: 'https://facebook.com/nethmihardware' },
    { key: 'instagram_url', value: 'https://instagram.com/nethmihardware' },
    { key: 'tiktok_url', value: 'https://tiktok.com/@nethmihardware' },
    { key: 'hero_title', value: 'Build Stronger. Repair Smarter. Create Better.' },
    { key: 'hero_subtitle', value: 'Sri Lanka’s trusted hardware store supplying contractor-grade power tools, genuine building materials, electricals, plumbing, and safety equipment.' },
    { key: 'offer_banner_text', value: '⚡ Monsoon Renovation Sale: Up to 20% OFF on Selected Power Tools & Waterproofing Paints!' },
    { key: 'google_map_embed', value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63364.305943485015!2d79.8893632!3d6.9748682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae257f864f7a77d%3A0x6b7a59960ff14ab2!2sKiribathgoda!5e0!3m2!1sen!2slk!4v1710000000000!5m2!1sen!2slk' }
  ];

  for (const s of defaultSettings) {
    const exists = await query('SELECT * FROM settings WHERE key = ?', [s.key]);
    if (exists.length === 0) {
      await run('INSERT INTO settings (key, value) VALUES (?, ?)', [s.key, s.value]);
    }
  }
  console.log('✅ Default settings seeded.');

  // 3. Categories Seeding
  const categories = [
    {
      name: 'Power Tools',
      slug: 'power-tools',
      description: 'Heavy duty cordless drills, angle grinders, circular saws, and demolition hammers.',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      icon: 'Wrench'
    },
    {
      name: 'Building Materials',
      slug: 'building-materials',
      description: 'Premium Portland cement, reinforcement bars, sand, brick binders, and masonry supplies.',
      image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80',
      icon: 'Building'
    },
    {
      name: 'Hand Tools',
      slug: 'hand-tools',
      description: 'Durable claw hammers, screwdrivers, pliers, socket sets, and measuring tapes.',
      image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
      icon: 'Hammer'
    },
    {
      name: 'Plumbing Supplies',
      slug: 'plumbing',
      description: 'PVC pipes, S-Lon fittings, ball valves, brass taps, water pumps, and solvent cement.',
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
      icon: 'Droplets'
    },
    {
      name: 'Electrical & Lighting',
      slug: 'electrical',
      description: 'Kelani & ACL cables, LED spotlights, distribution boxes, circuit breakers, and switches.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      icon: 'Zap'
    },
    {
      name: 'Paint & Accessories',
      slug: 'paint-accessories',
      description: 'Dulux and Robbialac emulsion paints, weather-shield coats, brushes, and rollers.',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
      icon: 'Paintbrush'
    },
    {
      name: 'Fasteners & Hardware',
      slug: 'fasteners',
      description: 'Stainless steel anchor bolts, wood screws, drywall screws, nuts, and galvanized washers.',
      image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80',
      icon: 'Nut'
    },
    {
      name: 'Safety & Protection',
      slug: 'safety-gear',
      description: 'Industrial hard hats, steel-toe safety boots, high-visibility vests, and cut-resistant gloves.',
      image: 'https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?auto=format&fit=crop&w=800&q=80',
      icon: 'ShieldCheck'
    }
  ];

  for (const cat of categories) {
    const existing = await query('SELECT * FROM categories WHERE slug = ?', [cat.slug]);
    if (existing.length === 0) {
      await run(
        'INSERT INTO categories (name, slug, description, image, icon) VALUES (?, ?, ?, ?, ?)',
        [cat.name, cat.slug, cat.description, cat.image, cat.icon]
      );
    }
  }
  console.log('✅ Categories seeded (8 categories).');

  // Fetch category IDs
  const catRows = await query('SELECT id, slug FROM categories');
  const catMap = {};
  catRows.forEach(c => { catMap[c.slug] = c.id; });

  // 4. Products Seeding (24 realistic products)
  const products = [
    // Power Tools (3)
    {
      name: 'Ingco 20V Cordless Brushless Impact Drill',
      slug: 'ingco-20v-cordless-brushless-impact-drill',
      category_id: catMap['power-tools'],
      brand: 'Ingco',
      sku: 'PT-ING-20V-01',
      price: 26500,
      offer_price: 23900,
      stock_status: 'In Stock',
      short_description: 'Industrial brushless motor with 2x 2.0Ah lithium-ion batteries and fast charger.',
      description: 'Experience effortless masonry, metal, and wood drilling with this heavy-duty 20V brushless impact drill from Ingco. Features dual-speed gear transmission, 20+1+1 torque settings, built-in LED work light, and ergonomic rubberized handle for all-day contractor use.',
      specifications: JSON.stringify({
        "Voltage": "20V Max",
        "Battery Capacity": "2x 2.0Ah Lithium-Ion",
        "Chuck Capacity": "13mm (1/2\") Keyless Metal",
        "Max Torque": "60 Nm",
        "No-Load Speed": "0-450 / 0-1900 RPM",
        "Impact Rate": "0-28,500 IPM",
        "Warranty": "1 Year Official Warranty"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 1,
      is_on_offer: 1
    },
    {
      name: 'Bosch Professional 4-Inch Angle Grinder GWS 750',
      slug: 'bosch-4-inch-angle-grinder-gws-750',
      category_id: catMap['power-tools'],
      brand: 'Bosch',
      sku: 'PT-BOSCH-750W',
      price: 18500,
      offer_price: null,
      stock_status: 'In Stock',
      short_description: '750W high-performance motor designed for tough metal cutting and grinding applications.',
      description: 'The Bosch GWS 750 offers powerful grinding performance with high overload capacity. Slim grip circumference allows comfortable handling, while optimized air flow prevents motor overheating during heavy fabrication tasks.',
      specifications: JSON.stringify({
        "Power Input": "750 Watts",
        "Disc Diameter": "100 mm (4-inch)",
        "No-Load Speed": "11,000 RPM",
        "Spindle Thread": "M10",
        "Weight": "1.8 kg",
        "Origin": "Germany / Bosch Certified"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 1,
      is_on_offer: 0
    },
    {
      name: 'Makita 185mm 7-1/4" Circular Saw HS7600',
      slug: 'makita-185mm-circular-saw-hs7600',
      category_id: catMap['power-tools'],
      brand: 'Makita',
      sku: 'PT-MAK-HS7600',
      price: 34500,
      offer_price: 31900,
      stock_status: 'In Stock',
      short_description: 'Precision wood cutting with 1400W motor and sturdy aluminum die-cast base plate.',
      description: 'Makita HS7600 is designed for fast, accurate longitudinal and cross timber cutting on construction job-sites. Features flat motor housing end for easy blade replacement and heavy gauge aluminum base.',
      specifications: JSON.stringify({
        "Power": "1400W",
        "Blade Diameter": "185 mm",
        "Max Cutting Capacity (90°)": "64 mm",
        "Max Cutting Capacity (45°)": "42 mm",
        "Speed": "5,500 RPM"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 0,
      is_on_offer: 1
    },

    // Building Materials (3)
    {
      name: 'Tokyo Super Portland Pozzolana Cement 50kg',
      slug: 'tokyo-super-portland-cement-50kg',
      category_id: catMap['building-materials'],
      brand: 'Tokyo Cement',
      sku: 'BM-TOKYO-50KG',
      price: 2450,
      offer_price: 2350,
      stock_status: 'In Stock',
      short_description: 'SLS certified high-strength Portland Pozzolana cement for structural concrete and plastering.',
      description: 'Manufactured with superior clinker and pozzolanic materials, Tokyo Super Cement delivers high early strength, optimal workability, low heat of hydration, and resistance against moisture penetration. Ideal for columns, slabs, and brick masonry.',
      specifications: JSON.stringify({
        "Standard": "SLS 1247 / EN 197-1",
        "Package Weight": "50 kg Bag",
        "Compressive Strength 28 Days": "> 42.5 MPa",
        "Setting Time (Initial)": "45+ Minutes",
        "Application": "Foundations, Beams, Concrete Slabs, Plaster"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 1,
      is_on_offer: 1
    },
    {
      name: 'Lanwa Tork Steel Rebar 12mm (Per Length / Ton)',
      slug: 'lanwa-tork-steel-rebar-12mm',
      category_id: catMap['building-materials'],
      brand: 'Lanwa Sanstha',
      sku: 'BM-LANWA-RB12',
      price: 3250,
      offer_price: null,
      stock_status: 'In Stock',
      short_description: 'High-yield deformed ribbed steel reinforcement bar for reinforced concrete structures.',
      description: 'Lanwa Tork steel bars provide exceptional tensile yield strength and superior bonding capability with concrete. SLS 375 certified, quake-resistant, and tested for high ductile strength.',
      specifications: JSON.stringify({
        "Diameter": "12 mm",
        "Standard Length": "12 Meters (40 Ft)",
        "Standard": "SLS 375 Grade 500",
        "Yield Strength": "500 N/mm² Min",
        "Usage": "Columns, Foundation Footings, Lintels"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 0,
      is_on_offer: 0
    },
    {
      name: 'Waterproof Membrane Tile Grout Admixture 5L',
      slug: 'waterproof-membrane-tile-grout-admixture-5l',
      category_id: catMap['building-materials'],
      brand: 'Sika',
      sku: 'BM-SIKA-WP5L',
      price: 5800,
      offer_price: 5200,
      stock_status: 'In Stock',
      short_description: 'Polymer-modified waterproof bonding agent for mortar, bathroom tiles, and roof slabs.',
      description: 'SikaLatex waterproof latex bonding agent increases bonding strength, reduces shrinkage cracking, and provides impenetrable moisture barrier for wet rooms, pools, and terrace coatings.',
      specifications: JSON.stringify({
        "Volume": "5 Liters",
        "Form": "Liquid Latex Emulsion",
        "Coverage": "Approx. 20-25 sq.m per can with slurry coat",
        "Shelf Life": "12 Months"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 0,
      is_on_offer: 1
    },

    // Hand Tools (3)
    {
      name: 'Stanley FatMax AntiVibe 20oz Claw Hammer',
      slug: 'stanley-fatmax-antivibe-20oz-claw-hammer',
      category_id: catMap['hand-tools'],
      brand: 'Stanley',
      sku: 'HT-STAN-FM20',
      price: 4950,
      offer_price: null,
      stock_status: 'In Stock',
      short_description: 'One-piece forged steel construction with patented shock-absorbing AntiVibe grip.',
      description: 'Crafted from a single piece of forged carbon steel, this Stanley hammer eliminates shaft breaks and absorbs painful vibrations. Features magnetic nail starter for one-handed overhead nailing.',
      specifications: JSON.stringify({
        "Weight": "20 oz (570g)",
        "Grip Type": "Anti-Vibe Ergonomic Rubber",
        "Head Type": "Smooth Face Curved Claw",
        "Material": "Forged Carbon Steel"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 1,
      is_on_offer: 0
    },
    {
      name: 'Total Tools 142-Piece Mechanics Socket & Tool Set',
      slug: 'total-tools-142-piece-mechanics-tool-set',
      category_id: catMap['hand-tools'],
      brand: 'Total Tools',
      sku: 'HT-TOT-142PC',
      price: 38500,
      offer_price: 34900,
      stock_status: 'In Stock',
      short_description: 'Comprehensive Chrome-Vanadium master tool kit in a heavy duty blow-molded case.',
      description: 'Includes 1/4", 3/8", and 1/2" quick release ratchets, deep and standard metric sockets, extension bars, combination spanners, hex keys, and pliers. Built for professional automotive and workshop repairs.',
      specifications: JSON.stringify({
        "Piece Count": "142 Pieces",
        "Steel Grade": "CR-V (Chrome Vanadium Steel)",
        "Ratchet Tooth Count": "72 Teeth Fine Tooth",
        "Case": "Reinforced Heavy Duty Blow Mold Box"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 1,
      is_on_offer: 1
    },
    {
      name: 'Tajima 8m / 26ft Extra Wide Magnetic Measuring Tape',
      slug: 'tajima-8m-magnetic-measuring-tape',
      category_id: catMap['hand-tools'],
      brand: 'Tajima',
      sku: 'HT-TAJ-8M',
      price: 2850,
      offer_price: null,
      stock_status: 'In Stock',
      short_description: 'Extra thick nylon-coated blade with 3.5m standout and dual strong magnetic end hook.',
      description: 'Professional grade measuring tape with shock-absorbing rubber armor casing, positive locking thumb lever, and easy-to-read dual metric and imperial markings.',
      specifications: JSON.stringify({
        "Length": "8 Meters / 26 Feet",
        "Tape Width": "27 mm",
        "Standout": "Up to 3.5 Meters",
        "Blade Coating": "Nylon Coated Hyper-Coat"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1567361808960-dec9cb578182?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 0,
      is_on_offer: 0
    },

    // Plumbing Supplies (3)
    {
      name: 'S-Lon Type 600 Heavy Duty PVC Pipe 1-Inch (4m)',
      slug: 's-lon-type-600-pvc-pipe-1-inch-4m',
      category_id: catMap['plumbing'],
      brand: 'S-Lon Lanka',
      sku: 'PL-SLON-T600-1IN',
      price: 1650,
      offer_price: null,
      stock_status: 'In Stock',
      short_description: 'SLS 147 certified high-pressure potable water pipe for residential and industrial plumbing.',
      description: 'Manufactured with 100% virgin unplasticized PVC resin. Resistant to chemical corrosion, scaling, and high hydrostatic water pressure. Smooth inner bore ensures maximum water flow efficiency.',
      specifications: JSON.stringify({
        "Nominal Size": "25mm (1 Inch)",
        "Pressure Rating": "Type 600 (Up to 15 Bar / 217 PSI)",
        "Length": "4.0 Meters per length",
        "Standard": "SLS 147 Certified",
        "Joint Type": "Plain ended for solvent cementing"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 1,
      is_on_offer: 0
    },
    {
      name: 'Jinasena 0.5HP Centrifugal Clean Water Pump',
      slug: 'jinasena-05hp-centrifugal-water-pump',
      category_id: catMap['plumbing'],
      brand: 'Jinasena',
      sku: 'PL-JIN-PUMP-05HP',
      price: 29500,
      offer_price: 27500,
      stock_status: 'In Stock',
      short_description: '100% copper wound motor water pump with brass impeller and thermal overload safety.',
      description: 'Sri Lanka’s most trusted domestic water pump for overhead tank filling, well water lifting, and garden irrigation. Features cast iron pump casing and rust-resistant stainless steel shaft.',
      specifications: JSON.stringify({
        "Motor Power": "0.5 HP (0.37 kW)",
        "Inlet / Outlet": "1\" x 1\" (25mm x 25mm)",
        "Max Head Height": "28 Meters",
        "Max Flow Rate": "60 Liters/Minute",
        "Warranty": "2 Years Official Manufacturer Warranty"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 1,
      is_on_offer: 1
    },
    {
      name: 'Solid Brass 1/2" Quarter-Turn Ceramic Disc Basin Tap',
      slug: 'solid-brass-ceramic-disc-basin-tap',
      category_id: catMap['plumbing'],
      brand: 'Crown Fittings',
      sku: 'PL-CRW-BTAP',
      price: 2350,
      offer_price: 1990,
      stock_status: 'In Stock',
      short_description: 'Chrome plated mirror finish brass tap with drip-free ceramic cartridge valve.',
      description: 'Premium quality solid forged brass construction with multi-layer electroplated chrome finish. Smooth 90-degree ceramic disc operation tested for over 500,000 cycles without leaks.',
      specifications: JSON.stringify({
        "Inlet Thread": "G 1/2\" Male Thread",
        "Material": "Solid DZR Brass + Chrome Plating",
        "Cartridge": "Ceramic Disc Quarter Turn",
        "Operating Pressure": "0.5 - 6.0 Bar"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 0,
      is_on_offer: 1
    },

    // Electrical (3)
    {
      name: 'Kelani 3/0.029 Single Core Copper Cable 100m Coil',
      slug: 'kelani-30029-single-core-copper-cable-100m',
      category_id: catMap['electrical'],
      brand: 'Kelani Cables',
      sku: 'EL-KEL-3029-RD',
      price: 17800,
      offer_price: 16900,
      stock_status: 'In Stock',
      short_description: 'Pure electrolytic grade copper wire with flame-retardant PVC insulation for domestic wiring.',
      description: 'Kelani Cables 3/0.029 wiring cable is certified under SLS 733. Engineered with 99.99% pure oxygen-free copper conductors for minimal voltage drop and superior fire-safety rating.',
      specifications: JSON.stringify({
        "Conductor Size": "3/0.029 inch (1.5mm² equivalent)",
        "Coil Length": "100 Meters",
        "Voltage Grade": "450 / 750 Volts",
        "Color Options": "Red / Black / Yellow / Blue / Green",
        "Standard": "SLS 733 / BS 6004"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 1,
      is_on_offer: 1
    },
    {
      name: 'Orange Electric Modular 13A Switched Socket with USB',
      slug: 'orange-electric-13a-switched-socket-with-usb',
      category_id: catMap['electrical'],
      brand: 'Orange Electric',
      sku: 'EL-ORG-13A-USB',
      price: 1450,
      offer_price: null,
      stock_status: 'In Stock',
      short_description: 'UK standard 3-pin socket with dual integrated 2.1A fast USB charging ports.',
      description: 'Modern polycarbonate flush socket with child safety shutter mechanism, red neon power indicator, and dual USB ports for direct smartphone and tablet charging without adapters.',
      specifications: JSON.stringify({
        "Current Rating": "13 Amperes, 250V AC",
        "USB Output": "5V DC, 2.1A Total",
        "Plate Material": "Flame Retardant Polycarbonate",
        "Certification": "SLS & CE Certified"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 0,
      is_on_offer: 0
    },
    {
      name: 'Philips 12W Warm White Energy Saver LED Bulb (Pack of 3)',
      slug: 'philips-12w-warm-white-led-bulb-pack-of-3',
      category_id: catMap['electrical'],
      brand: 'Philips',
      sku: 'EL-PHI-12W-3PK',
      price: 2250,
      offer_price: 1850,
      stock_status: 'In Stock',
      short_description: '1200 Lumens eye-comfort flicker-free LED bulbs with B22 bayonet cap fitting.',
      description: 'Save up to 88% energy compared to traditional incandescent lamps. Delivers glare-free warm ambient illumination with an extended 15,000-hour rated lifespan.',
      specifications: JSON.stringify({
        "Wattage": "12 Watts (Replaces 100W bulb)",
        "Luminous Flux": "1200 Lumens",
        "Color Temperature": "3000K Warm White",
        "Base Type": "B22 / E27 Pin & Screw",
        "Lifespan": "15,000 Hours"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 0,
      is_on_offer: 1
    },

    // Paint & Accessories (3)
    {
      name: 'Dulux Weathershield Exterior Emulsion Paint 10L',
      slug: 'dulux-weathershield-exterior-emulsion-10l',
      category_id: catMap['paint-accessories'],
      brand: 'Dulux',
      sku: 'PA-DUL-WS10L',
      price: 24500,
      offer_price: 22800,
      stock_status: 'In Stock',
      short_description: 'All-weather elastomeric wall paint with 7-year warranty against fungus and algae.',
      description: 'Dulux Weathershield is formulated with Smart Release technology to provide double the protection against mold and fungus in tropical tropical climates. Repels rain moisture and reflects solar UV heat.',
      specifications: JSON.stringify({
        "Volume": "10 Liters",
        "Finish": "Mid-Sheen Protective Coating",
        "Coverage": "110-130 sq.ft per liter (2 coats)",
        "Drying Time": "2-3 Hours between coats",
        "Protection": "7 Years External Warranty"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 1,
      is_on_offer: 1
    },
    {
      name: 'Harris Premier 9-Inch Paint Roller & Heavy Duty Tray Set',
      slug: 'harris-premier-9-inch-paint-roller-tray-set',
      category_id: catMap['paint-accessories'],
      brand: 'Harris',
      sku: 'PA-HAR-9ROL',
      price: 1850,
      offer_price: null,
      stock_status: 'In Stock',
      short_description: 'High-density microfiber roller sleeve for ultra-smooth wall & ceiling coverage.',
      description: 'Professional paint roller set featuring solvent-resistant deep textured tray, 9" caged steel frame, and lint-free medium pile microfiber roller sleeve for streak-free paint application.',
      specifications: JSON.stringify({
        "Roller Width": "230mm (9 Inches)",
        "Pile Height": "12mm Medium Pile",
        "Core Diameter": "1.75 Inch Caged Core",
        "Includes": "Heavy Tray, Cage Frame, Microfiber Sleeve"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 0,
      is_on_offer: 0
    },
    {
      name: 'Robbialac Interior Wall Filler & Putty 20kg Bucket',
      slug: 'robbialac-interior-wall-filler-putty-20kg',
      category_id: catMap['paint-accessories'],
      brand: 'Robbialac',
      sku: 'PA-ROB-FILL20',
      price: 3600,
      offer_price: null,
      stock_status: 'In Stock',
      short_description: 'Ready-to-use smooth acrylic filler for interior plaster crack sealing and skim coat.',
      description: 'Formulated with ultrafine calcium fillers for effortless spreading and feather-edge sanding. Creates a silky smooth porcelain base before applying emulsion paint.',
      specifications: JSON.stringify({
        "Net Weight": "20 kg Bucket",
        "Base": "Acrylic Copolymer",
        "Drying Time": "Touch dry in 30 mins, Sanding in 3-4 hours",
        "Application": "Interior masonry, skim plaster, drywall"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 0,
      is_on_offer: 0
    },

    // Fasteners & Hardware (3)
    {
      name: 'Heavy Duty 304 Stainless Steel Wedge Anchor Bolts (Box of 50)',
      slug: 'heavy-duty-304-ss-wedge-anchor-bolts-50pk',
      category_id: catMap['fasteners'],
      brand: 'StrongHold',
      sku: 'FA-SH-WA10100',
      price: 4500,
      offer_price: 3950,
      stock_status: 'In Stock',
      short_description: 'M10 x 100mm solid stainless steel expanding concrete anchors for structural anchoring.',
      description: 'Engineered for high tension and shear load bearing in uncracked solid concrete and masonry brickwork. Full marine grade 304 stainless steel resists rust in outdoor environments.',
      specifications: JSON.stringify({
        "Thread Size": "M10 (10mm)",
        "Length": "100 mm",
        "Material": "AISI 304 Stainless Steel",
        "Drill Hole Size": "10 mm",
        "Box Quantity": "50 Pieces"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 0,
      is_on_offer: 1
    },
    {
      name: 'Zinc Plated Bugle Head Drywall Screws 1.5" (Pack of 1000)',
      slug: 'zinc-plated-bugle-drywall-screws-1000pk',
      category_id: catMap['fasteners'],
      brand: 'FastenMaster',
      sku: 'FA-FM-DW15-1K',
      price: 2600,
      offer_price: null,
      stock_status: 'In Stock',
      short_description: 'Phillips #2 bugle head sharp needle point screws for ceiling and drywall framing.',
      description: 'Hardened carbon steel screws with fine thread pitch and black phosphate anti-corrosion coating. Countersinks flush into plasterboard and gypsum ceiling boards without paper tearing.',
      specifications: JSON.stringify({
        "Length": "38 mm (1.5 Inches)",
        "Thread Type": "Fine Twinfast Thread",
        "Drive Type": "Phillips #2",
        "Quantity": "1,000 Screws per Box"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 0,
      is_on_offer: 0
    },
    {
      name: 'Brass Solid Ball Bearing Door Hinges 4-Inch (Pair)',
      slug: 'brass-solid-ball-bearing-door-hinges-4-inch',
      category_id: catMap['fasteners'],
      brand: 'Yale',
      sku: 'FA-YALE-HNG4',
      price: 1950,
      offer_price: null,
      stock_status: 'In Stock',
      short_description: 'Architectural grade silent 4-ball bearing hinges with matching mounting screws.',
      description: 'Manufactured from extruded solid brass for heavy solid teak or mahogany entrance doors. Four dual ball bearing races guarantee frictionless, silent door swinging for decades.',
      specifications: JSON.stringify({
        "Dimensions": "102mm x 76mm x 3mm (4\" x 3\")",
        "Material": "Solid Forged Brass",
        "Load Capacity": "Up to 80 kg per pair",
        "Finish": "Satin Brushed Brass"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 0,
      is_on_offer: 0
    },

    // Safety Gear (3)
    {
      name: 'Delta Plus Diamond V Safety Hard Hat Helmet',
      slug: 'delta-plus-diamond-v-safety-hard-hat',
      category_id: catMap['safety-gear'],
      brand: 'Delta Plus',
      sku: 'SG-DP-HELM-WH',
      price: 3800,
      offer_price: 3200,
      stock_status: 'In Stock',
      short_description: 'Baseball cap shaped high-density ABS safety helmet with rotor ratchet adjustment.',
      description: 'Innovative baseball cap shape offers improved vertical field of vision. High resistance ABS shell with electrical insulation up to 1000V AC and 8-point textile harness suspension for maximum shock absorption.',
      specifications: JSON.stringify({
        "Standard": "EN397:2012 / ANSI Z89.1",
        "Shell Material": "ABS High Impact Plastic",
        "Harness": "8 fixing points textile cradle",
        "Adjustment": "Rotor Ratchet headband 53cm to 63cm",
        "Color": "High-Visibility White / Yellow"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 1,
      is_on_offer: 1
    },
    {
      name: 'Caterpillar Steel Toe Work Safety Boots (EU 42-45)',
      slug: 'caterpillar-steel-toe-work-safety-boots',
      category_id: catMap['safety-gear'],
      brand: 'CAT Footwear',
      sku: 'SG-CAT-BOOT42',
      price: 24500,
      offer_price: 21900,
      stock_status: 'In Stock',
      short_description: 'Genuine nubuck leather industrial safety boots with 200J steel toe impact protection.',
      description: 'Engineered for heavy construction sites and workshops. Features oil-resistant, slip-resistant rubber lug outsole, puncture-resistant steel midsole plate, and breathable mesh lining.',
      specifications: JSON.stringify({
        "Safety Standard": "EN ISO 20345:2011 S1P SRA",
        "Upper Material": "Genuine Oiled Nubuck Leather",
        "Toe Cap": "200 Joules Tempered Steel",
        "Midsole": "Anti-Penetration Steel Plate",
        "Outsole": "Oil & Fuel Resistant Rubber"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 1,
      is_on_offer: 1
    },
    {
      name: '3M Anti-Fog Polycarbonate Safety Goggles & Cut-5 Gloves Bundle',
      slug: '3m-anti-fog-safety-goggles-cut5-gloves-bundle',
      category_id: catMap['safety-gear'],
      brand: '3M Safety',
      sku: 'SG-3M-GOGG-GLV',
      price: 2950,
      offer_price: null,
      stock_status: 'In Stock',
      short_description: 'UV400 scratch-resistant wrap-around goggles paired with level-5 cut resistant nitrile gloves.',
      description: 'Essential personal protective equipment combo for welding prep, wood cutting, metal fabrication, and handling sharp steel sheets. Ultra lightweight and comfortable for long work shifts.',
      specifications: JSON.stringify({
        "Goggles Standard": "ANSI Z87.1 / EN166",
        "Gloves Standard": "EN388 Cut Level 5",
        "Goggle Coating": "Anti-Fog & Anti-Scratch Plus",
        "Glove Material": "HPPE Seamless Knit with PU Palm Dip"
      }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80'
      ]),
      is_featured: 0,
      is_on_offer: 0
    }
  ];

  for (const prod of products) {
    const existing = await query('SELECT * FROM products WHERE slug = ?', [prod.slug]);
    if (existing.length === 0) {
      await run(
        `INSERT INTO products (
          name, slug, category_id, brand, sku, price, offer_price, stock_status, 
          short_description, description, specifications, images, is_featured, is_on_offer
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          prod.name, prod.slug, prod.category_id, prod.brand, prod.sku, prod.price, prod.offer_price,
          prod.stock_status, prod.short_description, prod.description, prod.specifications, prod.images,
          prod.is_featured, prod.is_on_offer
        ]
      );
    }
  }
  console.log(`✅ Products seeded (${products.length} realistic hardware products).`);

  // 5. Testimonials Seeding (4)
  const testimonials = [
    {
      name: 'Kamal Perera',
      role: 'Chief Civil Contractor, BuildTech LK',
      text: 'Nethmi Hardware has been our go-to partner for all commercial projects in Gampaha and Colombo. Their prices on Tokyo Cement and Lanwa steel are unbeatable, and job-site delivery is always on time!',
      rating: 5
    },
    {
      name: 'Sanjeewa Gunawardena',
      role: 'Homeowner, Kiribathgoda',
      text: 'Renovating our two-story house was so much smoother with their expert advice. Their staff helped me choose the right Dulux waterproofing paints and high quality plumbing fixtures.',
      rating: 5
    },
    {
      name: 'Rohan Wickramasinghe',
      role: 'Electrical & Solar Engineer',
      text: '100% genuine Kelani cables and Orange electrical accessories. You never have to worry about counterfeit products here. Highly recommended for genuine contractor supplies!',
      rating: 5
    },
    {
      name: 'Damith Fernando',
      role: 'Cabinet Maker & Woodworker',
      text: 'The power tool collection from Makita and Ingco is top tier. Plus their WhatsApp quote system makes it super quick to check availability before heading to the shop.',
      rating: 5
    }
  ];

  for (const t of testimonials) {
    const existing = await query('SELECT * FROM testimonials WHERE name = ? AND text = ?', [t.name, t.text]);
    if (existing.length === 0) {
      await run(
        'INSERT INTO testimonials (name, role, text, rating) VALUES (?, ?, ?, ?)',
        [t.name, t.role, t.text, t.rating]
      );
    }
  }
  console.log('✅ Testimonials seeded (4 reviews).');

  // 6. Gallery Seeding (8)
  const galleryItems = [
    {
      image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=1000&q=80',
      caption: 'Main Hand Tools & Workshop Display Section',
      category: 'Store'
    },
    {
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1000&q=80',
      caption: 'Authorized Power Tools & Machinery Showroom',
      category: 'Power Tools'
    },
    {
      image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1000&q=80',
      caption: 'Cement & Masonry Materials Storage Yard',
      category: 'Materials'
    },
    {
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1000&q=80',
      caption: 'Automated Paint Tinting & Mixing Station',
      category: 'Paint'
    },
    {
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1000&q=80',
      caption: 'Heavy Duty S-Lon PVC Pipe & Valve Depot',
      category: 'Plumbing'
    },
    {
      image: 'https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?auto=format&fit=crop&w=1000&q=80',
      caption: 'Certified Site Safety Gear & Protective Equipment',
      category: 'Safety'
    },
    {
      image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1000&q=80',
      caption: 'Precision Fasteners, Stainless Steel Bolts & Hinges',
      category: 'Hardware'
    },
    {
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
      caption: 'Direct Fleet Job-site Delivery Fleet',
      category: 'Delivery'
    }
  ];

  for (const g of galleryItems) {
    const existing = await query('SELECT * FROM gallery WHERE image = ?', [g.image]);
    if (existing.length === 0) {
      await run(
        'INSERT INTO gallery (image, caption, category) VALUES (?, ?, ?)',
        [g.image, g.caption, g.category]
      );
    }
  }
  console.log('✅ Gallery items seeded (8 items).');

  saveDb();
  console.log('✨ Nethmi Hardware database initialized and seeded successfully!');
}

// Run if called directly
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase().catch(err => {
    console.error('❌ Error during database seeding:', err);
    process.exit(1);
  });
}
