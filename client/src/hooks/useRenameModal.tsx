import { useModal } from "./useModal";
import { RandomizerCardProps } from "../types/randomizer";
import RenameModal from "../components/RenameModal";

export function useRenameModal() {
    const modal = useModal<RandomizerCardProps>();

    const modalNode = (handleSubmit: (event: React.FormEvent<HTMLFormElement>, text: string) => Promise<void>) => {
        return (
            <RenameModal
                randProps={modal.data}
                opened={modal.opened}
                close={modal.close}
                handleSubmit={handleSubmit}
            />
        );
    }

    return {...modal, modalNode}
}