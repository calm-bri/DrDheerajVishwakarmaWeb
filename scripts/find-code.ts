import fs from 'fs';
import path from 'path';

const filePath = 'C:/Users/briju/.gemini/antigravity-ide/brain/62cc2ed3-dc22-455c-8ffa-a208fabe7a5a/.system_generated/steps/725/content.md';

function search() {
  if (!fs.existsSync(filePath)) {
    console.error("File does not exist!");
    return;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  let index = -1;
  const terms = ['"use client"', 'LenticularCarousel =', 'function LenticularCarousel'];
  
  for (const term of terms) {
    let index = -1;
    while ((index = content.indexOf(term, index + 1)) !== -1) {
      console.log(`Found '${term}' at index: ${index}`);
      const start = Math.max(0, index - 200);
      const end = Math.min(content.length, index + 5000);
      console.log("=== SURROUNDING TEXT ===");
      console.log(content.slice(start, end));
      console.log("========================\n");
    }
  }
}

search();
