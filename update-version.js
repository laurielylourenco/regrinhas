#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Função para incrementar a versão
function incrementVersion(version) {
  const parts = version.split('.')
  const patch = parseInt(parts[2]) + 1
  return `${parts[0]}.${parts[1]}.${patch}`
}

// Ler o vite.config.js
const configPath = path.join(__dirname, 'vite.config.js')
let configContent = fs.readFileSync(configPath, 'utf8')

// Extrair versão atual
const versionMatch = configContent.match(/version:\s*['"`]([^'"`]+)['"`]/)
if (!versionMatch) {
  console.error('Versão não encontrada no vite.config.js')
  process.exit(1)
}

const currentVersion = versionMatch[1]
const newVersion = incrementVersion(currentVersion)

console.log(`Atualizando versão de ${currentVersion} para ${newVersion}`)

// Atualizar a versão no arquivo
configContent = configContent.replace(/version:\s*['"`][^'"`]+['"`]/, `version: '${newVersion}'`)

// Salvar o arquivo atualizado
fs.writeFileSync(configPath, configContent)

console.log(`✅ Versão atualizada para ${newVersion}`)
console.log('📦 Execute "npm run build" para gerar a nova versão')
console.log('🚀 Execute "npm run preview" para testar localmente')
