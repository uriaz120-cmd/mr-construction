import { prisma } from "./db";
import { COMPANY_INFO } from "./constants";
import { SiteSettingsMap } from "./types";

export async function getSiteSettings(): Promise<SiteSettingsMap> {
  try {
    const settings = await prisma.siteSetting.findMany();
    const map: SiteSettingsMap = {
      company_name: COMPANY_INFO.name,
      owner_name: COMPANY_INFO.owner,
      owner_role: COMPANY_INFO.role,
      office_address: COMPANY_INFO.address,
      phone: COMPANY_INFO.phone,
      whatsapp: COMPANY_INFO.whatsapp,
      email: COMPANY_INFO.email,
      working_hours: COMPANY_INFO.workingHours,
      google_maps_embed: COMPANY_INFO.mapEmbedUrl,
      hero_badge: "Leading Infrastructure & Civil Contractor in Pakistan",
      hero_title: "Building Roads. Building Infrastructure. Building Pakistan.",
      hero_subtitle: "MR. Construction provides professional road, highway, building, civil and demolition services across Pakistan.",
      hero_cta_primary: "View Our Projects",
      hero_cta_secondary: "Request a Quote",
      hero_image: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1920&q=85",
      stats_km_roads: "150+",
      stats_heavy_machinery: "45+",
      stats_projects_completed: "85+",
      stats_years_experience: "14+",
      meta_title: "MR. Construction | Heavy Civil, Highway & Road Construction Pakistan",
      meta_description: "MR. Construction is a premier Pakistan-based civil engineering and construction contractor specializing in highways, roads, earthworks, and infrastructure.",
      meta_keywords: "MR Construction, MR Construction Karachi, Road construction Pakistan, Highway construction N25, Civil contractor Karachi, Muhammad Raaziq",
      footer_about: "MR. Construction delivers excellence across highway, road, building, civil and demolition projects throughout Pakistan with trusted institutional track record."
    };

    for (const item of settings) {
      if (item.value !== undefined && item.value !== null && item.value !== "") {
        map[item.key] = item.value;
      }
    }

    return map;
  } catch (error) {
    console.error("Error loading site settings:", error);
    return {
      company_name: COMPANY_INFO.name,
      owner_name: COMPANY_INFO.owner,
      owner_role: COMPANY_INFO.role,
      office_address: COMPANY_INFO.address,
      phone: COMPANY_INFO.phone,
      whatsapp: COMPANY_INFO.whatsapp,
      email: COMPANY_INFO.email,
      working_hours: COMPANY_INFO.workingHours,
      hero_badge: "Leading Infrastructure & Civil Contractor in Pakistan",
      hero_title: "Building Roads. Building Infrastructure. Building Pakistan.",
      hero_subtitle: "MR. Construction provides professional road, highway, building, civil and demolition services across Pakistan.",
    };
  }
}
