import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase configuration in env!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function listVideos() {
  console.log("Listing files in Supabase storage bucket 'Video'...");
  const { data, error } = await supabase.storage.from('Video').list('', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' }
  });

  if (error) {
    console.error("Error listing files:", error.message);
  } else if (data) {
    console.log("Files found in bucket 'Video':");
    data.forEach((file) => {
      console.log(`- Name: ${file.name}, Size: ${file.metadata?.size || 'unknown'} bytes, Type: ${file.metadata?.mimetype || 'unknown'}`);
    });
  }
}

listVideos();
