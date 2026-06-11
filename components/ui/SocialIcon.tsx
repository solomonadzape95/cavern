import type { IconType } from "react-icons";
import { LuLink } from "react-icons/lu";
import {
  FaBluesky,
  FaDiscord,
  FaYoutube,
  FaSteam,
  FaLinkedin,
  FaGithub,
  FaArtstation,
  FaSoundcloud,
  FaBandcamp,
  FaInstagram,
} from "react-icons/fa6";

/** label → brand icon. Swap any of these for nicer marks later. */
const MAP: Record<string, IconType> = {
  Bluesky: FaBluesky,
  Discord: FaDiscord,
  YouTube: FaYoutube,
  Steam: FaSteam,
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
  ArtStation: FaArtstation,
  SoundCloud: FaSoundcloud,
  Bandcamp: FaBandcamp,
  Instagram: FaInstagram,
};

export function SocialIcon({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const Icon = MAP[label] ?? LuLink;
  return <Icon className={className} aria-hidden />;
}
