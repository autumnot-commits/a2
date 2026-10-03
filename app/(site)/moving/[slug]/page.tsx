import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubPageRenderer } from "@/components/subpage/SubPageRenderer";
import { movingPages } from "@/data/pages";

// 데이터에 없는 주소는 404
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(movingPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/moving/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const data = movingPages[slug];
  if (!data) return {};
  return {
    title: data.title,
    description: `${data.intro[0]} ${data.intro[1]}`,
    alternates: { canonical: `/moving/${slug}` },
  };
}

export default async function MovingPage({ params }: PageProps<"/moving/[slug]">) {
  const { slug } = await params;
  const data = movingPages[slug];
  if (!data) notFound();
  return <SubPageRenderer data={data} />;
}
