import React, {useContext} from "react";
import {ReferenceContext} from "../../ReferenceContextProvider";

const SymbolDetail = () => {

    const {selectedSymbol} = useContext(ReferenceContext);

    return(
        <p>{selectedSymbol}
        </p>
    )
}

export default SymbolDetail;