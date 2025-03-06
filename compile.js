const { exec } = require('child_process');
const fs = require('fs');

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const cCode = req.body.code;
    const filePath = '/tmp/temp.c'; // Temporary file storage

    fs.writeFileSync(filePath, cCode);

    exec(`gcc -S -o /tmp/temp.s ${filePath}`, (error, stdout, stderr) => {
        if (error) return res.status(500).json({ error: stderr });

        const assemblyCode = fs.readFileSync('/tmp/temp.s', 'utf-8');
        res.json({ assembly: assemblyCode });
    });
}

