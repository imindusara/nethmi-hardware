import { query, queryOne, run } from '../db/database.js';

export async function submitQuote(req, res) {
  try {
    const { name, phone, email, items, delivery_needed = 0, notes, _honeypot } = req.body;

    if (_honeypot) {
      return res.status(200).json({ success: true, message: 'Quote received' });
    }

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Your name and contact phone number are required' });
    }

    if (!items || (Array.isArray(items) && items.length === 0)) {
      return res.status(400).json({ success: false, message: 'Please add at least one item or material to the quote request' });
    }

    const itemsJson = typeof items === 'string' ? items : JSON.stringify(items);

    const result = await run(
      `INSERT INTO quotes (name, phone, email, items, delivery_needed, notes, status)
       VALUES (?, ?, ?, ?, ?, ?, 'New')`,
      [
        name.trim(),
        phone.trim(),
        email ? email.trim() : null,
        itemsJson,
        delivery_needed ? 1 : 0,
        notes ? notes.trim() : null
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'Your quote request has been submitted successfully! Our team will prepare your estimate and contact you.',
      quoteId: result.lastInsertRowid
    });
  } catch (error) {
    console.error('Error submitting quote:', error);
    return res.status(500).json({ success: false, message: 'Server error submitting quote request' });
  }
}

export async function adminGetQuotes(req, res) {
  try {
    const rows = await query('SELECT * FROM quotes ORDER BY id DESC');
    const quotes = rows.map(q => ({
      ...q,
      items: JSON.parse(q.items || '[]')
    }));
    return res.json({ success: true, data: quotes });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching quotes' });
  }
}

export async function adminUpdateQuoteStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['New', 'Contacted', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid quote status' });
    }

    await run('UPDATE quotes SET status = ? WHERE id = ?', [status, id]);
    return res.json({ success: true, message: 'Quote status updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error updating quote' });
  }
}

export async function adminDeleteQuote(req, res) {
  try {
    const { id } = req.params;
    await run('DELETE FROM quotes WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Quote deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error deleting quote' });
  }
}
