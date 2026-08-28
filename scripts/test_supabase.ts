import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.SUPABASE_URL || 'https://iplsqsfgnmomqqhnvydz.supabase.co';
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_syk9tv7EFv6Y6P03Jos1EQ_9tx_bjSz';

const supabase = createClient(url, key);

async function main() {
  console.log("Checking Supabase tables...");
  
  const tables = ['showcases', 'videos', 'testimonials', 'faqs', 'conditions', 'blogs', 'appointments'];
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*');
    if (error) {
      console.log(`Table '${table}' -> ERROR: ${error.message} (Code: ${error.code})`);
    } else {
      console.log(`Table '${table}' -> SUCCESS: Found ${data?.length || 0} rows`);
    }
  }
}

main().catch(console.error);
