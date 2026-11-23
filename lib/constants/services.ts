export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  linkText?: string;
  linkUrl?: string;
  iconName: "cloud" | "cpu" | "network" | "code" | "server" | "globe";
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "pandai-cloud-service",
    title: "Pandai Cloud Service",
    description: "Migrasi ke cloud dengan fleksibilitas, skalabilitas, dan keamanan tingkat tinggi.",
    tags: ["Cloud", "VPS", "Data Center"],
    linkText: "Kunjungi Pandai Host →",
    linkUrl: "https://pandai.id",
    iconName: "cloud",
  },
  {
    id: "it-consulting",
    title: "IT Consulting",
    description: "Optimalkan infrastruktur teknologi Anda dengan pengetahuan mendalam dan solusi inovatif.",
    tags: ["Analisis", "Strategi", "Optimalisasi"],
    iconName: "cpu",
  },
  {
    id: "localoop-metro-e",
    title: "Localoop & Metro-E",
    description: "Konektivitas berkecepatan tinggi, aman, dan berlatensi rendah antar-lokasi bisnis.",
    tags: ["Fiber Optik", "Metro Ethernet"],
    iconName: "network",
  },
  {
    id: "software-development",
    title: "Software Development",
    description: "Dari ide hingga peluncuran, aplikasi yang disesuaikan dengan kebutuhan dan tujuan bisnis Anda.",
    tags: ["Analytics", "Development", "Solutions"],
    iconName: "code",
  },
];
