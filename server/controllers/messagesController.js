import { query, queryOne, run } from '../db/database.js';

export async function submitMessage(req, res) {
  try {
    const { name, phone, email, message, _honeypot } = req.body;

    // Spam honeypot trap
    if (_honeypot) {
      return res.status(200).json({ success: true, message: 'Message received' });
    }

    if (!name || !message) {
      return res.status(400).json({ success: false, message: 'Name and message are required' });
    }

    if (!phone && !email) {
      return res.status(400).json({ success: false, message: 'Please provide either a phone number or email address' });
    }

    const result = await run(
      'INSERT INTO messages (name, phone, email, message, is_read) VALUES (?, ?, ?, ?, 0)',
      [name.trim(), phone ? phone.trim() : null, email ? email.trim() : null, message.trim()]
    );

    return res.status(201).json({
      success: true,
      message: 'Thank you for contacting Nethmi Hardware! We will get back to you shortly.',
      id: result.lastInsertRowid
    });
  } catch (error) {
    console.error('Error submitting message:', error);
    return res.status(500).json({ success: false, message: 'Failed to send message. Please try again or WhatsApp us directly.' });
  }
}

export async function adminGetMessages(req, res) {
  try {
    const messages = await query('SELECT * FROM messages ORDER BY is_read ASC, id DESC');
    return res.json({ success: true, data: messages });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error fetching messages' });
  }
}

export async function adminToggleMessageRead(req, res) {
  try {
    const { id } = req.params;
    const { is_read } = req.body;

    const existing = await queryOne('SELECT * FROM messages WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    await run('UPDATE messages SET is_read = ? WHERE id = ?', [is_read ? 1 : 0, id]);
    return res.json({ success: true, message: 'Message status updated' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error updating message' });
  }
}

export async function adminDeleteMessage(req, res) {
  try {
    const { id } = req.params;
    await run('DELETE FROM messages WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error deleting message' });
  }
}
