import { useEffect } from 'react';

function setMetaTag(name, content, attr = 'name') {
  if (content == null) return null;
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
  const created = !tag;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  const previous = tag.getAttribute('content');
  tag.setAttribute('content', content);
  return { tag, previous, created };
}

function setLink(rel, href) {
  if (!href) return null;
  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  const created = !tag;
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  const previous = tag.getAttribute('href');
  tag.setAttribute('href', href);
  return { tag, previous, created };
}

export default function useDocumentMeta({ title, description, canonical }) {
  useEffect(() => {
    const previousTitle = document.title;
    if (title) document.title = title;

    const descriptionEntry = setMetaTag('description', description);
    const ogTitleEntry = setMetaTag('og:title', title, 'property');
    const ogDescriptionEntry = setMetaTag('og:description', description, 'property');
    const canonicalEntry = setLink('canonical', canonical);

    return () => {
      document.title = previousTitle;
      [descriptionEntry, ogTitleEntry, ogDescriptionEntry, canonicalEntry].forEach((entry) => {
        if (!entry) return;
        if (entry.created) {
          entry.tag.remove();
        } else if (entry.previous != null) {
          const attr = entry.tag.tagName === 'LINK' ? 'href' : 'content';
          entry.tag.setAttribute(attr, entry.previous);
        }
      });
    };
  }, [title, description, canonical]);
}
