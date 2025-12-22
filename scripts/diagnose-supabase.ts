import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

// Client with ANON key (simulates public user)
const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);

async function diagnose() {
    console.log('--- DIAGNOSTIC START ---');

    // 1. Check if table exists and has data (using ANON key)
    console.log('\n1. Checking access with ANON key...');
    const { data: anonData, error: anonError, count: anonCount } = await supabaseAnon
        .from('vehicles')
        .select('*', { count: 'exact' });

    if (anonError) {
        console.error('❌ Error with ANON key:', anonError.message);
        console.error('   Hint: RLS might be blocking access or table does not exist.');
    } else {
        console.log(`✅ Success with ANON key. Found ${anonCount} vehicles.`);
    }

    console.log('\n--- DIAGNOSTIC END ---');
}

diagnose();
