import { query, queryOne, run } from '../db/database.js';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export async function getCategories(req, res) {
  try {
    const categories = await query(`
      SELECT c.*, COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id
      GROUP BY c.id
      ORDER BY c.name ASC
    `);
    return res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching categories' });
  }
}

export async function getCategoryBySlug(req, res) {
  try {
    const { slug } = req.params;
    const category = await queryOne('SELECT * FROM categories WHERE slug = ?', [slug]);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    return res.json({ success: true, data: category });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export async function createCategory(req, res) {
  try {
    const { name, description, icon } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    let slug = slugify(name);
    const existing = await queryOne('SELECT id FROM categories WHERE slug = ?', [slug]);
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    let image = req.body.image || null;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const result = await run(
      'INSERT INTO categories (name, slug, description, image, icon) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), slug, description || null, image, icon || 'Folder']
    );

    const created = await queryOne('SELECT * FROM categories WHERE id = ?', [result.lastInsertRowid]);
    return res.status(201).json({ success: true, message: 'Category created successfully', data: created });
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({ success: false, message: 'Server error creating category' });
  }
}

export async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const existing = await queryOne('SELECT * FROM categories WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const { name, description, icon } = req.body;
    let image = existing.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (req.body.image !== undefined) {
      image = req.body.image;
    }

    let slug = existing.slug;
    if (name && name !== existing.name) {
      slug = slugify(name);
      const duplicate = await queryOne('SELECT id FROM categories WHERE slug = ? AND id != ?', [slug, id]);
      if (duplicate) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }
    }

    await run(
      'UPDATE categories SET name = ?, slug = ?, description = ?, image = ?, icon = ? WHERE id = ?',
      [
        name !== undefined ? name.trim() : existing.name,
        slug,
        description !== undefined ? description : existing.description,
        image,
        icon !== undefined ? icon : existing.icon,
        id
      ]
    );

    const updated = await queryOne('SELECT * FROM categories WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Category updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating category:', error);
    return res.status(500).json({ success: false, message: 'Server error updating category' });
  }
}

export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const existing = await queryOne('SELECT id FROM categories WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    await run('DELETE FROM categories WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error deleting category' });
  }
}
