import { useState, useEffect } from "react";
import { productService } from "@/services/productService/products";
import { Product } from "@/types";

export const useProducts = (category?: string) => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await productService.getProducts(category);
                setProducts(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category]);

    return { loading, products };
}
