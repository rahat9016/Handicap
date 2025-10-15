import { OverviewCards } from "./OverviewCards";
import { IAnalyticsSummary } from "./types/interface";

export default function AnalyticsCardSection({
  analyticsData,
}: {
  analyticsData: IAnalyticsSummary | undefined;
}) {
  return <OverviewCards data={analyticsData?.overview} />;
}
