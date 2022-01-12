import React, {useState} from "react";

export const SymbolContext = React.createContext();

const SymbolProvider = (props) => {
    const [selectedSymbol , setSelectedSymbol] = useState(undefined);

    return(
        <SymbolContext.Provider value={{selectedSymbol, setSelectedSymbol}}>
            {props.children}
        </SymbolContext.Provider>
    );
}

export default SymbolProvider;