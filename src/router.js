import pathToRegexp from "path-to-regexp";

async function decode(val) {
  return val ? decodeURIComponent(val) : "";
};

export async function makeRoutes(routes) {
  return routes.map(r => ({ ...r, regex: pathToRegexp(r.url) }));
}

export async function matchRoute(path, routes) {
  let route, match;
  for (route of routes) {
    match = route.regex.exec(path);
    if (match) break;
  }
  return match ? { route, args: match.slice(1).map(decode) } : undefined;
}
