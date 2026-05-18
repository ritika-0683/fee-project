/* ══════════════════════════════════════════════════════════════
   app.js — CookMaster Pro
   Demonstrates:
     ✅ DOM Manipulation & Dynamic Rendering  (buildDishCard, openDish, etc.)
     ✅ LocalStorage (save/load data)         (see STORAGE section)
     ✅ Event Handling                        (onclick, onkeydown, oninput, keydown)
     ✅ Array Methods (filter, map, reduce)   (labeled in each function)
══════════════════════════════════════════════════════════════ */

"use strict";

/* ══════════════════════════════════════════
   DATA — Cuisine definitions
══════════════════════════════════════════ */
const CUISINES_DATA = [
  { id: 'indian',        name: 'Indian',              flag: '🇮🇳', desc: 'Rich spices, diverse regional flavours',       color: '#C9963A' },
  { id: 'chinese',       name: 'Chinese',              flag: '🇨🇳', desc: 'Balance of flavours, ancient techniques',      color: '#A8262A' },
  { id: 'italian',       name: 'Italian',              flag: '🇮🇹', desc: 'Simple ingredients, extraordinary taste',      color: '#1D5C3A' },
  { id: 'japanese',      name: 'Japanese',             flag: '🇯🇵', desc: 'Precision, umami and seasonal harmony',        color: '#6B3A8C' },
  { id: 'mexican',       name: 'Mexican',              flag: '🇲🇽', desc: 'Bold, vibrant and layered flavours',           color: '#C9963A' },
  { id: 'thai',          name: 'Thai',                 flag: '🇹🇭', desc: 'Sweet, sour, spicy, savory balance',          color: '#1D5C3A' },
  { id: 'mediterranean', name: 'Mediterranean',        flag: '🏛️', desc: 'Fresh, healthy, olive oil kissed',            color: '#2B7A8C' },
  { id: 'american',      name: 'American',             flag: '🇺🇸', desc: 'Comfort food, BBQ and fusion classics',       color: '#8C3A2A' },
  { id: 'korean',        name: 'Korean',               flag: '🇰🇷', desc: 'Fermented, bold, K-food sensation',           color: '#4A3A8C' },
  { id: 'arabic',        name: 'Arabic / Middle East', flag: '🌙', desc: 'Aromatic, hearty and ancient traditions',      color: '#8C6A2A' },
  { id: 'desserts',      name: 'Desserts',             flag: '🎂', desc: 'Sweet indulgences from around the world',      color: '#A83A6A' },
  { id: 'healthy',       name: 'Healthy / Vegan',      flag: '🥗', desc: 'Nutritious, plant-powered goodness',           color: '#1A7A1A' },
];

/* ══════════════════════════════════════════
   DATA — Recipes (dietType: 'veg' | 'vegan' | 'nonveg')
══════════════════════════════════════════ */
const DISHES = [
  // ── INDIAN VEG ──
  {
    id: 'dal-makhani', name: 'Dal Makhani', cuisine: 'indian', dietType: 'veg',
    emoji: '🫘', time: 50, diff: 'Medium', cal: 310, pro: 16, carb: 42, fat: 9,
    spice: '⭐⭐', serves: 4, trending: false,
    desc: 'Slow-cooked black lentils in a rich buttery tomato gravy — ultimate comfort food.',
    veggies: ['🫘 Black Urad Dal', '🫘 Rajma', '🧅 Onions', '🍅 Tomatoes', '🧄 Garlic', '🌿 Ginger', '🥛 Cream', '🧈 Butter'],
    optVeggies: ['🌿 Kasuri Methi', '🌶️ Red Chilli'],
    steps: [
      'Soak urad dal and rajma overnight. Pressure cook for <strong>8-10 whistles</strong>.',
      'Melt butter in a heavy pot. Add cumin seeds, then sauté onions until golden.',
      'Add ginger-garlic paste, cook 3 min. Add tomato puree, cook 15 min on medium heat.',
      'Pour cooked dal into masala. Stir well, mash some lentils for a creamy texture.',
      'Add cream, kasuri methi, garam masala. Simmer on <strong>very low heat for 30 min</strong>.',
      'Finish with a knob of butter. The longer it simmers, the richer the flavour!',
    ],
    subs: { cream: 'coconut cream', butter: 'ghee', 'black dal': 'green moong' },
    c1: '#6B3A2A', c2: '#C9963A', tags: ['Punjabi', 'North Indian', 'Comfort'],
  },
  {
    id: 'palak-paneer', name: 'Palak Paneer', cuisine: 'indian', dietType: 'veg',
    emoji: '🟩', time: 30, diff: 'Easy', cal: 280, pro: 14, carb: 12, fat: 18,
    spice: '⭐⭐', serves: 3, trending: true,
    desc: 'Vibrant spinach curry with soft golden-fried paneer cubes — nutritious and absolutely delicious.',
    veggies: ['🥬 Spinach (palak)', '🧀 Paneer', '🧅 Onions', '🍅 Tomatoes', '🧄 Garlic', '🌿 Ginger', '🌶️ Green Chillies'],
    optVeggies: ['🥛 Cream', '🌿 Kasuri Methi'],
    steps: [
      'Blanch spinach in boiling salted water for 2 min. Shock in ice water to preserve colour.',
      'Blend spinach smooth. Pan-fry paneer cubes in butter until golden. Set aside.',
      'Sauté onions until golden. Add ginger-garlic paste, cook 2 min.',
      'Add tomatoes, cook until mushy. Add cumin, coriander, garam masala.',
      'Pour in spinach puree. Simmer on medium-low for 8 min.',
      'Fold in fried paneer. Finish with cream and kasuri methi. Serve with roti.',
    ],
    subs: { paneer: 'tofu,ricotta', spinach: 'kale,methi leaves', cream: 'coconut milk' },
    c1: '#1D5C3A', c2: '#2B7A52', tags: ['North Indian', 'Healthy', 'Quick'],
  },
  {
    id: 'chole-bhature', name: 'Chole Bhature', cuisine: 'indian', dietType: 'veg',
    emoji: '🫓', time: 45, diff: 'Medium', cal: 480, pro: 18, carb: 68, fat: 14,
    spice: '⭐⭐⭐', serves: 4,
    desc: 'Spicy chickpea curry paired with fluffy deep-fried bread — the ultimate Punjabi breakfast!',
    veggies: ['🫘 Chickpeas (kabuli chana)', '🧅 Onions', '🍅 Tomatoes', '🧄 Garlic', '🌿 Ginger', '🌶️ Green Chillies', '🍋 Lemon'],
    optVeggies: ['🥒 Cucumber (salad)', '🫙 Tea bag (for colour)'],
    steps: [
      'Soak chickpeas overnight. Pressure cook with tea bag for dark colour — <strong>5-6 whistles</strong>.',
      'Blend onion-tomato-ginger-garlic into smooth paste.',
      'Heat oil, add whole spices, then masala paste. Cook until oil separates (10 min).',
      'Add boiled chickpeas, chole masala, anardana powder. Mix well.',
      'Add water, simmer 20 min. Mash some chickpeas. Squeeze lemon.',
      'Bhature: Mix maida, yogurt, salt. Rest 2 hrs. Roll thick and deep fry until <strong>puffed golden</strong>.',
      'Serve hot with pickled onions and green chutney.',
    ],
    subs: { chickpeas: 'white beans', maida: 'wheat flour (healthier)' },
    c1: '#FF9F1C', c2: '#FF6B35', tags: ['Punjabi', 'Street Food', 'Breakfast'],
  },
  {
    id: 'masala-dosa', name: 'Masala Dosa', cuisine: 'indian', dietType: 'veg',
    emoji: '🥞', time: 25, diff: 'Hard', cal: 340, pro: 9, carb: 58, fat: 8,
    spice: '⭐⭐', serves: 4,
    desc: "Crispy fermented rice crepe filled with spiced potato masala — South India's finest export!",
    veggies: ['🍚 Fermented rice batter', '🥔 Potatoes', '🧅 Onions', '🌿 Curry leaves', '🌿 Mustard seeds', '🌶️ Green Chillies'],
    optVeggies: ['🥥 Coconut chutney'],
    steps: [
      'Use fermented rice-urad dal batter (soak separately, grind fine, ferment 8-12 hrs).',
      'Boil and mash potatoes. Temper with mustard seeds, curry leaves, green chillies, turmeric.',
      'Heat dosa tawa until very hot. Sprinkle water — should sizzle and evaporate instantly.',
      'Pour ladle of batter, spread thin in circular motion quickly.',
      'Drizzle ghee on sides. Cook until crispy and golden (~3 min).',
      'Place masala in centre. Fold and serve with coconut chutney and sambar.',
    ],
    subs: { rice: 'millet', potato: 'sweet potato' },
    c1: '#C9963A', c2: '#FFD166', tags: ['South Indian', 'Breakfast', 'Street Food'],
  },
  {
    id: 'aloo-gobi', name: 'Aloo Gobi', cuisine: 'indian', dietType: 'vegan',
    emoji: '🥦', time: 25, diff: 'Easy', cal: 220, pro: 7, carb: 36, fat: 7,
    spice: '⭐⭐', serves: 4,
    desc: 'Dry-style potato and cauliflower sabzi spiced with turmeric, cumin and coriander — pure homestyle comfort.',
    veggies: ['🥔 Potatoes', '🥦 Cauliflower', '🧅 Onions', '🍅 Tomatoes', '🧄 Garlic', '🌿 Ginger', '🌿 Cumin seeds'],
    optVeggies: ['🌿 Fresh Coriander', '🌶️ Green Chillies'],
    steps: [
      'Cut potatoes and cauliflower into florets. Par-boil potatoes for 5 min.',
      'Heat oil, add cumin seeds. Once they splutter, add onions and cook until golden.',
      'Add ginger-garlic paste, tomatoes, turmeric, coriander powder, red chilli. Cook 8 min.',
      'Add cauliflower and potatoes. Toss to coat in masala.',
      'Cover and cook on medium-low for 15 min, stirring occasionally.',
      'Remove lid, increase heat briefly for dry texture. Garnish with fresh coriander.',
    ],
    subs: { potatoes: 'sweet potato', cauliflower: 'broccoli' },
    c1: '#FFD166', c2: '#C9963A', tags: ['Vegan', 'North Indian', 'Homestyle'],
  },
  // ── INDIAN NON-VEG ──
  {
    id: 'butter-chicken', name: 'Butter Chicken', cuisine: 'indian', dietType: 'nonveg',
    emoji: '🍗', time: 35, diff: 'Medium', cal: 420, pro: 35, carb: 18, fat: 22,
    spice: '⭐⭐⭐', serves: 4, trending: true,
    desc: 'Creamy, mildly spiced tomato-butter sauce enveloping tender chicken — the crown jewel of Indian cuisine!',
    veggies: ['🍅 Tomatoes', '🧅 Onions', '🧄 Garlic', '🫚 Butter', '🥛 Cream', '🌿 Ginger', '🌶️ Red Chilli'],
    optVeggies: ['🫑 Capsicum', '🌿 Coriander leaves'],
    steps: [
      'Marinate chicken in yogurt, red chilli powder, turmeric, garam masala for <strong>30 min</strong>.',
      'Grill/pan-fry marinated chicken until <strong>charred on edges</strong>. Set aside.',
      'Melt butter in deep pan. Sauté onions until golden brown.',
      'Add ginger-garlic paste, cook until raw smell disappears (~3 min).',
      'Add blended tomato puree. Cook covered on medium heat for <strong>15 min</strong>.',
      'Blend sauce smooth, strain back into pan. Add cream and kasuri methi.',
      'Add grilled chicken. Simmer on low heat for <strong>10 min</strong>. Season with salt and sugar.',
      'Finish with butter. Garnish with cream swirl and coriander.',
    ],
    subs: { cream: 'coconut cream,cashew paste', butter: 'ghee', tomatoes: 'canned tomato' },
    c1: '#FF6B35', c2: '#FF9F1C', tags: ['Non-Veg', 'North Indian', 'Mughlai', 'Restaurant-style'],
  },
  {
    id: 'biryani', name: 'Chicken Biryani', cuisine: 'indian', dietType: 'nonveg',
    emoji: '🍚', time: 60, diff: 'Hard', cal: 520, pro: 38, carb: 62, fat: 16,
    spice: '⭐⭐⭐⭐', serves: 6, trending: true,
    desc: 'Fragrant basmati rice layered with spiced chicken, caramelised onions and saffron — a feast in a pot!',
    veggies: ['🧅 Onions (lots)', '🍅 Tomatoes', '🧄 Garlic', '🌿 Mint leaves', '🌿 Coriander', '🌶️ Green Chillies', '🥄 Whole Spices'],
    optVeggies: ['🥔 Potatoes', '🌸 Rose water', '🌼 Saffron'],
    steps: [
      'Wash basmati rice. Soak for 30 min. Parboil with whole spices till 70% done.',
      'Marinate chicken with yogurt, biryani masala, ginger-garlic paste overnight.',
      'Fry onions in hot oil until <strong>deep golden brown (barista onions)</strong>. Drain and reserve.',
      'Cook marinated chicken in same oil until half done.',
      'Layer: chicken base, then rice, then fried onions, mint, coriander.',
      'Mix saffron in warm milk. Drizzle over rice. Seal pot with foil and lid.',
      'Cook dum — high heat 5 min, then very low for 25 min. Rest 10 min before opening.',
    ],
    subs: { chicken: 'mutton,vegetables,shrimp', saffron: 'turmeric+food colour', yogurt: 'hung curd' },
    c1: '#C9963A', c2: '#FF9F1C', tags: ['Non-Veg', 'Mughlai', 'Hyderabadi', 'Celebration'],
  },
  {
    id: 'fish-curry', name: 'Kerala Fish Curry', cuisine: 'indian', dietType: 'nonveg',
    emoji: '🐟', time: 30, diff: 'Medium', cal: 310, pro: 32, carb: 8, fat: 16,
    spice: '⭐⭐⭐', serves: 4,
    desc: "Tangy, spicy coconut-based fish curry with raw mango — the pride of Kerala's backwaters.",
    veggies: ['🐟 Fish (kingfish or pomfret)', '🥥 Coconut Milk', '🧅 Shallots', '🍅 Tomatoes', '🌿 Curry leaves', '🌶️ Green Chillies', '🥭 Raw Mango'],
    optVeggies: ['🌿 Fenugreek seeds', '🌿 Mustard seeds'],
    steps: [
      'Marinate fish with turmeric and salt for 10 min.',
      'Heat coconut oil in a clay pot if available. Add mustard seeds and curry leaves.',
      'Sauté shallots until pink. Add ginger, green chillies, cook 2 min.',
      'Add Kashmiri chilli paste, coriander powder, turmeric. Stir 2 min.',
      'Add coconut milk and raw mango slices. Bring to gentle simmer.',
      'Slide fish in gently. Cook 10-12 min on low — <strong>do not stir aggressively</strong>.',
      'Finish with a drizzle of coconut oil and fresh curry leaves.',
    ],
    subs: { fish: 'prawns,chicken', raw_mango: 'tamarind paste', coconut_milk: 'light coconut milk' },
    c1: '#1D5C3A', c2: '#C9963A', tags: ['Non-Veg', 'South Indian', 'Kerala', 'Coastal'],
  },
  // ── CHINESE ──
  {
    id: 'mapo-tofu', name: 'Mapo Tofu', cuisine: 'chinese', dietType: 'veg',
    emoji: '🫕', time: 20, diff: 'Easy', cal: 220, pro: 14, carb: 8, fat: 14,
    spice: '⭐⭐⭐⭐⭐', serves: 3,
    desc: 'Silken tofu in fiery, numbing Sichuan chilli bean paste — addictively spicy vegetarian classic.',
    veggies: ['🫙 Silken Tofu', '🌶️ Doubanjiang', '🧄 Garlic', '🌿 Ginger', '🧅 Spring Onions', '🌿 Sichuan Peppercorns'],
    optVeggies: ['🍄 Mushrooms (fully vegan)'],
    steps: [
      'Cube silken tofu. Gently blanch in salted water 3 min. Drain carefully.',
      'Fry doubanjiang in oil on medium until <strong>oil turns red and fragrant</strong> (3 min).',
      'Add garlic and ginger. Stir 30 sec.',
      'Pour in vegetable stock. Bring to boil. Slide tofu in gently.',
      'Simmer 5 min. Add cornstarch slurry to thicken sauce.',
      'Finish with sesame oil, white pepper, Sichuan peppercorn powder, spring onions.',
    ],
    subs: { silken_tofu: 'firm tofu', doubanjiang: 'miso+chilli paste' },
    c1: '#A8262A', c2: '#FF9F1C', tags: ['Sichuan', 'Spicy', 'Quick', 'Veg-adaptable'],
  },
  {
    id: 'veg-fried-rice', name: 'Vegetable Fried Rice', cuisine: 'chinese', dietType: 'vegan',
    emoji: '🍳', time: 15, diff: 'Easy', cal: 380, pro: 10, carb: 64, fat: 10,
    spice: '⭐', serves: 4,
    desc: 'Smoky wok-tossed rice with vibrant vegetables — simple, satisfying vegan comfort food.',
    veggies: ['🍚 Day-old cooked rice', '🥕 Carrots', '🫛 Peas', '🌽 Corn', '🧅 Spring Onions', '🧄 Garlic', '🫑 Capsicum'],
    optVeggies: ['🥦 Broccoli', '🍄 Mushrooms'],
    steps: [
      'Cold day-old rice is KEY — breaks up well and fries rather than steams.',
      'Heat wok until <strong>smoking hot</strong>. Add oil. Add garlic, stir 15 seconds.',
      'Add all vegetables. Stir-fry vigorously 2 min on max heat.',
      'Add rice. Press and stir. Let it <strong>sit on wok</strong> briefly for wok hei.',
      'Add soy sauce, sesame oil around the ring of wok.',
      'Add spring onions. Toss everything together. Taste and season.',
    ],
    subs: { soy_sauce: 'tamari (gluten-free)', 'spring onions': 'chives' },
    c1: '#C9963A', c2: '#FFD166', tags: ['Vegan', 'Cantonese', 'Quick', 'Classic'],
  },
  {
    id: 'kung-pao', name: 'Kung Pao Chicken', cuisine: 'chinese', dietType: 'nonveg',
    emoji: '🍗', time: 25, diff: 'Medium', cal: 380, pro: 32, carb: 22, fat: 18,
    spice: '⭐⭐⭐⭐', serves: 4, trending: true,
    desc: 'Bold Sichuan classic — tender chicken with peanuts, dried chilies and the signature numbing spice!',
    veggies: ['🍗 Chicken breast', '🥜 Peanuts', '🌶️ Dried Red Chilies', '🧅 Spring Onions', '🧄 Garlic', '🌿 Ginger', '🫑 Capsicum'],
    optVeggies: ['🌿 Sichuan Peppercorns'],
    steps: [
      'Dice chicken, marinate with soy sauce, cornstarch, Shaoxing wine for 15 min.',
      'Toast peanuts in dry wok until golden. Set aside.',
      'Fry dried chilies in hot oil until fragrant but not burnt (~30 sec). Add Sichuan peppercorns.',
      'Add chicken. Stir-fry on <strong>maximum heat</strong>. Don\'t crowd the wok!',
      'Add garlic, ginger, spring onion whites. Toss 1 min.',
      'Pour in sauce (soy sauce, vinegar, sugar, cornstarch). Toss to coat.',
      'Add peanuts last. Serve immediately over steamed rice.',
    ],
    subs: { chicken: 'shrimp,tofu', peanuts: 'cashews,almonds' },
    c1: '#A8262A', c2: '#FF6B35', tags: ['Non-Veg', 'Sichuan', 'Spicy', 'Classic'],
  },
  // ── ITALIAN ──
  {
    id: 'carbonara', name: 'Spaghetti Carbonara', cuisine: 'italian', dietType: 'nonveg',
    emoji: '🍝', time: 20, diff: 'Medium', cal: 580, pro: 28, carb: 68, fat: 22,
    spice: '⭐', serves: 4, trending: true,
    desc: 'The Roman masterpiece — silky egg-based sauce with guanciale, Pecorino and black pepper. No cream!',
    veggies: ['🍝 Spaghetti', '🥚 Eggs (whole + yolks)', '🥓 Guanciale (or Pancetta)', '🧀 Pecorino Romano', '🌿 Black Pepper (lots)'],
    optVeggies: ['🧄 Garlic'],
    steps: [
      'Boil spaghetti in heavily salted water until <strong>al dente</strong>.',
      'Fry guanciale in its own fat until crispy. Reserve the rendered fat.',
      'Whisk 2 whole eggs + 4 yolks with grated Pecorino. Season with lots of black pepper.',
      'CRITICAL: Take pan OFF heat. Add drained pasta. Toss with guanciale and fat.',
      'Add egg mixture. Toss vigorously while adding pasta water splash by splash.',
      'Heat from pasta cooks eggs into <strong>silky cream</strong> — not scrambled. Toss until glossy!',
      'Serve immediately with extra Pecorino and cracked black pepper.',
    ],
    subs: { guanciale: 'pancetta,bacon', pecorino: 'parmesan', spaghetti: 'rigatoni' },
    c1: '#FFD166', c2: '#C9963A', tags: ['Non-Veg', 'Roman', 'Classic', 'Pasta'],
  },
  {
    id: 'pizza-margherita', name: 'Pizza Margherita', cuisine: 'italian', dietType: 'veg',
    emoji: '🍕', time: 90, diff: 'Medium', cal: 270, pro: 12, carb: 38, fat: 8,
    spice: '⭐', serves: 4,
    desc: 'The original — simple San Marzano tomatoes, fresh mozzarella and basil on a blistered Neapolitan crust!',
    veggies: ['🍅 San Marzano Tomatoes', '🧀 Fresh Mozzarella', '🌿 Fresh Basil', '🫒 Olive Oil', '🧂 Salt'],
    optVeggies: ['🧄 Garlic'],
    steps: [
      'Pizza dough: Mix flour, water, yeast, salt. Knead 10 min. Rest 2 hrs.',
      'Preheat oven to <strong>highest temperature</strong> with pizza stone for 1 hour.',
      'Stretch dough by hand (don\'t roll — preserves air bubbles).',
      'Crush San Marzano tomatoes by hand. Season with salt only. Spread on dough.',
      'Tear mozzarella over sauce. Drizzle with olive oil.',
      'Bake until crust is blistered and charred in spots — <strong>8-12 min</strong>.',
      'Add fresh basil immediately after baking. Serve at once.',
    ],
    subs: { san_marzano: 'good canned tomatoes', mozzarella: 'buffalo mozzarella' },
    c1: '#A8262A', c2: '#1D5C3A', tags: ['Vegetarian', 'Neapolitan', 'Classic', 'Baked'],
  },
  // ── JAPANESE ──
  {
    id: 'ramen', name: 'Tonkotsu Ramen', cuisine: 'japanese', dietType: 'nonveg',
    emoji: '🍜', time: 240, diff: 'Hard', cal: 590, pro: 34, carb: 72, fat: 18,
    spice: '⭐⭐', serves: 4, trending: true,
    desc: 'Rich milky pork bone broth ramen — 4 hours to build, a lifetime to remember. Pure umami heaven.',
    veggies: ['🍜 Ramen Noodles', '🥚 Soft Boiled Egg (ajituke)', '🥩 Chashu Pork Belly', '🌿 Spring Onions', '🌿 Nori', '🌿 Bamboo Shoots'],
    optVeggies: ['🌶️ Chilli Oil', '🌿 Black Garlic Oil', '🌿 Sesame Seeds'],
    steps: [
      'Pork bone broth: Blanch bones, rinse. Boil at <strong>rolling boil for 4 hours</strong> until milky white.',
      'Chashu: Roll pork belly tight. Braise in soy-mirin-sake-sugar for 2 hours.',
      'Ajituke tamago: 6.5 min soft boil. Peel. Marinate in soy-mirin overnight.',
      'Make tare (seasoning): soy sauce, mirin, sake reduced together.',
      'Reheat broth. Season with tare. Should be rich, creamy, salty.',
      'Cook ramen noodles, drain well.',
      'In bowl: noodles, ladle of broth, chashu, egg, bamboo shoots, nori, spring onions.',
      'Drizzle black garlic oil. <strong>Eat immediately!</strong>',
    ],
    subs: { pork: 'chicken (lighter broth)', ramen_noodles: 'spaghetti (last resort)' },
    c1: '#C9963A', c2: '#6B3A2A', tags: ['Non-Veg', 'Japanese', 'Fukuoka', 'Slow Cook'],
  },
  {
    id: 'agedashi-tofu', name: 'Agedashi Tofu', cuisine: 'japanese', dietType: 'vegan',
    emoji: '🟨', time: 20, diff: 'Medium', cal: 180, pro: 10, carb: 16, fat: 8,
    spice: '⭐', serves: 4,
    desc: 'Delicately fried silken tofu in a light dashi broth with grated daikon — Japanese comfort at its finest.',
    veggies: ['🫙 Silken Tofu', '🥬 Katakuriko (potato starch)', '🌿 Dashi (kombu-based for vegan)', '🥒 Daikon radish', '🌿 Spring Onions'],
    optVeggies: ['🍄 Maitake mushrooms'],
    steps: [
      'Press silken tofu gently between paper towels for 15 min to remove excess water.',
      'Cut into cubes. Dust lightly with potato starch (katakuriko).',
      'Make tsuyu broth: kombu dashi, mirin, soy sauce, sugar — simmer 3 min.',
      'Heat oil to 170°C. Fry tofu cubes until <strong>light golden</strong> — about 3 min.',
      'Drain on paper towel. Place in bowl.',
      'Pour warm tsuyu broth around tofu. Top with grated daikon and spring onions.',
    ],
    subs: { potato_starch: 'cornstarch', kombu_dashi: 'vegetable stock+soy' },
    c1: '#FFD166', c2: '#2B7A8C', tags: ['Vegan', 'Japanese', 'Light', 'Izakaya'],
  },
  // ── MEXICAN ──
  {
    id: 'guacamole', name: 'Guacamole & Nachos', cuisine: 'mexican', dietType: 'vegan',
    emoji: '🥑', time: 10, diff: 'Easy', cal: 280, pro: 4, carb: 28, fat: 18,
    spice: '⭐⭐', serves: 4,
    desc: 'Fresh chunky guacamole made the traditional way — the ultimate party dip, vegan and irresistible!',
    veggies: ['🥑 Ripe Avocados', '🍅 Roma Tomatoes', '🧅 White Onion', '🌿 Cilantro', '🍋 Lime', '🌶️ Jalapeño', '🧂 Salt'],
    optVeggies: ['🧄 Garlic', '🌿 Cumin powder'],
    steps: [
      'Avocados must yield to gentle pressure but not be mushy.',
      'Halve, pit, scoop avocado into bowl. <strong>Never use a blender</strong> for true guacamole!',
      'Add lime juice immediately to prevent browning. Mash with fork — keep chunky!',
      'Fold in finely diced onion, tomato (seeds removed), jalapeño, cilantro.',
      'Season generously with salt. Adjust lime/salt balance.',
      'Serve immediately. Pro tip: keep pit in bowl — it helps preserve colour!',
    ],
    subs: { jalapeño: 'serrano,green chilli', cilantro: 'parsley', lime: 'lemon' },
    c1: '#1D5C3A', c2: '#2B7A52', tags: ['Vegan', 'Mexican', 'Quick', 'Party'],
  },
  {
    id: 'tacos', name: 'Carne Asada Tacos', cuisine: 'mexican', dietType: 'nonveg',
    emoji: '🌮', time: 30, diff: 'Easy', cal: 380, pro: 28, carb: 34, fat: 16,
    spice: '⭐⭐⭐', serves: 4, trending: true,
    desc: 'Smoky charred marinated beef on warm corn tortillas with fresh salsa and lime — perfecto!',
    veggies: ['🥩 Flank/Skirt Steak', '🌽 Corn Tortillas', '🍅 Tomatoes', '🧅 White Onion', '🌿 Cilantro', '🍋 Lime', '🌶️ Jalapeño'],
    optVeggies: ['🥑 Avocado', '🥬 Radishes'],
    steps: [
      'Marinate steak: orange juice, lime juice, garlic, cumin, chilli powder, oil. 2+ hours.',
      'Heat grill to screaming hot. Steak should hit with <strong>dramatic sizzle</strong>.',
      'Cook 3-4 min per side for medium-rare. Rest 5 min — crucial!',
      'Slice against the grain into thin strips.',
      'Make pico: dice tomatoes, onion, jalapeño, cilantro. Lime juice, salt.',
      'Warm tortillas directly over gas flame for charred edges.',
      'Build tacos: double tortilla, beef, pico, white onion, cilantro, squeeze of lime.',
    ],
    subs: { flank_steak: 'chicken,shrimp,mushrooms', corn_tortillas: 'flour tortillas' },
    c1: '#FF9F1C', c2: '#A8262A', tags: ['Non-Veg', 'Mexican', 'Street Food', 'Grilled'],
  },
  // ── THAI ──
  {
    id: 'pad-thai', name: 'Pad Thai', cuisine: 'thai', dietType: 'nonveg',
    emoji: '🍜', time: 20, diff: 'Medium', cal: 460, pro: 22, carb: 64, fat: 14,
    spice: '⭐⭐', serves: 4, trending: true,
    desc: "Thailand's famous stir-fried noodle — tangy, savory, sweet with crunchy peanuts and lime!",
    veggies: ['🍜 Rice Noodles (flat)', '🥚 Eggs', '🫘 Bean Sprouts', '🧅 Spring Onions', '🥜 Peanuts', '🍋 Lime', '🦐 Shrimp'],
    optVeggies: ['🌶️ Dried Chilli Flakes', '🧄 Garlic'],
    steps: [
      'Soak rice noodles in room temp water for 30 min. Drain.',
      'Pad Thai sauce: tamarind paste, fish sauce, palm sugar — balance the trio.',
      'Wok on maximum heat. Add shrimp, cook 2 min. Push to side.',
      'Crack eggs in centre. Scramble. Mix with shrimp before fully set.',
      'Add noodles. Pour sauce around wok edges. Toss everything together.',
      'Add bean sprouts and spring onion whites. Toss 30 sec.',
      'Plate immediately. Top with peanuts, spring onions, lime, chilli flakes.',
    ],
    subs: { shrimp: 'chicken,tofu', fish_sauce: 'soy sauce+lime (vegan)', tamarind: 'lime juice+brown sugar' },
    c1: '#FF9F1C', c2: '#FFD166', tags: ['Non-Veg', 'Thai', 'Street Food', 'Quick'],
  },
  {
    id: 'som-tam', name: 'Som Tam (Papaya Salad)', cuisine: 'thai', dietType: 'vegan',
    emoji: '🥗', time: 10, diff: 'Easy', cal: 120, pro: 4, carb: 22, fat: 2,
    spice: '⭐⭐⭐⭐⭐', serves: 2,
    desc: 'Explosive green papaya salad — spicy, sour, sweet and salty simultaneously. A flavour bomb!',
    veggies: ['🥭 Green Papaya', '🍅 Cherry Tomatoes', '🫘 Long Beans', '🥜 Peanuts', '🌶️ Thai Chillies', '🧄 Garlic', '🍋 Lime', '🍚 Palm Sugar'],
    optVeggies: ['🌿 Dried Shrimp (non-vegan option)'],
    steps: [
      'Pound garlic and chillies first until broken. Add palm sugar, dissolve.',
      'Add long beans — lightly bruise.',
      'Add shredded green papaya. Pound and mix gently.',
      'Season with soy sauce (vegan) and lime juice. Balance: spicy, sour, sweet, salty.',
      'Add cherry tomatoes. Lightly crush. Add peanuts last.',
      'Serve with sticky rice.',
    ],
    subs: { green_papaya: 'green mango,kohlrabi', palm_sugar: 'brown sugar', thai_chillies: 'bird eye chilli' },
    c1: '#1D5C3A', c2: '#FF9F1C', tags: ['Vegan', 'Thai', 'Salad', 'Spicy', 'Quick'],
  },
  // ── MEDITERRANEAN ──
  {
    id: 'hummus', name: 'Classic Hummus', cuisine: 'mediterranean', dietType: 'vegan',
    emoji: '🫙', time: 15, diff: 'Easy', cal: 180, pro: 8, carb: 22, fat: 8,
    spice: '⭐', serves: 6,
    desc: 'Ultra-smooth restaurant-quality hummus — the secret is removing the chickpea skins!',
    veggies: ['🫘 Chickpeas', '🫚 Tahini', '🍋 Lemon', '🧄 Garlic', '🫒 Olive Oil', '🧊 Ice Cold Water', '🧂 Salt'],
    optVeggies: ['🌶️ Paprika', '🌿 Parsley', '🫒 Kalamata Olives'],
    steps: [
      'Peel chickpea skins by rubbing between palms in water — this is the pro secret!',
      'Blend tahini and lemon juice first for 1 minute until fluffy.',
      'Add garlic and ice water. Blend 1 more minute — this aerates the tahini!',
      'Add peeled chickpeas, salt. Blend 3-4 min until extremely smooth.',
      'Create a well in the centre. Fill with olive oil, paprika, parsley.',
      'Serve with warm pita bread.',
    ],
    subs: { chickpeas: 'white beans,edamame', tahini: 'almond butter' },
    c1: '#C9963A', c2: '#FFD166', tags: ['Vegan', 'Middle East', 'Quick', 'Healthy'],
  },
  // ── KOREAN ──
  {
    id: 'bibimbap', name: 'Bibimbap', cuisine: 'korean', dietType: 'veg',
    emoji: '🥣', time: 40, diff: 'Medium', cal: 480, pro: 20, carb: 66, fat: 12,
    spice: '⭐⭐', serves: 2, trending: true,
    desc: 'Korean rice bowl — mixed with colourful namul vegetables, gochujang and a fried egg!',
    veggies: ['🍚 Steamed Rice', '🥚 Fried Egg', '🥕 Carrots', '🫛 Spinach', '🍄 Shiitake Mushrooms', '🌿 Bean Sprouts', '🥒 Zucchini', '🌶️ Gochujang'],
    optVeggies: ['🌿 Sesame Oil', '🌿 Sesame Seeds'],
    steps: [
      'Sauté each vegetable separately, season with sesame oil, garlic, soy, salt. Keep separate!',
      'Make gochujang sauce: gochujang, sesame oil, sugar, garlic, water.',
      'Use a hot stone pot (dolsot) or regular bowl.',
      'Add steamed rice. Arrange vegetables in sections like a colourful wheel.',
      'Top with fried egg (yolk should be runny).',
      'Add a spoonful of gochujang sauce in centre.',
      'Mix everything vigorously at the table!',
    ],
    subs: { gochujang: 'sriracha+miso', 'stone pot': 'heavy cast iron' },
    c1: '#A8262A', c2: '#FF9F1C', tags: ['Vegetarian', 'Korean', 'Rice Bowl', 'Colourful'],
  },
  // ── ARABIC ──
  {
    id: 'shawarma', name: 'Chicken Shawarma', cuisine: 'arabic', dietType: 'nonveg',
    emoji: '🌯', time: 30, diff: 'Medium', cal: 460, pro: 36, carb: 38, fat: 18,
    spice: '⭐⭐⭐', serves: 4, trending: true,
    desc: 'Heavily spiced roasted chicken carved off the spit, wrapped in flatbread with garlic sauce!',
    veggies: ['🍗 Chicken Thighs', '🫓 Flatbread/Pita', '🥬 Lettuce', '🍅 Tomatoes', '🥒 Pickled Cucumber', '🧄 Garlic', '🫒 Tahini'],
    optVeggies: ['🌶️ Pickled Chillies', '🧅 Red Onion'],
    steps: [
      'Marinade: yogurt, cumin, coriander, turmeric, cinnamon, paprika, garlic, lemon, oil. Marinate 4+ hours.',
      'Spread chicken on baking tray. Roast at 220°C for 25 min until charred edges.',
      'Rest chicken 5 min. Slice into thin strips.',
      'Garlic sauce (toum): blend garlic, salt, lemon, drizzle oil while blending until emulsified.',
      'Warm flatbread. Spread generous garlic sauce.',
      'Layer chicken, lettuce, tomatoes, pickles, red onion.',
      'Drizzle tahini. Roll tightly in foil and serve.',
    ],
    subs: { toum: 'mayo+garlic', flatbread: 'tortilla', tahini: 'yogurt sauce' },
    c1: '#C9963A', c2: '#FF9F1C', tags: ['Non-Veg', 'Middle Eastern', 'Street Food', 'Wrap'],
  },
  // ── DESSERTS ──
  {
    id: 'gulab-jamun', name: 'Gulab Jamun', cuisine: 'desserts', dietType: 'veg',
    emoji: '🟤', time: 30, diff: 'Medium', cal: 320, pro: 6, carb: 52, fat: 10,
    spice: '⭐', serves: 20,
    desc: 'Melt-in-your-mouth milk solid dumplings soaked in cardamom rose-water syrup — pure bliss!',
    veggies: ['🥛 Khoya/Mawa', '🌸 Rose Water', '🌿 Cardamom', '🍬 Sugar', '🌼 Saffron', '🌿 Fennel Seeds'],
    optVeggies: ['🥜 Pistachio (garnish)'],
    steps: [
      'Make syrup: sugar + water + cardamom + rose water + saffron. Boil until slightly sticky. Keep warm.',
      'Mix khoya, maida, baking soda into soft smooth dough. No cracks!',
      'Roll into crack-free balls — <strong>surface must be perfect</strong> or they crack in oil.',
      'Heat oil on LOW-MEDIUM. Drop balls in gently.',
      'Roll continuously in oil for even colour — takes 10-12 min.',
      'When deep golden, immediately immerse in warm syrup.',
      'Soak minimum 2 hours — overnight is sublime. They double in size!',
    ],
    subs: { khoya: 'full-cream milk powder', rose_water: 'vanilla extract', cardamom: 'star anise' },
    c1: '#6B3A2A', c2: '#C9963A', tags: ['Indian', 'Dessert', 'Festive', 'Vegetarian'],
  },
  {
    id: 'chocolate-lava', name: 'Chocolate Lava Cake', cuisine: 'desserts', dietType: 'veg',
    emoji: '🍫', time: 20, diff: 'Medium', cal: 420, pro: 7, carb: 48, fat: 22,
    spice: '⭐', serves: 4,
    desc: 'Warm chocolate cake with a molten centre that flows like liquid silk — restaurant magic at home!',
    veggies: ['🍫 Dark Chocolate (70%+)', '🧈 Butter', '🥚 Eggs + Yolks', '🍬 Sugar', '🌾 Flour (just 2 tbsp)', '🍬 Salt'],
    optVeggies: ['🍦 Vanilla Ice Cream (serving)'],
    steps: [
      'Grease ramekins well. Dust with cocoa powder. Preheat oven 200°C.',
      'Melt chocolate and butter together over double boiler. Cool slightly.',
      'Whisk eggs, yolks and sugar until pale and slightly thickened.',
      'Fold chocolate mixture into egg mixture. Fold in flour and salt gently.',
      'Fill ramekins ¾ full. Refrigerate 30 min (or up to 24 hrs).',
      'Bake <strong>exactly 12-13 min</strong> — the centre must remain liquid.',
      'Rest 1 min. Run knife around edge. Invert onto plate. Serve immediately with ice cream.',
    ],
    subs: { dark_chocolate: 'milk chocolate (less bitter)', flour: 'gluten-free flour' },
    c1: '#3A1A0A', c2: '#6B3A2A', tags: ['Vegetarian', 'Dessert', 'Quick', 'Impressive'],
  },
  // ── HEALTHY ──
  {
    id: 'buddha-bowl', name: 'Rainbow Buddha Bowl', cuisine: 'healthy', dietType: 'vegan',
    emoji: '🥗', time: 20, diff: 'Easy', cal: 380, pro: 16, carb: 54, fat: 12,
    spice: '⭐', serves: 2, trending: true,
    desc: 'Nutritious colourful bowl packed with grains, roasted veggies, chickpeas and tahini dressing!',
    veggies: ['🍚 Quinoa or Brown Rice', '🫘 Chickpeas (roasted)', '🥕 Carrots', '🫛 Edamame', '🍅 Cherry Tomatoes', '🥑 Avocado', '🥬 Kale'],
    optVeggies: ['🌽 Corn', '🌿 Beetroot', '🌿 Mixed Seeds'],
    steps: [
      'Cook quinoa: 1 cup to 2 cups water. Boil, reduce, cover, cook 15 min.',
      'Roasted chickpeas: toss with olive oil, paprika, garlic powder, cumin. Roast 200°C 25 min.',
      'Massage kale with olive oil and salt until tender.',
      'Tahini dressing: tahini, lemon juice, garlic, maple syrup, water. Whisk smooth.',
      'Arrange bowl: base of quinoa, all components in colourful sections.',
      'Drizzle tahini dressing. Sprinkle seeds. Eat the rainbow!',
    ],
    subs: { quinoa: 'brown rice,farro', chickpeas: 'tofu,tempeh', kale: 'spinach,arugula', tahini: 'almond butter' },
    c1: '#1D5C3A', c2: '#2B7A52', tags: ['Vegan', 'Healthy', 'Colourful', 'Quick'],
  },
  // ── AMERICAN ──
  {
    id: 'burger', name: 'Classic Smash Burger', cuisine: 'american', dietType: 'nonveg',
    emoji: '🍔', time: 15, diff: 'Easy', cal: 640, pro: 38, carb: 44, fat: 34,
    spice: '⭐⭐', serves: 4, trending: true,
    desc: 'The internet-famous smash burger — crispy-edged beef patty, American cheese, secret sauce!',
    veggies: ['🥩 80/20 Ground Beef', '🧀 American Cheese', '🥬 Lettuce', '🍅 Tomatoes', '🧅 Onion', '🥒 Pickles', '🍞 Brioche Buns'],
    optVeggies: ['🥓 Crispy Bacon'],
    steps: [
      'Loosely form beef into golf ball-sized portions (100g). Do NOT compress.',
      'Heat cast iron until SMOKING hot. Add sliced onions.',
      'Place beef ball on onions. With heavy spatula, <strong>smash flat and hard — commit!</strong>',
      'Season with salt and pepper immediately. Cook 2-3 min until edges are crispy.',
      'Flip once. Add cheese immediately. Cover briefly to melt.',
      'Secret sauce: mayo, ketchup, mustard, pickled relish, hot sauce.',
      'Toast bun. Build: sauce, lettuce, tomato, patty with onions, pickles.',
    ],
    subs: { beef: 'chicken,turkey,plant-based', american_cheese: 'cheddar,swiss', brioche: 'sesame bun' },
    c1: '#C9963A', c2: '#FF9F1C', tags: ['Non-Veg', 'American', 'Quick', 'Comfort'],
  },
];

/* ══════════════════════════════════════════
   DATA — Substitute knowledge base
══════════════════════════════════════════ */
const SUBS_DB = {
  'cream':        { 'coconut cream': 'ok', 'cashew paste': 'ok', 'milk': 'warn',     'yogurt': 'warn', 'water': 'bad' },
  'butter':       { 'ghee': 'ok',          'clarified butter': 'ok', 'oil': 'warn',  'margarine': 'warn', 'coconut oil': 'warn' },
  'chicken':      { 'paneer': 'ok',        'tofu': 'ok',         'shrimp': 'ok',     'mushroom': 'ok',  'mutton': 'warn', 'beef': 'warn', 'water': 'bad' },
  'paneer':       { 'tofu': 'ok',          'ricotta': 'ok',      'halloumi': 'ok',   'chicken': 'warn' },
  'onion':        { 'shallots': 'ok',      'leeks': 'ok',        'spring onion': 'ok', 'garlic': 'warn', 'nothing': 'bad' },
  'garlic':       { 'garlic powder': 'ok', 'asafoetida': 'ok',   'shallots': 'warn', 'nothing': 'warn' },
  'tomato':       { 'canned tomato': 'ok', 'passata': 'ok',      'tomato paste': 'ok', 'ketchup': 'warn', 'carrot': 'bad' },
  'rice':         { 'quinoa': 'ok',        'cauliflower rice': 'ok', 'couscous': 'warn', 'bread': 'bad' },
  'milk':         { 'oat milk': 'ok',      'almond milk': 'ok',  'soy milk': 'ok',   'water': 'warn',  'juice': 'bad' },
  'egg':          { 'flax egg': 'ok',      'chia egg': 'ok',     'aquafaba': 'ok',   'applesauce': 'warn', 'water': 'bad' },
  'sugar':        { 'honey': 'ok',         'maple syrup': 'ok',  'coconut sugar': 'ok', 'stevia': 'warn', 'salt': 'bad' },
  'soy sauce':    { 'tamari': 'ok',        'coconut aminos': 'ok', 'fish sauce': 'warn', 'salt water': 'warn' },
  'flour':        { 'almond flour': 'warn', 'oat flour': 'warn', 'cornstarch': 'warn', 'water': 'bad' },
  'tahini':       { 'almond butter': 'ok', 'sunflower butter': 'ok', 'peanut butter': 'warn', 'nothing': 'bad' },
  'olive oil':    { 'avocado oil': 'ok',   'vegetable oil': 'ok', 'butter': 'warn',  'coconut oil': 'warn' },
  'lime':         { 'lemon': 'ok',         'tamarind': 'ok',     'orange': 'warn',   'vinegar': 'warn' },
  'yogurt':       { 'hung curd': 'ok',     'sour cream': 'ok',   'coconut yogurt': 'ok', 'milk': 'warn' },
  'coconut milk': { 'light coconut milk': 'ok', 'cream': 'warn', 'almond milk': 'warn', 'water': 'bad' },
  'mozzarella':   { 'buffalo mozzarella': 'ok', 'burrata': 'ok', 'provolone': 'warn', 'cheddar': 'warn' },
};

/* ══════════════════════════════════════════
   DATA — Chef Tips
══════════════════════════════════════════ */
const TIPS_DATA = [
  { e: '🔪', t: 'Keep your knives sharp!',         txt: 'A sharp knife is safer and more efficient than a dull one. Hone before each session and sharpen monthly.',                                    c: '#A8262A' },
  { e: '🧂', t: 'Salt pasta water like the sea',    txt: 'This is the only chance to season pasta itself. The water should taste distinctly salty before adding pasta.',                              c: '#2B7A8C' },
  { e: '🌡️', t: 'Dry meat before searing',          txt: 'Pat meat completely dry with paper towels before the hot pan. Moisture creates steam and prevents browning.',                               c: '#C9963A' },
  { e: '🧅', t: 'Cold pan for eggs, hot for meat',  txt: 'Eggs love a gentle start in a cold pan. Meat needs a screaming hot pan for the Maillard reaction.',                                       c: '#1D5C3A' },
  { e: '🫙', t: 'Taste and adjust constantly',       txt: 'Season in layers throughout cooking, not just at the end. The best chefs taste everything multiple times.',                                 c: '#6B3A8C' },
  { e: '🛢️', t: 'Rest your meat — always!',          txt: 'After cooking, rest meat 5-10 min. The juices redistribute. Cut too early and they all run out.',                                          c: '#A8262A' },
  { e: '🍋', t: 'Acid brightens everything',         txt: 'A squeeze of lemon or lime at the end brightens flavours like magic — soups, stews, salads, all benefit.',                                c: '#C9963A' },
  { e: '🌿', t: 'Fresh herbs go in at the end',      txt: 'Basil, cilantro, parsley lose flavour when cooked. Add right before serving for maximum impact.',                                          c: '#1D5C3A' },
  { e: '🔥', t: 'Never overcrowd the pan',           txt: 'Overcrowding causes steaming instead of browning. Cook in batches — give each piece personal space.',                                     c: '#A8262A' },
  { e: '🧈', t: 'Brown butter = instant upgrade',    txt: 'Cook butter past melted into golden-brown stage. The nutty, caramel aroma transforms any dish.',                                          c: '#C9963A' },
  { e: '🥄', t: 'Pasta water is liquid gold',        txt: "Save 1-2 cups of starchy pasta water. It's perfect for emulsifying sauces and adjusting consistency.",                                    c: '#2B7A8C' },
  { e: '🌡️', t: 'Use a meat thermometer',            txt: 'Stop guessing doneness. Chicken: 74°C, medium beef: 57°C, pork: 63°C. Eliminates overcooked meat forever.',                              c: '#6B3A8C' },
];

/* ══════════════════════════════════════════
   DATA — Seed Reviews
══════════════════════════════════════════ */
const SEED_REVIEWS = [
  { name: 'Priya Sharma', dish: 'Butter Chicken',       rating: 5, text: "This recipe transported me back to my mother's kitchen. The kasuri methi tip made all the difference!",          date: '3 days ago' },
  { name: 'James Chen',   dish: 'Kung Pao Chicken',     rating: 5, text: 'Finally a Kung Pao recipe with the real Sichuan numbing tingle. Sichuan peppercorns are life-changing!',        date: '1 week ago' },
  { name: 'Sofia Rossi',  dish: 'Spaghetti Carbonara',  rating: 5, text: 'I was scared of raw egg but followed the instructions carefully and got silky perfection. No cream needed!',   date: '2 weeks ago' },
  { name: 'Ravi Kumar',   dish: 'Chicken Biryani',      rating: 4, text: 'The dum process made the rice incredibly fragrant. Only needed more saffron for deeper colour.',               date: '3 weeks ago' },
  { name: 'Maria Garcia', dish: 'Carne Asada Tacos',    rating: 5, text: 'The orange juice in the marinade is the secret I\'ve been missing. Family devoured everything!',               date: '1 month ago' },
];

/* ══════════════════════════════════════════════════════════════
   ██ LOCALSTORAGE HELPERS
   All app state is persisted via these two functions so data
   survives page refreshes.
══════════════════════════════════════════════════════════════ */

/**
 * Save any JS value to localStorage under a given key.
 * Internally uses JSON.stringify to handle arrays/objects.
 * @param {string} key
 * @param {*} value
 */
function saveToStorage(key, value) {
  try {
    localStorage.setItem('cookmaster_' + key, JSON.stringify(value));
  } catch (e) {
    console.warn('LocalStorage write failed:', e);
  }
}

/**
 * Load and JSON-parse a value from localStorage.
 * Returns `defaultValue` when the key is missing or data is corrupt.
 * @param {string} key
 * @param {*} defaultValue  — returned when key is absent
 * @returns {*}
 */
function loadFromStorage(key, defaultValue) {
  try {
    const raw = localStorage.getItem('cookmaster_' + key);
    return raw !== null ? JSON.parse(raw) : defaultValue;
  } catch (e) {
    console.warn('LocalStorage read failed:', e);
    return defaultValue;
  }
}

/* ══════════════════════════════════════════
   APPLICATION STATE
   Loaded from localStorage on startup; saved back on every change.
══════════════════════════════════════════ */
let reviews      = loadFromStorage('reviews',     SEED_REVIEWS);   // array of review objects
let groceryItems = loadFromStorage('grocery',     []);              // array of {id, name, done}
let favorites    = new Set(loadFromStorage('favorites', []));       // Set of dish IDs
let plannerData  = loadFromStorage('planner',     {});              // { 'weekOffset-dayIdx': { slotKey: [{dishId,name,emoji,cal}] } }

let currentTab   = 'home';
let dietFilter   = 'all';
let selectedDay  = 0;   // 0 = Monday … 6 = Sunday
let weekOffset   = 0;   // 0 = this week, +/- = future/past
let reviewStar   = 0;   // current star rating selection in form
let modalStar    = 0;   // current star rating selection in modal

const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAYS_FULL  = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_SLOTS = [
  { key: 'breakfast', icon: '🌅', name: 'Breakfast',     time: '7:00 – 9:00 AM' },
  { key: 'morning',   icon: '☕', name: 'Morning Snack', time: '10:30 – 11:00 AM' },
  { key: 'lunch',     icon: '☀️', name: 'Lunch',          time: '12:30 – 2:00 PM' },
  { key: 'evening',   icon: '🌤️', name: 'Evening Snack',  time: '5:00 – 6:00 PM' },
  { key: 'dinner',    icon: '🌙', name: 'Dinner',         time: '8:00 – 9:30 PM' },
];

/* ══════════════════════════════════════════
   LOGIN
══════════════════════════════════════════ */
function switchLTab(t) {
  document.getElementById('siBtn').classList.toggle('act', t === 'si');
  document.getElementById('suBtn').classList.toggle('act', t === 'su');
  document.getElementById('siForm').style.display = t === 'si' ? 'block' : 'none';
  document.getElementById('suForm').style.display = t === 'su' ? 'block' : 'none';
  document.getElementById('loginFormTitle').textContent = t === 'si' ? 'Welcome Back' : 'Create Account';
  document.getElementById('loginFormSub').textContent   = t === 'si' ? 'Sign in to your kitchen account' : 'Join the CookMaster community';
}

function doLogin() {
  const email = document.getElementById('liEmail').value;
  const pass  = document.getElementById('liPass').value;
  if (email && pass) {
    // ── DOM Manipulation: hide login, show app ──
    document.getElementById('loginScreen').classList.remove('active');
    document.getElementById('appScreen').classList.add('active');
    // Display first letter of username as avatar
    document.getElementById('uAvatar').textContent = email[0].toUpperCase();
    initApp();
  } else {
    document.getElementById('liErr').classList.add('show');
  }
}

function guestLogin() {
  document.getElementById('liEmail').value = 'guest@cookmaster.com';
  document.getElementById('liPass').value  = 'guest';
  doLogin();
}

/* ══════════════════════════════════════════
   DARK MODE
   Persisted in localStorage so theme survives refresh.
══════════════════════════════════════════ */
function toggleDark() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const theme  = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('dkIcon').textContent  = isDark ? '🌙' : '☀️';
  document.getElementById('dkLabel').textContent = isDark ? 'Dark Mode' : 'Light Mode';
  saveToStorage('theme', theme);   // ← LocalStorage: persist theme
}

/* ══════════════════════════════════════════
   TAB NAVIGATION
   Updates active class on nav buttons and shows the correct tab panel.
══════════════════════════════════════════ */
function switchTab(t) {
  currentTab = t;
  // ── DOM Manipulation: remove/add active classes ──
  document.querySelectorAll('.tab-c').forEach(el => el.classList.remove('act'));
  document.querySelectorAll('.nav-t').forEach(el => el.classList.remove('act'));
  document.getElementById('tab-' + t).classList.add('act');
  // Match nav button text to the tab name
  const navMap = { home: 'Home', cuisines: 'Cuisines', vegnonveg: 'Veg', quick: 'Quick', tips: 'Tips', planner: 'Planner', grocery: 'Grocery', reviews: 'Reviews' };
  document.querySelectorAll('.nav-t').forEach(btn => {
    if (btn.textContent.includes(navMap[t])) btn.classList.add('act');
  });
}

/* ══════════════════════════════════════════
   INIT — called once after login
══════════════════════════════════════════ */
function initApp() {
  // Restore persisted theme
  const savedTheme = loadFromStorage('theme', 'light');
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.getElementById('dkIcon').textContent  = savedTheme === 'dark' ? '☀️' : '🌙';
  document.getElementById('dkLabel').textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';

  renderCatGrid();
  renderTrendGrid();
  renderQuickHomeGrid();
  renderCuisinesTab();
  renderVegNonVeg('all');
  renderQuickTab();
  renderTips();
  renderPlanner();
  renderReviews();
  renderGroceryItems();
  populateDishSelect();
}

/* ══════════════════════════════════════════
   BADGE & CARD HELPERS
══════════════════════════════════════════ */

/** Returns a coloured diet badge HTML string. */
function dietBadge(dietType) {
  if (dietType === 'vegan')  return `<span class="veg-badge vegan">🌱 Vegan</span>`;
  if (dietType === 'veg')    return `<span class="veg-badge veg">🟢 Veg</span>`;
  return `<span class="veg-badge nonveg">🔴 Non-Veg</span>`;
}

/**
 * Builds an HTML string for a single dish card.
 * Uses DOM-string template — inserted via innerHTML for batch rendering.
 */
function buildDishCard(dish) {
  const fav = favorites.has(dish.id) ? '❤️' : '🤍';
  return `
    <div class="dcard" onclick="openDish('${dish.id}')">
      <div class="dcard-top" style="--c1:${dish.c1};--c2:${dish.c2}">
        <div class="dcard-top-bg"></div>
        <div class="dcard-top-border"></div>
        ${dish.emoji}
      </div>
      <div class="dcard-body">
        <div class="dcard-meta-row">${dietBadge(dish.dietType)}</div>
        <div class="dcard-name">${dish.name}</div>
        <div class="dcard-chips">
          <span class="chip">⏱️ ${dish.time}min</span>
          <span class="chip">👨‍🍳 ${dish.diff}</span>
          <span class="chip gold">${dish.spice || '⭐'} Spice</span>
        </div>
        <div class="dcard-desc">${dish.desc}</div>
      </div>
      <div class="dcard-footer">
        <button class="fav-btn" onclick="event.stopPropagation(); toggleFav('${dish.id}', this)">${fav}</button>
        <button class="view-btn">View Recipe →</button>
      </div>
    </div>`;
}

/**
 * Toggle favourite status for a dish.
 * Array method: favorites is a Set; we convert to array for storage.
 * LocalStorage: persists across sessions.
 */
function toggleFav(id, btn) {
  if (favorites.has(id)) {
    favorites.delete(id);
    btn.textContent = '🤍';
    showToast('Removed from favourites');
  } else {
    favorites.add(id);
    btn.textContent = '❤️';
    showToast('Added to favourites ❤️');
  }
  // Array method: Array.from() converts Set → Array for JSON storage
  saveToStorage('favorites', Array.from(favorites));
}

/* ══════════════════════════════════════════
   HOME RENDERERS
══════════════════════════════════════════ */

/** Renders cuisine category cards using Array.map(). */
function renderCatGrid() {
  // Array method: map() transforms each cuisine object → HTML string
  document.getElementById('catGrid').innerHTML = CUISINES_DATA.map(c => {
    const count = DISHES.filter(d => d.cuisine === c.id).length; // Array.filter()
    return `
      <div class="ccard" style="--ccolor:${c.color}" onclick="goCuisine('${c.id}')">
        <span class="ccard-emoji">${c.flag}</span>
        <span class="ccard-name">${c.name}</span>
        <span class="ccard-count">${count} recipes</span>
      </div>`;
  }).join('');
}

/** Jumps to Cuisines tab and scrolls to the right section. */
function goCuisine(id) {
  switchTab('cuisines');
  setTimeout(() => {
    const el = document.getElementById('csec-' + id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

/** Renders trending dishes using Array.filter() + .slice(). */
function renderTrendGrid() {
  // Array method: filter() picks trending=true, slice() limits to 6
  const dishes = DISHES.filter(d => d.trending).slice(0, 6);
  document.getElementById('trendGrid').innerHTML = dishes.map(buildDishCard).join('');
}

/** Renders quick dishes (≤ 20 min) using Array.filter(). */
function renderQuickHomeGrid() {
  const dishes = DISHES.filter(d => d.time <= 20).slice(0, 6); // Array.filter()
  document.getElementById('quickHomeGrid').innerHTML = dishes.map(buildDishCard).join('');
}

/* ══════════════════════════════════════════
   CUISINES TAB
══════════════════════════════════════════ */
function renderCuisinesTab() {
  // Build filter pills dynamically — Array.map()
  document.getElementById('cuisineFilter').innerHTML =
    `<span class="pill act" onclick="filterCuisine('all',this)">🌍 All</span>` +
    CUISINES_DATA.map(c =>
      `<span class="pill" onclick="filterCuisine('${c.id}',this)">${c.flag} ${c.name}</span>`
    ).join('');
  renderCuisineSections('all');
}

function filterCuisine(id, el) {
  // Event handling: highlight selected pill, re-render sections
  document.querySelectorAll('#cuisineFilter .pill').forEach(p => p.classList.remove('act'));
  el.classList.add('act');
  renderCuisineSections(id);
}

/** Renders cuisine sections, each broken down by diet type. */
function renderCuisineSections(filter) {
  // Array method: filter() to pick cuisines, then again per diet type
  const cuisines = filter === 'all' ? CUISINES_DATA : CUISINES_DATA.filter(c => c.id === filter);

  document.getElementById('cuisineSections').innerHTML = cuisines.map(c => {
    const dishes      = DISHES.filter(d => d.cuisine === c.id);
    if (!dishes.length) return '';

    const vegDishes    = dishes.filter(d => d.dietType === 'veg');
    const veganDishes  = dishes.filter(d => d.dietType === 'vegan');
    const nonvegDishes = dishes.filter(d => d.dietType === 'nonveg');

    let inner = '';
    if (veganDishes.length)  inner += buildDietSection('vegan',  '🌱 Vegan',            veganDishes);
    if (vegDishes.length)    inner += buildDietSection('veg',    '🟢 Vegetarian',        vegDishes);
    if (nonvegDishes.length) inner += buildDietSection('nonveg', '🔴 Non-Vegetarian',    nonvegDishes);

    return `
      <div class="cuisine-blk" id="csec-${c.id}">
        <div class="cuisine-blk-hdr">
          <span class="cuisine-flag">${c.flag}</span>
          <div>
            <div class="cuisine-name">${c.name}</div>
            <div class="cuisine-sub-desc">${c.desc}</div>
          </div>
        </div>
        ${inner}
      </div>`;
  }).join('');
}

/** Builds one diet-type section with a colour-coded header. */
function buildDietSection(type, label, dishes) {
  return `
    <div class="diet-section">
      <div class="diet-section-hdr ${type}-hdr">
        <div class="diet-dot ${type}"></div>
        <div class="diet-section-title ${type}">${label}</div>
        <div class="diet-section-count">${dishes.length} recipe${dishes.length > 1 ? 's' : ''}</div>
      </div>
      <div class="dish-grid">${dishes.map(buildDishCard).join('')}</div>
    </div>`;
}

/* ══════════════════════════════════════════
   VEG / NON-VEG TAB
══════════════════════════════════════════ */
function setDiet(type, btn) {
  dietFilter = type;
  // Event handling: update button active state
  document.querySelectorAll('#dietToggle .diet-btn').forEach(b => {
    b.classList.remove('act-all', 'act-veg', 'act-nonveg');
  });
  if (type === 'all')    btn.classList.add('act-all');
  if (type === 'veg')    btn.classList.add('act-veg');
  if (type === 'vegan')  btn.classList.add('act-veg');
  if (type === 'nonveg') btn.classList.add('act-nonveg');
  renderVegNonVeg(type);
}

function renderVegNonVeg(type) {
  const allTypes = type === 'all' ? ['vegan', 'veg', 'nonveg'] : [type];

  // Array method: map() over diet types → sections
  document.getElementById('vnvSections').innerHTML = allTypes.map(dt => {
    const dishes = DISHES.filter(d => d.dietType === dt); // Array.filter()
    const label  = dt === 'vegan' ? '🌱 Vegan Recipes' : dt === 'veg' ? '🟢 Vegetarian Recipes' : '🔴 Non-Vegetarian Recipes';
    return buildDietSection(dt, label, dishes);
  }).join('');
}

/* ══════════════════════════════════════════
   QUICK COOK TAB
══════════════════════════════════════════ */
function renderQuickTab() {
  const times = [
    { l: '5 min',  v: 5,   e: '🚀' },
    { l: '10 min', v: 10,  e: '⚡' },
    { l: '15 min', v: 15,  e: '⏱️' },
    { l: '20 min', v: 20,  e: '🕐' },
    { l: '30 min', v: 30,  e: '🍳' },
    { l: 'All',    v: 999, e: '📚' },
  ];
  document.getElementById('timeCards').innerHTML = times.map(t =>
    `<div class="time-card ${t.v === 999 ? 'act' : ''}" onclick="filterTime(${t.v}, this)">
      <span class="tc-n">${t.l.split(' ')[0]}</span>
      <span class="tc-l">${t.l === 'All' ? 'All Recipes' : 'Minute Recipes'}</span>
      <span class="tc-e">${t.e}</span>
    </div>`
  ).join('');
  filterTime(999, null);
}

function filterTime(max, btn) {
  if (btn) {
    document.querySelectorAll('.time-card').forEach(c => c.classList.remove('act'));
    btn.classList.add('act');
  }
  // Array method: filter() by time limit
  const dishes = max === 999 ? DISHES : DISHES.filter(d => d.time <= max);
  document.getElementById('quickTitle').textContent   = max === 999 ? `All Recipes (${dishes.length})` : `Under ${max} Minutes — ${dishes.length} recipes found`;
  document.getElementById('quickDishGrid').innerHTML  = dishes.map(buildDishCard).join('');
}

/* ══════════════════════════════════════════
   CHEF TIPS
══════════════════════════════════════════ */
function renderTips() {
  // Array method: map() → tip card HTML strings
  document.getElementById('tipsGrid').innerHTML = TIPS_DATA.map(t =>
    `<div class="tip-card" style="--tip-c:${t.c}">
      <span class="tip-e">${t.e}</span>
      <div class="tip-tit">${t.t}</div>
      <div class="tip-txt">${t.txt}</div>
    </div>`
  ).join('');
}

/* ══════════════════════════════════════════
   DISH MODAL
══════════════════════════════════════════ */
function openDish(id) {
  // Array method: find() locates the single matching dish
  const d = DISHES.find(x => x.id === id);
  if (!d) return;

  // Build substitute chips from dish.subs object
  const subHTML = d.subs
    ? Object.entries(d.subs).map(([orig, alt]) =>
        `<span class="vi" title="Can use: ${alt}">🔄 ${orig} → ${alt.split(',')[0]}</span>`
      ).join('')
    : '';

  // ── DOM Manipulation: inject all modal content via innerHTML ──
  document.getElementById('dishModalBox').innerHTML = `
    <button class="modal-close" onclick="closeModal()">✕</button>

    <div class="modal-hero" style="--c1:${d.c1};--c2:${d.c2}">
      <div class="modal-hero-bg"></div>
      <div class="modal-hero-overlay"></div>
      <div class="modal-hero-emoji">${d.emoji}</div>
    </div>

    <div class="modal-body">
      <div class="modal-title-row">
        <div class="modal-title">${d.name}</div>
        ${dietBadge(d.dietType)}
      </div>
      <div class="modal-tags">
        <span class="mtag gold">⏱️ ${d.time} min</span>
        <span class="mtag">👨‍🍳 ${d.diff}</span>
        <span class="mtag">👥 Serves ${d.serves}</span>
        ${(d.tags || []).map(t => `<span class="mtag">${t}</span>`).join('')}
      </div>
      <div class="modal-desc">${d.desc}</div>

      <div class="m-sec">
        <div class="m-sec-title">🥦 Ingredients</div>
        <div class="veggies-wrap">
          ${d.veggies.map(v => `<span class="vi">${v}</span>`).join('')}
          ${(d.optVeggies || []).map(v => `<span class="vi opt">${v}</span>`).join('')}
        </div>
      </div>

      <div class="m-sec">
        <div class="m-sec-title">👨‍🍳 Step-by-Step Instructions</div>
        <div class="steps-list">
          ${d.steps.map((s, i) => `
            <div class="step-row">
              <div class="step-n">${i + 1}</div>
              <div class="step-t">${s}</div>
            </div>`).join('')}
        </div>
      </div>

      <div class="m-sec">
        <div class="m-sec-title">📊 Nutrition per Serving</div>
        <div class="nut-grid">
          <div class="nut-c"><span class="nut-v">${d.cal}</span><span class="nut-l">Calories</span></div>
          <div class="nut-c"><span class="nut-v">${d.pro}g</span><span class="nut-l">Protein</span></div>
          <div class="nut-c"><span class="nut-v">${d.carb}g</span><span class="nut-l">Carbs</span></div>
          <div class="nut-c"><span class="nut-v">${d.fat}g</span><span class="nut-l">Fat</span></div>
        </div>
      </div>

      ${d.subs ? `
      <div class="m-sec">
        <div class="m-sec-title">🔄 Common Substitutes</div>
        <div class="veggies-wrap">${subHTML}</div>
      </div>` : ''}

      <div class="m-sec">
        <div class="sub-box">
          <div class="sub-title">🔬 Ingredient Substitute Checker</div>
          <p style="font-size:.78rem;color:var(--ink-lt);margin-bottom:12px;font-weight:300;">Not sure if your substitute will work? Enter below to find out.</p>
          <div class="sub-row">
            <input class="sub-in" id="subOrig" placeholder="Original ingredient (e.g. cream)">
            <input class="sub-in" id="subAlt"  placeholder="Your substitute (e.g. coconut milk)">
            <button class="sub-chk-btn" onclick="checkSub()">Check ✓</button>
          </div>
          <div class="sub-res" id="subRes"></div>
        </div>
      </div>

      <div class="m-sec">
        <div class="m-sec-title">📅 Add to Meal Planner</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
          ${MEAL_SLOTS.map(sl =>
            `<button onclick="addDishToSlot('${d.id}','${sl.key}')"
              style="background:var(--ivory2);border:1.5px solid var(--border);padding:8px 14px;border-radius:var(--r-sm);font-size:.78rem;font-weight:600;color:var(--ink-mid);cursor:pointer;"
              onmouseover="this.style.borderColor='var(--gold)';this.style.color='var(--gold)'"
              onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--ink-mid)'">
              ${sl.icon} ${sl.name}
            </button>`
          ).join('')}
        </div>
      </div>

      <div class="m-sec">
        <div class="m-sec-title">⭐ Rate this Recipe</div>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div id="modalStars" style="display:flex;gap:4px;">
            ${[1,2,3,4,5].map(n =>
              `<span onclick="setModalStar(${n})"
                style="font-size:1.5rem;cursor:pointer;"
                onmouseover="this.style.transform='scale(1.3)'"
                onmouseout="this.style.transform='scale(1)'">⭐</span>`
            ).join('')}
          </div>
          <button onclick="submitModalRating('${d.name}')"
            style="background:var(--emerald);color:#fff;padding:8px 18px;border-radius:var(--r-sm);font-weight:600;font-size:.8rem;cursor:pointer;">
            Submit Rating
          </button>
          <button onclick="quickAddGroceryFromDish('${d.id}')"
            style="background:var(--gold);color:var(--ink);padding:8px 18px;border-radius:var(--r-sm);font-weight:600;font-size:.8rem;cursor:pointer;">
            🛒 Add to Grocery
          </button>
        </div>
      </div>
    </div>`;

  document.getElementById('dishModal').classList.add('act');
}

function setModalStar(n) {
  modalStar = n;
  // DOM Manipulation: update star display
  document.querySelectorAll('#modalStars span').forEach((s, i) => {
    s.textContent = i < n ? '⭐' : '☆';
  });
}

function submitModalRating(name) {
  if (!modalStar) { showToast('Please select a star rating!'); return; }
  showToast(`Rated ${name} ${'⭐'.repeat(modalStar)} — Thank you!`);
  modalStar = 0;
}

/** Adds all ingredients from a dish to the grocery list and saves to localStorage. */
function quickAddGroceryFromDish(id) {
  const d = DISHES.find(x => x.id === id);
  if (!d) return;

  // Array method: forEach() to add each ingredient if not already present
  d.veggies.forEach(v => {
    if (!groceryItems.find(i => i.name === v)) {
      groceryItems.push({ name: v, done: false, id: Date.now() + Math.random() });
    }
  });

  renderGroceryItems();
  saveToStorage('grocery', groceryItems);          // ← LocalStorage: persist grocery list
  showToast(`Ingredients for ${d.name} added to Grocery List! 🛒`);
}

/** Add a planned dish to a specific meal slot in the planner. */
function addDishToSlot(dishId, slotKey) {
  const d      = DISHES.find(x => x.id === dishId);
  const dayKey = `${weekOffset}-${selectedDay}`;

  if (!plannerData[dayKey])          plannerData[dayKey] = {};
  if (!plannerData[dayKey][slotKey]) plannerData[dayKey][slotKey] = [];

  plannerData[dayKey][slotKey].push({ dishId, name: d.name, emoji: d.emoji, cal: d.cal });

  saveToStorage('planner', plannerData);           // ← LocalStorage: persist meal plan
  renderPlannerMain();
  renderWeekStrip();
  renderPlannerSidebar();
  updateNutrition();

  const slotName = MEAL_SLOTS.find(s => s.key === slotKey).name;
  showToast(`${d.name} added to ${slotName}!`);
  closeModal();
  switchTab('planner');
}

function closeMOv(e) {
  if (e.target === document.getElementById('dishModal')) closeModal();
}
function closeModal() {
  document.getElementById('dishModal').classList.remove('act');
}

/* ── Substitute Checker ── */
function checkSub() {
  const orig = document.getElementById('subOrig').value.trim().toLowerCase();
  const alt  = document.getElementById('subAlt').value.trim().toLowerCase();
  const res  = document.getElementById('subRes');

  if (!orig || !alt) { showToast('Please fill both fields'); return; }

  let found = false;
  // Iterate SUBS_DB to find matching ingredient pair
  for (const [ing, subs] of Object.entries(SUBS_DB)) {
    if (orig.includes(ing) || ing.includes(orig)) {
      for (const [sub, verdict] of Object.entries(subs)) {
        if (alt.includes(sub) || sub.includes(alt)) {
          found = true;
          if (verdict === 'ok')   { res.className = 'sub-res ok';   res.innerHTML = `✅ <strong>${alt}</strong> works well as a substitute for <strong>${orig}</strong>. Minimal impact on the dish.`; }
          if (verdict === 'warn') { res.className = 'sub-res warn'; res.innerHTML = `⚠️ <strong>${alt}</strong> can substitute <strong>${orig}</strong> but will slightly change flavour or texture. Taste as you go.`; }
          if (verdict === 'bad')  { res.className = 'sub-res bad';  res.innerHTML = `❌ <strong>${alt}</strong> is NOT recommended as a substitute for <strong>${orig}</strong>. It may significantly alter the dish.`; }
          return;
        }
      }
    }
  }
  if (!found) {
    res.className = 'sub-res warn';
    res.innerHTML = `🤔 No data for this specific pair. General rule: substitute similar-purpose ingredients (fats for fats, acids for acids) in equal amounts and taste as you cook!`;
  }
}

/* ══════════════════════════════════════════
   DAILY PLANNER
══════════════════════════════════════════ */
function renderPlanner() {
  renderWeekStrip();
  renderPlannerSidebar();
  renderPlannerMain();
  updateNutrition();
}

/** Returns a Date object for a given day index in the current week. */
function getDateForDay(dayIdx) {
  const now       = new Date();
  const dayOfWeek = now.getDay();
  const diff      = dayIdx - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + weekOffset * 7;
  const d         = new Date(now);
  d.setDate(now.getDate() + diff);
  return d;
}

/** Renders the 7-day strip at the top of the planner. */
function renderWeekStrip() {
  // DOM Manipulation: rebuild week strip from scratch
  document.getElementById('weeklyStrip').innerHTML = DAYS_SHORT.map((day, i) => {
    const d       = getDateForDay(i);
    const dayKey  = `${weekOffset}-${i}`;
    const hasMeals = plannerData[dayKey] && Object.keys(plannerData[dayKey]).length > 0;
    return `
      <div class="week-day ${i === selectedDay ? 'sel' : ''} ${hasMeals ? 'has' : ''}"
           onclick="selectDay(${i})">
        <div class="week-d-name">${day}</div>
        <div class="week-d-num">${d.getDate()}</div>
      </div>`;
  }).join('');
}

/** Renders the sidebar day-list. */
function renderPlannerSidebar() {
  // Array method: map() over DAYS_FULL → sidebar items
  document.getElementById('plannerDayList').innerHTML = DAYS_FULL.map((day, i) => {
    const dayKey   = `${weekOffset}-${i}`;
    const meals    = plannerData[dayKey] || {};
    // Array method: reduce() totals all meal counts
    const mealCount = Object.values(meals).reduce((acc, slotArr) => acc + slotArr.length, 0);
    return `
      <div class="planner-day-item ${i === selectedDay ? 'sel' : ''} ${mealCount > 0 ? 'has-meals' : ''}"
           onclick="selectDay(${i})">
        <div class="planner-day-dot"></div>
        <div class="planner-day-name">${day}</div>
        <div class="planner-day-count">${mealCount > 0 ? mealCount + ' meals' : ''}</div>
      </div>`;
  }).join('');

  const d = getDateForDay(selectedDay);
  document.getElementById('plannerSideTitle').textContent = DAYS_FULL[selectedDay] + ', ' + d.getDate();
}

/** Renders the main meal slot area for the selected day. */
function renderPlannerMain() {
  const dayKey  = `${weekOffset}-${selectedDay}`;
  const dayMeals = plannerData[dayKey] || {};
  const d        = getDateForDay(selectedDay);

  // DOM Manipulation: rebuild entire planner main area
  document.getElementById('plannerMain').innerHTML =
    `<div style="background:var(--white);border-radius:var(--r-md);border:1px solid var(--border-lt);padding:16px 20px;box-shadow:var(--shadow-sm);">
      <div style="font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:600;color:var(--ink);">${DAYS_FULL[selectedDay]}</div>
      <div style="font-size:.78rem;color:var(--ink-lt);font-weight:300;">${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
    </div>` +

    // Array method: map() renders each meal slot
    MEAL_SLOTS.map(slot => {
      const items = dayMeals[slot.key] || [];
      return `
        <div class="planner-meal-slot">
          <div class="planner-slot-hdr">
            <span class="planner-slot-icon">${slot.icon}</span>
            <span class="planner-slot-name">${slot.name}</span>
            <span class="planner-slot-time">${slot.time}</span>
          </div>
          <div class="planner-slot-body">
            ${items.length
              ? items.map((m, idx) => `
                  <div class="planner-meal-item">
                    <span class="planner-meal-emoji">${m.emoji}</span>
                    <span class="planner-meal-name">${m.name}</span>
                    <span class="planner-meal-cal">${m.cal} kcal</span>
                    <button class="planner-meal-del" onclick="removePlannerMeal('${slot.key}', ${idx})">✕</button>
                  </div>`).join('')
              : `<div class="planner-empty">No meal planned<br><small>Browse recipes and click "Add to Meal Planner"</small></div>`
            }
            <button class="planner-add-btn" onclick="switchTab('cuisines')">+ Browse Recipes</button>
          </div>
        </div>`;
    }).join('');
}

function removePlannerMeal(slotKey, idx) {
  const dayKey = `${weekOffset}-${selectedDay}`;
  if (plannerData[dayKey] && plannerData[dayKey][slotKey]) {
    plannerData[dayKey][slotKey].splice(idx, 1);
    saveToStorage('planner', plannerData);          // ← LocalStorage: persist after removal
    renderPlannerMain();
    renderWeekStrip();
    renderPlannerSidebar();
    updateNutrition();
  }
}

/**
 * Recalculates nutrition totals for the selected day.
 * Array method: reduce() sums calories/protein/carbs/fat across all meals.
 */
function updateNutrition() {
  const dayKey  = `${weekOffset}-${selectedDay}`;
  const dayMeals = plannerData[dayKey] || {};

  // Flatten all meal arrays then reduce to totals
  const totals = Object.values(dayMeals)
    .flat()   // flatten [[meal,meal], [meal]] → [meal,meal,meal]
    .reduce(
      (acc, m) => {
        const d = DISHES.find(x => x.id === m.dishId);
        if (d) { acc.cal += d.cal; acc.pro += d.pro; acc.carb += d.carb; acc.fat += d.fat; }
        return acc;
      },
      { cal: 0, pro: 0, carb: 0, fat: 0 }
    );

  // DOM Manipulation: update nutrition bar values
  document.getElementById('pnCal').textContent  = totals.cal;
  document.getElementById('pnPro').textContent  = totals.pro + 'g';
  document.getElementById('pnCarb').textContent = totals.carb + 'g';
  document.getElementById('pnFat').textContent  = totals.fat + 'g';
  document.getElementById('pnCalBar').style.width  = Math.min(100, totals.cal / 25) + '%';
  document.getElementById('pnProBar').style.width  = Math.min(100, totals.pro / 1.5) + '%';
  document.getElementById('pnCarbBar').style.width = Math.min(100, totals.carb / 3.5) + '%';
  document.getElementById('pnFatBar').style.width  = Math.min(100, totals.fat / 0.7) + '%';
}

function selectDay(i) {
  selectedDay = i;
  renderWeekStrip();
  renderPlannerSidebar();
  renderPlannerMain();
  updateNutrition();
}

function prevWeek() {
  weekOffset--;
  updateWeekLabel();
  renderPlanner();
}

function nextWeek() {
  weekOffset++;
  updateWeekLabel();
  renderPlanner();
}

function updateWeekLabel() {
  let label = 'This Week';
  if (weekOffset < 0) label = `${Math.abs(weekOffset)} Week${Math.abs(weekOffset) > 1 ? 's' : ''} Ago`;
  if (weekOffset > 0) label = `${weekOffset} Week${weekOffset > 1 ? 's' : ''} Ahead`;
  document.getElementById('weekLabel').textContent = label;
}

/** Generates a grocery list from all planned meals across all weeks. */
function generateGrocery() {
  const newItems = [];

  // Array method: Object.values() + flat() + forEach() to collect all planned dishes
  Object.values(plannerData).forEach(day => {
    Object.values(day).forEach(slot => {
      slot.forEach(m => {
        const d = DISHES.find(x => x.id === m.dishId);
        if (d) {
          d.veggies.forEach(v => {
            if (!groceryItems.find(i => i.name === v) && !newItems.includes(v)) {
              newItems.push(v);
            }
          });
        }
      });
    });
  });

  if (!newItems.length) { showToast('Add meals to your planner first!'); return; }

  newItems.forEach(v => groceryItems.push({ name: v, done: false, id: Date.now() + Math.random() }));
  saveToStorage('grocery', groceryItems);          // ← LocalStorage: persist grocery list
  renderGroceryItems();
  switchTab('grocery');
  showToast(`${newItems.length} ingredients added to Grocery List! 🛒`);
}

/* ══════════════════════════════════════════
   GROCERY LIST
   Uses LocalStorage for full persistence.
══════════════════════════════════════════ */
function addGrocery() {
  const val = document.getElementById('grIn').value.trim();
  if (!val) return;
  groceryItems.push({ name: val, done: false, id: Date.now() });
  document.getElementById('grIn').value = '';
  renderGroceryItems();
  saveToStorage('grocery', groceryItems);          // ← LocalStorage
  showToast('Item added!');
}

function qAdd(item) {
  groceryItems.push({ name: item, done: false, id: Date.now() + Math.random() });
  renderGroceryItems();
  saveToStorage('grocery', groceryItems);          // ← LocalStorage
}

/** Re-renders the grocery list and item counter. DOM Manipulation. */
function renderGroceryItems() {
  document.getElementById('grCount').textContent = `${groceryItems.length} item${groceryItems.length !== 1 ? 's' : ''}`;
  // Array method: map() → grocery row HTML
  document.getElementById('grItems').innerHTML = groceryItems.map(item =>
    `<div class="grocery-item-row ${item.done ? 'done' : ''}">
      <input type="checkbox" ${item.done ? 'checked' : ''} onchange="toggleGrocery(${item.id})">
      <span>${item.name}</span>
      <button class="grocery-del" onclick="removeGrocery(${item.id})">🗑</button>
    </div>`
  ).join('');
}

function toggleGrocery(id) {
  // Array method: find() to locate the item
  const item = groceryItems.find(x => x.id === id);
  if (item) { item.done = !item.done; }
  renderGroceryItems();
  saveToStorage('grocery', groceryItems);          // ← LocalStorage
}

function removeGrocery(id) {
  // Array method: filter() to remove the item
  groceryItems = groceryItems.filter(x => x.id !== id);
  renderGroceryItems();
  saveToStorage('grocery', groceryItems);          // ← LocalStorage
}

function clearGrocery() {
  groceryItems = [];
  renderGroceryItems();
  saveToStorage('grocery', groceryItems);          // ← LocalStorage
  showToast('List cleared');
}

/* ══════════════════════════════════════════
   REVIEWS
   Uses LocalStorage so reviews survive refresh.
══════════════════════════════════════════ */

/** Populates the dish <select> dropdown from the DISHES array. */
function populateDishSelect() {
  // Array method: map() → <option> elements
  document.getElementById('rvDish').innerHTML =
    '<option value="">Select a dish…</option>' +
    DISHES.map(d => `<option value="${d.name}">${d.emoji} ${d.name}</option>`).join('');
}

function setRvStar(n) {
  reviewStar = n;
  // DOM Manipulation: update star visuals
  document.querySelectorAll('#starPick span').forEach((s, i) => { s.textContent = i < n ? '⭐' : '☆'; });
  document.getElementById('rvStarLbl').textContent = ['', 'Poor', 'Fair', 'Good', 'Great', 'Amazing!'][n];
}

function submitReview() {
  const name = document.getElementById('rvName').value.trim();
  const dish = document.getElementById('rvDish').value;
  const text = document.getElementById('rvText').value.trim();

  if (!name || !dish || !reviewStar || !text) {
    showToast('Please fill all fields and select a rating!'); return;
  }

  // Add to front of array so newest shows first
  reviews.unshift({ name, dish, rating: reviewStar, text, date: 'Just now' });
  saveToStorage('reviews', reviews);               // ← LocalStorage: persist reviews
  renderReviews();

  // Reset form fields — DOM Manipulation
  document.getElementById('rvName').value = '';
  document.getElementById('rvText').value = '';
  document.getElementById('rvDish').value = '';
  reviewStar = 0;
  document.querySelectorAll('#starPick span').forEach(s => { s.textContent = '⭐'; });
  document.getElementById('rvStarLbl').textContent = 'Not rated';
  showToast('Review submitted — thank you! 🎉');
}

/** Re-renders all review cards. Array.map() → HTML strings. */
function renderReviews() {
  document.getElementById('reviewList').innerHTML = reviews.map(r =>
    `<div class="review-c">
      <div class="review-top">
        <div>
          <div class="review-author">👤 ${r.name}</div>
          <div class="review-dish">📖 ${r.dish}</div>
        </div>
        <div style="text-align:right">
          <div class="review-stars-show">${'⭐'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
          <div class="review-date">${r.date}</div>
        </div>
      </div>
      <div class="review-txt">"${r.text}"</div>
    </div>`
  ).join('');
}

/* ══════════════════════════════════════════
   SEARCH
   Event handling: oninput on the search field triggers liveSearch().
══════════════════════════════════════════ */
function liveSearch(q) {
  if (!q.trim()) { closeSearch(); return; }

  // Array method: filter() checks name, cuisine, and tags
  const results = DISHES.filter(d =>
    d.name.toLowerCase().includes(q.toLowerCase()) ||
    d.cuisine.toLowerCase().includes(q.toLowerCase()) ||
    (d.tags || []).some(t => t.toLowerCase().includes(q.toLowerCase()))
  );

  document.getElementById('searchCount').textContent = `${results.length} results for "${q}"`;

  // DOM Manipulation: populate search results
  document.getElementById('searchList').innerHTML = results.length
    ? results.map(d => `
        <div class="search-item" onclick="openDish('${d.id}'); closeSearch()">
          <div class="search-item-emoji">${d.emoji}</div>
          <div>
            <div class="search-item-name">${d.name} ${dietBadge(d.dietType)}</div>
            <div class="search-item-sub">⏱️ ${d.time}min · ${CUISINES_DATA.find(c => c.id === d.cuisine)?.name}</div>
          </div>
        </div>`
      ).join('')
    : '<div style="padding:28px;text-align:center;color:var(--ink-lt);font-size:.85rem;">No recipes found — try a different search.</div>';

  document.getElementById('searchOv').classList.add('act');
}

function closeSearchClick(e) {
  if (e.target === document.getElementById('searchOv')) closeSearch();
}

function closeSearch() {
  document.getElementById('searchOv').classList.remove('act');
  document.getElementById('srchInput').value = '';
}

/* ══════════════════════════════════════════
   TOAST NOTIFICATION
   Simple DOM Manipulation: show/hide with CSS class.
══════════════════════════════════════════ */
let toastTimer;

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ══════════════════════════════════════════
   KEYBOARD EVENT HANDLER
   Event handling: global keydown listener for Escape key.
══════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeSearch(); }
});
