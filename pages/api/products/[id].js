import nc from 'next-connect';
import Product from '../../../models/Products';
import db from '../../../utils/Database/db';

const handler = nc();

// send data through ids
handler.get(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
});

export default handler;
