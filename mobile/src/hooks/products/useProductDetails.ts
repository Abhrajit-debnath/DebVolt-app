import { useState, useEffect } from "react";
import { productService } from "@/services/productService/products";
import { Product } from "@/types";

export const useProductDetails = (id: string) => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProductById = async () => {
            if (!id) return; 
            setLoading(true);
            try {
                const response = await productService.getProductById(id);
                setProduct(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductById();
    }, [id]);

    return { loading, product };
}
