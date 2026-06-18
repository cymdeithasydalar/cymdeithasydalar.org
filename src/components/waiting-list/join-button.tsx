"use client";

import { Button } from "@/components/ui/button";
import { useWaitingList } from "./waiting-list-provider";
import { useLang } from "@/components/lang/language-provider";
import type { ComponentProps } from "react";

export function JoinButton(props: ComponentProps<typeof Button>) {
  const { open } = useWaitingList();
  const { lang } = useLang();
  return (
    <Button onClick={() => open()} {...props}>
      {props.children ?? (lang === "cy" ? "Ymuno â'r Rhestr Aros" : "Join the Waiting List")}
    </Button>
  );
}
