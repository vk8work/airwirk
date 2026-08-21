import { notFound } from "next/navigation";
import { GoalDetail } from "@/components/workspace/details/GoalDetail";
import { goalById, goals } from "@/data/demo";

export function generateStaticParams() {
  return goals.map((goal) => ({ id: goal.id }));
}

export default async function GoalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const goal = goalById(id);
  if (!goal) notFound();
  return <GoalDetail goal={goal} />;
}
