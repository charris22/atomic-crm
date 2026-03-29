import { ResponsivePie } from "@nivo/pie";
import type { ComputedDatum } from "@nivo/pie";
import { Building2 } from "lucide-react";
import { useGetList, useTranslate } from "ra-core";
import { memo, useMemo } from "react";

import { useConfigurationContext } from "../root/ConfigurationContext";
import type { Company } from "../types";

type SectorData = {
  id: string;
  label: string;
  value: number;
};

export const CompaniesBySectorChart = memo(() => {
  const translate = useTranslate();
  const { companySectors } = useConfigurationContext();

  const { data, isPending } = useGetList<Company>("companies", {
    pagination: { perPage: 500, page: 1 },
  });

  const chartData = useMemo(() => {
    if (!data) return [];

    const sectorCounts = data.reduce(
      (acc, company) => {
        const sector = company.sector || "unknown";
        acc[sector] = (acc[sector] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(sectorCounts)
      .map(([sector, count]) => ({
        id: sector,
        label:
          companySectors.find((s) => s.value === sector)?.label || sector,
        value: count,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8); // Top 8 sectors
  }, [data, companySectors]);

  if (isPending || chartData.length === 0) return null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-4">
        <div className="mr-3 flex">
          <Building2 className="text-muted-foreground w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold text-muted-foreground">
          {translate("crm.dashboard.companies_by_sector", {
            _: "Companies by Sector",
          })}
        </h2>
      </div>
      <div className="h-[300px]">
        <ResponsivePie
          data={chartData}
          margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={["#9D2235", "#062E52", "#B8A88A", "#3D3D3D", "#C4A77D", "#7A1B2A", "#6B6B6B", "#D4C4A8"]}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="var(--color-muted-foreground)"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          tooltip={({ datum }: { datum: ComputedDatum<SectorData> }) => (
            <div className="p-2 bg-secondary rounded shadow inline-flex items-center gap-1 text-secondary-foreground">
              <strong>{datum.label}:</strong>&nbsp;{datum.value} companies
            </div>
          )}
        />
      </div>
    </div>
  );
});
