import type { Metadata } from "next";
import { isMember, gateCodes } from "@/lib/auth";
import { MembersLogin } from "@/components/site/members-login";
import { MembersCodes } from "@/components/site/members-codes";

export const metadata: Metadata = {
  title: "Members Area | Cymdeithas y Dalar",
  robots: { index: false, follow: false },
};

// Depends on cookies — always render per request.
export const dynamic = "force-dynamic";

export default async function MembersPage() {
  if (!(await isMember())) {
    return <MembersLogin />;
  }

  // gateCodes() runs only on the server; the PIN codes reach the browser
  // ONLY in this branch — i.e. after a valid passphrase unlock.
  return <MembersCodes codes={await gateCodes()} />;
}
