import { createFileRoute } from "@tanstack/react-router";
import { DefaultLayout } from "../../DefaultLayout";
import SymbolPage from "../../pages/symbol/SymbolPage";

export const Route = createFileRoute("/symbols/$symbol")({
  component: SymbolDetails,
});

function SymbolDetails() {
  const { symbol } = Route.useParams();

  return (
    <DefaultLayout>
      <SymbolPage symbol={symbol} />
    </DefaultLayout>
  );
}
