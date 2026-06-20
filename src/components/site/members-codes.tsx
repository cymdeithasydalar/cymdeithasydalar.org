"use client";

import { logout } from "@/app/members/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { T } from "@/components/lang/language-provider";
import { KeyRound, DoorOpen, LogOut, ShieldAlert } from "lucide-react";

export function MembersCodes({
  codes,
}: {
  codes: { main: string; allotment: string };
}) {
  return (
    <div className="flex-1 bg-[var(--green-faint)] px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl text-[var(--green-dark)]">
            <T en="Members Area" cy="Ardal Aelodau" />
          </h1>
          <div className="leaf-divider mx-auto mt-3" aria-hidden />
          <p className="text-muted-foreground">
            <T
              en="These codes are for members only — please do not share them with non-members."
              cy="Mae'r codau hyn ar gyfer aelodau yn unig — peidiwch â'u rhannu â phobl nad ydynt yn aelodau."
            />
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <Card className="rounded-[26px_10px_26px_10px] p-8 text-center">
            <div className="size-14 mx-auto rounded-2xl bg-secondary border-2 border-[var(--green-light)] flex items-center justify-center">
              <DoorOpen className="size-7 text-[var(--green-mid)]" />
            </div>
            <h2 className="font-heading text-xl text-[var(--green-dark)]">
              <T en="Main Gate" cy="Prif Giât" />
            </h2>
            <p className="font-mono text-4xl font-bold tracking-[0.2em] text-[var(--green-mid)]">
              {codes.main}
            </p>
          </Card>

          <Card className="rounded-[10px_26px_10px_26px] p-8 text-center">
            <div className="size-14 mx-auto rounded-2xl bg-secondary border-2 border-[var(--green-light)] flex items-center justify-center">
              <KeyRound className="size-7 text-[var(--green-mid)]" />
            </div>
            <h2 className="font-heading text-xl text-[var(--green-dark)]">
              <T en="Allotment Gate" cy="Giât y Rhandir" />
            </h2>
            <p className="font-mono text-4xl font-bold tracking-[0.2em] text-[var(--green-mid)]">
              {codes.allotment}
            </p>
            <p className="text-xs text-muted-foreground">
              <T en="Summer use only — for loading & unloading" cy="Defnydd haf yn unig — llwytho a dadlwytho" />
            </p>
          </Card>
        </div>

        <div className="flex items-start gap-2 rounded-xl bg-[var(--status-reserved-bg)] border border-[var(--status-reserved-line)] p-4 mt-6 text-sm text-[#8a5a10]">
          <ShieldAlert className="size-4 mt-0.5 shrink-0" />
          <span>
            <T
              en="Park in the National Trust car park on the left-hand side (summer only). Keep the gate closed and locked."
              cy="Parciwch ym maes parcio'r Ymddiriedolaeth Genedlaethol ar yr ochr chwith (haf yn unig). Cadwch y giât ar gau ac ar glo."
            />
          </span>
        </div>

        <form action={logout} className="text-center mt-8">
          <Button type="submit" variant="outline">
            <LogOut className="size-4" />
            <T en="Log out" cy="Allgofnodi" />
          </Button>
        </form>
      </div>
    </div>
  );
}
