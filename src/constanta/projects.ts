import { MockupLeadoc, MockupSnapparel, MockupSwave } from "./image";

export const projectsArray = [
  {
    title: "Swave E-Commerce",
    image: MockupSwave,
    role: "Fullstack Developer",
    tech_stack: ["Typescript", "Vue & Nuxt", "TailwindCSS", "Bun", "Hono"],
    context: "Solo Project",
    FERepo: "https://github.com/algazza/swave-frontend",
    BERepo: "https://github.com/algazza/swave-backend",
    link: "",
    description:
      "Membangun e-commerce jewelry fullstack dengan fokus pada optimasi performa aset, proteksi spam request, dan manajemen siklus pembayaran tertunda untuk memastikan transaksi digital yang aman dan mulus",
  },
  {
    title: "Leadoc",
    image: MockupLeadoc,
    role: "Frontend Contributor",
    tech_stack: [
      "Typescript",
      "React & Next",
      "TailwindCSS",
      "GSAP",
      "Zustand",
    ],
    context: "Team Project",
    description:
      "Mengotomatisasi pembuatan dokumentasi proyek (README) menggunakan integrasi AI untuk menghasilkan struktur yang rapi dan memangkas beban kerja manual secara signifikan",
  },
  {
    title: "Snapparel",
    image: MockupSnapparel,
    role: "Fullstack Contributor (UI & Microservices)",
    tech_stack: [
      "Typescript",
      "React Native & Expo",
      "TailwindCSS",
      "Bun",
      "Express",
    ],
    context: "Capstone Project",
    FERepo: "https://github.com/PJBL-2025/frontend_pjbl2025-v2",
    BERepo: "https://github.com/PJBL-2025/PJBL2025_Backend",
    description:
      "Membangun platform kustomisasi pakaian dengan fitur pratinjau visual interaktif guna mengeliminasi miskomunikasi, meningkatkan akurasi produksi, dan menekan siklus revisi",
  },
];
