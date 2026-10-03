import Link from "next/link";
import { menu } from "@/config/menu";
import { footerLinks, site } from "@/config/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  const { company } = site;
  const businessInfo = [
    ["상호", company.legalName],
    ["대표", company.ceo],
    ["사업자등록번호", company.businessNumber],
    ["허가번호", company.licenseNumber],
    ["주소", company.address],
    ["이메일", company.email],
    ["개인정보 보호책임자", company.privacyOfficer],
  ];

  return (
    <footer className="mt-auto border-t border-line bg-white">
      <div className="container-site grid gap-10 py-12 lg:grid-cols-[1fr_auto]">
        <div>
          <Logo />
          <nav aria-label="하단 메뉴" className="mt-6">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
              {menu.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="lg:text-right">
          <p className="text-sm text-ink-soft">전화 상담</p>
          <a href={site.phoneHref} className="mt-1 block text-2xl font-bold tabular-nums tracking-tight text-ink">
            {site.phone}
          </a>
          <p className="mt-1 text-sm text-ink-soft">
            평일 {site.hours.weekday}, 주말·공휴일 {site.hours.weekend}
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-4 py-6 text-[13px] text-ink-soft lg:flex-row lg:items-start lg:justify-between">
          <dl className="flex max-w-4xl flex-wrap gap-x-5 gap-y-1">
            {businessInfo.map(([label, value]) => (
              <div key={label} className="flex gap-1.5">
                <dt>{label}</dt>
                <dd className="text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <ul className="flex shrink-0 gap-5">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={link.href === "/privacy" ? "font-semibold text-ink" : "hover:text-ink"}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="container-site pb-8 text-xs text-ink-soft">© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
