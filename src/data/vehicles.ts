export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  fuel: 'Essence' | 'Diesel' | 'Hybride' | 'Électrique';
  price: number;
  image: string;
  category: 'new' | 'used';
  mileage?: number;
  available: boolean;
}

export const vehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'Peugeot',
    model: '3008 GT',
    year: 2024,
    fuel: 'Diesel',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    category: 'new',
    available: true,
  },
  {
    id: '2',
    brand: 'Renault',
    model: 'Clio V',
    year: 2023,
    fuel: 'Essence',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
    category: 'new',
    available: true,
  },
  {
    id: '3',
    brand: 'Volkswagen',
    model: 'Golf 8',
    year: 2022,
    fuel: 'Diesel',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    category: 'used',
    mileage: 25000,
    available: true,
  },
  {
    id: '4',
    brand: 'Mercedes',
    model: 'Classe A 200',
    year: 2023,
    fuel: 'Essence',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    category: 'new',
    available: true,
  },
  {
    id: '5',
    brand: 'BMW',
    model: 'Série 3 320d',
    year: 2021,
    fuel: 'Diesel',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    category: 'used',
    mileage: 45000,
    available: true,
  },
  {
    id: '6',
    brand: 'Citroën',
    model: 'C5 Aircross',
    year: 2024,
    fuel: 'Hybride',
    price: 39500,
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80',
    category: 'new',
    available: true,
  },
];

export const brands = ['Peugeot', 'Renault', 'Volkswagen', 'Mercedes', 'BMW', 'Citroën', 'Audi', 'Toyota'];
export const years = [2024, 2023, 2022, 2021, 2020];
export const fuels = ['Essence', 'Diesel', 'Hybride', 'Électrique'];
