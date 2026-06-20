"use client";

import { useActionState, useEffect, useState } from "react";
import {
  saveCodes,
  savePassphrases,
  savePlotStatus,
  saveConfig,
  adminLogout,
  type SaveState,
} from "@/app/admin/actions";
import type { SiteConfig } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLang } from "@/components/lang/language-provider";
import { CheckCircle2, KeyRound, Link2, Lock, LogOut, MapPin } from "lucide-react";

export function AdminEditor({
  codes,
  allPlots,
  availablePlots,
  config,
}: {
  codes: { main: string; allotment: string };
  allPlots: string[];
  availablePlots: Set<string>;
  config: SiteConfig;
}) {
  const { lang } = useLang();
  const [codesState, codesAction, codesPending] = useActionState<SaveState, FormData>(saveCodes, {});
  const [passState, passAction, passPending] = useActionState<SaveState, FormData>(savePassphrases, {});
  const [plotState, plotAction, plotPending] = useActionState<SaveState, FormData>(savePlotStatus, {});
  const [cfgState, cfgAction, cfgPending] = useActionState<SaveState, FormData>(saveConfig, {});

  const [checkedPlots, setCheckedPlots] = useState<Set<string>>(() => new Set([...availablePlots]));
  const [contactEmail, setContactEmail] = useState(config.contactEmail ?? "cydcommittee@gmail.com");
  const [formspreeId, setFormspreeId] = useState(config.formspreeId ?? "xpqeveqn");

  // Sync local checkbox state with the server's confirmed saved result.
  useEffect(() => {
    if (plotState.saved && plotState.availablePlots) {
      setCheckedPlots(new Set(plotState.availablePlots));
    }
  }, [plotState]);

  const cy = lang === "cy";

  return (
    <div className="flex-1 bg-[var(--green-faint)] px-6 py-20">
      <div className="max-w-lg mx-auto space-y-8">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-[var(--green-dark)]">
            {cy ? "Gweinyddu" : "Admin"}
          </h1>
          <div className="leaf-divider mx-auto mt-3" aria-hidden />
        </div>

        {/* Plot availability */}
        <section>
          <h2 className="font-heading text-xl text-[var(--green-dark)] mb-3">
            {cy ? "Argaeledd Lleiniau" : "Plot Availability"}
          </h2>
          <Card className="rounded-[26px_10px_26px_10px] p-6">
            <form action={plotAction} className="space-y-5">
              <p className="text-sm text-muted-foreground">
                {cy
                  ? "Ticiwch y lleiniau sydd ar gael. Bydd unrhyw lain heb dic yn ymddangos fel un wedi'i gymryd."
                  : "Tick the plots that are available. Any unticked plot is treated as taken."}
              </p>
              <div className="flex flex-wrap gap-2">
                {allPlots.map((plot) => (
                  <label
                    key={plot}
                    className={`
                      inline-flex items-center justify-center w-12 h-10 rounded-lg border-2 text-sm font-mono font-bold cursor-pointer select-none transition-colors
                      has-[:checked]:bg-[var(--green-mid)] has-[:checked]:border-[var(--green-mid)] has-[:checked]:text-white
                      border-border text-muted-foreground hover:border-[var(--green-light)] hover:text-[var(--green-dark)]
                    `}
                  >
                    <input
                      type="checkbox"
                      name={`plot_${plot}`}
                      checked={checkedPlots.has(plot)}
                      onChange={(e) =>
                        setCheckedPlots((prev) => {
                          const next = new Set(prev);
                          if (e.target.checked) next.add(plot);
                          else next.delete(plot);
                          return next;
                        })
                      }
                      className="sr-only"
                    />
                    {plot}
                  </label>
                ))}
              </div>
              {plotState.error && (
                <p className="text-sm font-semibold text-destructive">
                  {cy ? "Sesiwn wedi dod i ben. Mewngofnodwch eto." : "Session expired. Please sign in again."}
                </p>
              )}
              {plotState.saved && (
                <p className="flex items-center gap-2 text-sm font-semibold text-[var(--green-mid)]">
                  <CheckCircle2 className="size-4" />
                  {cy ? "Wedi'i gadw." : "Saved."}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={plotPending}>
                <MapPin className="size-4" />
                {plotPending
                  ? cy ? "Yn cadw…" : "Saving…"
                  : cy ? "Cadw argaeledd" : "Save availability"}
              </Button>
            </form>
          </Card>
        </section>

        {/* Gate codes */}
        <section>
          <h2 className="font-heading text-xl text-[var(--green-dark)] mb-3">
            {cy ? "Codau'r Giât" : "Gate Codes"}
          </h2>
          <Card className="rounded-[10px_26px_10px_26px] p-8">
            <form action={codesAction} className="space-y-5 text-left">
              <div className="space-y-1.5">
                <Label htmlFor="main">{cy ? "Prif Giât" : "Main Gate"}</Label>
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
                <Label htmlFor="allotment">{cy ? "Giât y Rhandir" : "Allotment Gate"}</Label>
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
              {codesState.error && (
                <p className="text-sm font-semibold text-destructive">
                  {codesState.error === "invalid"
                    ? cy ? "Rhaid i'r codau fod yn 3–8 digid." : "Codes must be 3–8 digits."
                    : cy ? "Sesiwn wedi dod i ben. Mewngofnodwch eto." : "Session expired. Please sign in again."}
                </p>
              )}
              {codesState.saved && (
                <p className="flex items-center gap-2 text-sm font-semibold text-[var(--green-mid)]">
                  <CheckCircle2 className="size-4" />
                  {cy ? "Wedi'i gadw." : "Saved."}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={codesPending}>
                <KeyRound className="size-4" />
                {codesPending
                  ? cy ? "Yn cadw…" : "Saving…"
                  : cy ? "Cadw codau" : "Save codes"}
              </Button>
            </form>
          </Card>
        </section>

        {/* Passphrases */}
        <section>
          <h2 className="font-heading text-xl text-[var(--green-dark)] mb-3">
            {cy ? "Cyfrineiriau" : "Passphrases"}
          </h2>
          <Card className="rounded-[26px_10px_26px_10px] p-8">
            <form action={passAction} className="space-y-5 text-left">
              <div className="space-y-1.5">
                <Label htmlFor="members">
                  {cy ? "Cyfrinair aelodau" : "Members passphrase"}
                </Label>
                <Input
                  id="members"
                  name="members"
                  type="text"
                  autoComplete="off"
                  placeholder={cy ? "Gadewch yn wag i gadw'r un presennol" : "Leave blank to keep current"}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="admin-pass">
                  {cy ? "Cyfrinair gweinyddu" : "Admin passphrase"}
                </Label>
                <Input
                  id="admin-pass"
                  name="admin"
                  type="text"
                  autoComplete="off"
                  placeholder={cy ? "Gadewch yn wag i gadw'r un presennol" : "Leave blank to keep current"}
                />
              </div>
              {passState.error && (
                <p className="text-sm font-semibold text-destructive">
                  {cy ? "Sesiwn wedi dod i ben. Mewngofnodwch eto." : "Session expired. Please sign in again."}
                </p>
              )}
              {passState.saved && (
                <p className="flex items-center gap-2 text-sm font-semibold text-[var(--green-mid)]">
                  <CheckCircle2 className="size-4" />
                  {cy ? "Wedi'i gadw." : "Saved."}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={passPending}>
                <Lock className="size-4" />
                {passPending
                  ? cy ? "Yn cadw…" : "Saving…"
                  : cy ? "Cadw cyfrineiriau" : "Save passphrases"}
              </Button>
            </form>
          </Card>
        </section>

        {/* Contact & Integration */}
        <section>
          <h2 className="font-heading text-xl text-[var(--green-dark)] mb-3">
            {cy ? "Cyswllt ac Integreiddio" : "Contact & Integration"}
          </h2>
          <Card className="rounded-[10px_26px_10px_26px] p-8">
            <form action={cfgAction} className="space-y-5 text-left">
              <div className="space-y-1.5">
                <Label htmlFor="contactEmail">
                  {cy ? "E-bost cyswllt" : "Contact email"}
                </Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  autoComplete="off"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="formspreeId">
                  {cy ? "ID Formspree" : "Formspree form ID"}
                </Label>
                <Input
                  id="formspreeId"
                  name="formspreeId"
                  autoComplete="off"
                  placeholder="e.g. xpqeveqn"
                  value={formspreeId}
                  onChange={(e) => setFormspreeId(e.target.value)}
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  {cy
                    ? "8 nod o'r URL formspree.io/f/…"
                    : "8-char ID from your formspree.io/f/… URL"}
                </p>
              </div>
              {cfgState.error && (
                <p className="text-sm font-semibold text-destructive">
                  {cfgState.error === "invalid"
                    ? cy ? "Cyfeiriad e-bost annilys." : "Invalid email address."
                    : cy ? "Sesiwn wedi dod i ben." : "Session expired. Please sign in again."}
                </p>
              )}
              {cfgState.saved && (
                <p className="flex items-center gap-2 text-sm font-semibold text-[var(--green-mid)]">
                  <CheckCircle2 className="size-4" />
                  {cy ? "Wedi'i gadw." : "Saved."}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={cfgPending}>
                <Link2 className="size-4" />
                {cfgPending
                  ? cy ? "Yn cadw…" : "Saving…"
                  : cy ? "Cadw gosodiadau" : "Save settings"}
              </Button>
            </form>
          </Card>
        </section>

        <form action={adminLogout} className="text-center">
          <Button type="submit" variant="outline">
            <LogOut className="size-4" />
            {cy ? "Allgofnodi" : "Log out"}
          </Button>
        </form>
      </div>
    </div>
  );
}
