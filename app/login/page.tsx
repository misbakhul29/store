'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Text, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { signIn } from 'next-auth/react';

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

    const handleSubmit = async (values: { email: string; password: string }) => {
        setIsLoading(true);
        try {
            const loginResponse = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            });

            const loginData = await loginResponse.json();

            if (loginData.status === 'success') {
                const response = await signIn('credentials', {
                    email: values.email,
                    password: values.password,
                    redirect: false,
                });

                if (response?.ok) {

                    router.push('/dashboard');
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
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
