import React, {useEffect, useState} from "react";
import operationSelect from "../../../icons/operationselect.svg";

const OperationDropDown = ({setOperationType}) => {

    const [selectedValue, setSelectedValue] = useState("BUY");

    useEffect(() => {
        setOperationType(selectedValue);
    }, [selectedValue]);

    return (
        <div id="operationDropDown">
            <div id="operationSelector">
                <span>Select operation : </span>
                <button id="operationSelectButton" type="button">{selectedValue}</button>
                <img id="operationSelectIcon" src={operationSelect}/>
            </div>
            <div id="operationList">
                <button type="button" onClick={() => setSelectedValue("BUY")}>BUY</button>
                <button type="button" onClick={() => setSelectedValue("SELL")}>SELL</button>
            </div>
        </div>
    )
}

export default OperationDropDown;
