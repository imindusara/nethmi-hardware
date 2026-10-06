import { query, queryOne, run } from '../db/database.js';

export async function getTestimonials(req, res) {
  try {
    const testimonials = await query('SELECT * FROM testimonials ORDER BY id DESC');
    return res.json({ success: true, data: testimonials });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error fetching testimonials' });
  }
}

export async function adminCreateTestimonial(req, res) {
  try {
    const { name, role, text, rating = 5 } = req.body;
    if (!name || !text) {
      return res.status(400).json({ success: false, message: 'Name and testimonial text are required' });
    }

    const result = await run(
      'INSERT INTO testimonials (name, role, text, rating) VALUES (?, ?, ?, ?)',
      [name.trim(), role ? role.trim() : null, text.trim(), parseInt(rating) || 5]
    );

    const created = await queryOne('SELECT * FROM testimonials WHERE id = ?', [result.lastInsertRowid]);
    return res.status(201).json({ success: true, message: 'Testimonial added', data: created });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error adding testimonial' });
  }
}

export async function adminDeleteTestimonial(req, res) {
  try {
    const { id } = req.params;
    await run('DELETE FROM testimonials WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error deleting testimonial' });
  }
}
