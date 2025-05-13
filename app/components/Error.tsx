import { Button } from "@mantine/core";

interface ErrorProps {
    message?: string;
    onRetry?: () => void;
}

const Error = ({ message = "Something went wrong", onRetry }: ErrorProps) => {
    return (
        <div>
            <p>{message}</p>
            {onRetry && (
                <Button onClick={onRetry}>
                    Try Again
                </Button>
            )}
        </div>
    );
};

export default Error; 