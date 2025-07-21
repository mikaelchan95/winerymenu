/**
 * Utility functions for URL manipulation and sharing
 */

/**
 * Creates a shareable URL for a specific menu category or tab
 */
export const createShareableUrl = (tab: string = 'menu', category?: string): string => {
  const baseUrl = window.location.origin + window.location.pathname;
  const params = new URLSearchParams();
  
  if (tab !== 'menu') {
    params.set('tab', tab);
  }
  
  if (category && category !== 'tapas') {
    params.set('category', category);
  }
  
  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

/**
 * Copies the current page URL to clipboard
 */
export const copyCurrentUrl = async (): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    return true;
  } catch (error) {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackError) {
      console.error('Failed to copy URL:', fallbackError);
      return false;
    }
  }
};

/**
 * Validates if a URL parameter value is safe to use
 */
export const isValidUrlParam = (value: string): boolean => {
  return /^[a-zA-Z0-9_-]+$/.test(value);
};

/**
 * Gets URL parameters as an object
 */
export const getUrlParams = (): Record<string, string> => {
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  
  for (const [key, value] of params.entries()) {
    if (isValidUrlParam(key) && isValidUrlParam(value)) {
      result[key] = value;
    }
  }
  
  return result;
};