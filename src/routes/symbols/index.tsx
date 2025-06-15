import { createFileRoute } from "@tanstack/react-router";
import { DefaultLayout } from "../../DefaultLayout";
import SymbolsPage from "../../pages/symbols/SymbolsPage";

export const Route = createFileRoute("/symbols/")({
  component: Symbols,
});

function Symbols() {
  return (
    <DefaultLayout>
      <SymbolsPage />
    </DefaultLayout>
  );
}
