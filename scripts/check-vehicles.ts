import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkVehicles() {
    console.log('Checking vehicles in Supabase...');

    const { data, error, count } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact' });

    if (error) {
        console.error('Error fetching vehicles:', error);
    } else {
        console.log(`Found ${count} vehicles in the database.`);
        if (data && data.length > 0) {
            console.log('First 3 vehicles:', data.slice(0, 3).map(v => `${v.brand} ${v.model}`));
        }
    }
}

checkVehicles();
