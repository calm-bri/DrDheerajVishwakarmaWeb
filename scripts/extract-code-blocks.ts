import fs from 'fs';
import path from 'path';

const filePath = 'C:/Users/briju/.gemini/antigravity-ide/brain/62cc2ed3-dc22-455c-8ffa-a208fabe7a5a/.system_generated/steps/725/content.md';
const outputDir = 'C:/Users/briju/.gemini/antigravity-ide/brain/62cc2ed3-dc22-455c-8ffa-a208fabe7a5a/scratch';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function extract() {
  if (!fs.existsSync(filePath)) {
    console.error("File does not exist!");
    return;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  console.log("Analyzing file size:", content.length);

  // Search for the React component definition or key strings like 'strips' or 'sweep'
  // Let's search for '<pre' or '<code' in the HTML text to see code blocks
  let index = -1;
  let codeBlocksCount = 0;
  
  // React Bits often uses code blocks rendered in pre elements
  const preRegex = /<pre[^>]*>([\s\S]*?)<\/pre>/gi;
  let match;
  while ((match = preRegex.exec(content)) !== null) {
    codeBlocksCount++;
    console.log(`Found code block #${codeBlocksCount} (Length: ${match[1].length})`);
    const cleanCode = match[1]
      .replace(/<[^>]*>/g, '') // remove HTML tags
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, '/');
      
    fs.writeFileSync(path.join(outputDir, `code-block-${codeBlocksCount}.txt`), cleanCode);
  }
  
  console.log(`Extraction complete. Saved ${codeBlocksCount} code blocks to scratch/ folder.`);
}

extract();
