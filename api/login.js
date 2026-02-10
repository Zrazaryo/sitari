// api/login.js - Serverless Function for Authentication
// Deploy to Vercel as serverless function

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed',
            message: 'Only POST requests are allowed'
        });
    }

    const { username, password, role } = req.body;

    // Validation
    if (!username || !password) {
        return res.status(400).json({
            error: 'Invalid request',
            message: 'Username and password are required'
        });
    }

    // TODO: Implement database lookup
    // 1. Connect to MySQL database
    // 2. Query user by username
    // 3. Verify password hash
    // 4. Generate JWT token
    // 5. Return success response

    console.log(`[LOGIN] Attempt from ${username} as ${role}`);

    // Demo response - TODO: Replace with actual authentication
    return res.status(200).json({
        success: false,
        message: 'Backend API perlu dikonfigurasi',
        note: 'Implementasikan database connection dan password verification',
        timestamp: new Date().toISOString()
    });

    /*
    EXAMPLE IMPLEMENTATION:
    ========================
    
    const mysql = require('mysql2/promise');

    try {
        const connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASS,
            database: process.env.DATABASE_NAME
        });

        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                error: 'Invalid credentials',
                message: 'Username atau password salah'
            });
        }

        const user = rows[0];
        
        // Verify password (use bcrypt in production)
        const validPassword = await bcrypt.compare(password, user.password_hash);
        
        if (!validPassword) {
            return res.status(401).json({
                error: 'Invalid credentials',
                message: 'Username atau password salah'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                user_id: user.id,
                username: user.username,
                role: user.role
            },
            process.env.SESSION_SECRET || 'your_secret_key',
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            success: true,
            message: 'Login berhasil',
            token: token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        console.error('[LOGIN ERROR]', error);
        return res.status(500).json({
            error: 'Database error',
            message: error.message
        });
    }
    */
}
