import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getKidById } from "@/_data/kids";
import { KidProfile } from "@/components/kids/KidProfile";
import { AppShell } from "@/components/shared/AppShell";

export async function generateMetadata({
  params,
}: PageProps<"/kids/[id]">): Promise<Metadata> {
  const { id } = await params;
  const kid = getKidById(id);

  return {
    title: kid ? `${kid.name} · OpenDayCare` : "Niño · OpenDayCare",
  };
}

export default async function KidProfilePage({
  params,
}: PageProps<"/kids/[id]">) {
  const { id } = await params;
  const kid = getKidById(id);

  if (!kid) notFound();

  return (
    <AppShell>
      <KidProfile kid={kid} />
    </AppShell>
  );
}
