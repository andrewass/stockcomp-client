import { createFileRoute } from "@tanstack/react-router";
import SymbolDetailsPage from "../../pages/symboldetails/SymbolDetailsPage";
import { DefaultLayout } from "../../DefaultLayout";

export const Route = createFileRoute("/symbols/$symbol")({
  component: SymbolDetails,
});

function SymbolDetails() {
  const { symbol } = Route.useParams();

  return (
    <DefaultLayout>
      <SymbolDetailsPage symbol={symbol} />
    </DefaultLayout>
  );
}
