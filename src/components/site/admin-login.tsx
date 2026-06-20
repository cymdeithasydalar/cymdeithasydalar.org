"use client";

import { useActionState } from "react";
import { adminUnlock, type AdminUnlockState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLang } from "@/components/lang/language-provider";
import { ShieldCheck } from "lucide-react";

export function AdminLogin() {
  const { lang } = useLang();
  const [state, formAction, pending] = useActionState<AdminUnlockState, FormData>(adminUnlock, {});

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-20 bg-[var(--green-faint)]">
      <Card className="w-full max-w-sm rounded-[28px_12px_28px_12px] p-8 text-center">
        <div className="size-14 mx-auto rounded-2xl bg-secondary border-2 border-[var(--green-light)] flex items-center justify-center">
          <ShieldCheck className="size-7 text-[var(--green-mid)]" />
        </div>
        <h1 className="font-heading text-3xl text-[var(--green-dark)]">
          {lang === "cy" ? "Gweinyddu" : "Admin"}
        </h1>
        <p className="text-muted-foreground text-sm">
          {lang === "cy"
            ? "Rhowch y cyfrinair gweinyddu i olygu codau'r giât."
            : "Enter the admin passphrase to edit the gate codes."}
        </p>

        <form action={formAction} className="space-y-4 mt-2 text-left">
          <div className="space-y-1.5">
            <Label htmlFor="passphrase">{lang === "cy" ? "Cyfrinair" : "Passphrase"}</Label>
            <Input id="passphrase" name="passphrase" type="password" autoComplete="off" autoFocus required />
          </div>
          {state.error && (
            <p className="text-sm font-semibold text-destructive">
              {lang === "cy" ? "Cyfrinair anghywir. Rhowch gynnig arall." : "Incorrect passphrase. Please try again."}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending
              ? lang === "cy" ? "Yn agor…" : "Unlocking…"
              : lang === "cy" ? "Mewngofnodi" : "Sign in"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
