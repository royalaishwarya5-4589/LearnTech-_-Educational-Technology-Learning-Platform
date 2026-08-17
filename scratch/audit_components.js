const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allSrcFiles = getFiles(srcDir);

console.log(`Total Files in src: ${allSrcFiles.length}`);

const components = allSrcFiles.filter(f => f.includes('components'));
console.log(`Total Components: ${components.length}`);
components.forEach(c => console.log(' - ' + path.relative(srcDir, c)));

