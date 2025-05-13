import { Button, Flex, Group, Title } from "@mantine/core"
import classes from "./Header.module.css"
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    return (
        <Flex wrap="wrap" justify="space-between" align="center" h={50} bg="#fff" className={classes.Header}>
            <Title order={1}>E-Store Dashboard</Title>
            <Group gap="md">
                <Button onClick={() => router.push('/login')} variant="light">Login</Button>
            </Group>
        </Flex>
    )
}

export default Header;
