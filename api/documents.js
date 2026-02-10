// api/documents.js - Serverless Function for Document Management

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { method } = req;

    switch (method) {
        case 'GET':
            return handleGetDocuments(req, res);
        case 'POST':
            return handleCreateDocument(req, res);
        case 'PUT':
            return handleUpdateDocument(req, res);
        case 'DELETE':
            return handleDeleteDocument(req, res);
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}

function handleGetDocuments(req, res) {
    // TODO: Fetch documents from database
    console.log('[GET DOCUMENTS]');

    return res.status(200).json({
        success: false,
        message: 'Backend perlu dikonfigurasi',
        data: []
    });
}

function handleCreateDocument(req, res) {
    const { title, locker_id, staff_id } = req.body;

    // TODO: Create document in database
    console.log('[CREATE DOCUMENT]', { title, locker_id, staff_id });

    return res.status(201).json({
        success: false,
        message: 'Backend perlu dikonfigurasi',
        id: null
    });
}

function handleUpdateDocument(req, res) {
    const { id, ...updateData } = req.body;

    // TODO: Update document in database
    console.log('[UPDATE DOCUMENT]', { id, updateData });

    return res.status(200).json({
        success: false,
        message: 'Backend perlu dikonfigurasi'
    });
}

function handleDeleteDocument(req, res) {
    const { id } = req.body;

    // TODO: Delete document from database
    console.log('[DELETE DOCUMENT]', { id });

    return res.status(200).json({
        success: false,
        message: 'Backend perlu dikonfigurasi'
    });
}
