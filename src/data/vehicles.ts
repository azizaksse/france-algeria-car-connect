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
  transmission: 'Boite Manuelle' | 'Boite Automatique';
  reference: string;
  bodyType?: 'Berline' | 'SUV' | 'Citadine' | 'Break' | 'Coupé' | 'Monospace';
  exteriorColor?: string;
}

export const vehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'Renault',
    model: 'CLIO V ESPRIT ALPINE DCI 115CH BVM6',
    year: 2025,
    fuel: 'Diesel',
    price: 16500,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    category: 'new',
    mileage: 10,
    available: true,
    transmission: 'Boite Manuelle',
    reference: '3c62ptj2z',
    bodyType: 'Berline',
    exteriorColor: 'Gris rafale',
  },
  {
    id: '2',
    brand: 'Peugeot',
    model: '3008 GT HDI 130CH',
    year: 2024,
    fuel: 'Diesel',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
    category: 'new',
    mileage: 0,
    available: true,
    transmission: 'Boite Automatique',
    reference: '4d73quk3a',
    bodyType: 'SUV',
    exteriorColor: 'Noir Perla',
  },
  {
    id: '3',
    brand: 'Volkswagen',
    model: 'Golf 8 TDI 150CH',
    year: 2022,
    fuel: 'Diesel',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    category: 'used',
    mileage: 25000,
    available: true,
    transmission: 'Boite Manuelle',
    reference: '5e84rvl4b',
    bodyType: 'Berline',
    exteriorColor: 'Blanc Pur',
  },
  {
    id: '4',
    brand: 'Mercedes',
    model: 'Classe A 200 AMG Line',
    year: 2023,
    fuel: 'Essence',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    category: 'new',
    mileage: 500,
    available: true,
    transmission: 'Boite Automatique',
    reference: '6f95swm5c',
    bodyType: 'Berline',
    exteriorColor: 'Gris Montagne',
  },
  {
    id: '5',
    brand: 'BMW',
    model: 'Série 3 320d M Sport',
    year: 2021,
    fuel: 'Diesel',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    category: 'used',
    mileage: 45000,
    available: true,
    transmission: 'Boite Automatique',
    reference: '7g06txn6d',
    bodyType: 'Berline',
    exteriorColor: 'Bleu Estoril',
  },
  {
    id: '6',
    brand: 'Citroën',
    model: 'C5 Aircross Hybrid 225',
    year: 2024,
    fuel: 'Hybride',
    price: 39500,
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80',
    category: 'new',
    mileage: 100,
    available: true,
    transmission: 'Boite Automatique',
    reference: '8h17uyo7e',
    bodyType: 'SUV',
    exteriorColor: 'Rouge Elixir',
  },
];

export const brands = ['Peugeot', 'Renault', 'Volkswagen', 'Mercedes', 'BMW', 'Citroën', 'Audi', 'Toyota'];
export const years = [2025, 2024, 2023, 2022, 2021, 2020];
export const fuels = ['Essence', 'Diesel', 'Hybride', 'Électrique'];
export const transmissions = ['Boite Manuelle', 'Boite Automatique'];