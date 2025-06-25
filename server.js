const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Database setup
const db = new sqlite3.Database('./comments.db', (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to SQLite database');
        createTables();
    }
});

// Create tables
function createTables() {
    db.run(`CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        text TEXT NOT NULL,
        date TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error('Error creating comments table:', err);
        } else {
            console.log('Comments table ready');
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS replies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        comment_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        text TEXT NOT NULL,
        date TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (comment_id) REFERENCES comments (id) ON DELETE CASCADE
    )`, (err) => {
        if (err) {
            console.error('Error creating replies table:', err);
        } else {
            console.log('Replies table ready');
        }
    });
}

// API Routes

// Get all comments with replies
app.get('/api/comments', (req, res) => {
    const query = `
        SELECT 
            c.id, c.name, c.text, c.date, c.created_at,
            r.id as reply_id, r.name as reply_name, r.text as reply_text, r.date as reply_date
        FROM comments c
        LEFT JOIN replies r ON c.id = r.comment_id
        ORDER BY c.created_at DESC, r.created_at ASC
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching comments:', err);
            res.status(500).json({ error: 'Failed to fetch comments' });
            return;
        }
        
        // Group comments with their replies
        const commentsMap = new Map();
        
        rows.forEach(row => {
            if (!commentsMap.has(row.id)) {
                commentsMap.set(row.id, {
                    id: row.id,
                    name: row.name,
                    text: row.text,
                    date: row.date,
                    created_at: row.created_at,
                    replies: []
                });
            }
            
            if (row.reply_id) {
                commentsMap.get(row.id).replies.push({
                    id: row.reply_id,
                    name: row.reply_name,
                    text: row.reply_text,
                    date: row.reply_date
                });
            }
        });
        
        const comments = Array.from(commentsMap.values());
        res.json(comments);
    });
});

// Add new comment
app.post('/api/comments', (req, res) => {
    const { name, text } = req.body;
    
    if (!name || !text) {
        return res.status(400).json({ error: 'Name and text are required' });
    }
    
    const date = new Date().toLocaleString('ko-KR');
    
    db.run(
        'INSERT INTO comments (name, text, date) VALUES (?, ?, ?)',
        [name, text, date],
        function(err) {
            if (err) {
                console.error('Error adding comment:', err);
                res.status(500).json({ error: 'Failed to add comment' });
                return;
            }
            
            // Get the newly created comment
            db.get(
                'SELECT * FROM comments WHERE id = ?',
                [this.lastID],
                (err, comment) => {
                    if (err) {
                        res.status(500).json({ error: 'Failed to retrieve comment' });
                        return;
                    }
                    
                    comment.replies = [];
                    res.status(201).json(comment);
                }
            );
        }
    );
});

// Add reply to comment
app.post('/api/comments/:commentId/replies', (req, res) => {
    const { commentId } = req.params;
    const { name, text } = req.body;
    
    if (!name || !text) {
        return res.status(400).json({ error: 'Name and text are required' });
    }
    
    const date = new Date().toLocaleString('ko-KR');
    
    db.run(
        'INSERT INTO replies (comment_id, name, text, date) VALUES (?, ?, ?, ?)',
        [commentId, name, text, date],
        function(err) {
            if (err) {
                console.error('Error adding reply:', err);
                res.status(500).json({ error: 'Failed to add reply' });
                return;
            }
            
            // Get the newly created reply
            db.get(
                'SELECT * FROM replies WHERE id = ?',
                [this.lastID],
                (err, reply) => {
                    if (err) {
                        res.status(500).json({ error: 'Failed to retrieve reply' });
                        return;
                    }
                    
                    res.status(201).json(reply);
                }
            );
        }
    );
});

// Delete comment
app.delete('/api/comments/:commentId', (req, res) => {
    const { commentId } = req.params;
    
    db.run('DELETE FROM comments WHERE id = ?', [commentId], function(err) {
        if (err) {
            console.error('Error deleting comment:', err);
            res.status(500).json({ error: 'Failed to delete comment' });
            return;
        }
        
        if (this.changes === 0) {
            res.status(404).json({ error: 'Comment not found' });
            return;
        }
        
        res.json({ message: 'Comment deleted successfully' });
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('Database connection closed');
        }
        process.exit(0);
    });
}); 