import { notFound } from "next/navigation";
import { NextDetail } from "@/components/workspace/details/NextDetail";
import { upcomingById, upcomingNext } from "@/data/demo";

export function generateStaticParams() {
  return upcomingNext.map((item) => ({ id: item.id }));
}

export default async function NextPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = upcomingById(id);
  if (!item) notFound();
  return <NextDetail item={item} />;
}
