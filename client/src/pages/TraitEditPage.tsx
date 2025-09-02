import BasicEditSection from "../components/BasicEditSection";
import NumberEditSection from "../components/NumberEditSection";
import { useTraitEditPage } from "../hooks/useTraitEditPage";
import { NumberTrait } from "../types/trait";
import { TraitType } from "../types/traitType";

export function TraitEditPage () {
    
    const {
        traitData,
        //setTraitData,
        traitPageNode
    } = useTraitEditPage();
    
    
    if (!traitData) return null;

    const renderTraitSection = () => {
        switch (traitData.traitType) {
            case TraitType.Number:
                return <NumberEditSection trait={traitData as NumberTrait} />;
            case TraitType.Basic:
                return <BasicEditSection />;
            default:
                return null;
        }
    }

    return (
        <>
        {traitPageNode}

        {renderTraitSection()}

        </>
    )
}