// server.js - Simple Node.js Server for Local Development
// This file is optional for local development
// For Vercel deployment, use serverless functions in /api folder

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Simple logger middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Login endpoint (placeholder)
app.post('/api/login', (req, res) => {
    const { username, password, role } = req.body;

    // TODO: Implement actual authentication with database
    console.log(`Login attempt: ${username} as ${role}`);

    // Demo response
    res.json({
        success: false,
        message: 'Backend API perlu dikonfigurasi dengan database connection',
        error: 'Please configure database and implement authentication'
    });
});

// API endpoint template
app.get('/api/documents', (req, res) => {
    // TODO: Fetch documents from database
    res.json({
        data: [],
        message: 'Backend API tidak dikonfigurasi'
    });
});

// Catch-all for serving static files
app.get('*', (req, res) => {
    // Serve index.html untuk root path
    if (req.path === '/') {
        res.sendFile(path.join(__dirname, 'index.html'));
    } else if (req.path.endsWith('.html')) {
        res.sendFile(path.join(__dirname, req.path));
    } else {
        // 404
        res.status(404).json({
            error: 'Not found',
            path: req.path
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   Sistem Arsip Dokumen - Server        ║
╠════════════════════════════════════════╣
║ Status  : Running                      ║
║ Port    : ${PORT}                             ║
║ Env     : ${process.env.NODE_ENV || 'development'}       ║
║ URL     : http://localhost:${PORT}${PORT === 3000 ? '' : PORT} ║
╚════════════════════════════════════════╝
    `);
    console.log(`Open http://localhost:${PORT} di browser Anda\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

// Export for Vercel serverless
module.exports = app;
