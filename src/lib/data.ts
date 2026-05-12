export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  image: string;
  seoMeta: {
    title: string;
    description: string;
  };
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED';
  createdAt: string;
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'MacBook Pro 16" M3 Max',
    slug: 'macbook-pro-16-m3',
    price: 3499,
    description: 'The ultimate pro laptop with the mind-blowing Apple M3 Max chip. Features up to 128GB of unified memory and 8TB of storage.',
    category: 'Laptops',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
    seoMeta: {
      title: 'Buy MacBook Pro 16" M3 Max | NexStore',
      description: 'Shop the new MacBook Pro 16-inch with M3 Max chip. Get the best performance for your professional workflow.'
    }
  },
  {
    id: 'p2',
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    price: 398,
    description: 'Industry leading noise canceling headphones with Auto Noise Canceling Optimizer, and crystal clear hands-free calling.',
    category: 'Audio',
    stock: 42,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000',
    seoMeta: {
      title: 'Sony WH-1000XM5 Headphones | NexStore',
      description: 'Experience premium sound with Sony WH-1000XM5 wireless noise-canceling headphones.'
    }
  },
  {
    id: 'p3',
    name: 'Keychron Q1 Pro',
    slug: 'keychron-q1-pro',
    price: 199,
    description: 'A premium full-metal QMK/VIA wireless custom mechanical keyboard with CNC aluminum body and double-gasket design.',
    category: 'Accessories',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=1000',
    seoMeta: {
      title: 'Keychron Q1 Pro Custom Keyboard | NexStore',
      description: 'Upgrade your typing with the Keychron Q1 Pro wireless mechanical keyboard.'
    }
  },
  {
    id: 'p4',
    name: 'Samsung Odyssey G9',
    slug: 'samsung-odyssey-g9',
    price: 1299,
    description: '49-inch curved gaming monitor with dual QHD resolution, 240Hz refresh rate, and 1ms response time.',
    category: 'Monitors',
    stock: 3,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000',
    seoMeta: {
      title: 'Samsung Odyssey G9 49" Monitor | NexStore',
      description: 'Immerse yourself in gaming with the 49-inch Samsung Odyssey G9 curved monitor.'
    }
  },
  {
    id: 'p5',
    name: 'Logitech MX Master 3S',
    slug: 'logitech-mx-master-3s',
    price: 99,
    description: 'Advanced wireless mouse with MagSpeed scrolling, ergonomic design, and 8K DPI any-surface tracking.',
    category: 'Accessories',
    stock: 120,
    image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&q=80&w=1000',
    seoMeta: {
      title: 'Logitech MX Master 3S Wireless Mouse | NexStore',
      description: 'Boost productivity with the Logitech MX Master 3S advanced wireless mouse.'
    }
  },
  {
    id: 'p6',
    name: 'Herman Miller Aeron',
    slug: 'herman-miller-aeron',
    price: 1400,
    description: 'The ultimate ergonomic office chair, providing optimal back support and a breathable suspension material.',
    category: 'Furniture',
    stock: 5,
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=1000',
    seoMeta: {
      title: 'Herman Miller Aeron Office Chair | NexStore',
      description: 'Experience ultimate comfort with the classic Herman Miller Aeron ergonomic office chair.'
    }
  }
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Alex Johnson',
    customerEmail: 'alex@example.com',
    items: [
      { productId: 'p1', quantity: 1, price: 3499, name: 'MacBook Pro 16" M3 Max' }
    ],
    total: 3499,
    status: 'SHIPPED',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'ORD-002',
    customerName: 'Sarah Smith',
    customerEmail: 'sarah@example.com',
    items: [
      { productId: 'p2', quantity: 1, price: 398, name: 'Sony WH-1000XM5' },
      { productId: 'p5', quantity: 1, price: 99, name: 'Logitech MX Master 3S' }
    ],
    total: 497,
    status: 'PROCESSING',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'ORD-003',
    customerName: 'Michael Lee',
    customerEmail: 'michael@example.com',
    items: [
      { productId: 'p3', quantity: 2, price: 199, name: 'Keychron Q1 Pro' }
    ],
    total: 398,
    status: 'PENDING',
    createdAt: new Date().toISOString()
  }
];

export const analyticsData = [
  { name: 'Mon', revenue: 4000, visitors: 2400 },
  { name: 'Tue', revenue: 3000, visitors: 1398 },
  { name: 'Wed', revenue: 5500, visitors: 4800 },
  { name: 'Thu', revenue: 4500, visitors: 3908 },
  { name: 'Fri', revenue: 6000, visitors: 4800 },
  { name: 'Sat', revenue: 8000, visitors: 6800 },
  { name: 'Sun', revenue: 7500, visitors: 6300 },
];
