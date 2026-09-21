import React from "react";
import { COMPANY_INFO } from "./constants";
import { SiteSettingsMap } from "./types";

export function SiteStructuredData({ settings }: { settings: SiteSettingsMap }) {
  const companyName = settings.company_name || COMPANY_INFO.name;
  const ownerName = settings.owner_name || COMPANY_INFO.owner;
  const address = settings.office_address || COMPANY_INFO.address;
  const phone = settings.phone || COMPANY_INFO.phone;
  const email = settings.email || COMPANY_INFO.email;

  const schema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "name": companyName,
    "image": "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80",
    "founder": {
      "@type": "Person",
      "name": ownerName,
      "jobTitle": "Founder & Chief Executive"
    },
    "description": "MR. Construction is a premier Pakistan-based civil engineering and construction contractor executing highways, roads, building infrastructure, and civil projects nationwide.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office 133, Near Police Station, Sector 9-C, Hawksbay, Musharaf Colony",
      "addressLocality": "Karachi",
      "addressRegion": "Sindh",
      "postalCode": "75700",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.89679,
      "longitude": 66.86689
    },
    "telephone": phone,
    "email": email,
    "areaServed": [
      {
        "@type": "Country",
        "name": "Pakistan"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Sindh"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Balochistan"
      },
      {
        "@type": "City",
        "name": "Karachi"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Construction and Civil Engineering Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Highway & Expressway Construction" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Road Construction & Asphalt Paving" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Civil Engineering & Retaining Works" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Earthwork & Mass Excavation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Building Construction" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Controlled Demolition Works" } }
      ]
    },
    "knowsAbout": [
      "Frontier Works Organization (FWO) Partnership",
      "N-25 Karachi-Chaman Highway Construction",
      "National Logistics Cell (NLC) Infrastructure",
      "Defence Housing Authority (DHA) Civil Works"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbStructuredData({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProjectStructuredData({
  title,
  description,
  image,
  location,
  status
}: {
  title: string;
  description: string;
  image: string;
  location: string;
  status: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ConstructionProject",
    "name": title,
    "description": description,
    "image": image,
    "locationCreated": {
      "@type": "Place",
      "name": location,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "PK"
      }
    },
    "contractor": {
      "@type": "Organization",
      "name": "MR. Construction"
    },
    "status": status
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
