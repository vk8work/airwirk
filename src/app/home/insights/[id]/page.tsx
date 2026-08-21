import { notFound } from "next/navigation";
import { InsightDetail } from "@/components/workspace/details/InsightDetail";
import { insightById, insights } from "@/data/demo";

export function generateStaticParams() {
  return insights.map((insight) => ({ id: insight.id }));
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const insight = insightById(id);
  if (!insight) notFound();
  return <InsightDetail insight={insight} />;
}
