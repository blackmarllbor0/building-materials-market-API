ALTER SESSION SET CONTAINER={PBD};

ALTER SESSION SET CURRENT_SCHEMA={USER};

INSERT INTO "order_status" os ("code", "name") VALUES (1, 'created');

INSERT INTO "order_payment_type" opt ("name") VALUES ('cash');

INSERT INTO "user_status" us ("name") VALUES ('online');

INSERT INTO "user_status" us ("name") VALUES ('offline');

INSERT INTO "user_role" ur ("name") VALUES ('customer');

INSERT INTO "user_role" ur ("name") VALUES ('admin');

INSERT INTO "auth_audit_event" aae ("name") VALUES ('successfully_login');

INSERT INTO "auth_audit_event" aae ("name") VALUES ('failed_password');

INSERT INTO "category_type" ct ("name") VALUES ('Building Materials');

INSERT INTO "category" c ("category_type_id", "name") VALUES (1, 'Lumber and Wood Products');

INSERT INTO "category" c ("category_type_id", "name") VALUES (1, 'Concrete and Cement');

INSERT INTO "category" c ("category_type_id", "name") VALUES (1, 'Bricks and Blocks');

INSERT INTO "category" c ("category_type_id", "name") VALUES (1, 'Roofing Materials');

INSERT INTO "category" c ("category_type_id", "name") VALUES (1, 'Insulation and Soundproofing');

INSERT INTO "category_type" ct ("name") VALUES ('Tools and Equipment');

INSERT INTO "category" c ("category_type_id", "name") VALUES (2, 'Power Tools');

INSERT INTO "category" c ("category_type_id", "name") VALUES (2, 'Hand Tools');

INSERT INTO "category" c ("category_type_id", "name") VALUES (2, 'Safety Equipment');

INSERT INTO "category" c ("category_type_id", "name") VALUES (2, 'Construction Machinery');

INSERT INTO "category" c ("category_type_id", "name") VALUES (2, 'Hardware and Fasteners');

INSERT INTO "category_type" ct ("name") VALUES ('Paint and Supplies');

INSERT INTO "category" c ("category_type_id", "name") VALUES (3, 'Paints and Primers');

INSERT INTO "category" c ("category_type_id", "name") VALUES (3, 'Brushes and Rollers');

INSERT INTO "category" c ("category_type_id", "name") VALUES (3, 'Paint Thinners and Solvents');

INSERT INTO "category" c ("category_type_id", "name") VALUES (3, 'Tarps and Drop Cloths');

INSERT INTO "category_type" ct ("name") VALUES ('Electrical and Lighting');

INSERT INTO "category" c ("category_type_id", "name") VALUES (4, 'Electrical Wiring and Cables');

INSERT INTO "category" c ("category_type_id", "name") VALUES (4, 'Lighting Fixtures');

INSERT INTO "category" c ("category_type_id", "name") VALUES (4, 'Electrical Panels and Breakers');

INSERT INTO "category" c ("category_type_id", "name") VALUES (4, 'Batteries and Power Supplies');

INSERT INTO "category_type" ct ("name") VALUES ('Plumbing and Fixtures');

INSERT INTO "category" c ("category_type_id", "name") VALUES (5, 'Pipes and Fittings');

INSERT INTO "category" c ("category_type_id", "name") VALUES (5, 'Faucets and Sinks');

INSERT INTO "category" c ("category_type_id", "name") VALUES (5, 'Toilets and Toilet Seats');

INSERT INTO "category" c ("category_type_id", "name") VALUES (5, 'Showerheads and Tub Faucets');

INSERT INTO "category_type" ct ("name") VALUES ('Flooring and Tiles');

INSERT INTO "category" c ("category_type_id", "name") VALUES (6, 'Hardwood Flooring');

INSERT INTO "category" c ("category_type_id", "name") VALUES (6, 'Tile Flooring');

INSERT INTO "category" c ("category_type_id", "name") VALUES (6, 'Carpet and Rugs');

INSERT INTO "category" c ("category_type_id", "name") VALUES (6, 'Flooring Accessories');

INSERT INTO "category_type" ct ("name") VALUES ('Outdoor and Garden');

INSERT INTO "category" c ("category_type_id", "name") VALUES (7, 'Outdoor Furniture');

INSERT INTO "category" c ("category_type_id", "name") VALUES (7, 'Gardening Tools');

INSERT INTO "category" c ("category_type_id", "name") VALUES (7, 'Landscaping Materials');

INSERT INTO "category" c ("category_type_id", "name") VALUES (7, 'Pools and Spas');

INSERT INTO "category_type" ct ("name") VALUES ('Home Improvement');

INSERT INTO "category" c ("category_type_id", "name") VALUES (8, 'Kitchen and Bathroom Remodeling');

INSERT INTO "category" c ("category_type_id", "name") VALUES (8, 'Home Décor');

INSERT INTO "category" c ("category_type_id", "name") VALUES (8, 'Home Security');

INSERT INTO "category" c ("category_type_id", "name") VALUES (8, 'Storage and Organization');

INSERT INTO "category_type" ct ("name") VALUES ('Hardware and Fasteners');

INSERT INTO "category" c ("category_type_id", "name") VALUES (9, 'Nails and Screws');

INSERT INTO "category" c ("category_type_id", "name") VALUES (9, 'Bolts and Nuts');

INSERT INTO "category" c ("category_type_id", "name") VALUES (9, 'Anchors and Hooks');

INSERT INTO "category" c ("category_type_id", "name") VALUES (9, 'Hinges and Latches');

INSERT INTO "category_type" ct ("name") VALUES ('Heating and Cooling');

INSERT INTO "category" c ("category_type_id", "name") VALUES (10, 'Heating Systems');

INSERT INTO "category" c ("category_type_id", "name") VALUES (10, 'Air Conditioning');

INSERT INTO "category" c ("category_type_id", "name") VALUES (10, 'Fans and Ventilation');

INSERT INTO "category" c ("category_type_id", "name") VALUES (10, 'Fireplace and Stove Accessories');

INSERT INTO "company" c (
"name",
"phone_number", 
"email", 
"description", 
"link_to_website", 
"link_to_logo_image"
) VALUES (
'Builders Haven',
'+1-555-123-4567',
'info@buildershaven.com',
'Your one-stop shop for high-quality construction materials and tools.',
'www.buildershaven.com',
'.'
);

INSERT INTO "company" c (
"name",
"phone_number", 
"email", 
"description", 
"link_to_website", 
"link_to_logo_image"
) VALUES (
'Construction Depot',
'+1-555-987-6543',
'contact@constructiondepot.net',
'We provide a wide range of construction materials and equipment to meet your project needs.',
'www.constructiondepot.net',
'.'
);

INSERT INTO "company" c (
"name",
"phone_number", 
"email", 
"description", 
"link_to_website", 
"link_to_logo_image"
) VALUES (
'Metro Builders Supply',
'+1-555-876-5432',
'sales@metrobuildersupply.com',
'Serving the metropolitan area with top-quality building materials and expert advice.',
'www.metrobuildersupply.com',
'.'
);

INSERT INTO "company" c (
"name",
"phone_number", 
"email", 
"description", 
"link_to_website", 
"link_to_logo_image"
) VALUES (
'ConstructioWare',
'+1-555-234-5678',
'contact@constructioware.com',
'Your source for innovative construction products and solutions.',
'www.constructioware.com',
'.'
);

INSERT INTO "company" c (
"name",
"phone_number", 
"email", 
"description", 
"link_to_website", 
"link_to_logo_image"
) VALUES (
'ProBuild Solutions',
'+1-555-456-7890',
'info@probuildsolutions.com',
'Your trusted partner for professional-grade construction supplies and services.',
'www.probuildsolutions.com',
'.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
10, 50, 4.5, 'Premium Oak Hardwood Planks',
'High-quality oak hardwood planks for flooring and furniture crafting.',
1, 1, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
5, 30, 4.2, 'Cedar Fence Panels - Natural Finish',
'Durable cedar fence panels, ideal for privacy and garden boundaries.',
1, 1, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
20, 15, 4.0, 'Exterior-Grade Pine Plywood',
'Exterior-grade pine plywood sheets suitable for various construction projects.',
1, 1, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
50, 0.75, 4.7, 'Maple Hardwood Dowels - 3/4" Diameter',
'Smooth and sturdy maple hardwood dowels for DIY woodworking.',
1, 1, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
15, 25, 4.3, 'Baltic Birch Plywood Panels - 1/2" Thickness',
'High-quality Baltic birch plywood panels suitable for cabinetry and crafts.',
1, 1, '.'
);

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (50, 5, 4.3, 'High-Strength Concrete Mix', 'Pre-mixed high-strength concrete for various construction applications.', 2, 2, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (100, 1.5, 4.6, 'Standard Cement Blocks', 'Standard-size cement blocks for building walls and structures.', 2, 2, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (1, 1200, 4.8, 'Bulk Ready-Mix Concrete', 'Get a full truckload of ready-mix concrete for large construction projects.', 2, 2, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (20, 80, 4.4, 'Premium Concrete Sealer', 'Protect and seal your concrete surfaces with our premium sealer.', 2, 2, '.');

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
100, 0.50, 4.2, 'Red Brick - Standard Size', 
'High-quality red bricks suitable for construction and masonry work.',
1, 3, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
50, 2.00, 4.4, 'Concrete Cinder Blocks - 8x8x16 Inches',
'Durable concrete cinder blocks for building walls and structures.',
2, 3, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
75, 3.25, 4.6, 'Aerated Concrete Blocks - Lightweight',
'Lightweight and insulating aerated concrete blocks for energy-efficient construction.',
3, 3, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
120, 0.75, 4.1, 'Ceramic Bricks - Fire-Resistant',
'Fire-resistant ceramic bricks suitable for fireplaces and chimneys.',
4, 3, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
60, 1.80, 4.3, 'Expanded Polystyrene Blocks - Insulation',
'Insulating expanded polystyrene blocks for energy-efficient construction.',
5, 3, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
100, 30.5, 4.2, 'Premium Asphalt Shingles',
'Durable asphalt shingles for roofing projects.',
4, 4, 'link_to_images_1'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
50, 20.0, 4.0, 'Roofing Underlayment Roll',
'High-quality roofing underlayment for moisture protection.',
4, 4, 'link_to_images_2'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
25, 45.8, 4.4, 'Corrugated Metal Roof Panels',
'Corrugated metal roof panels for industrial and residential use.',
4, 4, 'link_to_images_3'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
30, 60.0, 4.7, 'Roof Ventilation Fans - Solar-Powered',
'Solar-powered roof ventilation fans for improved attic ventilation.',
4, 4, 'link_to_images_4'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
500, 8.5, 4.1, 'Roofing Nails - Galvanized',
'Galvanized roofing nails for securing roofing materials.',
4, 4, 'link_to_images_5'
);

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (10, 50, 4.5, 'Premium Oak Hardwood Planks', 'High-quality oak hardwood planks for flooring and furniture crafting.', 3, 5, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (15, 40, 4.3, 'Acoustic Foam Panels', 'Sound-absorbing acoustic foam panels for noise reduction in rooms.', 5, 5, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (8, 60, 4.7, 'Fiberglass Insulation Rolls', 'Efficient fiberglass insulation rolls for energy-saving insulation.', 4, 5, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (20, 35, 4.2, 'Reflective Insulation Sheets', 'Reflective insulation sheets for thermal barrier applications.', 4, 5, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (12, 55, 4.6, 'Soundproofing Curtains', 'Heavy-duty soundproofing curtains for blocking outside noise.', 1, 5, '.');

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
15, 99.99, 4.6, 'Cordless Drill Driver',
'Powerful cordless drill driver for various DIY and construction tasks.',
5, 6, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
20, 79.99, 4.4, 'Angle Grinder with Accessories',
'Versatile angle grinder kit with multiple accessories for cutting and grinding.',
5, 6, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
12, 129.95, 4.7, 'Electric Circular Saw',
'High-performance electric circular saw with adjustable cutting depth.',
5, 6, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
8, 69.99, 4.3, 'Jigsaw with Variable Speed',
'Precise jigsaw with adjustable speed settings for curved cuts.',
5, 6, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
10, 149.99, 4.8, 'Rotary Hammer Drill',
'Heavy-duty rotary hammer drill for drilling into concrete and masonry.',
5, 6, '.'
);

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (10, 50, 4.5, 'Screwdriver Set', 'High-quality screwdriver set with various tips for different tasks.', 1, 7, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (15, 35, 4.2, 'Adjustable Wrench', 'Adjustable wrench with ergonomic grip for easy use.', 1, 7, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (20, 25, 4.0, 'Claw Hammer', 'Durable claw hammer for various construction and DIY tasks.', 1, 7, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (8, 75, 4.7, 'Cordless Drill', 'Powerful cordless drill with multiple speed settings.', 1, 7, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (12, 20, 4.3, 'Measuring Tape', 'High-precision measuring tape with both metric and imperial units.', 1, 7, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (50, 20, 4.2, 'Safety Helmets', 'Durable safety helmets for construction and industrial use.', 2, 8, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (30, 15, 4.0, 'High-Visibility Vests', 'Fluorescent high-visibility vests for improved safety on job sites.', 3, 8, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (10, 50, 4.5, 'Safety Glasses', 'Protective safety glasses with clear lenses.', 1, 8, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (100, 5, 4.7, 'Safety Gloves', 'Comfortable safety gloves with excellent grip and protection.', 4, 8, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (25, 10, 4.3, 'Safety Harnesses', 'Full-body safety harnesses for fall protection.', 5, 8, '.');

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
10, 50000, 4.6, 'Excavator - Heavy Duty',
'Powerful heavy-duty excavator for digging and earthmoving tasks.',
1, 9, '/images/excavator1.jpg'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
5, 75000, 4.7, 'Bulldozer - Caterpillar D9',
'High-performance bulldozer with a strong blade for clearing land and construction.',
2, 9, '/images/bulldozer1.jpg'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
8, 60000, 4.5, 'Crane - Mobile Hydraulic',
'Mobile hydraulic crane with excellent lifting capacity for construction projects.',
3, 9, '/images/crane1.jpg'
);

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (100, 0.25, 4.7, 'Stainless Steel Screws', 'High-quality stainless steel screws for various applications.', 1, 10, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (200, 0.10, 4.4, 'Hex Nuts Assortment', 'Assortment of hex nuts in different sizes for your projects.', 2, 10, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (50, 5.99, 4.6, 'Brass Hardware Kit', 'Comprehensive kit of brass hardware for furniture assembly.', 3, 10, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (75, 1.49, 4.3, 'Anchors and Hooks Set', 'Set of anchors and hooks for secure wall mounting.', 4, 10, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (150, 0.20, 4.8, 'Bolts and Washers Combo', 'Combo pack of bolts and washers for construction projects.', 5, 10, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (10, 50, 4.5, 'Premium Oak Hardwood Planks', 'High-quality oak hardwood planks for flooring and furniture crafting.', 1, 11, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (5, 30, 4.2, 'Cedar Fence Panels - Natural Finish', 'Durable cedar fence panels, ideal for privacy and garden boundaries.', 2, 11, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (20, 15, 4.0, 'Exterior-Grade Pine Plywood', 'Exterior-grade pine plywood sheets suitable for various construction projects.', 3, 11, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (50, 0.75, 4.7, 'Maple Hardwood Dowels - 3/4" Diameter', 'Smooth and sturdy maple hardwood dowels for DIY woodworking.', 4, 11, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (15, 25, 4.3, 'Baltic Birch Plywood Panels - 1/2" Thickness', 'High-quality Baltic birch plywood panels suitable for cabinetry and crafts.', 5, 11, '.');

INSERT INTO "product" (
 "quantity", "price", "rating", "title", "description",
 "company_id", "category_id", "link_to_images"
) VALUES (
 12, 20, 4.2, 'Premium Paintbrush Set',
 'A set of 12 high-quality paintbrushes for precise painting.',
 1, 12, '.'
);

INSERT INTO "product" (
 "quantity", "price", "rating", "title", "description",
 "company_id", "category_id", "link_to_images"
) VALUES (
 5, 15, 4.0, 'Paint Roller Kit with Accessories',
 'Kit includes 5 paint rollers with various accessories for smooth painting.',
 1, 12, '.'
);

INSERT INTO "product" (
 "quantity", "price", "rating", "title", "description",
 "company_id", "category_id", "link_to_images"
) VALUES (
 24, 30, 4.5, 'Artist Paint Brush Set',
 'A set of 24 artist-grade paint brushes for creative projects.',
 1, 12, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
10, 50, 4.5, 'Paint Thinner - 1 Gallon Can',
'High-quality paint thinner for cleaning and thinning paints.',
1, 13, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
15, 35, 4.2, 'Mineral Spirits - 1 Quart Bottle',
'Premium mineral spirits for paint cleanup and varnish dilution.',
1, 13, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
12, 40, 4.7, 'Acetone - 1 Pint Can',
'Industrial-grade acetone solvent for adhesive and paint removal.',
1, 13, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
8, 55, 4.4, 'Turpentine - 1 Gallon Can',
'Pure gum spirits turpentine for oil-based paint thinning and cleaning.',
1, 13, '.'
);

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (10, 50, 4.5, 'Premium Oak Hardwood Planks', 'High-quality oak hardwood planks for flooring and furniture crafting.', 3, 14, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (5, 30, 4.2, 'Cedar Fence Panels - Natural Finish', 'Durable cedar fence panels, ideal for privacy and garden boundaries.', 5, 14, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (20, 15, 4.0, 'Exterior-Grade Pine Plywood', 'Exterior-grade pine plywood sheets suitable for various construction projects.', 4, 14, '.');

INSERT INTO "product" (
 "quantity", "price", "rating", "title", "description",
 "company_id", "category_id", "link_to_images"
) VALUES (
 100, 1.5, 4.2, 'RG-6 Coaxial Cable - 100 ft.',
 'High-quality coaxial cable for TV and satellite connections.',
 1, 15, '.'
);

INSERT INTO "product" (
 "quantity", "price", "rating", "title", "description",
 "company_id", "category_id", "link_to_images"
) VALUES (
 50, 2.0, 4.4, 'Cat 6 Ethernet Patch Cables - 1 ft.',
 'Fast and reliable Ethernet patch cables for networking.',
 2, 15, '.'
);

INSERT INTO "product" (
 "quantity", "price", "rating", "title", "description",
 "company_id", "category_id", "link_to_images"
) VALUES (
 25, 1.8, 4.0, 'Speaker Wire Roll - 50 ft.',
 'High-quality speaker wire for audio systems and home theaters.',
 3, 15, '.'
);

INSERT INTO "product" (
 "quantity", "price", "rating", "title", "description",
 "company_id", "category_id", "link_to_images"
) VALUES (
 20, 15.5, 4.6, 'Electrical Wiring Kit - Residential Use',
 'Comprehensive kit for residential electrical wiring projects.',
 4, 15, '.'
);

INSERT INTO "product" (
 "quantity", "price", "rating", "title", "description",
 "company_id", "category_id", "link_to_images"
) VALUES (
 30, 3.2, 4.7, 'Single-Mode Fiber Optic Cable - 10 meters',
 'High-speed single-mode fiber optic cable for data transmission.',
 5, 15, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
10, 50, 4.5, 'Elegant Crystal Chandelier',
'A stunning crystal chandelier for adding a touch of luxury to any room.',
1, 16, '/images/chandelier1.jpg'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
8, 65, 4.7, 'Modern Pendant Light Fixture',
'Sleek and modern pendant light fixture, perfect for contemporary interiors.',
2, 16, '/images/pendant_light1.jpg'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
12, 45, 4.4, 'Vintage Wall Sconce',
'A vintage-style wall sconce that adds character to any space.',
3, 16, '/images/wall_sconce1.jpg'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
6, 75, 4.6, 'Rustic Ceiling Fan with Light Kit',
'A rustic ceiling fan with an integrated light kit for added functionality.',
4, 16, '/images/ceiling_fan1.jpg'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
10, 50, 4.5, 'Electrical Panel - 100 Amp',
'High-quality 100 Amp electrical panel for residential use.',
1, 17, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
5, 60, 4.2, 'Circuit Breaker Box - 200 Amp',
'Durable 200 Amp circuit breaker box with multiple circuits.',
2, 17, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
8, 40, 4.0, 'Main Lug Load Center - 125 Amp',
'125 Amp main lug load center suitable for small commercial applications.',
3, 17, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
15, 70, 4.5, 'Subpanel Breaker Box - 60 Amp',
'60 Amp subpanel breaker box for branch circuit distribution.',
4, 17, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
10, 50, 4.5, 'Alkaline AA Batteries (Pack of 10)',
'High-capacity alkaline AA batteries for various devices.',
1, 18, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
8, 40, 4.2, 'Rechargeable Lithium-ion Battery',
'Long-lasting rechargeable lithium-ion battery with USB charger.',
2, 18, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
12, 20, 4.8, 'Solar Panel Charger',
'Portable solar panel charger for outdoor and emergency use.',
3, 18, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
6, 60, 4.7, 'UPS (Uninterruptible Power Supply)',
'Reliable UPS system to protect your electronic devices from power outages.',
4, 18, '.'
);

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (10, 50, 4.5, 'Premium Oak Hardwood Planks', 'High-quality oak hardwood planks for flooring and furniture crafting.', 1, 19, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (5, 30, 4.2, 'Cedar Fence Panels - Natural Finish', 'Durable cedar fence panels, ideal for privacy and garden boundaries.', 2, 19, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (20, 15, 4.0, 'Exterior-Grade Pine Plywood', 'Exterior-grade pine plywood sheets suitable for various construction projects.', 3, 19, '.');

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
10, 50, 4.5, 'Premium Oak Hardwood Planks',
'High-quality oak hardwood planks for flooring and furniture crafting.',
1, 20, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
5, 30, 4.2, 'Cedar Fence Panels - Natural Finish',
'Durable cedar fence panels, ideal for privacy and garden boundaries.',
2, 20, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
20, 15, 4.0, 'Exterior-Grade Pine Plywood',
'Exterior-grade pine plywood sheets suitable for various construction projects.',
3, 20, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
50, 0.75, 4.7, 'Maple Hardwood Dowels - 3/4" Diameter',
'Smooth and sturdy maple hardwood dowels for DIY woodworking.',
4, 20, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
15, 25, 4.3, 'Baltic Birch Plywood Panels - 1/2" Thickness',
'High-quality Baltic birch plywood panels suitable for cabinetry and crafts.',
5, 20, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
10, 50, 4.5, 'Modern White Ceramic Toilet',
'Contemporary white ceramic toilet with efficient flushing system.',
1, 21, '/images/toilet1.jpg'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
8, 65, 4.3, 'Elongated Soft-Close Toilet Seat',
'Elongated toilet seat with soft-close feature for added convenience.',
1, 21, '/images/toilet2.jpg'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
12, 75, 4.7, 'Dual Flush Water-Saving Toilet',
'Dual flush toilet designed to conserve water and reduce utility bills.',
1, 21, '/images/toilet3.jpg'
);

INSERT INTO "product" p (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
10, 50, 4.5, 'Rainfall Showerhead - Chrome Finish',
'A luxurious rainfall showerhead with a sleek chrome finish.',
1, 22, '/images/rainfall_showerhead.jpg'
);

INSERT INTO "product" p (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
8, 40, 4.2, 'Modern Tub Faucet Set',
'A modern tub faucet set with a brushed nickel finish.',
2, 22, '/images/modern_tub_faucet.jpg'
);

INSERT INTO "product" p (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
12, 55, 4.7, 'Handheld Showerhead with Hose',
'Convenient handheld showerhead with a flexible hose for easy use.',
3, 22, '/images/handheld_showerhead.jpg'
);

INSERT INTO "product" p (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
6, 65, 4.4, 'Vintage Brass Tub Faucet',
'A vintage-style brass tub faucet with intricate detailing.',
4, 22, '/images/vintage_brass_faucet.jpg'
);

INSERT INTO "product" p (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
15, 75, 4.9, 'LED Color-Changing Showerhead',
'A modern LED color-changing showerhead for a spa-like experience.',
5, 22, '/images/led_showerhead.jpg'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
10, 50, 4.5, 'Premium Oak Hardwood Planks',
'High-quality oak hardwood planks for flooring and furniture crafting.',
1, 23, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
15, 45, 4.4, 'Maple Hardwood Flooring',
'Beautiful maple hardwood flooring for your home renovation projects.',
4, 23, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
12, 55, 4.6, 'Walnut Wood Flooring Planks',
'Elegant walnut wood flooring planks with a rich, natural finish.',
3, 23, '.'
);

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (15, 45.99, 4.2, 'Ceramic Floor Tiles', 'High-quality ceramic floor tiles for your home or office flooring needs.', 1, 24, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (20, 55.49, 4.4, 'Porcelain Tile Flooring', 'Durable porcelain tile flooring in various patterns and sizes for a sleek look.', 2, 24, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (12, 62.99, 4.6, 'Marble Tile Flooring', 'Elegant marble tile flooring that adds a touch of luxury to your space.', 3, 24, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (18, 38.75, 4.0, 'Slate Tile Flooring', 'Natural slate tile flooring that complements both modern and rustic interiors.', 4, 24, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (14, 49.95, 4.3, 'Travertine Floor Tiles', 'Travertine floor tiles known for their timeless beauty and durability.', 5, 24, '.');

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
10, 50, 4.5, 'Soft Shaggy Area Rug',
'Luxurious soft shaggy area rug for cozy home decor.',
1, 25, '/images/soft_shaggy_area_rug.jpg'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
8, 65, 4.2, 'Vintage Persian Carpet',
'Authentic vintage Persian carpet with intricate designs.',
2, 25, '/images/vintage_persian_carpet.jpg'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
12, 45, 4.7, 'Modern Geometric Rug',
'Contemporary modern geometric rug for stylish interiors.',
3, 25, '/images/modern_geometric_rug.jpg'
);

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (10, 50, 4.5, 'Premium Oak Hardwood Planks', 'High-quality oak hardwood planks for flooring and furniture crafting.', 1, 26, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (15, 35, 4.2, 'Flooring Installation Kit', 'Complete kit for easy installation of flooring materials.', 2, 26, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (25, 10, 4.8, 'Wood Floor Underlayment', 'Durable underlayment for noise reduction and moisture protection.', 3, 26, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (5, 45, 4.6, 'Laminate Floor Trim', 'Trim pieces to finish the edges of laminate flooring.', 4, 26, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (12, 20, 4.4, 'Flooring Adhesive', 'Strong adhesive for bonding flooring materials securely.', 5, 26, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (5, 250, 4.6, 'Outdoor Wooden Table and Chairs Set', 'Elegant wooden dining set for your outdoor space.', 1, 27, '...');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (3, 150, 4.4, 'Aluminum Patio Lounge Chair', 'Comfortable and lightweight lounge chair for your patio.', 2, 27, '...');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (7, 350, 4.7, 'Wicker Outdoor Sofa Set', 'Stylish wicker sofa set with cushions for your garden.', 3, 27, '...');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (10, 75, 4.2, 'Foldable Picnic Table', 'Convenient and portable picnic table for outdoor gatherings.', 4, 27, '...');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (4, 200, 4.8, 'Teak Wood Adirondack Chair', 'Classic Adirondack chair made from durable teak wood.', 5, 27, '...');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (20, 15, 4.2, 'Durable Garden Shovel', 'Heavy-duty garden shovel for digging and planting.', 1, 28, 'image_link_1');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (30, 12, 4.4, 'Professional Pruning Shears', 'Sharp and precise pruning shears for trimming plants and bushes.', 2, 28, 'image_link_2');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (25, 18, 4.1, 'Versatile Garden Rake', 'Versatile garden rake for leveling soil and removing debris.', 3, 28, 'image_link_3');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (40, 8, 4.6, 'Sturdy Watering Can', 'Sturdy watering can for precise and controlled watering.', 4, 28, 'image_link_4');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (100, 5, 4.3, 'Comfortable Garden Gloves', 'Comfortable garden gloves for protection while gardening.', 5, 28, 'image_link_5');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (100, 3, 4.4, 'Natural Stone Pavers - Various Colors', 'Beautiful natural stone pavers for creating stunning outdoor pathways and patios.', 1, 29, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (20, 10, 4.2, 'Premium Mulch and Soil Mix', 'High-quality mulch and soil mix for enhancing your garden and landscaping.', 1, 29, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (50, 15, 4.6, 'Decorative Gravel Stones - Assorted Colors', 'Colorful decorative gravel stones to add a touch of elegance to your landscape design.', 1, 29, '.');

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
5, 1500, 4.8, 'In-Ground Swimming Pool Kit',
'Complete in-ground swimming pool kit with all necessary components.',
1, 30, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
1, 2000, 4.7, 'Outdoor Hot Tub Spa',
'Relax and unwind in this luxurious outdoor hot tub spa with hydrotherapy jets.',
2, 30, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
3, 800, 4.6, 'Above-Ground Pool Set',
'Easy-to-install above-ground pool set, perfect for summer fun.',
3, 30, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
2, 2500, 4.9, 'Indoor Sauna Cabin',
'Create your own spa experience with this indoor sauna cabin.',
4, 30, '.'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
10, 100, 4.4, 'Pool Cleaning Kit',
'Keep your pool crystal clear with this comprehensive pool cleaning kit.',
5, 30, '.'
);

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (10, 50, 4.5, 'Premium Oak Hardwood Planks', 'High-quality oak hardwood planks for flooring and furniture crafting.', 1, 31, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (5, 45, 4.2, 'Granite Countertop', 'Elegant granite countertop for kitchen remodeling projects.', 2, 31, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (8, 60, 4.7, 'Porcelain Bathroom Tiles', 'Durable porcelain tiles for bathroom floors and walls.', 3, 31, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (12, 75, 4.4, 'Kitchen Cabinet Set', 'Complete kitchen cabinet set with modern design and ample storage.', 4, 31, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (6, 40, 4.8, 'Bathroom Vanity Unit', 'Stylish bathroom vanity unit with sink and storage space.', 5, 31, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (15, 25.99, 4.6, 'Vintage Ceramic Vases', 'Elegant vintage ceramic vases for stylish home decoration.', 1, 32, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (20, 12.99, 4.4, 'Decorative Throw Pillows', 'Soft and cozy decorative throw pillows to add color to your living space.', 2, 32, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (5, 35.49, 4.8, 'Wall Art Prints', 'Beautiful wall art prints to enhance the aesthetic of your home.', 3, 32, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (8, 42.75, 4.7, 'Tabletop Sculptures', 'Exquisite tabletop sculptures to accentuate your home décor.', 4, 32, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (12, 18.99, 4.3, 'Scented Candles Set', 'A set of scented candles to create a relaxing atmosphere at home.', 5, 32, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (5, 199.99, 4.7, 'Smart Home Security Camera', 'High-definition smart security camera for remote monitoring.', 1, 33, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (2, 299.99, 4.8, 'Wireless Doorbell with Camera', 'Wireless doorbell featuring a built-in camera and motion detection.', 2, 33, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (1, 499.99, 4.9, 'Smart Lock System', 'Smart lock system with keyless entry and mobile app control.', 3, 33, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (3, 79.99, 4.5, 'Motion-Activated Outdoor Lights', 'Motion-activated outdoor lights for enhanced security.', 4, 33, '.');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (2, 149.99, 4.6, 'Window and Door Alarms', 'Wireless alarms for windows and doors to deter intruders.', 5, 33, '.');

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
20, 10, 4.3, 'Collapsible Storage Bins (Set of 4)',
'Set of 4 collapsible storage bins for easy and efficient organization.',
1, 34, 'image_link_1'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
15, 20, 4.7, 'Shoe Rack Organizer - 4-Tier',
'4-tier shoe rack organizer with sturdy construction for neat shoe storage.',
1, 34, 'image_link_2'
);

INSERT INTO "product" (
"quantity", "price", "rating", "title", "description",
"company_id", "category_id", "link_to_images"
) VALUES (
12, 15, 4.5, 'Clear Plastic Storage Boxes (Set of 6)',
'Set of 6 clear plastic storage boxes with lids for easy visibility of contents.',
2, 34, 'image_link_3'
);

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (100, 5.99, 4.7, 'Galvanized Steel Nails', 'High-quality galvanized steel nails for various construction projects.', 1, 35, 'link_to_images1.jpg');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (500, 3.49, 4.4, 'Assorted Wood Screws', 'An assortment of wood screws in different sizes for woodworking tasks.', 1, 35, 'link_to_images2.jpg');

INSERT INTO "product" ("quantity", "price", "rating", "title", "description", "company_id", "category_id", "link_to_images")
VALUES (50, 7.99, 4.6, 'Drywall Screws', 'Specialized drywall screws for secure and efficient drywall installation.', 1, 35, 'link_to_images3.jpg');
