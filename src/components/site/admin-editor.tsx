"use client";

import { useActionState } from "react";
import { saveCodes, adminLogout, type SaveState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLang } from "@/components/lang/language-provider";
import { CheckCircle2, KeyRound, LogOut } from "lucide-react";

export function AdminEditor({
  codes,
}: {
  codes: { main: string; allotment: string };
}) {
  const { lang } = useLang();
  const [state, formAction, pending] = useActionState<SaveState, FormData>(saveCodes, {});

  return (
    <div className="flex-1 bg-[var(--green-faint)] px-6 py-20">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl text-[var(--green-dark)]">
            {lang === "cy" ? "Golygu Codau'r Giât" : "Edit Gate Codes"}
          </h1>
          <div className="leaf-divider mx-auto mt-3" aria-hidden />
          <p className="text-muted-foreground text-sm">
            {lang === "cy"
              ? "Bydd newidiadau'n fyw ar unwaith — does dim angen ailgyhoeddi'r wefan."
              : "Changes go live instantly — no need to redeploy the site."}
          </p>
        </div>

        <Card className="rounded-[26px_10px_26px_10px] p-8">
          <form action={formAction} className="space-y-5 text-left">
            <div className="space-y-1.5">
              <Label htmlFor="main">{lang === "cy" ? "Prif Giât" : "Main Gate"}</Label>
              <Input
                id="main"
                name="main"
                defaultValue={codes.main}
                inputMode="numeric"
                pattern="\d{3,8}"
                autoComplete="off"
                required
                className="font-mono text-lg tracking-[0.2em]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="allotment">{lang === "cy" ? "Giât y Rhandir" : "Allotment Gate"}</Label>
              <Input
                id="allotment"
                name="allotment"
                defaultValue={codes.allotment}
                inputMode="numeric"
                pattern="\d{3,8}"
                autoComplete="off"
                required
                className="font-mono text-lg tracking-[0.2em]"
              />
            </div>

            {state.error && (
              <p className="text-sm font-semibold text-destructive">
                {state.error === "invalid"
                  ? lang === "cy"
                    ? "Rhaid i'r codau fod yn 3–8 digid."
                    : "Codes must be 3–8 digits."
                  : lang === "cy"
                    ? "Sesiwn wedi dod i ben. Mewngofnodwch eto."
                    : "Session expired. Please sign in again."}
              </p>
            )}
            {state.saved && (
              <p className="flex items-center gap-2 text-sm font-semibold text-[var(--green-mid)]">
                <CheckCircle2 className="size-4" />
                {lang === "cy" ? "Wedi'i gadw." : "Saved."}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={pending}>
              <KeyRound className="size-4" />
              {pending
                ? lang === "cy" ? "Yn cadw…" : "Saving…"
                : lang === "cy" ? "Cadw codau" : "Save codes"}
            </Button>
          </form>
        </Card>

        <form action={adminLogout} className="text-center mt-8">
          <Button type="submit" variant="outline">
            <LogOut className="size-4" />
            {lang === "cy" ? "Allgofnodi" : "Log out"}
          </Button>
        </form>
      </div>
    </div>
  );
}
