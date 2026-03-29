import { ResponsiveBar } from "@nivo/bar";
import { DollarSign } from "lucide-react";
import { useGetList, useTranslate } from "ra-core";
import { memo, useMemo } from "react";

import { useConfigurationContext } from "../root/ConfigurationContext";
import type { Company, Deal } from "../types";

const DEFAULT_LOCALE = "en-US";

export const RevenueBySectorChart = memo(() => {
  const translate = useTranslate();
  const { companySectors, dealPipelineStatuses, currency } =
    useConfigurationContext();
  const acceptedLanguages = navigator
    ? navigator.languages || [navigator.language]
    : [DEFAULT_LOCALE];

  const { data: companies, isPending: isPendingCompanies } =
    useGetList<Company>("companies", {
      pagination: { perPage: 500, page: 1 },
    });

  const { data: deals, isPending: isPendingDeals } = useGetList<Deal>("deals", {
    pagination: { perPage: 500, page: 1 },
  });

  const chartData = useMemo(() => {
    if (!companies || !deals) return [];

    // Create a map of company_id to sector
    const companyToSector = companies.reduce(
      (acc, company) => {
        acc[company.id] = company.sector || "unknown";
        return acc;
      },
      {} as Record<string, string>,
    );

    // Aggregate revenue by sector
    const sectorRevenue = deals.reduce(
      (acc, deal) => {
        const sector = companyToSector[deal.company_id] || "unknown";
        if (!acc[sector]) {
          acc[sector] = { won: 0, pipeline: 0 };
        }
        if (dealPipelineStatuses.includes(deal.stage)) {
          acc[sector].won += deal.amount;
        } else if (deal.stage !== "lost") {
          acc[sector].pipeline += deal.amount;
        }
        return acc;
      },
      {} as Record<string, { won: number; pipeline: number }>,
    );

    return Object.entries(sectorRevenue)
      .map(([sector, revenue]) => ({
        sector:
          companySectors.find((s) => s.value === sector)?.label || sector,
        won: revenue.won,
        pipeline: revenue.pipeline,
      }))
      .sort((a, b) => b.won + b.pipeline - (a.won + a.pipeline))
      .slice(0, 6); // Top 6 sectors
  }, [companies, deals, companySectors, dealPipelineStatuses]);

  if (isPendingCompanies || isPendingDeals || chartData.length === 0)
    return null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-4">
        <div className="mr-3 flex">
          <DollarSign className="text-muted-foreground w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold text-muted-foreground">
          {translate("crm.dashboard.revenue_by_sector", {
            _: "Revenue by Sector",
          })}
        </h2>
      </div>
      <div className="h-[300px]">
        <ResponsiveBar
          data={chartData}
          indexBy="sector"
          keys={["won", "pipeline"]}
          colors={["#9D2235", "#B8A88A"]}
          margin={{ top: 10, right: 20, bottom: 50, left: 80 }}
          padding={0.3}
          layout="horizontal"
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          enableGridX={true}
          enableGridY={false}
          enableLabel={false}
          tooltip={({ id, value, indexValue }) => (
            <div className="p-2 bg-secondary rounded shadow inline-flex items-center gap-1 text-secondary-foreground">
              <strong>{indexValue}</strong>&nbsp;({id}):{" "}
              {value.toLocaleString(acceptedLanguages.at(0) ?? DEFAULT_LOCALE, {
                style: "currency",
                currency,
                maximumFractionDigits: 0,
              })}
            </div>
          )}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            format: (v: number) =>
              v >= 1000000
                ? `${(v / 1000000).toFixed(1)}M`
                : v >= 1000
                  ? `${(v / 1000).toFixed(0)}k`
                  : v.toString(),
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 50,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 12,
              itemTextColor: "var(--color-muted-foreground)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
});
