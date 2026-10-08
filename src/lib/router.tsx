import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface RouterContextValue {
  pathname: string;
  search: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue>({
  pathname: '/',
  search: '',
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

export const normalizePath = (path: string): string => {
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

const parse = (to: string) => {
  const url = new URL(to, 'http://local');
  return { pathname: normalizePath(url.pathname), search: url.search, hash: url.hash };
};

let navigated = false;

/**
 * True once the visitor has moved around inside the app (a link click or Back/Forward). The "PPH" splash belongs to
 * the first page load only: it is skipped on any later visit to the home page.
 */
export const hasNavigated = (): boolean => navigated;

/** Marks the app as navigated and clears the splash classes the inline script put on <html> at load time. */
const leaveInitialLoad = () => {
  navigated = true;
  document.documentElement.classList.remove('splash', 'splash-exit');
};

const scrollAfterRender = (hash: string) => {
  window.setTimeout(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, 0);
};

export const RouterProvider: React.FC<{
  children: React.ReactNode;
  /** Path to render on the server / at build time. Ignored in the browser. */
  initialPath?: string;
}> = ({ children, initialPath = '/' }) => {
  const [location, setLocation] = useState(() => {
    if (typeof window !== 'undefined') {
      return { pathname: normalizePath(window.location.pathname), search: window.location.search };
    }
    const { pathname, search } = parse(initialPath);
    return { pathname, search };
  });

  useEffect(() => {
    const onPopState = () => {
      leaveInitialLoad();
      setLocation({ pathname: normalizePath(window.location.pathname), search: window.location.search });
      scrollAfterRender(window.location.hash);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    leaveInitialLoad();
    const next = parse(to);
    const changed = next.pathname !== normalizePath(window.location.pathname) || next.search !== window.location.search;
    if (changed) {
      window.history.pushState({}, '', `${next.pathname}${next.search}${next.hash}`);
      setLocation({ pathname: next.pathname, search: next.search });
    }
    scrollAfterRender(next.hash);
  }, []);

  const value = useMemo(() => ({ ...location, navigate }), [location, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

/** Crawlable internal link: a real <a href> that navigates client-side. */
export const Link: React.FC<
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string }
> = ({ to, onClick, children, ...rest }) => {
  const { navigate } = useRouter();
  return (
    <a
      href={to}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
          return;
        }
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
};
