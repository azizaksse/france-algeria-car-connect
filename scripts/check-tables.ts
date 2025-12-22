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

async function listTables() {
    console.log('Attempting to list tables...');

    // Try to fetch from a system table or just a simple query
    const { data, error } = await supabase
        .from('vehicles')
        .select('count(*)', { count: 'exact', head: true });

    if (error) {
        console.error('Error accessing vehicles table:', error.message, error.code, error.details);
    } else {
        console.log('Success! Vehicles table exists.');
    }

    // Try to insert a dummy record to see if RLS allows it
    const { error: insertError } = await supabase
        .from('vehicles')
        .insert([{ brand: 'Test', model: 'Test', year: 2024, fuel: 'Essence', price: 0, image: '', category: 'new' }])
        .select();

    if (insertError) {
        console.error('Error inserting:', insertError.message);
    }
}

listTables();
