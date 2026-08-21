import { notFound } from "next/navigation";
import { PersonDetail } from "@/components/workspace/details/PersonDetail";
import { people, personById } from "@/data/demo";

export function generateStaticParams() {
  return people.map((person) => ({ id: person.id }));
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const person = personById(id);
  if (!person) notFound();
  return <PersonDetail person={person} />;
}
