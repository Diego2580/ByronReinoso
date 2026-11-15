import { ArrowUpRight } from "lucide-react";
import { bookingHref, site } from "@/content/site";
export function BookingLink({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <a
      className={`button ${className}`}
      href={bookingHref}
      data-magnetic={className.includes("service-link") ? undefined : ""}
    >
      {site.booking}
      <ArrowUpRight size={compact ? 16 : 18} aria-hidden="true" />
    </a>
  );
}
