import { Center, Button } from "@mantine/core"
import { ForwardedRef, forwardRef, MouseEventHandler } from "react";

type CircleButtonProps = {
  icon: React.ElementType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const CircleButton = forwardRef<HTMLButtonElement, CircleButtonProps>( 
    ({ icon: Icon, onClick } : CircleButtonProps, ref : ForwardedRef<HTMLButtonElement>) => {

        return  (
            <Button ref={ref} onClick={onClick} variant="default" p={4} style={{borderRadius:'50%'}}>
                <Center>
                    <Icon/>
                </Center>
            </Button>
        );
});

export default CircleButton