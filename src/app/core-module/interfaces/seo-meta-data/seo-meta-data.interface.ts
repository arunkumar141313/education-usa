import { SeoMetaDataOg } from "./seo-meta-data-og.interface";

export interface SeoMetaData {
  pageUrls: string[],
  url: string;
  image: string;
  title: string,
  description: string,
  keywords: string[],
  og: SeoMetaDataOg[];
}
