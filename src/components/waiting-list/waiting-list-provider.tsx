"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useForm } from "@formspree/react";
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

const FORMSPREE_ID = "xpqeveqn";

type Ctx = { open: (plot?: string | null) => void };
const WaitingListContext = createContext<Ctx | null>(null);

export function useWaitingList() {
  const ctx = useContext(WaitingListContext);
  if (!ctx) throw new Error("useWaitingList must be used within WaitingListProvider");
  return ctx;
}

function WaitingListForm({
  plot,
  lang,
  onClose,
}: {
  plot: string | null;
  lang: string;
  onClose: () => void;
}) {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);
  const cy = lang === "cy";

  if (state.succeeded) {
    return (
      <div className="flex flex-col items-center text-center py-2">
        <CheckCircle2 className="size-16 text-primary mb-4" />
        <DialogTitle className="font-heading text-2xl text-[var(--green-dark)]">
          {cy ? "Rydych chi ar y rhestr!" : "You're on the list!"}
        </DialogTitle>
        <p className="text-muted-foreground mt-3 mb-6 text-sm leading-relaxed">
          {cy
            ? "Diolch! Rydym wedi derbyn eich cais ac fe gewch e-bost cadarnhau yn fuan."
            : "Thank you! We've received your application and you'll get a confirmation email shortly."}
        </p>
        <Button onClick={onClose} className="w-full">
          {cy ? "Cau" : "Close"}
        </Button>
      </div>
    );
  }

  const serverError = state.errors != null;

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-heading text-2xl text-[var(--green-dark)]">
          {cy ? "Ymuno â'n Rhestr Aros" : "Join Our Waiting List"}
        </DialogTitle>
        <DialogDescription>
          {cy
            ? "Llenwch eich manylion a byddwn yn cysylltu â chi pan fydd llain ar gael."
            : "Fill in your details and we'll contact you when a plot becomes available."}
        </DialogDescription>
      </DialogHeader>

      {plot != null && (
        <p className="rounded-lg bg-secondary border border-[var(--green-light)] text-[var(--green-dark)] text-sm font-bold text-center py-2 px-3">
          {cy ? `Eich diddordeb: Llain ${plot}` : `Your interest: Plot ${plot}`}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="_subject" value="New Allotment Waiting List Application" />
        {plot != null && <input type="hidden" name="plot_of_interest" value={`Plot ${plot}`} />}

        <div className="space-y-1.5">
          <Label htmlFor="wl-name">{cy ? "Enw Llawn" : "Full Name"}</Label>
          <Input id="wl-name" name="name" autoComplete="name" required
            placeholder={cy ? "Eich enw llawn" : "Your full name"} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="wl-email">{cy ? "Cyfeiriad E-bost" : "Email Address"}</Label>
          <Input id="wl-email" name="email" type="email" autoComplete="email" required
            placeholder={cy ? "eich@ebost.com" : "your@email.com"} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="wl-phone">{cy ? "Rhif Ffôn" : "Phone Number"}</Label>
          <Input id="wl-phone" name="phone" type="tel" autoComplete="tel" required
            placeholder={cy ? "Eich rhif ffôn" : "Your phone number"} />
        </div>

        {serverError && (
          <p className="text-sm font-semibold text-destructive">
            {cy
              ? "Roedd problem. E-bostiwch ni: cydcommittee@gmail.com"
              : "Something went wrong. Please email cydcommittee@gmail.com"}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={state.submitting}>
          {state.submitting
            ? cy ? "Yn anfon…" : "Sending…"
            : cy ? "Ymuno â'r Rhestr Aros" : "Join Waiting List"}
        </Button>
      </form>
    </>
  );
}

export function WaitingListProvider({ children }: { children: ReactNode }) {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [plot, setPlot] = useState<string | null>(null);
  // Increment on each open so WaitingListForm remounts fresh (resets useForm state).
  const [openCount, setOpenCount] = useState(0);

  const open = useCallback((p: string | null = null) => {
    setPlot(p ?? null);
    setOpenCount((c) => c + 1);
    setIsOpen(true);
  }, []);

  const onOpenChange = (next: boolean) => {
    setIsOpen(next);
    if (!next) setTimeout(() => setPlot(null), 250);
  };

  return (
    <WaitingListContext.Provider value={{ open }}>
      {children}

      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md rounded-[28px_12px_28px_12px]">
          <WaitingListForm
            key={openCount}
            plot={plot}
            lang={lang}
            onClose={() => onOpenChange(false)}
          />
        </DialogContent>
      </Dialog>
    </WaitingListContext.Provider>
  );
}
