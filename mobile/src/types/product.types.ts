export interface Product {
    id: string;
    name: string;
    price: string;
    stock: 'In Stock' | 'Low Stock' | 'Out of Stock';
    category: string;
    description: string;
}
