const fs = require('fs')
const path = require('path')
const childProcess = require('child_process')

const projectName = process.argv[2]
const projectPath = path.join(process.cwd(), projectName)
const templatesPath = path.join(__dirname, 'templates')

// Crear directorio del proyecto
fs.mkdirSync(projectPath)

// Instalar Yarn
childProcess.execSync('npm install -g yarn', { cwd: projectPath })

// Crear el proyecto con Vite y TypeScript
childProcess.execSync('yarn create vite . --template react-ts', {
    cwd: projectPath,
    stdio: 'inherit'
})

// Sobrescribir el archivo App.tsx con el contenido de la plantilla
const appTemplatePath = path.join(templatesPath, 'src', 'App.tsx')
const appProjectPath = path.join(projectPath, 'src', 'App.tsx')
fs.copyFileSync(appTemplatePath, appProjectPath)


//Copiar los templates al directorio del proyecto
copyDir(templatesPath, projectPath)

// Instalar dependencias
childProcess.execSync(
    'yarn add @reduxjs/toolkit react-redux styled-components',
    { cwd: projectPath }
)
childProcess.execSync('yarn add --dev @types/styled-components', {
    cwd: projectPath
})

// Instalar dependencias para ESLint y Standard
childProcess.execSync(
    'yarn add --save-dev eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-standard',
    { cwd: projectPath }
)

// Función para copiar directorios
function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true })
    const entries = fs.readdirSync(src, { withFileTypes: true })

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name)
        const destPath = path.join(dest, entry.name)

        // Evitamos copiar la plantilla de App.tsx que ya hemos copiado
        if (entry.name !== 'App.tsx') {
            if (entry.isDirectory()) {
                copyDir(srcPath, destPath)
            } else {
                fs.copyFileSync(srcPath, destPath)
            }
        }
    }
}
