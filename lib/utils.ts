import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTenantURL(companySlug: string) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const isSubdomainRoutingEnabled =
    process.env.NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING === "true";
  if (isDevelopment || !isSubdomainRoutingEnabled) {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    if (!baseUrl) {
      throw new Error(
        "NEXT_PUBLIC_URL is not defined in environment variables"
      );
    }
    return `${baseUrl}/company/${companySlug}`;
  }

  const protocol = "https";
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  if (!domain) {
    throw new Error(
      "NEXT_PUBLIC_ROOT_DOMAIN is not defined in environment variables"
    );
  }

  return `${protocol}://${companySlug}.${domain}`;
}


