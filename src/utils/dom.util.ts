const observers = new WeakMap<Element, IntersectionObserver>();

function intersectionCallback(element: Element, callback: () => void) {
  return (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      callback();
      observer.unobserve(element);
    }
  };
}

export function waitUntilElementIntersects(
  element: Element,
  callback: () => void,
  options: IntersectionObserverInit = { root: null, threshold: 0 },
): IntersectionObserver {
  if (observers.has(element)) return observers.get(element)!;

  const observer = new IntersectionObserver(intersectionCallback(element, callback), options);
  observer.observe(element);
  observers.set(element, observer);

  return observer;
}

type WaitUntilElementAppearsConfig = {
  wait?: number;
  attempts?: number;
  root?: HTMLElement | Document;
};

export function waitUntilElementAppears(
  selectors: string | string[],
  { wait = 250, attempts = 10, root = document }: WaitUntilElementAppearsConfig = {},
): Promise<Element | undefined> {
  const selectorList = Array.isArray(selectors) ? selectors : [selectors];
  let attempt = 0;

  return new Promise((resolve) => {
    const check = () => {
      const found = selectorList.map((sel) => root.querySelector(sel)).find(Boolean);
      if (found || ++attempt >= attempts) {
        resolve(found ?? undefined);
      } else {
        setTimeout(check, wait);
      }
    };
    check();
  });
}

function createResourceLoader(tagName: 'script' | 'link', urlAttr: 'src' | 'href') {
  return (url: string, attributes: Record<string, string> = {}): Promise<boolean> => {
    if (!url) return Promise.reject(new Error(`Missing URL Parameter for ${tagName}`));
    if (document.querySelector(`${tagName}[${urlAttr}="${url}"]`)) return Promise.resolve(true);

    return new Promise((resolve, reject) => {
      // biome-ignore lint/suspicious/noExplicitAny: -
      const element = document.createElement(tagName) as HTMLElement & Record<string, any>;
      element[urlAttr] = url;
      Object.assign(element, attributes);
      element.onerror = () => reject(new Error(`Failed to load ${tagName}: ${url}`));
      element.onload = () => resolve(true);
      (tagName === 'link' ? document.head.prepend : document.head.append).call(document.head, element);
    });
  };
}

export const importJS = createResourceLoader('script', 'src');
export const importCSS = createResourceLoader('link', 'href');
