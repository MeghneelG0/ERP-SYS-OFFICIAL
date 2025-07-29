# Coolify Configuration for ERP System

# This file contains deployment instructions for Coolify

# Project Structure:

# - Frontend (Next.js): apps/web

# - Backend (NestJS): apps/server

# - Database (Prisma): packages/db

# Deployment Strategy:

# Deploy as two separate services in Coolify:

# 1. Backend API Service

# 2. Frontend Web Service

# Service 1: Backend API

# - Build Context: Root directory

# - Dockerfile: apps/server/Dockerfile

# - Port: 3001

# - Health Check: /health or /api/health

# Service 2: Frontend Web

# - Build Context: Root directory

# - Dockerfile: apps/web/Dockerfile

# - Port: 3000

# - Depends on: Backend API service

# Environment Variables Required:

# See .env.coolify file for complete list
