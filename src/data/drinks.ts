import { MenuItem } from '../types';

// Happy Hour Items (Available until 7pm)
export const happyHourItems: MenuItem[] = [
  // Bubbles
  {
    id: 'hh-1',
    name: 'Regalia DOC Prosecco',
    description: 'Italy - Prosecco',
    price: 12,
    category: 'happy-hour',
    subcategory: 'Bubbles',
    tags: ['prosecco', 'sparkling', 'italy']
  },
  {
    id: 'hh-2',
    name: 'Prestige Des Sacres Brut Champagne',
    description: 'France - Chardonnay, Pinot Noir, Pinot Meunier',
    price: 18,
    category: 'happy-hour',
    subcategory: 'Bubbles',
    tags: ['champagne', 'france', 'premium']
  },
  // White Wines
  {
    id: 'hh-3',
    name: 'Castillo De Aresan',
    description: 'Spain - Chardonnay',
    price: 12,
    category: 'happy-hour',
    subcategory: 'White Wine',
    tags: ['chardonnay', 'spain', 'white wine']
  },
  {
    id: 'hh-4',
    name: 'François Dion Sauvignon Blanc',
    description: 'France - Sauvignon Blanc',
    price: 13,
    category: 'happy-hour',
    subcategory: 'White Wine',
    tags: ['sauvignon blanc', 'france', 'white wine']
  },
  {
    id: 'hh-5',
    name: 'Il Sole "Baci al Sole" IGT',
    description: 'Italy - Pinot Grigio',
    price: 15,
    category: 'happy-hour',
    subcategory: 'White Wine',
    tags: ['pinot grigio', 'italy', 'white wine']
  },
  // Rosé
  {
    id: 'hh-6',
    name: 'Petalos De Aresan Rose Tempranillo',
    description: 'Spain - Tempranillo',
    price: 13,
    category: 'happy-hour',
    subcategory: 'Rosé',
    tags: ['tempranillo', 'spain', 'rosé']
  },
  // Red Wines
  {
    id: 'hh-7',
    name: 'François Dion Cabernet Sauvignon',
    description: 'Chile - Cabernet Sauvignon',
    price: 12,
    category: 'happy-hour',
    subcategory: 'Red Wine',
    tags: ['cabernet sauvignon', 'chile', 'red wine']
  },
  {
    id: 'hh-8',
    name: 'Ramirez de la Piscina Young Red',
    description: 'Spain - Tempranillo',
    price: 13,
    category: 'happy-hour',
    subcategory: 'Red Wine',
    tags: ['tempranillo', 'spain', 'red wine']
  },
  {
    id: 'hh-9',
    name: 'Bottega Merlot',
    description: 'Italy - Merlot',
    price: 14,
    category: 'happy-hour',
    subcategory: 'Red Wine',
    tags: ['merlot', 'italy', 'red wine']
  },
  // Spirits
  {
    id: 'hh-10',
    name: 'Bacardi Carta Blanca',
    description: 'White rum',
    price: 10,
    category: 'happy-hour',
    subcategory: 'Spirits',
    tags: ['rum', 'bacardi', 'white rum']
  },
  {
    id: 'hh-11',
    name: 'Jose Cuervo Special',
    description: 'Gold tequila',
    price: 10,
    category: 'happy-hour',
    subcategory: 'Spirits',
    tags: ['tequila', 'jose cuervo', 'gold tequila']
  },
  {
    id: 'hh-12',
    name: "Gordon's Gin",
    description: 'London dry gin',
    price: 10,
    category: 'happy-hour',
    subcategory: 'Spirits',
    tags: ['gin', 'gordons', 'london dry']
  },
  {
    id: 'hh-13',
    name: 'Smirnoff Vodka',
    description: 'Premium vodka',
    price: 10,
    category: 'happy-hour',
    subcategory: 'Spirits',
    tags: ['vodka', 'smirnoff']
  },
  {
    id: 'hh-14',
    name: 'Famous Grouse',
    description: 'Blended Scotch whisky',
    price: 10,
    category: 'happy-hour',
    subcategory: 'Spirits',
    tags: ['whisky', 'scotch', 'blended']
  },
  {
    id: 'hh-15',
    name: 'Emperador Light Brandy',
    description: 'Light brandy',
    price: 10,
    category: 'happy-hour',
    subcategory: 'Spirits',
    tags: ['brandy', 'emperador']
  },
  {
    id: 'hh-16',
    name: 'Jim Beam White',
    description: 'Kentucky bourbon',
    price: 10,
    category: 'happy-hour',
    subcategory: 'Spirits',
    tags: ['bourbon', 'jim beam', 'kentucky']
  },
  // Beer
  {
    id: 'hh-17',
    name: 'Peroni Nastro Azzurro',
    description: 'Italian premium lager',
    price: 11,
    category: 'happy-hour',
    subcategory: 'Beer',
    tags: ['lager', 'italian', 'peroni']
  },
  {
    id: 'hh-18',
    name: 'Grolsch Weizen',
    description: 'German wheat beer',
    price: 12,
    category: 'happy-hour',
    subcategory: 'Beer',
    tags: ['wheat beer', 'german', 'grolsch']
  },
  {
    id: 'hh-19',
    name: 'Guinness Draught',
    description: 'Irish dry stout',
    price: 14,
    category: 'happy-hour',
    subcategory: 'Beer',
    tags: ['stout', 'irish', 'guinness']
  },
  // Cocktails
  {
    id: 'hh-20',
    name: 'Aperol Spritz',
    description: 'Aperol, Prosecco, soda water, orange slice',
    price: 13,
    category: 'happy-hour',
    subcategory: 'Cocktails',
    tags: ['aperol', 'spritz', 'prosecco']
  },
  {
    id: 'hh-21',
    name: 'Boulevardier',
    description: 'Whisky, Campari, Sweet Vermouth, Orange Peel',
    price: 14,
    category: 'happy-hour',
    subcategory: 'Cocktails',
    tags: ['whisky', 'campari', 'vermouth']
  },
  {
    id: 'hh-22',
    name: 'French 75',
    description: 'Gin, lemon juice, sugar syrup and Prosecco',
    price: 14,
    category: 'happy-hour',
    subcategory: 'Cocktails',
    tags: ['gin', 'prosecco', 'classic']
  },
  {
    id: 'hh-23',
    name: 'New York Sour',
    description: 'Bourbon, lemon juice, sugar, red wine',
    price: 14,
    category: 'happy-hour',
    subcategory: 'Cocktails',
    tags: ['bourbon', 'sour', 'red wine']
  },
  {
    id: 'hh-24',
    name: "Tommy's Margarita",
    description: 'Gold tequila, lime juice, agave',
    price: 14,
    category: 'happy-hour',
    subcategory: 'Cocktails',
    tags: ['tequila', 'margarita', 'agave']
  }
];

// Wine & Champagne
export const wineItems: MenuItem[] = [
  {
    id: 'wine-1',
    name: 'Daily Wine Buffet',
    description: 'Free-flow selected wines • 4:30 PM - 7:00 PM',
    price: 38,
    category: 'wine-champagne',
    subcategory: 'Special Offer',
    tags: ['buffet', 'free flow', 'special'],
    featured: true
  }
];

// Beer
export const beerItems: MenuItem[] = [
  // Draft Beer
  {
    id: 'beer-1',
    name: 'Tower',
    description: 'Draft beer',
    price: 14,
    category: 'beer',
    subcategory: 'Draft',
    tags: ['draft', 'local']
  },
  {
    id: 'beer-2',
    name: 'Peroni 75',
    description: 'Italian premium lager on tap',
    price: 15,
    category: 'beer',
    subcategory: 'Draft',
    tags: ['draft', 'italian', 'peroni']
  },
  {
    id: 'beer-3', 
    name: 'Grolsch Weizen',
    description: 'German wheat beer on tap',
    price: 16,
    category: 'beer',
    subcategory: 'Draft',
    tags: ['draft', 'wheat', 'german']
  },
  {
    id: 'beer-4',
    name: 'Guinness Draught',
    description: 'Irish dry stout on tap',
    price: 16,
    category: 'beer',
    subcategory: 'Draft',
    tags: ['draft', 'stout', 'irish']
  },
  {
    id: 'beer-5',
    name: 'Asahi Black (Kuronama)',
    description: 'Japanese black lager on tap',
    price: 16,
    category: 'beer',
    subcategory: 'Draft',
    tags: ['draft', 'japanese', 'black lager']
  },
  // Bottled Beer
  {
    id: 'beer-6',
    name: 'Tiger Beer',
    description: 'Singapore lager',
    price: 13,
    category: 'beer',
    subcategory: 'Bottled',
    tags: ['bottled', 'singapore', 'lager']
  },
  {
    id: 'beer-7',
    name: 'Somersby Apple Cider',
    description: 'Swedish apple cider',
    price: 13,
    category: 'beer',
    subcategory: 'Bottled',
    tags: ['bottled', 'cider', 'apple']
  }
];

// Cocktails
export const cocktailItems: MenuItem[] = [
  // Signature
  {
    id: 'cocktail-1',
    name: 'The Winery Sangria',
    description: 'Red wine, brandy, honey, agave, lime juice',
    price: 25,
    category: 'cocktails',
    subcategory: 'Signature',
    tags: ['signature', 'sangria', 'red wine'],
    featured: true
  },
  {
    id: 'cocktail-2',
    name: 'Yuzu 75',
    description: 'Gin, Yuzu liqueur, lemon juice, sparkling wine',
    price: 20,
    category: 'cocktails',
    subcategory: 'Signature',
    tags: ['signature', 'gin', 'yuzu', 'sparkling']
  },
  {
    id: 'cocktail-3',
    name: 'Earl of The Orient',
    description: 'Infused Earl Grey gin, lychee liqueur, honey, lemon, orange juice, egg white',
    price: 22,
    category: 'cocktails',
    subcategory: 'Signature',
    tags: ['signature', 'gin', 'earl grey', 'lychee']
  },
  {
    id: 'cocktail-4',
    name: 'Golden Passion',
    description: 'Gin, passionfruit purée, mango juice, Kaffir lime leaf, mint leaf, chili padi',
    price: 22,
    category: 'cocktails',
    subcategory: 'Signature',
    tags: ['signature', 'gin', 'passionfruit', 'mango', 'spicy'],
    spiceLevel: 1
  },
  {
    id: 'cocktail-5',
    name: 'Scarlet Dagger',
    description: 'Gin, strawberry liqueur, peach liqueur, watermelon syrup, lemon juice',
    price: 20,
    category: 'cocktails',
    subcategory: 'Signature',
    tags: ['signature', 'gin', 'strawberry', 'peach', 'fruity']
  },
  // Classic
  {
    id: 'cocktail-6',
    name: 'Long Island Iced Tea',
    description: 'Vodka, tequila, light rum, gin, triple sec, lime juice, cola, lime wheel',
    price: 24,
    category: 'cocktails',
    subcategory: 'Classic',
    tags: ['classic', 'strong', 'mixed spirits']
  },
  {
    id: 'cocktail-7',
    name: 'Classic Martini',
    description: 'Gin/Vodka, dry vermouth, olives or a lemon twist',
    price: 20,
    category: 'cocktails',
    subcategory: 'Classic',
    tags: ['classic', 'martini', 'gin', 'vodka'],
    customizations: [
      {
        id: 'base-spirit',
        name: 'Base Spirit',
        required: true,
        options: [
          { id: 'gin', name: 'Gin', price: 0 },
          { id: 'vodka', name: 'Vodka', price: 0 }
        ]
      },
      {
        id: 'garnish',
        name: 'Garnish',
        required: true,
        options: [
          { id: 'olives', name: 'Olives', price: 0 },
          { id: 'lemon-twist', name: 'Lemon Twist', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'cocktail-8',
    name: 'Lychee Martini',
    description: 'Vodka, lychee liqueur, lychee juice',
    price: 20,
    category: 'cocktails',
    subcategory: 'Classic',
    tags: ['classic', 'martini', 'vodka', 'lychee']
  },
  {
    id: 'cocktail-9',
    name: 'Espresso Martini',
    description: 'Rum, coffee liqueur, Vietnamese coffee beans, brown sugar, espresso',
    price: 22,
    category: 'cocktails',
    subcategory: 'Classic',
    tags: ['classic', 'martini', 'rum', 'coffee']
  },
  {
    id: 'cocktail-10',
    name: 'Cosmopolitan',
    description: 'Vodka, Cointreau, cranberry juice, and lime juice',
    price: 18,
    category: 'cocktails',
    subcategory: 'Classic',
    tags: ['classic', 'vodka', 'cranberry']
  },
  {
    id: 'cocktail-11',
    name: 'Malibu Piña Colada',
    description: 'Malibu coconut rum, Piña colada syrup, pineapple juice, milk',
    price: 18,
    category: 'cocktails',
    subcategory: 'Classic',
    tags: ['classic', 'rum', 'coconut', 'tropical']
  },
  {
    id: 'cocktail-12',
    name: 'Singapore Sling', 
    description: 'Gin, cherry liqueur, Bénédictine, Cointreau, pineapple juice, lime juice, grenadine, Angostura bitters',
    price: 22,
    category: 'cocktails',
    subcategory: 'Classic',
    tags: ['classic', 'gin', 'singapore', 'complex']
  },
  {
    id: 'cocktail-13',
    name: 'Negroni',
    description: 'Italian gin, sweet vermouth, Campari, orange peel',
    price: 18,
    category: 'cocktails',
    subcategory: 'Classic',
    tags: ['classic', 'gin', 'bitter', 'italian']
  },
  {
    id: 'cocktail-14',
    name: 'Old Fashioned',
    description: 'Bourbon Whiskey, Sweet Vermouth, Angostura Bitters, Maraschino Cherry, Orange peel',
    price: 20,
    category: 'cocktails',
    subcategory: 'Classic',
    tags: ['classic', 'bourbon', 'whiskey', 'bitter']
  },
  {
    id: 'cocktail-15',
    name: 'Whiskey Sour',
    description: 'Bourbon whiskey, lemon juice, sugar, egg white (optional), angostura bitters',
    price: 22,
    category: 'cocktails',
    subcategory: 'Classic',
    tags: ['classic', 'bourbon', 'sour', 'whiskey'],
    customizations: [
      {
        id: 'egg-white',
        name: 'Add Egg White',
        required: false,
        options: [
          { id: 'with-egg', name: 'With Egg White (recommended)', price: 0 },
          { id: 'without-egg', name: 'Without Egg White', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'cocktail-16',
    name: 'Aperol Spritz',
    description: 'Prosecco, Aperol, soda water, orange slice',
    price: 18,
    category: 'cocktails',
    subcategory: 'Classic',
    tags: ['classic', 'aperol', 'prosecco']
  },
  // Mocktails
  {
    id: 'cocktail-17',
    name: 'Lemon Fizz',
    description: 'Lemonade syrup, english breakfast tea, honey, sprite',
    price: 12,
    category: 'cocktails',
    subcategory: 'Mocktails',
    tags: ['mocktail', 'lemon', 'tea', 'refreshing']
  },
  {
    id: 'cocktail-18',
    name: 'Lychee Cooler',
    description: 'Lychee syrup, lemon, soda',
    price: 12,
    category: 'cocktails',
    subcategory: 'Mocktails',
    tags: ['mocktail', 'lychee', 'refreshing']
  },
  {
    id: 'cocktail-19',
    name: 'Virgin Mojito',
    description: 'Cucumber syrup, lemon, soda, fresh mint',
    price: 12,
    category: 'cocktails',
    subcategory: 'Mocktails',
    tags: ['mocktail', 'mint', 'cucumber', 'refreshing']
  },
  {
    id: 'cocktail-20',
    name: 'Passionate',
    description: 'Passionfruit syrup, lime juice, mint',
    price: 12,
    category: 'cocktails',
    subcategory: 'Mocktails',
    tags: ['mocktail', 'passionfruit', 'tropical']
  }
];

// Gin Infusions
export const ginInfusions: MenuItem[] = [
  {
    id: 'gin-1',
    name: 'Lemon Gin Infusion',
    description: 'Our signature gin infused with fresh lemon',
    price: 15,
    category: 'cocktails',
    subcategory: 'Gin Infusions',
    tags: ['gin', 'infusion', 'lemon', 'artisan']
  },
  {
    id: 'gin-2',
    name: 'Orange Gin Infusion',
    description: 'Premium gin with organic orange peels',
    price: 15,
    category: 'cocktails',
    subcategory: 'Gin Infusions',
    tags: ['gin', 'infusion', 'orange', 'artisan']
  },
  {
    id: 'gin-3',
    name: 'Calamansi Gin Infusion',
    description: 'Exotic calamansi-infused gin',
    price: 15,
    category: 'cocktails',
    subcategory: 'Gin Infusions',
    tags: ['gin', 'infusion', 'calamansi', 'artisan', 'citrus']
  },
  {
    id: 'gin-4',
    name: 'Mixed Berries Gin Infusion',
    description: 'House gin with hand-picked mixed berries',
    price: 15,
    category: 'cocktails',
    subcategory: 'Gin Infusions',
    tags: ['gin', 'infusion', 'berries', 'artisan', 'fruity']
  },
  {
    id: 'gin-5',
    name: 'Passionfruit Gin Infusion',
    description: 'Tropical passionfruit meets premium gin',
    price: 15,
    category: 'cocktails',
    subcategory: 'Gin Infusions',
    tags: ['gin', 'infusion', 'passionfruit', 'artisan', 'tropical']
  },
  {
    id: 'gin-6',
    name: 'Earl Grey Gin Infusion',
    description: 'Sophisticated earl grey tea-infused gin',
    price: 15,
    category: 'cocktails',
    subcategory: 'Gin Infusions',
    tags: ['gin', 'infusion', 'earl grey', 'artisan', 'tea']
  },
  {
    id: 'gin-7',
    name: 'Lemongrass Gin Infusion',
    description: 'Asian-inspired lemongrass gin infusion',
    price: 15,
    category: 'cocktails',
    subcategory: 'Gin Infusions',
    tags: ['gin', 'infusion', 'lemongrass', 'artisan', 'asian']
  }
];

// Premium Spirits
export const spiritItems: MenuItem[] = [
  // Whisky
  {
    id: 'spirit-1',
    name: 'Glenturret Triple Wood',
    description: 'Highland Single Malt Scotch Whisky',
    price: 18,
    category: 'spirits',
    subcategory: 'Whisky',
    tags: ['whisky', 'scotch', 'highland', 'single malt'],
    customizations: [
      {
        id: 'serving',
        name: 'Serving',
        required: true,
        options: [
          { id: 'glass', name: 'Glass', price: 0 },
          { id: 'bottle', name: 'Bottle', price: 222 }
        ]
      }
    ]
  },
  {
    id: 'spirit-2',
    name: 'Balvenie Double Wood 12 Years',
    description: 'Speyside Single Malt Scotch Whisky',
    price: 18,
    category: 'spirits',
    subcategory: 'Whisky',
    tags: ['whisky', 'scotch', 'speyside', 'single malt', '12 year'],
    customizations: [
      {
        id: 'serving',
        name: 'Serving',
        required: true,
        options: [
          { id: 'glass', name: 'Glass', price: 0 },
          { id: 'bottle', name: 'Bottle', price: 222 }
        ]
      }
    ]
  },
  {
    id: 'spirit-3',
    name: 'Balvenie Caribbean Cask 14 Years',
    description: 'Speyside Single Malt finished in Caribbean rum casks',
    price: 22,
    category: 'spirits',
    subcategory: 'Whisky',
    tags: ['whisky', 'scotch', 'speyside', 'caribbean', '14 year'],
    customizations: [
      {
        id: 'serving',
        name: 'Serving',
        required: true,
        options: [
          { id: 'glass', name: 'Glass', price: 0 },
          { id: 'bottle', name: 'Bottle', price: 302 }
        ]
      }
    ]
  },
  {
    id: 'spirit-4',
    name: 'Macallan 12 Years Double Cask',
    description: 'Highland Single Malt aged in American and European oak',
    price: 22,
    category: 'spirits',
    subcategory: 'Whisky',
    tags: ['whisky', 'scotch', 'highland', 'macallan', '12 year'],
    customizations: [
      {
        id: 'serving',
        name: 'Serving',
        required: true,
        options: [
          { id: 'glass', name: 'Glass', price: 0 },
          { id: 'bottle', name: 'Bottle', price: 262 }
        ]
      }
    ]
  },
  // Gin
  {
    id: 'spirit-5',
    name: 'Monkey 47',
    description: 'German premium gin with 47 botanicals',
    price: 17,
    category: 'spirits',
    subcategory: 'Gin',
    tags: ['gin', 'premium', 'german', 'botanicals'],
    customizations: [
      {
        id: 'serving',
        name: 'Serving',
        required: true,
        options: [
          { id: 'glass', name: 'Glass', price: 0 },
          { id: 'bottle', name: 'Bottle', price: 202 }
        ]
      }
    ]
  },
  {
    id: 'spirit-6',
    name: 'Hendricks Gin',
    description: 'Scottish gin infused with cucumber and rose petals',
    price: 17,
    category: 'spirits',
    subcategory: 'Gin',
    tags: ['gin', 'scottish', 'cucumber', 'rose'],
    customizations: [
      {
        id: 'serving',
        name: 'Serving',
        required: true,
        options: [
          { id: 'glass', name: 'Glass', price: 0 },
          { id: 'bottle', name: 'Bottle', price: 202 }
        ]
      }
    ]
  },
  // Vodka
  {
    id: 'spirit-7',
    name: 'Belvedere Vodka',
    description: 'Premium Polish vodka',
    price: 17,
    category: 'spirits',
    subcategory: 'Vodka',
    tags: ['vodka', 'premium', 'polish'],
    customizations: [
      {
        id: 'serving',
        name: 'Serving',
        required: true,
        options: [
          { id: 'glass', name: 'Glass', price: 0 },
          { id: 'bottle', name: 'Bottle', price: 202 }
        ]
      }
    ]
  },
  {
    id: 'spirit-8',
    name: 'Grey Goose Vodka',
    description: 'French premium vodka',
    price: 17,
    category: 'spirits',
    subcategory: 'Vodka',
    tags: ['vodka', 'premium', 'french'],
    customizations: [
      {
        id: 'serving',
        name: 'Serving',
        required: true,
        options: [
          { id: 'glass', name: 'Glass', price: 0 },
          { id: 'bottle', name: 'Bottle', price: 202 }
        ]
      }
    ]
  }
];

// Shots & Specials
export const shotItems: MenuItem[] = [
  {
    id: 'shot-1',
    name: 'Five Ten',
    description: 'Premium shot blend',
    price: 20,
    category: 'shots',
    subcategory: 'Premium Shots',
    tags: ['shot', 'premium'],
    customizations: [
      {
        id: 'quantity',
        name: 'Quantity',
        required: true,
        options: [
          { id: 'solo', name: 'Solo', price: 0 },
          { id: 'tower', name: 'Tower (5 shots)', price: 70 }
        ]
      }
    ]
  },
  {
    id: 'shot-2',
    name: 'B52',
    description: 'Coffee liqueur, Irish cream liqueur, orange liqueur',
    price: 15,
    category: 'shots',
    subcategory: 'Classic Shots',
    tags: ['shot', 'layered', 'coffee'],
    customizations: [
      {
        id: 'quantity',
        name: 'Quantity',
        required: true,
        options: [
          { id: 'solo', name: 'Solo', price: 0 },
          { id: 'tower', name: 'Tower (8 shots)', price: 105 }
        ]
      }
    ]
  },
  {
    id: 'shot-3',
    name: 'Sex On The Beach',
    description: 'Vodka, peach schnapps, orange juice, cranberry juice',
    price: 15,
    category: 'shots',
    subcategory: 'Classic Shots',
    tags: ['shot', 'fruity', 'vodka'],
    customizations: [
      {
        id: 'quantity',
        name: 'Quantity',
        required: true,
        options: [
          { id: 'solo', name: 'Solo', price: 0 },
          { id: 'tower', name: 'Tower (8 shots)', price: 105 }
        ]
      }
    ]
  },
  {
    id: 'shot-4',
    name: 'Mr & Mrs Yuzu',
    description: 'Yuzu, lemon rind, sake',
    price: 15,
    category: 'shots',
    subcategory: 'Signature Shots',
    tags: ['shot', 'yuzu', 'sake', 'japanese'],
    customizations: [
      {
        id: 'quantity',
        name: 'Quantity',
        required: true,
        options: [
          { id: 'solo', name: 'Solo', price: 0 },
          { id: 'tower', name: 'Tower (8 shots)', price: 105 }
        ]
      }
    ]
  },
  {
    id: 'shot-5',
    name: 'Margarita Shot',
    description: 'Blanco tequila, lime juice, orange liqueur',
    price: 15,
    category: 'shots',
    subcategory: 'Classic Shots',
    tags: ['shot', 'tequila', 'margarita'],
    customizations: [
      {
        id: 'quantity',
        name: 'Quantity',
        required: true,
        options: [
          { id: 'solo', name: 'Solo', price: 0 },
          { id: 'tower', name: 'Tower (8 shots)', price: 105 }
        ]
      }
    ]
  },
  {
    id: 'shot-6',
    name: 'Jagerbomb',
    description: 'Jägermeister, Red Bull',
    price: 15,
    category: 'shots',
    subcategory: 'Energy Shots',
    tags: ['shot', 'jager', 'red bull', 'energy'],
    customizations: [
      {
        id: 'quantity',
        name: 'Quantity',
        required: true,
        options: [
          { id: 'solo', name: 'Solo', price: 0 },
          { id: 'tower', name: 'Tower (8 shots)', price: 105 }
        ]
      }
    ]
  },
  {
    id: 'shot-7',
    name: 'Stairway to Heaven',
    description: 'Absinthe, brown sugar, mint liqueur',
    price: 20,
    category: 'shots',
    subcategory: 'Premium Shots',
    tags: ['shot', 'absinthe', 'premium', 'mint']
  }
];

// Non-Alcoholic
export const nonAlcoholicItems: MenuItem[] = [
  // Water
  {
    id: 'na-1',
    name: 'PUREZZA Water',
    description: 'Still / Sparkling, chargeable per person, free flow',
    price: 1,
    category: 'non-alcoholic',
    subcategory: 'Water',
    tags: ['water', 'free flow'],
    customizations: [
      {
        id: 'type',
        name: 'Type',
        required: true,
        options: [
          { id: 'still', name: 'Still', price: 0 },
          { id: 'sparkling', name: 'Sparkling', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'na-2',
    name: 'Acqua Panna',
    description: 'Italian natural spring water',
    price: 12,
    category: 'non-alcoholic',
    subcategory: 'Water',
    tags: ['water', 'italian', 'premium']
  },
  {
    id: 'na-3',
    name: 'San Pellegrino',
    description: 'Italian sparkling natural mineral water',
    price: 12,
    category: 'non-alcoholic',
    subcategory: 'Water',
    tags: ['water', 'sparkling', 'italian', 'premium']
  },
  // Soft Drinks
  {
    id: 'na-4',
    name: 'Coke',
    description: 'Classic Coca-Cola',
    price: 6,
    category: 'non-alcoholic',
    subcategory: 'Soft Drinks',
    tags: ['soda', 'cola', 'classic']
  },
  {
    id: 'na-5',
    name: 'Coke Zero',
    description: 'Zero sugar cola',
    price: 6,
    category: 'non-alcoholic',
    subcategory: 'Soft Drinks',
    tags: ['soda', 'cola', 'zero sugar']
  },
  {
    id: 'na-6',
    name: 'Ginger Ale',
    description: 'Refreshing ginger soda',
    price: 6,
    category: 'non-alcoholic',
    subcategory: 'Soft Drinks',
    tags: ['soda', 'ginger', 'refreshing']
  },
  {
    id: 'na-7',
    name: 'Sprite',
    description: 'Lemon-lime soda',
    price: 6,
    category: 'non-alcoholic',
    subcategory: 'Soft Drinks',
    tags: ['soda', 'lemon', 'lime']
  },
  {
    id: 'na-8',
    name: 'Tonic',
    description: 'Premium tonic water',
    price: 6,
    category: 'non-alcoholic',
    subcategory: 'Soft Drinks',
    tags: ['tonic', 'mixer']
  },
  {
    id: 'na-9',
    name: 'Soda',
    description: 'Club soda',
    price: 6,
    category: 'non-alcoholic',
    subcategory: 'Soft Drinks',
    tags: ['soda', 'mixer']
  },
  {
    id: 'na-10',
    name: 'Red Bull',
    description: 'Energy drink',
    price: 8,
    category: 'non-alcoholic',
    subcategory: 'Soft Drinks',
    tags: ['energy drink', 'red bull']
  },
  // Coffee
  {
    id: 'na-11',
    name: 'Espresso',
    description: 'Classic Italian espresso',
    price: 8,
    category: 'non-alcoholic',
    subcategory: 'Coffee',
    tags: ['coffee', 'espresso'],
    customizations: [
      {
        id: 'extra-shot',
        name: 'Extra Shot',
        required: false,
        options: [
          { id: 'extra', name: 'Add Extra Shot', price: 4 }
        ]
      }
    ]
  },
  {
    id: 'na-12',
    name: 'Long Black',
    description: 'Double shot espresso with hot water',
    price: 8,
    category: 'non-alcoholic',
    subcategory: 'Coffee',
    tags: ['coffee', 'long black', 'americano']
  },
  // Tea
  {
    id: 'na-13',
    name: 'Chamomile Tea',
    description: 'Gryphon Signature Collection',
    price: 8,
    category: 'non-alcoholic',
    subcategory: 'Tea',
    tags: ['tea', 'chamomile', 'herbal', 'gryphon']
  },
  {
    id: 'na-14',
    name: 'English Breakfast Tea',
    description: 'Gryphon Signature Collection', 
    price: 8,
    category: 'non-alcoholic',
    subcategory: 'Tea',
    tags: ['tea', 'english breakfast', 'black tea', 'gryphon']
  },
  {
    id: 'na-15',
    name: 'Osmanthus Sencha Tea',
    description: 'Gryphon Signature Collection',
    price: 8,
    category: 'non-alcoholic',
    subcategory: 'Tea',
    tags: ['tea', 'osmanthus', 'sencha', 'green tea', 'gryphon']
  },
  {
    id: 'na-16',
    name: 'Earl Grey Lavender Tea',
    description: 'Gryphon Signature Collection',
    price: 8,
    category: 'non-alcoholic',
    subcategory: 'Tea',
    tags: ['tea', 'earl grey', 'lavender', 'black tea', 'gryphon']
  }
];

export const allDrinkItems = [
  ...happyHourItems,
  ...wineItems,
  ...beerItems,
  ...cocktailItems,
  ...ginInfusions,
  ...spiritItems,
  ...shotItems,
  ...nonAlcoholicItems
];