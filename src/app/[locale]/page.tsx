import type { Metadata } from "next";
import { getExperience } from "@/content";
import { getMessages } from "@/i18n/get-messages";
import { buildMetadata, personJsonLd } from "@/lib/seo";
import { localePath } from "@/i18n/config";
import { Hero } from "@/components/home/hero";
import { FeaturedWork } from "@/components/home/featured-work";
import { ExperienceList } from "@/components/home/experience-list";
import { ContactSection } from "@/components/contact/contact-section";
import { ArrowLink } from "@/components/ui/links";
import { SectionHead } from "@/components/ui/section-head";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, m } = await getMessages();
  return buildMetadata({
    locale,
    path: "/",
    title: m.meta.home.title,
    description: m.meta.home.description,
    absoluteTitle: true,
  });
}

export default async function HomePage() {
  const { locale, m } = await getMessages();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)) }}
      />
      <Hero />
      <FeaturedWork />
      <section id="experience" aria-labelledby="experience-title" className="page-container pb-section">
        <SectionHead
          id="experience-title"
          title={m.home.experience}
          action={<ArrowLink href={localePath(locale, "/about")}>{m.common.moreAboutMe}</ArrowLink>}
        />
        <ExperienceList items={getExperience()} locale={locale} m={m} />
      </section>
      <ContactSection />
    </>
  );
}
