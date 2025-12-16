const express = require('express');
const WebSocket = require('ws');
const pty = require('node-pty');
const http = require('http');
const path = require('path');
const os = require('os');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Store active sessions
const sessions = new Map();

wss.on('connection', (ws) => {
    let ptyProcess = null;
    let sessionId = null;

    ws.on('message', (message) => {
        const msg = JSON.parse(message);

        if (msg.type === 'start') {
            // Start a new shell/tool
            const shell = msg.command || 'bash'; // bash, gemini, etc.
            const cols = msg.cols || 80;
            const rows = msg.rows || 24;

            // Environment for better TUI support
            const env = Object.assign({}, process.env, {
                TERM: 'xterm-256color',
                COLORTERM: 'truecolor',
                LANG: 'en_US.UTF-8',
                PYTHONUNBUFFERED: '1'
            });

            try {
                ptyProcess = pty.spawn(shell, [], {
                    name: 'xterm-256color',
                    cols: cols,
                    rows: rows,
                    cwd: os.homedir(),
                    env: env
                });

                sessionId = Date.now().toString();
                sessions.set(sessionId, ptyProcess);

                console.log(`Started session ${sessionId}: ${shell}`);

                // Pipe PTY output to WebSocket
                ptyProcess.onData((data) => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({ type: 'output', data: data }));
                    }
                });

                ptyProcess.onExit((res) => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({ type: 'exit', code: res.exitCode }));
                    }
                    sessions.delete(sessionId);
                });

            } catch (e) {
                ws.send(JSON.stringify({ type: 'error', data: `Failed to spawn: ${e.message}` }));
            }

        } else if (msg.type === 'input' && ptyProcess) {
            // Send user input to PTY
            ptyProcess.write(msg.data);

        } else if (msg.type === 'resize' && ptyProcess) {
            // Handle mobile screen resizing (keyboard open/close)
            ptyProcess.resize(msg.cols, msg.rows);
        }
    });

    ws.on('close', () => {
        if (ptyProcess) {
            console.log(`Closing session ${sessionId}`);
            ptyProcess.kill();
            sessions.delete(sessionId);
        }
    });
});

const PORT = process.env.PORT || 7681;
server.listen(PORT, () => {
    console.log(`Mobile Terminal running at http://0.0.0.0:${PORT}`);
});
