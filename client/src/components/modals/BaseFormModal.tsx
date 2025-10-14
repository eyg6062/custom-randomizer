import { Button, Modal } from "@mantine/core";
import { ReactNode } from "react";

interface BaseFormModalProps {
    opened: boolean;
    close: () => void;
    title: string;
    submitFn: () => Promise<void>;
    children: ReactNode;
    reset?: () => void;
    submitDisabled?: boolean;
}

export default function BaseFormModal({opened, close, title, submitFn, children, reset, submitDisabled}: BaseFormModalProps) {
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await submitFn();
        close();
    }
    
    return (
        <Modal opened={opened} onClose={close} onExitTransitionEnd={reset} title={title} centered>
            <form onSubmit={onSubmit}>
                {children}
                <Button type="submit" variant="default" disabled={submitDisabled}>
                    Submit
                </Button>
            </form>
        </Modal>
    )
}