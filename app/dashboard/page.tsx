'use client'
import { Container, SimpleGrid } from "@mantine/core";
import { useEffect, useState } from "react"
import Header from "../components/Header"
import ProductCard from "../components/ProductCard"
import Loading from "../components/Loading"
import Error from "../components/Error"

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

type ApiErrorType = {
    message: string;
    name: string;
}

const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getProduct = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('https://fakestoreapi.com/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                const error: ApiErrorType = {
                    message: 'Failed to fetch products',
                    name: 'ApiError'
                };
                throw error;
            }

            const data = await response.json();
            setProducts(data);
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'message' in error) {
                setError(error.message as string);
            } else {
                setError('An error occurred');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <Container fluid mt={50}>
            <Header />
            {loading ? (
                <Loading />
            ) : error ? (
                <Error message={error} onRetry={getProduct} />
            ) : (
                <SimpleGrid cols={{ base: 1, md: 2, lg: 5 }}>
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            category={product.category}
                            image={product.image}
                        />
                    ))}
                </SimpleGrid>
            )}
        </Container>
    );
};

export default Dashboard;