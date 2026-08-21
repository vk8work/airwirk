import { notFound } from "next/navigation";
import { NowDetail } from "@/components/workspace/details/NowDetail";
import { attentionById, attentionNow } from "@/data/demo";

export function generateStaticParams() {
  return attentionNow.map((item) => ({ id: item.id }));
}

export default async function NowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = attentionById(id);
  if (!item) notFound();
  return <NowDetail item={item} />;
}
