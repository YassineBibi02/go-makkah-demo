// app/not-found.tsx
import { redirect /*, permanentRedirect */ } from "next/navigation";

export default function NotFound() {
  // Temporary redirect (307). Swap to permanentRedirect(...) for 308 if desired.
  redirect("https://beta.go-makkah.com");
}
