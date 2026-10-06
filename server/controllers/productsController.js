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

export async function getProducts(req, res) {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      stock,
      featured,
      onOffer,
      sort = 'newest',
      page = 1,
      limit = 12
    } = req.query;

    let sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      sql += ` AND (p.name LIKE ? OR p.brand LIKE ? OR p.sku LIKE ? OR p.short_description LIKE ?)`;
      const term = `%${search.trim()}%`;
      params.push(term, term, term, term);
    }

    if (category) {
      sql += ` AND (c.slug = ? OR p.category_id = ?)`;
      params.push(category, category);
    }

    if (minPrice) {
      sql += ` AND p.price >= ?`;
      params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
      sql += ` AND p.price <= ?`;
      params.push(parseFloat(maxPrice));
    }

    if (stock) {
      if (stock === 'in_stock') {
        sql += ` AND p.stock_status = 'In Stock'`;
      } else if (stock === 'out_of_stock') {
        sql += ` AND p.stock_status = 'Out of Stock'`;
      }
    }

    if (featured === 'true' || featured === '1') {
      sql += ` AND p.is_featured = 1`;
    }

    if (onOffer === 'true' || onOffer === '1') {
      sql += ` AND p.is_on_offer = 1`;
    }

    // Sorting
    switch (sort) {
      case 'price-low':
        sql += ` ORDER BY COALESCE(p.offer_price, p.price) ASC`;
        break;
      case 'price-high':
        sql += ` ORDER BY COALESCE(p.offer_price, p.price) DESC`;
        break;
      case 'name-asc':
        sql += ` ORDER BY p.name ASC`;
        break;
      case 'name-desc':
        sql += ` ORDER BY p.name DESC`;
        break;
      case 'newest':
      default:
        sql += ` ORDER BY p.id DESC`;
        break;
    }

    const allMatching = await query(sql, params);
    const total = allMatching.length;
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 12;
    const offset = (pageNum - 1) * limitNum;
    const totalPages = Math.ceil(total / limitNum);

    const paginatedProducts = allMatching.slice(offset, offset + limitNum).map(p => ({
      ...p,
      specifications: JSON.parse(p.specifications || '{}'),
      images: JSON.parse(p.images || '[]')
    }));

    return res.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching products' });
  }
}

export async function getProductBySlug(req, res) {
  try {
    const { slug } = req.params;
    const product = await queryOne(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.slug = ?`,
      [slug]
    );

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const parsedProduct = {
      ...product,
      specifications: JSON.parse(product.specifications || '{}'),
      images: JSON.parse(product.images || '[]')
    };

    // Get related products from the same category
    let relatedProducts = [];
    if (product.category_id) {
      const related = await query(
        `SELECT p.*, c.name as category_name, c.slug as category_slug
         FROM products p
         LEFT JOIN categories c ON p.category_id = c.id
         WHERE p.category_id = ? AND p.id != ?
         ORDER BY p.is_featured DESC, p.id DESC
         LIMIT 4`,
        [product.category_id, product.id]
      );
      relatedProducts = related.map(r => ({
        ...r,
        specifications: JSON.parse(r.specifications || '{}'),
        images: JSON.parse(r.images || '[]')
      }));
    }

    return res.json({
      success: true,
      data: parsedProduct,
      related: relatedProducts
    });
  } catch (error) {
    console.error('Error fetching product detail:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching product details' });
  }
}

export async function adminGetProducts(req, res) {
  try {
    const rows = await query(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id DESC
    `);

    const products = rows.map(p => ({
      ...p,
      specifications: JSON.parse(p.specifications || '{}'),
      images: JSON.parse(p.images || '[]')
    }));

    return res.json({ success: true, data: products });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error fetching admin products' });
  }
}

export async function createProduct(req, res) {
  try {
    const {
      name,
      category_id,
      brand,
      sku,
      price,
      offer_price,
      stock_status = 'In Stock',
      short_description,
      description,
      specifications,
      is_featured = 0,
      is_on_offer = 0
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({ success: false, message: 'Product name and price are required' });
    }

    let slug = slugify(name);
    const existingSlug = await queryOne('SELECT id FROM products WHERE slug = ?', [slug]);
    if (existingSlug) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    // Handle uploaded images or existing image URLs
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(f => `/uploads/${f.filename}`);
    } else if (req.body.imageUrls) {
      try {
        images = typeof req.body.imageUrls === 'string' ? JSON.parse(req.body.imageUrls) : req.body.imageUrls;
      } catch (e) {
        images = [req.body.imageUrls];
      }
    }

    let specsObj = {};
    if (specifications) {
      try {
        specsObj = typeof specifications === 'string' ? JSON.parse(specifications) : specifications;
      } catch (e) {
        specsObj = {};
      }
    }

    const generatedSku = sku ? sku.trim() : `NH-${Date.now().toString().slice(-6)}`;

    const result = await run(
      `INSERT INTO products (
        name, slug, category_id, brand, sku, price, offer_price, stock_status,
        short_description, description, specifications, images, is_featured, is_on_offer
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name.trim(),
        slug,
        category_id ? parseInt(category_id) : null,
        brand ? brand.trim() : null,
        generatedSku,
        parseFloat(price),
        offer_price ? parseFloat(offer_price) : null,
        stock_status,
        short_description || null,
        description || null,
        JSON.stringify(specsObj),
        JSON.stringify(images),
        is_featured ? 1 : 0,
        is_on_offer ? 1 : 0
      ]
    );

    const newProduct = await queryOne('SELECT * FROM products WHERE id = ?', [result.lastInsertRowid]);
    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: {
        ...newProduct,
        specifications: JSON.parse(newProduct.specifications || '{}'),
        images: JSON.parse(newProduct.images || '[]')
      }
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ success: false, message: 'Server error creating product' });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const existing = await queryOne('SELECT * FROM products WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const {
      name,
      category_id,
      brand,
      sku,
      price,
      offer_price,
      stock_status,
      short_description,
      description,
      specifications,
      is_featured,
      is_on_offer
    } = req.body;

    let existingImages = JSON.parse(existing.images || '[]');
    if (req.body.existingImages) {
      try {
        existingImages = typeof req.body.existingImages === 'string' ? JSON.parse(req.body.existingImages) : req.body.existingImages;
      } catch (e) {}
    }

    if (req.files && req.files.length > 0) {
      const newUploads = req.files.map(f => `/uploads/${f.filename}`);
      existingImages = [...existingImages, ...newUploads];
    }

    let specsObj = JSON.parse(existing.specifications || '{}');
    if (specifications !== undefined) {
      try {
        specsObj = typeof specifications === 'string' ? JSON.parse(specifications) : specifications;
      } catch (e) {}
    }

    let newSlug = existing.slug;
    if (name && name !== existing.name) {
      newSlug = slugify(name);
      const duplicate = await queryOne('SELECT id FROM products WHERE slug = ? AND id != ?', [newSlug, id]);
      if (duplicate) {
        newSlug = `${newSlug}-${Date.now().toString().slice(-4)}`;
      }
    }

    await run(
      `UPDATE products SET
        name = ?,
        slug = ?,
        category_id = ?,
        brand = ?,
        sku = ?,
        price = ?,
        offer_price = ?,
        stock_status = ?,
        short_description = ?,
        description = ?,
        specifications = ?,
        images = ?,
        is_featured = ?,
        is_on_offer = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [
        name !== undefined ? name.trim() : existing.name,
        newSlug,
        category_id !== undefined ? (category_id ? parseInt(category_id) : null) : existing.category_id,
        brand !== undefined ? brand.trim() : existing.brand,
        sku !== undefined ? sku.trim() : existing.sku,
        price !== undefined ? parseFloat(price) : existing.price,
        offer_price !== undefined ? (offer_price ? parseFloat(offer_price) : null) : existing.offer_price,
        stock_status !== undefined ? stock_status : existing.stock_status,
        short_description !== undefined ? short_description : existing.short_description,
        description !== undefined ? description : existing.description,
        JSON.stringify(specsObj),
        JSON.stringify(existingImages),
        is_featured !== undefined ? (is_featured ? 1 : 0) : existing.is_featured,
        is_on_offer !== undefined ? (is_on_offer ? 1 : 0) : existing.is_on_offer,
        id
      ]
    );

    const updated = await queryOne('SELECT * FROM products WHERE id = ?', [id]);
    return res.json({
      success: true,
      message: 'Product updated successfully',
      data: {
        ...updated,
        specifications: JSON.parse(updated.specifications || '{}'),
        images: JSON.parse(updated.images || '[]')
      }
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ success: false, message: 'Server error updating product' });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const existing = await queryOne('SELECT id FROM products WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await run('DELETE FROM products WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ success: false, message: 'Server error deleting product' });
  }
}
