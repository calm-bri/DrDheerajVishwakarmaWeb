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

async function listBucketsAndGallery() {
  console.log("Fetching all storage buckets...");
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  
  if (bucketsError) {
    console.error("Error listing buckets:", bucketsError.message);
    return;
  }
  
  console.log("Buckets found:", buckets.map(b => b.name));

  // Try to list files in the 'gallery' bucket
  console.log("Listing files in Supabase storage bucket 'gallery'...");
  const { data: files, error: filesError } = await supabase.storage.from('gallery').list('', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' }
  });

  if (filesError) {
    console.error("Error listing files in 'gallery':", filesError.message);
  } else if (files) {
    console.log("Files found in bucket 'gallery':");
    files.forEach((file) => {
      console.log(`- Name: ${file.name}, Size: ${file.metadata?.size || 'unknown'} bytes, Type: ${file.metadata?.mimetype || 'unknown'}`);
    });
  }
}

listBucketsAndGallery();
