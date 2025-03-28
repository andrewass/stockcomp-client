import {createFileRoute} from "@tanstack/react-router";
import {withDefaultLayout} from "../../DefaultLayout";
import SymbolsPage from "../../pages/symbols/SymbolsPage";

export const Route = createFileRoute("/symbols/")({
    component: Symbols,
});

function Symbols() {
    return withDefaultLayout(<SymbolsPage/>);
}
