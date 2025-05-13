import { Card, Image, Text, Badge, Button, Stack } from "@mantine/core";
import classes from "./ProductCard.module.css";
import NextImage from "next/image";

interface ProductCardProps {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
}

const ProductCard = ({ title, price, category, image }: ProductCardProps) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.card}>
            <Card.Section>
                <Image
                    component={NextImage}
                    src={image}
                    width={160}
                    height={160}
                    alt={title}
                />
            </Card.Section>

            <Stack mt="md" mb="xs">
                <Text truncate="end">{title}</Text>
                <Badge>
                    {category}
                </Badge>
                <Text>
                    ${price.toFixed(2)}
                </Text>
            </Stack>

            <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
            >
                Add to Cart
            </Button>
        </Card>
    );
};

export default ProductCard; 