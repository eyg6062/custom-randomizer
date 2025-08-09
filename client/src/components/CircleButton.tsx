import { ActionIcon } from "@mantine/core"
import { ForwardedRef, forwardRef, MouseEventHandler } from "react";

type CircleButtonProps = {
  icon: React.ElementType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const CircleButton = forwardRef<HTMLButtonElement, CircleButtonProps>( 
    ({ icon: Icon, onClick } : CircleButtonProps, ref : ForwardedRef<HTMLButtonElement>) => {

        return  (
            <ActionIcon ref={ref} onClick={onClick} variant="default" size="lg" radius="xl">
                <Icon/>
            </ActionIcon>
        );
});

export default CircleButton