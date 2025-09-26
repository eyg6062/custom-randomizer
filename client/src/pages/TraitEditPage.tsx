import BasicEditSection from "../components/BasicEditSection";
import NumberEditSection from "../components/NumberEditSection";
import { useTraitEditPage } from "../hooks/useTraitEditPage";
import { BasicTrait, NumberTrait } from "../types/trait";
import { TraitType } from "../types/traitType";

export function TraitEditPage () {
    
    const {
        traitData,
        traitPageNode,
        isPending,
        error
    } = useTraitEditPage();
    

    if (!traitData) return null;

    const renderTraitSection = () => {
        switch (traitData.traitType) {
            case TraitType.Number:
                return <NumberEditSection trait={traitData as NumberTrait} />;
            case TraitType.Basic:
                return <BasicEditSection trait={traitData as BasicTrait}/>;
            default:
                return null;
        }
    }

    if (isPending) return <p>Loading...</p>;
    if (error) return <p>Error</p>

    return (
        <>
        {traitPageNode}

        {renderTraitSection()}

        </>
    )
}