import {createFileRoute} from "@tanstack/react-router";
import {withDefaultLayout} from "../../DefaultLayout";
import SymbolDetailsPage from "../../pages/symboldetails/SymbolDetailsPage";

export const Route = createFileRoute("/symbols/$symbol")({
    component: SymbolDetails
});

function SymbolDetails() {

    const {symbol} = Route.useParams();

    return withDefaultLayout(<SymbolDetailsPage symbol={symbol}/>);
}
