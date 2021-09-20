import React, {useState} from "react";
import rightArrow from "../../../icons/right-arrow.svg";
import downArrow from "../../../icons/down-arrow.svg";
import InvestmentList from "./InvestmentList";

const Investments = ({investments}) => {

    const [renderInvestments, setRenderInvestments] = useState(false);
    const [currentIcon, setCurrentIcon] = useState(rightArrow);

    const toggleInvestments = () => {
        setCurrentIcon(currentIcon === rightArrow ? downArrow : rightArrow);
        setRenderInvestments(!renderInvestments)
    }

    return (
        <div>
            <div className="listToggle">
                <h3>Investments : </h3>
                <img src={currentIcon} className="currentIcon" onClick={toggleInvestments} alt="Current icon"/>
            </div>
            <InvestmentList investments={investments} renderInvestments={renderInvestments}/>
        </div>
    );
}

export default Investments;