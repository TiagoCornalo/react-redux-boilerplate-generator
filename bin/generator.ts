import fs from 'fs'
import path from 'path'
import childProcess from 'child_process'

const projectName = process.argv[2]
const projectPath = path.join(process.cwd(), projectName)
const templatesPath = path.join(__dirname, '...', 'templates')

// Crear directorio del proyecto
fs.mkdirSync(projectPath)

//Copiar los templates al directorio del proyecto
copyDir(templatesPath, projectPath)

// Instalar dependencias
childProcess.execSync('npx create-react-app . --template typescript', {
  cwd: projectPath
})
childProcess.execSync(
  'npm install @reduxjs/toolkit react-redux styled-components',
  { cwd: projectPath }
)

// Función para copiar directorios
function copyDir(src: string, dest: string): void {
  fs.mkdirSync(dest, { recursive: true })
  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}
