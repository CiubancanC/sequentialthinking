import fs from 'fs';
import path from 'path';
import ignore from 'ignore';

// Function to read the .gitignore file and create an ignore filter
function createIgnoreFilter() {
  try {
    const gitignoreContent = fs.readFileSync('.gitignore', 'utf8');
    const ig = ignore().add(gitignoreContent);

    // Always ignore node_modules and .git directories
    ig.add('node_modules/**');
    ig.add('.git/**');

    return ig;
  } catch (error) {
    console.error('Error reading .gitignore file:', error.message);
    // If .gitignore doesn't exist, create a default filter that ignores common directories
    return ignore().add(['node_modules/**', '.git/**']);
  }
}

// Function to recursively walk through directories
async function walkDirectory(dir, ignoreFilter, relativePath = '') {
  const files = [];

  try {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(dir, entry.name);
      const entryRelativePath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        // Recursively walk subdirectories
        const subDirFiles = await walkDirectory(entryPath, ignoreFilter, entryRelativePath);
        files.push(...subDirFiles);
      } else if (entry.isFile()) {
        // Check if the file should be ignored
        if (!ignoreFilter.ignores(entryRelativePath)) {
          files.push(entryRelativePath);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }

  return files;
}

// Function to read file content
async function readFileContent(filePath) {
  try {
    return await fs.promises.readFile(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return `[Error reading file: ${error.message}]`;
  }
}

// Main function
async function main() {
  const ignoreFilter = createIgnoreFilter();
  const files = await walkDirectory('.', ignoreFilter);

  let resultContent = '';

  for (const file of files) {
    // Include JavaScript, JSX, TypeScript, and TSX files
    if (!file.endsWith('.js') && !file.endsWith('.jsx') &&
        !file.endsWith('.ts') && !file.endsWith('.tsx')) {
      continue;
    }
    console.log(`Processing: ${file}`);
    const content = await readFileContent(file);

    resultContent += `\n${'='.repeat(80)}\n`;
    resultContent += `FILE: ${file}\n`;
    resultContent += `${'='.repeat(80)}\n`;
    resultContent += content;
    resultContent += '\n';
  }

  // Write the result to result.txt
  await fs.promises.writeFile('result.txt', resultContent);
  console.log(`\nCompleted! Found ${files.length} files. Results saved to result.txt`);
}

main().catch(error => {
  console.error('An error occurred:', error);
  process.exit(1);
});
