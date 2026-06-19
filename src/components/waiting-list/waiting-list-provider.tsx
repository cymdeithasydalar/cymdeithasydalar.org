"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLang } from "@/components/lang/language-provider";
import { CheckCircle2 } from "lucide-react";

const FORMSPREE_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "YOUR_FORMSPREE_ID";

type Ctx = { open: (plot?: number | null) => void };
const WaitingListContext = createContext<Ctx | null>(null);

export function useWaitingList() {
  const ctx = useContext(WaitingListContext);
  if (!ctx) throw new Error("useWaitingList must be used within WaitingListProvider");
  return ctx;
}

export function WaitingListProvider({ children }: { children: ReactNode }) {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [plot, setPlot] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const open = useCallback((p: number | null = null) => {
    setPlot(p ?? null);
    setStatus("idle");
    setError("");
    setIsOpen(true);
  }, []);

  const onOpenChange = (next: boolean) => {
    setIsOpen(next);
    if (!next) {
      // reset shortly after close animation
      setTimeout(() => {
        setStatus("idle");
        setError("");
        setPlot(null);
        formRef.current?.reset();
      }, 250);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!data.get("name") || !data.get("email") || !data.get("phone")) {
      setError(lang === "cy" ? "Llenwch yr holl feysydd." : "Please fill in all fields.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("idle");
      setError(
        lang === "cy"
          ? "Roedd problem. E-bostiwch ni: cydcommittee@gmail.com"
          : "Something went wrong. Please email cydcommittee@gmail.com",
      );
    }
  }

  return (
    <WaitingListContext.Provider value={{ open }}>
      {children}

      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md rounded-[28px_12px_28px_12px]">
          {status === "success" ? (
            <div className="flex flex-col items-center text-center py-2">
              <CheckCircle2 className="size-16 text-primary mb-4" />
              <DialogTitle className="font-heading text-2xl text-[var(--green-dark)]">
                {lang === "cy" ? "Rydych chi ar y rhestr!" : "You're on the list!"}
              </DialogTitle>
              <p className="text-muted-foreground mt-3 mb-6 text-sm leading-relaxed">
                {lang === "cy"
                  ? "Diolch! Rydym wedi derbyn eich cais ac fe gewch e-bost cadarnhau yn fuan."
                  : "Thank you! We've received your application and you'll get a confirmation email shortly."}
              </p>
              <Button onClick={() => onOpenChange(false)} className="w-full">
                {lang === "cy" ? "Cau" : "Close"}
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl text-[var(--green-dark)]">
                  {lang === "cy" ? "Ymuno â'n Rhestr Aros" : "Join Our Waiting List"}
                </DialogTitle>
                <DialogDescription>
                  {lang === "cy"
                    ? "Llenwch eich manylion a byddwn yn cysylltu â chi pan fydd llain ar gael."
                    : "Fill in your details and we'll contact you when a plot becomes available."}
                </DialogDescription>
              </DialogHeader>

              {plot != null && (
                <p className="rounded-lg bg-secondary border border-[var(--green-light)] text-[var(--green-dark)] text-sm font-bold text-center py-2 px-3">
                  {lang === "cy" ? `Eich diddordeb: Llain ${plot}` : `Your interest: Plot ${plot}`}
                </p>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="_subject" value="New Allotment Waiting List Application" />
                {plot != null && <input type="hidden" name="plot_of_interest" value={`Plot ${plot}`} />}

                <div className="space-y-1.5">
                  <Label htmlFor="wl-name">{lang === "cy" ? "Enw Llawn" : "Full Name"}</Label>
                  <Input id="wl-name" name="name" autoComplete="name" required
                    placeholder={lang === "cy" ? "Eich enw llawn" : "Your full name"} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="wl-email">{lang === "cy" ? "Cyfeiriad E-bost" : "Email Address"}</Label>
                  <Input id="wl-email" name="email" type="email" autoComplete="email" required
                    placeholder={lang === "cy" ? "eich@ebost.com" : "your@email.com"} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="wl-phone">{lang === "cy" ? "Rhif Ffôn" : "Phone Number"}</Label>
                  <Input id="wl-phone" name="phone" type="tel" autoComplete="tel" required
                    placeholder={lang === "cy" ? "Eich rhif ffôn" : "Your phone number"} />
                </div>

                {error && <p className="text-sm font-semibold text-destructive">{error}</p>}

                <Button type="submit" className="w-full" disabled={status === "loading"}>
                  {status === "loading"
                    ? lang === "cy" ? "Yn anfon…" : "Sending…"
                    : lang === "cy" ? "Ymuno â'r Rhestr Aros" : "Join Waiting List"}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </WaitingListContext.Provider>
  );
}
