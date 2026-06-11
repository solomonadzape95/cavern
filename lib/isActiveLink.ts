/** True if `pathname` is `href` or a sub-route of it (e.g. /games/foo under /games). */
export function isActiveLink(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
