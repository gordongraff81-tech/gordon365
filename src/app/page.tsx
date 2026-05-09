import { redirect } from "next/navigation";

export default function RootPage() {
  // Da dein Standard "en" ist, leiten wir dorthin weiter
  redirect("/en");
}