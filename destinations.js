// WanderLoom Destinations Database
export const destinations = [
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    tagline: "The Heart of Traditional Japan",
    description: "Immerse yourself in the tranquility of Kyoto, where ancient wooden temples, brilliant orange shrines, and serene bamboo forests meet modern culture. Kyoto is the cultural capital of Japan, offering a glimpse into the historic heart of the country with its geisha districts, tea ceremonies, and gorgeous seasonal cherry blossoms and autumn leaves.",
    category: "Culture",
    budget: "$$",
    estimatedBudget: {
      flights: 1200,
      lodgingPerNight: 150,
      dailyFood: 70,
      activities: 150
    },
    climate: "Temperate",
    activityLevel: "Moderate",
    image: "assets/images/kyoto.png",
    images: ["assets/images/kyoto.png", "assets/images/kyoto_gates.png"],
    rating: 4.9,
    reviews: [
      { name: "Aria M.", rating: 5, text: "Walking through the Arashiyama bamboo grove at sunrise was magical. The temples are beautifully preserved!" },
      { name: "Kenji T.", rating: 5, text: "The autumn leaves at Kiyomizu-dera were breathtaking. Highly recommend visiting in November." }
    ],
    bestTime: "October to November (Autumn) & April (Cherry Blossoms)",
    duration: 5,
    highlights: ["Fushimi Inari Shrine", "Arashiyama Bamboo Grove", "Kinkaku-ji (Golden Pavilion)", "Gion District Teahouses"],
    attractions: [
      { name: "Fushimi Inari Shrine", description: "Walk through the thousands of iconic vermilion torii gates winding up the sacred Mount Inari." },
      { name: "Arashiyama Bamboo Grove", description: "A pathway cut through soaring stalks of green bamboo that whisper in the wind." },
      { name: "Kinkaku-ji", description: "A stunning Zen Buddhist temple whose top two floors are completely covered in brilliant gold leaf." }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Historic Temples & Gion",
        activities: [
          { time: "09:00 AM", title: "Kiyomizu-dera Temple", desc: "Start early to enjoy the panoramic views over Kyoto from the massive wooden stage." },
          { time: "01:00 PM", title: "Tea Ceremony in Higashiyama", desc: "Experience a traditional matcha tea preparation and tasting." },
          { time: "06:00 PM", title: "Gion Walking Tour", desc: "Wander the narrow streets of Gion, hoping to spot a geiko or maiko heading to an evening appointment." }
        ]
      },
      {
        day: 2,
        title: "Golden Pavilion & Bamboo Groves",
        activities: [
          { time: "08:30 AM", title: "Arashiyama Bamboo Grove", desc: "Beat the crowds to stroll through the towering green bamboo stalks." },
          { time: "12:30 PM", title: "Tenryu-ji Zen Garden", desc: "Relax in one of Kyoto's finest landscape gardens." },
          { time: "03:30 PM", title: "Kinkaku-ji (Golden Pavilion)", desc: "Marvel at the temple reflecting off the mirror pond in the afternoon sun." }
        ]
      },
      {
        day: 3,
        title: "Thousands of Torii Gates",
        activities: [
          { time: "08:00 AM", title: "Fushimi Inari Hike", desc: "Hike the 4-kilometer loop through vermilion gates. Reach the midpoint for great city views." },
          { time: "01:00 PM", title: "Nishiki Market food crawl", desc: "Taste local skewers, matcha sweets, and octopus balls in the 'Kitchen of Kyoto'." },
          { time: "04:00 PM", title: "Kyoto Imperial Palace", desc: "Stroll the expansive parks and take in the architecture of the former imperial residence." }
        ]
      }
    ]
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    tagline: "Volcanic Cliffs and Cobblestone Sunsets",
    description: "Famed for its white-washed cliffside villages, blue-domed churches, and spectacular caldera views, Santorini is a dream destination. Formed by a massive volcanic eruption in the 16th century BC, it features unique black and red sand beaches, exquisite local white wines, and some of the most romantic sunset vistas in the world.",
    category: "Beach",
    budget: "$$$",
    estimatedBudget: {
      flights: 1000,
      lodgingPerNight: 280,
      dailyFood: 90,
      activities: 300
    },
    climate: "Tropical",
    activityLevel: "Relaxed",
    image: "assets/images/santorini.png",
    images: ["assets/images/santorini.png", "assets/images/santorini_catamaran.png"],
    rating: 4.8,
    reviews: [
      { name: "Emily S.", rating: 5, text: "The caldera views are unreal. Sitting on our balcony watching the sunset in Oia was worth every penny." },
      { name: "Marc D.", rating: 4.5, text: "Stunning beaches, though very crowded in July. The local food is incredible." }
    ],
    bestTime: "May to October (Sunny Summer & Shoulder Months)",
    duration: 3,
    highlights: ["Oia Sunset Viewpoint", "Red Sand Beach", "Akrotiri Archaeological Site", "Caldera Catamaran Cruise"],
    attractions: [
      { name: "Oia Village", description: "The iconic town perched high on the cliffs, known for spectacular sunset crowds and blue domes." },
      { name: "Red Beach", description: "A unique beach characterized by soaring red volcanic cliffs and dark reddish sands." },
      { name: "Amoudi Bay", description: "A charming fishing port directly below Oia, accessible by descending 300 steps, famous for fresh seafood." }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Cliffs and Domes of Oia",
        activities: [
          { time: "09:00 AM", title: "Fira to Oia Caldera Hike", desc: "Hike along the rim of the volcano with sweeping ocean views (approx. 3 hours)." },
          { time: "02:00 PM", title: "Explore Oia's Art Galleries", desc: "Stroll through narrow winding alleys and browse boutique shops." },
          { time: "06:30 PM", title: "Sunset at Oia Castle", desc: "Secure a spot early to witness the sun melt into the Aegean Sea." }
        ]
      },
      {
        day: 2,
        title: "Catamaran & Volcanic Springs",
        activities: [
          { time: "10:00 AM", title: "Catamaran Sailing Cruise", desc: "Swim in the warm volcanic hot springs and snorkel around the red and white beaches." },
          { time: "01:30 PM", title: "On-board Greek BBQ Lunch", desc: "Enjoy freshly grilled souvlaki, Greek salad, and local wine on the catamaran." },
          { time: "05:00 PM", title: "Wine Tasting in Pyrgos", desc: "Visit a local winery to taste Assyrtiko wine while watching the sunset from a quieter vantage point." }
        ]
      }
    ]
  },
  {
    id: "iceland",
    name: "Reykjavik & Beyond",
    country: "Iceland",
    tagline: "Fire, Ice, and Celestial Lights",
    description: "Welcome to Iceland, a land of stark, mystical beauty where active volcanoes sit next to colossal glaciers. Explore cascading waterfalls, black sand beaches, bubbling geothermal fields, and natural hot springs. During winter, look up to witness the dance of the Aurora Borealis; in summer, enjoy the endless days of the Midnight Sun.",
    category: "Nature",
    budget: "$$$",
    estimatedBudget: {
      flights: 700,
      lodgingPerNight: 220,
      dailyFood: 110,
      activities: 400
    },
    climate: "Cold",
    activityLevel: "High",
    image: "assets/images/iceland.png",
    images: ["assets/images/iceland.png", "assets/images/iceland_lagoon.png"],
    rating: 4.85,
    reviews: [
      { name: "Chloe R.", rating: 5, text: "Iceland felt like another planet! The waterfalls are massive, and we saw the Northern Lights on our second night." },
      { name: "Jonas B.", rating: 4, text: "Everything is expensive, but the landscape is absolutely peerless. Renting a camper van was perfect." }
    ],
    bestTime: "September to April (Northern Lights) & June to August (Midnight Sun)",
    duration: 7,
    highlights: ["The Golden Circle", "Blue Lagoon Geothermal Spa", "Reynisfjara Black Sand Beach", "Seljalandsfoss Waterfall"],
    attractions: [
      { name: "Blue Lagoon", description: "Soak in the milky-blue geothermal waters rich in silica and sulfur amidst a black lava field." },
      { name: "Gullfoss Waterfall", description: "A magnificent double-stepped waterfall that plunges deep into a rugged canyon." },
      { name: "Reynisfjara Beach", description: "A dramatic black sand beach featuring towering basalt columns and roaring Atlantic waves." }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "The Golden Circle Route",
        activities: [
          { time: "08:30 AM", title: "Thingvellir National Park", desc: "Walk between the North American and Eurasian tectonic plates." },
          { time: "12:00 PM", title: "Geysir Geothermal Area", desc: "Watch Strokkur geysir shoot boiling water up to 30 meters high every few minutes." },
          { time: "03:00 PM", title: "Gullfoss Waterfall", desc: "Stand close to the edge of the thunderous waterfall and feel the glacial mist." }
        ]
      },
      {
        day: 2,
        title: "South Coast Waterfalls & Sands",
        activities: [
          { time: "09:00 AM", title: "Seljalandsfoss", desc: "Take the path that leads directly behind the cascading wall of water." },
          { time: "11:30 AM", title: "Skógafoss", desc: "Climb the 370 steps to the top of this massive 60m waterfall for panoramic views." },
          { time: "03:00 PM", title: "Reynisfjara Black Sand Beach", desc: "Explore the dark sands and basalt caves. Watch out for dangerous sneaker waves." }
        ]
      },
      {
        day: 3,
        title: "Glacier Hike & Aurora Hunt",
        activities: [
          { time: "10:00 AM", title: "Sólheimajökull Glacier Hike", desc: "Put on crampons and explore ice ridges, sinkholes, and deep crevasses with a guide." },
          { time: "03:00 PM", title: "Relax at the Blue Lagoon", desc: "Rest sore muscles in the mineral-rich, warm geothermal waters." },
          { time: "09:00 PM", title: "Northern Lights Guided Tour", desc: "Drive into the dark countryside to search for the elusive, glowing aurora borealis." }
        ]
      }
    ]
  },
  {
    id: "serengeti",
    name: "Serengeti National Park",
    country: "Tanzania",
    tagline: "The Endless Plains of Wild Wonder",
    description: "Witness the raw power of nature in the Serengeti, home to the greatest wildlife spectacle on earth: the Great Migration. Over a million wildebeest and zebras traverse these golden plains annually, closely followed by lions, leopards, and cheetahs. It is the ultimate safari destination, promising close-up encounters with Africa's Big Five.",
    category: "Adventure",
    budget: "$$$",
    estimatedBudget: {
      flights: 1500,
      lodgingPerNight: 450,
      dailyFood: 100,
      activities: 600
    },
    climate: "Desert",
    activityLevel: "High",
    image: "assets/images/serengeti.png",
    rating: 4.95,
    reviews: [
      { name: "Robert H.", rating: 5, text: "A life-changing trip. We saw a pride of lions hunting and millions of wildebeest crossing the Mara River." },
      { name: "Sarah K.", rating: 5, text: "Sleeping in a luxury tented camp with wild animal sounds at night was incredible." }
    ],
    bestTime: "June to October (Dry season & Migration river crossings)",
    duration: 4,
    highlights: ["The Great Wildebeest Migration", "Hot Air Balloon Safari", "Ngorongoro Crater", "Seronera Valley Predators"],
    attractions: [
      { name: "Ngorongoro Crater", description: "The world's largest intact volcanic caldera, hosting over 25,000 large mammals in a natural enclave." },
      { name: "Mara River", description: "The site of dramatic migration crossings, where wildebeests brave crocodile-infested waters." },
      { name: "Seronera Valley", description: "Known as the predator capital of the Serengeti, highly populated with leopards and lions." }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Arrival & Seronera Valley Game Drive",
        activities: [
          { time: "10:00 AM", title: "Fly in to Seronera Airstrip", desc: "Land right in the center of the park and spot wildlife on the way to camp." },
          { time: "03:00 PM", title: "Afternoon Game Drive", desc: "Search for leopards resting in acacia trees and prides of lions lounging on rocky outcrops." },
          { time: "07:30 PM", title: "Dinner by the Campfire", desc: "Exchange stories around the fire while listening to hyenas in the distance." }
        ]
      },
      {
        day: 2,
        title: "Sunrise from the Sky & Big Five",
        activities: [
          { time: "05:00 AM", title: "Hot Air Balloon Safari", desc: "Float silently above the plains at sunrise, observing herds of zebras and elephants below." },
          { time: "09:30 AM", title: "Champagne Bush Breakfast", desc: "Enjoy a cooked breakfast in the middle of the savannah under an acacia tree." },
          { time: "02:00 PM", title: "Southern Plains Game Drive", desc: "Search for cheetahs hunting in the grasslands and herds of elephants moving in families." }
        ]
      }
    ]
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    tagline: "Gothic Alleys and Architectural Whimsy",
    description: "Barcelona is a vibrant seaside city that combines historical charm with colorful architectural marvels. The city is defined by the unique, organic works of Antoni Gaudí, a bustling culinary scene centered on tapas, beautiful beaches, and a lively nightlife that stretches into the morning hours.",
    category: "City",
    budget: "$$",
    estimatedBudget: {
      flights: 850,
      lodgingPerNight: 140,
      dailyFood: 65,
      activities: 150
    },
    climate: "Temperate",
    activityLevel: "Moderate",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efedd?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: [
      { name: "Liam O.", rating: 4, text: "La Sagrada Familia was spectacular. Try the seafood paella in Barceloneta!" },
      { name: "Sofia V.", rating: 5, text: "Loved walking through the Gothic Quarter. The architecture is unlike anywhere else." }
    ],
    bestTime: "May to June & September to October",
    duration: 4,
    highlights: ["La Sagrada Família", "Park Güell", "Gothic Quarter", "La Barceloneta Beach"],
    attractions: [
      { name: "La Sagrada Família", description: "Gaudí's unfinished masterpiece, a breathtaking basilica featuring tree-like columns and stained glass." },
      { name: "Park Güell", description: "A colorful park adorned with mosaic lizards, curved benches, and beautiful views of the city and sea." },
      { name: "Gothic Quarter", description: "A labyrinth of narrow medieval streets packed with trendy bars, plazas, and historical architecture." }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "The Genius of Gaudí",
        activities: [
          { time: "09:30 AM", title: "La Sagrada Família Tour", desc: "Explore the exterior facades and enter to witness the rainbow light of the stained-glass windows." },
          { time: "01:00 PM", title: "Lunch on Passeig de Gràcia", desc: "Enjoy high-end tapas and view the wavy facades of Casa Batlló and La Pedrera." },
          { time: "03:30 PM", title: "Park Güell Exploration", desc: "Stroll around the mosaic terraces and climb up to the three crosses for sunset views." }
        ]
      }
    ]
  },
  {
    id: "costarica",
    name: "Costa Rica",
    country: "Costa Rica",
    tagline: "Pura Vida in the Cloud Forests",
    description: "Costa Rica is a tropical paradise dedicated to eco-tourism and adventure. Experience the 'Pura Vida' (pure life) lifestyle as you explore active volcanoes, zip-line through lush cloud forest canopies, spot sloths and toucans in national parks, and surf on pristine Pacific beaches.",
    category: "Adventure",
    budget: "$$",
    estimatedBudget: {
      flights: 550,
      lodgingPerNight: 110,
      dailyFood: 55,
      activities: 220
    },
    climate: "Tropical",
    activityLevel: "High",
    image: "https://images.unsplash.com/photo-1538681105587-85640e57bf39?auto=format&fit=crop&w=800&q=80",
    rating: 4.75,
    reviews: [
      { name: "Diana P.", rating: 5, text: "Saw three sloths on our first hike in Manuel Antonio! Ziplining in Monteverde was thrilling." },
      { name: "Alex G.", rating: 4.5, text: "Very humid, but the nature is unbelievable. Soak in the hot springs near Arenal volcano!" }
    ],
    bestTime: "December to April (Dry Season)",
    duration: 6,
    highlights: ["Arenal Volcano National Park", "Monteverde Cloud Forest", "Manuel Antonio Wildlife Reserve", "La Fortuna Waterfall"],
    attractions: [
      { name: "Arenal Volcano", description: "A majestic, symmetric volcano surrounded by natural thermal hot springs and rainforest trails." },
      { name: "Monteverde Cloud Forest", description: "A misty jungle canopy suspended in the clouds, famous for suspension bridges and biodiversity." },
      { name: "Manuel Antonio Park", description: "Lush tropical rainforest meeting white sandy beaches, teeming with monkeys, iguanas, and sloths." }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Volcanoes & Hot Springs",
        activities: [
          { time: "09:00 AM", title: "Arenal 1968 Trail Hike", desc: "Hike over old lava flows with excellent volcanic viewpoints." },
          { time: "02:00 PM", title: "La Fortuna Waterfall", desc: "Descend 500 steps to swim in the pool below a powerful 70-meter waterfall." },
          { time: "06:00 PM", title: "Tabacon Geothermal Springs", desc: "Relax in natural thermal rivers heated by the volcano, surrounded by tropical flora." }
        ]
      }
    ]
  },
  {
    id: "petra",
    name: "Petra & Wadi Rum",
    country: "Jordan",
    tagline: "Unveiling Rose-Red History",
    description: "Travel back in time to Petra, the ancient Nabataean city carved directly into red sandstone cliffs. Walk through the narrow Siq canyon to witness the iconic Treasury facade. Combine your historical exploration with a trip into Wadi Rum, a Martian-like desert valley of red sands, towering canyons, and starry Bedouin nights.",
    category: "Culture",
    budget: "$$",
    estimatedBudget: {
      flights: 950,
      lodgingPerNight: 100,
      dailyFood: 50,
      activities: 250
    },
    climate: "Desert",
    activityLevel: "High",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80",
    rating: 4.88,
    reviews: [
      { name: "Tariq A.", rating: 5, text: "Emerging from the Siq and seeing the Treasury is a moment I will never forget." },
      { name: "Helen W.", rating: 4.5, text: "A lot of hiking and climbing. Wadi Rum jeep tour and sleeping under the stars was incredible!" }
    ],
    bestTime: "March to May & September to November",
    duration: 4,
    highlights: ["The Treasury (Al-Khazneh)", "Ad Deir (The Monastery)", "Wadi Rum Star-Gazing", "Dead Sea Floating"],
    attractions: [
      { name: "The Treasury", description: "The famous, intricately detailed facade carved out of sandstone cliffs, serving as Petra's entrance." },
      { name: "The Monastery", description: "A monumental temple carved high in the mountains, accessible via a rugged 800-step path." },
      { name: "Wadi Rum Desert", description: "A dramatic desert wilderness featuring red sand dunes, natural arches, and Bedouin camps." }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "The Lost City of Petra",
        activities: [
          { time: "07:00 AM", title: "The Siq & The Treasury", desc: "Arrive early to walk the narrow canyon in cool air, emerging right before the Treasury." },
          { time: "11:00 AM", title: "Royal Tombs & Street of Facades", desc: "Explore the large cave dwellings and tombs carved into the cliff faces." },
          { time: "02:00 PM", title: "Hike to the Monastery", desc: "Ascend the 800 steps to the massive Monastery. Stop for tea at Bedouin stalls along the way." }
        ]
      }
    ]
  },
  {
    id: "queenstown",
    name: "Queenstown",
    country: "New Zealand",
    tagline: "The Adventure Capital of the World",
    description: "Perched on the shores of Lake Wakatipu and framed by the dramatic Remarkables mountain range, Queenstown is an adrenaline-seeker's paradise. It is the birthplace of commercial bungy jumping and offers jet boating, skydiving, skiing, and hiking, alongside award-winning Pinot Noir vineyards.",
    category: "Adventure",
    budget: "$$$",
    estimatedBudget: {
      flights: 1400,
      lodgingPerNight: 190,
      dailyFood: 75,
      activities: 500
    },
    climate: "Cold",
    activityLevel: "High",
    image: "https://images.unsplash.com/photo-1507699622108-4be3a0d5b112?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: [
      { name: "Max P.", rating: 5, text: "Did the Nevis Bungy jump—scariest and best thing I've ever done. The scenery is unbeatable." },
      { name: "Julie L.", rating: 4.8, text: "Fabulous hikes, Fergburger lives up to the hype, and Milford Sound is a must-visit day trip." }
    ],
    bestTime: "December to February (Summer hiking) & June to August (Winter skiing)",
    duration: 5,
    highlights: ["Nevis Bungy Jump", "Shotover Jet Boat", "Milford Sound Day Trip", "Skyline Gondola & Luge"],
    attractions: [
      { name: "Milford Sound", description: "A breathtaking fiord featuring towering dark rock walls, cascading waterfalls, and local fur seals." },
      { name: "Kawarau Bridge", description: "The historic bridge spanning a turquoise gorge, known as the birth site of commercial bungy jumping." },
      { name: "The Remarkables", description: "A majestic mountain range offering alpine skiing in winter and hiking tracks in summer." }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Adrenaline & Heights",
        activities: [
          { time: "09:00 AM", title: "Shotover Jet Canyon Ride", desc: "Whiz through narrow canyon walls in a high-speed jet boat doing 360-degree spins." },
          { time: "01:00 PM", title: "Fergburger Lunch", desc: "Queue up to grab Queenstown's famous, gourmet oversized burgers." },
          { time: "03:00 PM", title: "Skyline Gondola & Luge", desc: "Ride the gondola up Bob's Peak and race down the gravity luge tracks with lake views." }
        ]
      }
    ]
  },
  {
    id: "maui",
    name: "Maui",
    country: "United States",
    tagline: "The Valley Isle's Tropical Rhythms",
    description: "Maui is a perfect slice of Hawaiian paradise, offering a blend of beach relaxation and outdoor exploration. Drive the winding Road to Hana through lush rainforests, watch the sunrise from the top of a 10,000-foot volcano, snorkel with green sea turtles, or relax on golden sand beaches.",
    category: "Beach",
    budget: "$$$",
    estimatedBudget: {
      flights: 650,
      lodgingPerNight: 320,
      dailyFood: 95,
      activities: 350
    },
    climate: "Tropical",
    activityLevel: "Relaxed",
    image: "https://images.unsplash.com/photo-1505852679233-d9fd70a5682d?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: [
      { name: "Megan F.", rating: 5, text: "The Road to Hana was long but beautiful with waterfalls at every turn. Saw tons of sea turtles!" },
      { name: "David L.", rating: 4, text: "Extremely expensive, but Kaanapali Beach is paradise. Snorkeling at Molokini crater was a highlight." }
    ],
    bestTime: "April to May & September to November",
    duration: 6,
    highlights: ["Road to Hana Scenic Drive", "Haleakalā Sunrise", "Molokini Crater Snorkeling", "Kaanapali Beach Resorts"],
    attractions: [
      { name: "Haleakalā Volcano", description: "A massive shield volcano offering a Martian-like summit crater and spectacular sunrise views above the clouds." },
      { name: "Road to Hana", description: "A legendary 64-mile highway featuring 620 curves and 59 bridges, passing waterfalls and black sand beaches." },
      { name: "Molokini Crater", description: "A crescent-shaped volcanic caldera offering crystal-clear snorkeling waters with vibrant coral and marine life." }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Sunrise above the Clouds",
        activities: [
          { time: "04:30 AM", title: "Haleakalā Sunrise View", desc: "Drive up to the 10,023-foot summit to watch the sun rise over a blanket of clouds. (Warm clothes required!)" },
          { time: "10:00 AM", title: "Breakfast in Upcountry Maui", desc: "Enjoy fresh farm-to-table breakfast in Kula." },
          { time: "02:00 PM", title: "Relax at Wailea Beach", desc: "Sunbathe and swim in the calm, warm ocean waters." }
        ]
      }
    ]
  },
  {
    id: "capetown",
    name: "Cape Town",
    country: "South Africa",
    tagline: "Where Mountains Meet Two Oceans",
    description: "Cape Town is a visually spectacular city perched at the southern tip of Africa. It boasts a dramatic coastline dominated by the flat-topped Table Mountain, pristine white beaches, penguin colonies, historical landmarks like Robben Island, and world-class wine estates right on its doorstep.",
    category: "City",
    budget: "$$",
    estimatedBudget: {
      flights: 1250,
      lodgingPerNight: 95,
      dailyFood: 45,
      activities: 180
    },
    climate: "Temperate",
    activityLevel: "Moderate",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
    rating: 4.78,
    reviews: [
      { name: "John P.", rating: 5, text: "Taking the cable car up Table Mountain was amazing. Boulders Beach penguins were so cute!" },
      { name: "Elena R.", rating: 4.5, text: "Great wine, cheap food, beautiful scenery. Be mindful of safety in certain areas at night." }
    ],
    bestTime: "November to March (Warm Summer)",
    duration: 5,
    highlights: ["Table Mountain Cableway", "Boulders Beach Penguins", "Cape Point Nature Reserve", "Stellenbosch Wineries"],
    attractions: [
      { name: "Table Mountain", description: "The iconic flat-topped mountain providing panoramic views of Cape Town and the Atlantic Ocean." },
      { name: "Boulders Beach", description: "A sheltered sandy beach home to a colony of thousands of wild African penguins." },
      { name: "Cape of Good Hope", description: "A rocky headland on the Atlantic coast, featuring dramatic cliffs, lighthouses, and hiking paths." }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Mountain Heights & Historic Harbor",
        activities: [
          { time: "09:00 AM", title: "Table Mountain Cableway", desc: "Ride the rotating cable car to the summit and hike the flat trails." },
          { time: "01:00 PM", title: "V&A Waterfront Lunch", desc: "Dine on fresh seafood in the bustling historic harbor district." },
          { time: "03:00 PM", title: "Robben Island Ferry Tour", desc: "Visit the prison island where Nelson Mandela was held, with tours led by former inmates." }
        ]
      }
    ]
  },
  {
    id: "banff",
    name: "Banff National Park",
    country: "Canada",
    tagline: "Turquoise Lakes and Alpine Majestic Peaks",
    description: "Located in the heart of the Canadian Rockies, Banff National Park is a wonderland of glacial valleys, towering snow-capped mountains, and surreal neon-turquoise lakes. From hiking alpine trails and kayaking in summer to skiing powder snow in winter, Banff is a pristine paradise for outdoor enthusiasts.",
    category: "Nature",
    budget: "$$",
    estimatedBudget: {
      flights: 500,
      lodgingPerNight: 170,
      dailyFood: 60,
      activities: 200
    },
    climate: "Cold",
    activityLevel: "High",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    rating: 4.85,
    reviews: [
      { name: "Ethan C.", rating: 5, text: "Lake Louise looks exactly like the pictures. The water color is mind-blowing!" },
      { name: "Laura M.", rating: 4.5, text: "Great hiking. We saw a grizzly bear from a safe distance on our drive!" }
    ],
    bestTime: "June to September (Hiking & Lakes) & December to March (Skiing)",
    duration: 5,
    highlights: ["Lake Louise", "Moraine Lake", "Banff Upper Hot Springs", "Icefields Parkway Drive"],
    attractions: [
      { name: "Lake Louise", description: "A world-famous glacial lake surrounded by high peaks and dominated by the majestic Fairmont Hotel." },
      { name: "Moraine Lake", description: "A glacially-fed lake situated in the Valley of the Ten Peaks, renowned for its brilliant turquoise-blue color." },
      { name: "Johnston Canyon", description: "A dramatic canyon walkway with catwalks suspended over rushing water leading to powerful waterfalls." }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Iconic Glacial Lakes",
        activities: [
          { time: "07:30 AM", title: "Moraine Lake Canoeing", desc: "Arrive early to catch the calm water reflecting the Ten Peaks, and rent a red canoe." },
          { time: "11:30 AM", title: "Lake Louise Lakeshore Trail", desc: "Walk the flat path along the lake, or hike up to the Lake Agnes Teahouse." },
          { time: "04:30 PM", title: "Banff Upper Hot Springs", desc: "Soak in the warm mineral pool looking out onto Mount Rundle." }
        ]
      }
    ]
  },
  {
    id: "amalfi",
    name: "Amalfi Coast",
    country: "Italy",
    tagline: "Vertical Towns and Limoncello Breezes",
    description: "The Amalfi Coast is a 50-kilometer stretch of coastline in southern Italy, famous for its dramatic cliffs, colorful vertical villages, lemon orchards, and sparkling Mediterranean vistas. Explore the glamorous streets of Positano, eat fresh seafood in Amalfi town, and hike high above the sea on the Path of the Gods.",
    category: "Culture",
    budget: "$$$",
    estimatedBudget: {
      flights: 950,
      lodgingPerNight: 290,
      dailyFood: 95,
      activities: 300
    },
    climate: "Temperate",
    activityLevel: "Moderate",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
    rating: 4.82,
    reviews: [
      { name: "Sophia L.", rating: 5, text: "Positano is gorgeous! Sitting on a beach chair drinking a limoncello spritz is pure bliss." },
      { name: "Marco F.", rating: 4.5, text: "Path of the Gods hike is incredible, but wear good shoes. The buses are very crowded in summer." }
    ],
    bestTime: "May to June & September (Avoid peak summer crowds)",
    duration: 4,
    highlights: ["Positano Cliffside Houses", "Ravello Gardens", "Path of the Gods Hike", "Capri Day Trip & Blue Grotto"],
    attractions: [
      { name: "Positano", description: "A cliffside village characterized by narrow streets, pastel houses cascading to the sea, and pebbled beaches." },
      { name: "Villa Cimbrone", description: "A historic estate in Ravello known for its gardens and the 'Terrace of Infinity' overlooking the Gulf of Salerno." },
      { name: "Path of the Gods", description: "A cliffside hiking trail linking Bomerano to Nocelle, offering spectacular clifftop sea panoramas." }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Glamour of Positano",
        activities: [
          { time: "09:00 AM", title: "Explore Positano's Alleys", desc: "Wander past boutiques selling linen clothing and local lemon products down to Marina Grande." },
          { time: "01:00 PM", title: "Lunch at Da Vincenzo", desc: "Dine on fresh seafood pasta and lemon cake." },
          { time: "03:00 PM", title: "Spiaggia Grande Relaxation", desc: "Rent a sunbed, swim in the clear blue sea, and watch the boats go by." }
        ]
      }
    ]
  }
];
