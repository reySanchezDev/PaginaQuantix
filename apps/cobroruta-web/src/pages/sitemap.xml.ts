import type { APIRoute } from 'astro';
import {routeMap} from '../lib/routes';
const site='https://cobroruta.quantix.software';
export const GET:APIRoute = () => {
 const urls = Object.values(routeMap).flatMap(pages=>[pages.es,pages.en]).map(path=>`${site}${path}`);
 const body=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url=>`  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>`;
 return new Response(body,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
