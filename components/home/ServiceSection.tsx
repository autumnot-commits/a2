import Link from "next/link";
import { ArrowRightIcon, serviceIcons } from "@/components/icons";
import services from "@/data/services.json";
import { Gallery } from "./Gallery";
import { SectionHeading } from "./SectionHeading";

export function ServiceSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-site">
        <SectionHeading title="이사 서비스" description="짐의 양과 상황에 맞는 이사를 고르세요." />
        <ul className="mt-10 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = serviceIcons[service.id];
            return (
              <li key={service.id} className="border-b border-r border-line">
                <Link href={service.href} className="group flex h-full flex-col p-7 transition-colors hover:bg-muted lg:p-8">
                  <span className="flex items-start justify-between">
                    {Icon && <Icon className="size-9 text-ink" />}
                    <ArrowRightIcon className="size-5 text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                  </span>
                  <span className="mt-12 text-xl font-bold text-ink">{service.title}</span>
                  <span className="mt-1 text-sm text-primary">{service.subtitle}</span>
                  <span className="mt-3 text-[15px] leading-relaxed text-ink-soft">{service.description}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Gallery />
      </div>
    </section>
  );
}
