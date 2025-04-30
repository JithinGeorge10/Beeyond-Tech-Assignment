export const fetchProductsFromAPI = () => {
    return (async () => {
        const response = await fetch(`${import.meta.env.VITE_FAKE_API_URL}/products`);
        return response;
    })();
}
