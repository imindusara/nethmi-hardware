import { query, run } from '../db/database.js';

export async function getSettings(req, res) {
  try {
    const rows = await query('SELECT key, value FROM settings');
    const settings = {};
    rows.forEach(r => {
      settings[r.key] = r.value;
    });
    return res.json({ success: true, data: settings });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error fetching settings' });
  }
}

export async function updateSettings(req, res) {
  try {
    const updates = req.body;
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid settings payload' });
    }

    for (const [key, value] of Object.entries(updates)) {
      const existing = await query('SELECT key FROM settings WHERE key = ?', [key]);
      if (existing.length > 0) {
        await run('UPDATE settings SET value = ? WHERE key = ?', [value !== undefined ? String(value) : '', key]);
      } else {
        await run('INSERT INTO settings (key, value) VALUES (?, ?)', [key, value !== undefined ? String(value) : '']);
      }
    }

    const rows = await query('SELECT key, value FROM settings');
    const settings = {};
    rows.forEach(r => {
      settings[r.key] = r.value;
    });

    return res.json({ success: true, message: 'Settings saved successfully', data: settings });
  } catch (error) {
    console.error('Error saving settings:', error);
    return res.status(500).json({ success: false, message: 'Server error saving settings' });
  }
}
