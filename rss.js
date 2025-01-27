import * as fs from 'fs';
import { tree } from './.routify/routes.js';

// thanks https://github.com/sveltejs/svelte/blob/master/site/src/routes/blog/rss.xml.js
function escapeHTML(html) {
	const chars = {
		'"' : 'quot',
		"'": '#39',
		'&': 'amp',
		'<' : 'lt',
		'>' : 'gt'
	};

	return html.replace(/["'&<>]/g, c => `&${chars[c]};`);
}

let rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
  <channel>
    <title>old Cornell Data Journal</title>
    <link>https://cornelldatajourn.al/</link>
    <description>Offering data-driven perspectives on current events, academics, politics, and beyond.</description>`;

const articles = tree.children
  .find(entry => entry.path === '/articles').children
  .map(post => ({
    slug: post.path,
    ...post.children.find(child => child.isIndex).meta.frontmatter,
  }));

const base_url = 'https://cornelldatajourn.al';
for (const { slug, title, description, date } of articles) {
  rss += `
    <item>
      <title>${escapeHTML(title)}</title>
      <link>${base_url + slug}</link>
      <description>${escapeHTML(description)}</description>
      <pubDate>${date}</pubDate>
      <content>&lt;img src=&quot;https://cornelldatajourn.al/favicon.svg&quot; /&gt;</content>
    </item>`
}

rss += `
  </channel>
</rss>`;

fs.writeFile("dist/rss.xml", rss, function(err) {
    if(err) {
        return console.error(err);
    }
    console.log("Created RSS feed at /rss.xml");
});
