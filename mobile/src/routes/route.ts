export const apiRoutes = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
    },
    products: {
        list: '/products',
        listByCategory: (categoryId: string) => `/products/${categoryId}`,
    
    },
}