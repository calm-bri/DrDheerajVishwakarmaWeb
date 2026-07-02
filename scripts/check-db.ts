import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase configuration in env!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("Checking if 'blogs' table exists in Supabase...");
  const { data, error } = await supabase.from('blogs').select('*').limit(1);
  if (error) {
    console.log("Error querying 'blogs' table:", error.message);
    if (error.message.includes("relation \"blogs\" does not exist")) {
      console.log("The 'blogs' table DOES NOT exist. We need to create it.");
    }
  } else {
    console.log("Success! 'blogs' table exists. Current items count:", data.length);
  }
}

check();
