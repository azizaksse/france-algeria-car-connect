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

async function check() {
    console.log('Checking connection to:', supabaseUrl);

    // Try to select from vehicles
    const { data, error } = await supabase
        .from('vehicles')
        .select('count(*)', { count: 'exact', head: true });

    if (error) {
        console.error('Error accessing vehicles table:', error);
    } else {
        console.log('Successfully accessed vehicles table. Count:', data);
    }
}

check();
