import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured.');
}

const supabase = createClient(url, key);

async function main() {
  console.log("Checking Supabase tables...");
  
  const tables = ['conditions', 'showcases', 'videos', 'testimonials', 'faqs', 'blogs', 'appointments'];
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
