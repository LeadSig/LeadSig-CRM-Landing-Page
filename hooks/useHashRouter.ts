
import { useState, useEffect, useCallback } from 'react';

export interface HashRoute {
  path: string;
  params: Record<string, string>;
}

/**
 * Custom hook for hash-based routing with query parameter support.
 * Parses URLs like: /#/success?session_id=cs_test_abc123
 *
 * @returns {Object} Route info and navigation helpers
 */
export function useHashRouter() {
  const [route, setRoute] = useState<HashRoute>(() => parseHash(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((path: string, params?: Record<string, string>) => {
    let hash = `#/${path}`;
    if (params && Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      hash += `?${queryString}`;
    }
    window.location.hash = hash;
  }, []);

  const clearHash = useCallback(() => {
    // Remove hash without triggering a page reload
    history.pushState('', document.title, window.location.pathname + window.location.search);
    setRoute({ path: '', params: {} });
  }, []);

  return {
    path: route.path,
    params: route.params,
    sessionId: route.params.session_id || null,
    navigate,
    clearHash,
  };
}

/**
 * Parses a hash string into path and query parameters.
 *
 * Examples:
 * - "#/success?session_id=cs_test_123" => { path: "success", params: { session_id: "cs_test_123" } }
 * - "#/admin" => { path: "admin", params: {} }
 * - "" => { path: "", params: {} }
 */
function parseHash(hash: string): HashRoute {
  if (!hash || hash === '#' || hash === '#/') {
    return { path: '', params: {} };
  }

  // Remove leading "#/" or "#"
  let cleanHash = hash.startsWith('#/') ? hash.slice(2) : hash.slice(1);

  // Split path and query string
  const [pathPart, queryPart] = cleanHash.split('?');

  // Parse query parameters
  const params: Record<string, string> = {};
  if (queryPart) {
    const searchParams = new URLSearchParams(queryPart);
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
  }

  return {
    path: pathPart || '',
    params,
  };
}
