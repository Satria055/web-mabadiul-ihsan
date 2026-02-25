import { prisma } from "@/lib/prisma";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  // 1. Ambil Data (Server Side)
  const config = await prisma.siteConfig.findFirst();
  const logoUrl = config?.logoUrl || "/logo-placeholder.png";

  // 2. Lempar Data ke Client Component
  return <HeaderClient config={config} logoUrl={logoUrl} />;
}