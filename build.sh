#!/bin/bash

# Script de build para Vercel
echo "🚀 Iniciando build para Vercel..."

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Verificar que las dependencias se instalaron correctamente
if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    exit 1
fi

# Ejecutar type check
echo "🔍 Ejecutando type check..."
npm run type-check

# Construir la aplicación
echo "🏗️ Construyendo la aplicación..."
npm run build-only

# Verificar que el build fue exitoso
if [ $? -ne 0 ]; then
    echo "❌ Error en el build"
    exit 1
fi

# Verificar que el directorio dist existe y tiene contenido
if [ ! -d "dist" ]; then
    echo "❌ El directorio dist no existe"
    exit 1
fi

echo "✅ Build completado exitosamente!"
echo "📁 Contenido del directorio dist:"
ls -la dist/

echo "🎉 ¡Listo para deploy!" 