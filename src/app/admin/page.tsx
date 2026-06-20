import type { Metadata } from "next";
import { isAdmin, gateCodes } from "@/lib/auth";
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

  return <AdminEditor codes={await gateCodes()} />;
}
