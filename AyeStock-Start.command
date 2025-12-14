#!/bin/bash

# Definir rutas base
BASE_DIR="$HOME/Documents/Projects/Code/AyeStock"
BACKEND_DIR="$BASE_DIR/backend"
FRONTEND_DIR="$BASE_DIR/frontend"

echo "Iniciando AyeStock"

# --- 1. Base de Datos ---
echo "🗄️  Lanzando MongoDB en nueva terminal..."
osascript -e "tell application \"Terminal\" to do script \"brew services start mongodb-community\""

# --- 2. Backend ---
echo "🐍 Lanzando Backend en nueva terminal..."
osascript -e "tell application \"Terminal\" to do script \"cd '$BACKEND_DIR' && source .venv/bin/activate && python -m uvicorn app.main:app --reload --port 8000\""

# --- 3. Frontend ---
echo "🎨 Lanzando Frontend en nueva terminal..."
osascript -e "tell application \"Terminal\" to do script \"cd '$FRONTEND_DIR' && pnpm dev\""

# --- 4. Abrir Navegador ---
echo "Servicios arrancando (15s)..."
sleep 15

# Abre la documentación del API y el Frontend
open "http://localhost:8000/docs"
open "http://localhost:3000"

echo "¡AyeStock iniciado!"