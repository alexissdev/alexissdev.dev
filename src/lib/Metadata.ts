export default interface Metadata {
  title: string;
  openGraphTitle?: string;
  url: string;
  description: string;
  icons?: {
    icon?: { url: string; sizes?: string; type?: string }[];
    apple?: string;
  };

  manifest?: string;
}