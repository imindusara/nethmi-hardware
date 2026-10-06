import { query, queryOne } from '../db/database.js';

export async function getAdminStats(req, res) {
  try {
    const productCountRes = await queryOne('SELECT COUNT(*) as count FROM products');
    const categoryCountRes = await queryOne('SELECT COUNT(*) as count FROM categories');
    const unreadMessagesRes = await queryOne('SELECT COUNT(*) as count FROM messages WHERE is_read = 0');
    const newQuotesRes = await queryOne("SELECT COUNT(*) as count FROM quotes WHERE status = 'New'");
    const outOfStockRes = await queryOne("SELECT COUNT(*) as count FROM products WHERE stock_status = 'Out of Stock'");
    const featuredRes = await queryOne('SELECT COUNT(*) as count FROM products WHERE is_featured = 1');

    const recentQuotes = await query('SELECT * FROM quotes ORDER BY id DESC LIMIT 5');
    const recentMessages = await query('SELECT * FROM messages ORDER BY id DESC LIMIT 5');

    const parsedQuotes = recentQuotes.map(q => ({
      ...q,
      items: JSON.parse(q.items || '[]')
    }));

    return res.json({
      success: true,
      stats: {
        totalProducts: productCountRes ? productCountRes.count : 0,
        totalCategories: categoryCountRes ? categoryCountRes.count : 0,
        unreadMessages: unreadMessagesRes ? unreadMessagesRes.count : 0,
        newQuotes: newQuotesRes ? newQuotesRes.count : 0,
        outOfStockCount: outOfStockRes ? outOfStockRes.count : 0,
        featuredCount: featuredRes ? featuredRes.count : 0
      },
      recentQuotes: parsedQuotes,
      recentMessages
    });
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching statistics' });
  }
}
