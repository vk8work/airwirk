import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/workspace/details/ProjectDetail";
import { projectById, projects } from "@/data/demo";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectById(id);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
