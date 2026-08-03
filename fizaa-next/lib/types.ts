export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt?: string;
}

export interface SubCategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  createdAt?: string;
}

export interface FilterField {
  id: string;
  label: string;
  key: string;
  type: "text" | "select";
  options: string[];
  createdAt?: string;
}

export interface DocFile {
  name: string;
  url: string;
}

export type Segment = "industrial" | "commercial" | "hotel";
export const SEGMENTS: Segment[] = ["industrial", "commercial", "hotel"];
export const SEGMENT_LABEL: Record<Segment, string> = {
  industrial: "Industrial",
  commercial: "Commercial",
  hotel: "Hotel",
};

// Hand-written translations for a listing's prose, keyed by language code
// ("bm", "zh"). Anything omitted falls back to the English field.
export interface ListingI18n {
  title?: string;
  shortDesc?: string;
  description?: string;
  specs?: string[];
}

export interface Listing {
  id: string;
  title: string;
  slug: string;
  segment?: Segment | null;
  categoryId?: string | null;
  subCategoryId?: string | null;
  propertyType?: string;
  dealType: "sale" | "rent";
  city?: string;
  state?: string;
  address?: string;
  lat?: number | null;
  lng?: number | null;
  price?: number | null;
  priceUnit?: string;
  priceLabel?: string;
  size?: number | null;
  sizeUnit?: string;
  beds?: number | null;
  baths?: number | null;
  featured?: boolean;
  status?: "active" | "hidden";
  shortDesc?: string;
  description?: string;
  images: string[];
  pdfUrl?: string | null;
  documents?: DocFile[];
  specs?: string[];
  attributes?: Record<string, string>;
  i18n?: Record<string, ListingI18n>;
  createdAt?: string;
  updatedAt?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source?: string;
  createdAt?: string;
}

export interface Inquiry {
  id: string;
  inquiryType?: string;
  role?: string;
  name?: string;
  email?: string;
  mobile?: string;
  city?: string;
  area?: string;
  state?: string;
  zip?: string;
  propertyType?: string;
  maxPrice?: string;
  minSize?: string;
  beds?: string;
  baths?: string;
  listingId?: string;
  listingTitle?: string;
  message?: string;
  source?: string;
  createdAt?: string;
}

export interface ContactMsg {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  message: string;
  createdAt?: string;
}

export interface Meta {
  categories: Category[];
  subCategories: SubCategory[];
  filterFields: FilterField[];
  cities: string[];
  states: string[];
  propertyTypes: string[];
  dealTypes: string[];
  total: number;
}
