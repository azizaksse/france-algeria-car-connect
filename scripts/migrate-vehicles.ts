import { createClient } from '@supabase/supabase-js';
import { vehicles } from '../src/data/vehicles';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrate() {
    console.log(`Migrating ${vehicles.length} vehicles...`);

    for (const vehicle of vehicles) {
        const { id, ...vehicleData } = vehicle;

        // Map fields to snake_case for DB
        const dbVehicle = {
            brand: vehicleData.brand,
            model: vehicleData.model,
            year: vehicleData.year,
            fuel: vehicleData.fuel,
            price: vehicleData.price,
            image: vehicleData.image,
            category: vehicleData.category,
            mileage: vehicleData.mileage,
            available: vehicleData.available,
            transmission: vehicleData.transmission,
            reference: vehicleData.reference,
            body_type: vehicleData.bodyType,
            exterior_color: vehicleData.exteriorColor,
            status: vehicleData.status || 'available', // Default status if missing
        };

        const { error } = await supabase
            .from('vehicles')
            .insert(dbVehicle);

        if (error) {
            console.error(`Error inserting vehicle ${vehicle.brand} ${vehicle.model}:`, error);
        } else {
            console.log(`Inserted ${vehicle.brand} ${vehicle.model}`);
        }
    }

    console.log('Migration complete!');
}

migrate();
