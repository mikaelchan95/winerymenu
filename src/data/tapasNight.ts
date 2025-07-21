import { MenuItem } from '../types';

export const tapasNightItems: MenuItem[] = [
  {
    id: 'tapas-night-1',
    name: 'Mixed Olives',
    description: "Chef's selection olives",
    price: 0, // Included in prix fixe
    image: '/assets/images/veganpopcornchickentofurecipe-h1.jpg',
    category: 'tapas-night',
    tags: ['vegetarian', 'spanish']
  },
  {
    id: 'tapas-night-2',
    name: 'Sweet Potato Taco',
    description: 'Sweet potato, handmade sesame dressing',
    price: 0,
    image: '/assets/images/veganpopcornchickentofurecipe-h1.jpg',
    category: 'tapas-night',
    tags: ['vegetarian', 'taco']
  },
  {
    id: 'tapas-night-3',
    name: 'Padrón Peppers',
    description: 'Sea salt, togarashi',
    price: 0,
    image: '/assets/images/veganpopcornchickentofurecipe-h1.jpg',
    category: 'tapas-night',
    tags: ['vegetarian', 'spicy', 'spanish'],
    spiceLevel: 1
  },
  {
    id: 'tapas-night-4',
    name: 'Porcini Mushroom Croquettes',
    description: 'Truffle mayo',
    price: 0,
    image: '/assets/images/veganpopcornchickentofurecipe-h1.jpg',
    category: 'tapas-night',
    tags: ['vegetarian', 'mushroom', 'truffle'],
    allergens: ['dairy', 'gluten']
  },
  {
    id: 'tapas-night-5',
    name: 'Crispy Fries',
    description: 'Truffle mayo',
    price: 0,
    image: '/assets/images/veganpopcornchickentofurecipe-h1.jpg',
    category: 'tapas-night',
    tags: ['vegetarian', 'truffle']
  },
  {
    id: 'tapas-night-6',
    name: 'Roasted Cauliflower',
    description: 'Romesco sauce, basil pesto, pine nuts, piparras, Parmigiano Reggiano',
    price: 0,
    image: '/assets/images/veganpopcornchickentofurecipe-h1.jpg',
    category: 'tapas-night',
    tags: ['vegetarian', 'romesco', 'pesto'],
    allergens: ['dairy', 'nuts']
  },
  {
    id: 'tapas-night-7',
    name: 'Patatas Bravas',
    description: 'Crispy layered Agria potatoes, spicy bravas sauce, mayo, togarashi',
    price: 0,
    image: '/assets/images/veganpopcornchickentofurecipe-h1.jpg',
    category: 'tapas-night',
    tags: ['vegetarian', 'spicy', 'spanish'],
    spiceLevel: 2,
    allergens: ['dairy']
  },
  {
    id: 'tapas-night-8',
    name: 'Spanish Tortilla',
    description: 'Confit Agria potato, mayo',
    price: 0,
    image: '/assets/images/veganpopcornchickentofurecipe-h1.jpg',
    category: 'tapas-night',
    tags: ['vegetarian', 'spanish'],
    allergens: ['eggs', 'dairy']
  },
  {
    id: 'tapas-night-9',
    name: 'Baked Agria Potato with Cheese',
    description: 'Béchamel sauce, mozzarella, Parmigiano Reggiano',
    price: 0,
    image: '/assets/images/veganpopcornchickentofurecipe-h1.jpg',
    category: 'tapas-night',
    tags: ['vegetarian', 'cheese'],
    allergens: ['dairy', 'gluten']
  },
  {
    id: 'tapas-night-10',
    name: 'Pan con Tomate',
    description: 'Hand-ground Roma tomatoes, baguette, chives',
    price: 0,
    image: '/assets/images/veganpopcornchickentofurecipe-h1.jpg',
    category: 'tapas-night',
    tags: ['vegetarian', 'spanish'],
    allergens: ['gluten']
  },
  {
    id: 'tapas-night-11',
    name: 'Suckling Pig Taco',
    description: 'Spanish suckling pig, handmade sweet sauce, pickled onions',
    price: 0,
    image: '/assets/images/veganpopcornchickentofurecipe-h1.jpg',
    category: 'tapas-night',
    tags: ['pork', 'taco', 'spanish'],
    allergens: ['gluten']
  },
  {
    id: 'tapas-night-12',
    name: 'Wagyu Beef Brioche Slider with Fries',
    description: 'Caramelized onions, Dijon mustard, cheddar, mayo',
    price: 0,
    image: '/assets/images/veganpopcornchickentofurecipe-h1.jpg',
    category: 'tapas-night',
    tags: ['wagyu', 'beef', 'premium'],
    allergens: ['dairy', 'gluten']
  },
  {
    id: 'tapas-night-13',
    name: 'Crispy Baby Cuttlefish',
    description: 'Mayo, lemon wedge',
    price: 0,
    image: '/assets/images/veganpopcornchickentofurecipe-h1.jpg',
    category: 'tapas-night',
    tags: ['seafood', 'crispy'],
    allergens: ['seafood']
  },
  {
    id: 'tapas-night-14',
    name: 'Popcorn Chicken',
    description: 'Chipotle mayo, lemon wedge',
    price: 0,
    image: '/assets/images/veganpopcornchickentofurecipe-h1.jpg',
    category: 'tapas-night',
    tags: ['chicken', 'spicy'],
    spiceLevel: 2
  },
  {
    id: 'tapas-night-15',
    name: 'Crispy Bacon with Cherry Tomato',
    description: 'Crispy bacon, cherry tomatoes, chipotle mayo',
    price: 0,
    image: '/assets/images/veganpopcornchickentofurecipe-h1.jpg',
    category: 'tapas-night',
    tags: ['bacon', 'pork']
  },
  {
    id: 'tapas-night-16',
    name: 'Trio of Cured Meats',
    description: "Chef's selection of cold cuts",
    price: 0,
    image: '/assets/images/veganpopcornchickentofurecipe-h1.jpg',
    category: 'tapas-night',
    tags: ['charcuterie', 'cured meats']
  }
];

export const tapasNightPackage = {
  id: 'tapas-night-package',
  name: 'Monday Tapas Night',
  description: 'Unlimited tapas for 2 hours • All items available • 3 dishes per person per round',
  price: 39,
  duration: '2 hours',
  availableDay: 'Monday',
  timeSlot: '6:00 PM - 10:00 PM',
  orderingStyle: '3 dishes per person per round',
  groupPolicy: 'One in? All in. The whole table MUST join the fun',
  items: tapasNightItems
};