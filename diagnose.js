const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runDiagnostics() {
  console.log("Connecting to Supabase at:", supabaseUrl);
  
  // Test connection and table existence
  console.log("\n--- Testing 'blogs' Table ---");
  const { data: blogs, error: blogsError } = await supabase.from('blogs').select('*');
  if (blogsError) {
    console.error("Error querying 'blogs':", blogsError.message);
    console.error("Full Error Object:", blogsError);
  } else {
    console.log("Success! Query returned rows count:", blogs.length);
    console.log("First row preview:", blogs[0]);
  }

  console.log("\n--- Testing 'showcases' Table ---");
  const { data: showcases, error: showcasesError } = await supabase.from('showcases').select('*');
  if (showcasesError) {
    console.error("Error querying 'showcases':", showcasesError.message);
  } else {
    console.log("Success! Query returned rows count:", showcases.length);
  }
}

runDiagnostics();
