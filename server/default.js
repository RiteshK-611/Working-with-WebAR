import { products } from './constants/product.js';
import Product from './models/productSchema.js';

const DefaultData = async () => {
    await Product.deleteMany({})
    await Product.insertMany(products);
    console.log('Data imported successfully')
}

export default DefaultData;