export interface SiteSettingsMap {
  company_name?: string;
  owner_name?: string;
  owner_role?: string;
  office_address?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  working_hours?: string;
  google_maps_embed?: string;
  google_maps_link?: string;
  hero_badge?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_cta_primary?: string;
  hero_cta_secondary?: string;
  hero_image?: string;
  hero_video_url?: string;
  stats_km_roads?: string;
  stats_heavy_machinery?: string;
  stats_projects_completed?: string;
  stats_years_experience?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  facebook_url?: string;
  linkedin_url?: string;
  youtube_url?: string;
  footer_about?: string;
  [key: string]: string | undefined;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  featuredImage?: string | null;
  featuresListJson?: string | null;
  equipmentJson?: string | null;
  order: number;
  isFeatured: boolean;
  isActive: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  clientOrPartner?: string | null;
  partnerRole?: string | null;
  location: string;
  status: string; // Ongoing, Completed, Upcoming
  isFeatured: boolean;
  isCurrentProject: boolean;
  startDate?: string | null;
  completionDate?: string | null;
  shortDescription: string;
  fullDescription: string;
  scopeListJson?: string | null;
  specsJson?: string | null;
  featuredImage: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  order: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  images?: ProjectImageItem[];
}

export interface ProjectImageItem {
  id: string;
  projectId: string;
  imageUrl: string;
  caption?: string | null;
  altText?: string | null;
  order: number;
  createdAt?: Date | string;
}

export interface GalleryItemType {
  id: string;
  title: string;
  caption?: string | null;
  altText?: string | null;
  category: string;
  imageUrl: string;
  projectId?: string | null;
  order: number;
  createdAt: Date | string;
}

export interface OrganizationItem {
  id: string;
  name: string;
  logoUrl?: string | null;
  description?: string | null;
  websiteUrl?: string | null;
  order: number;
  isActive: boolean;
  createdAt: Date | string;
}

export interface ContactMessageItem {
  id: string;
  name: string;
  company?: string | null;
  phone?: string | null;
  email: string;
  serviceRequired?: string | null;
  subject?: string | null;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  createdAt: Date | string;
}

export interface QuoteRequestItem {
  id: string;
  name: string;
  company?: string | null;
  phone: string;
  email: string;
  projectType?: string | null;
  location?: string | null;
  budgetRange?: string | null;
  estimatedTimeline?: string | null;
  message: string;
  status: string;
  createdAt: Date | string;
}
