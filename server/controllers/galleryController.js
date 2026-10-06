import { query, queryOne, run } from '../db/database.js';

export async function getGallery(req, res) {
  try {
    const { category } = req.query;
    let sql = 'SELECT * FROM gallery';
    const params = [];
    if (category && category !== 'All') {
      sql += ' WHERE category = ?';
      params.push(category);
    }
    sql += ' ORDER BY id DESC';

    const items = await query(sql, params);
    return res.json({ success: true, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error fetching gallery' });
  }
}

export async function adminAddGalleryImage(req, res) {
  try {
    const { caption, category = 'Store' } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    if (!image) {
      return res.status(400).json({ success: false, message: 'Image file or image URL is required' });
    }

    const result = await run(
      'INSERT INTO gallery (image, caption, category) VALUES (?, ?, ?)',
      [image, caption || '', category]
    );

    const created = await queryOne('SELECT * FROM gallery WHERE id = ?', [result.lastInsertRowid]);
    return res.status(201).json({ success: true, message: 'Gallery item added', data: created });
  } catch (error) {
    console.error('Error adding gallery image:', error);
    return res.status(500).json({ success: false, message: 'Server error adding gallery item' });
  }
}

export async function adminDeleteGalleryImage(req, res) {
  try {
    const { id } = req.params;
    await run('DELETE FROM gallery WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Gallery item deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error deleting gallery item' });
  }
}
