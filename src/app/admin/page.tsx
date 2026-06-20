import type { Metadata } from "next";
import { isAdmin, gateCodes } from "@/lib/auth";
import { getAvailablePlots, ALL_PLOTS } from "@/lib/plots";
import { readConfig } from "@/lib/store";
import { AdminLogin } from "@/components/site/admin-login";
import { AdminEditor } from "@/components/site/admin-editor";

export const metadata: Metadata = {
  title: "Admin | Cymdeithas y Dalar",
  robots: { index: false, follow: false },
};

// Depends on cookies — always render per request.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return <AdminLogin />;
  }

  const [codes, available, config] = await Promise.all([
    gateCodes(),
    getAvailablePlots(),
    readConfig(),
  ]);

  return (
    <AdminEditor
      codes={codes}
      allPlots={ALL_PLOTS}
      availablePlots={available}
      config={config ?? {}}
    />
  );
}
