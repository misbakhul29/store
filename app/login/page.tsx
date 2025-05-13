'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Text, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value: string | unknown[]) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
        },
    });

    const handleSubmit = () => {
        setIsLoading(true);
    };

    return (
        <Container size="xs" py="xl">
            <Paper radius="md" p="xl" withBorder>
                <Title order={2} ta="center" mt="md" mb={50}>
                    Login
                </Title>

                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        name="Email"
                        label="Email"
                        placeholder="Email"
                        size="md"
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        name="Password"
                        label="Password"
                        placeholder="Password"
                        mt="md"
                        size="md"
                        {...form.getInputProps('password')}
                    />
                    <Button fullWidth mt="xl" size="md" type="submit" loading={isLoading}>
                        Login
                    </Button>
                </form>

                <Text ta="center" mt="md">
                    "Don't have an account?"{' '}
                    <Anchor component="button" type="button" fw={700} onClick={() => router.push('/register')}>
                        Register
                    </Anchor>
                </Text>
            </Paper>
        </Container>
    );
}
