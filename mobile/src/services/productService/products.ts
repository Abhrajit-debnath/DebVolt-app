import apiClient from "@/api/apiClient";
import { apiRoutes } from "@/routes/route";
import { Product } from "@/types";

export const productService = {
    getProducts: async (category?: string): Promise<Product[]> => {

        try {
            const queryParams = category !== 'All' && category ? { category } : {};

            const response = await apiClient.get(apiRoutes.products.list, {
                params: queryParams
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching products from API:', error);
            throw error;
        }


    },
    getProductById: async (id: string): Promise<Product> => {

        try {
            const response = await apiClient.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            throw error;
        }

    }

}