// Function to set the theme in the document, save it to localStorage, and store it as a cookie
export function setTheme(theme) {
  if (typeof document !== "undefined") {
    // Set the data-theme attribute on the document's root element
    document.documentElement.setAttribute('data-theme', theme);
    // Save the theme to localStorage
    localStorage.setItem('theme', theme);
    // Save the theme to cookies with SameSite attribute
    document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`; // 1 year expiration
  }
}

// Function to get the current theme from cookies or localStorage
export function getTheme() {
  // Retrieve the theme from cookies
  const getCookieTheme = () => {
    const cookieMatch = typeof document !== "undefined" ? document.cookie.match(/(^|;)\\s*theme=([^;]+)/) : null;
    return cookieMatch ? cookieMatch.pop() : null;
  };

  // Retrieve the theme from localStorage
  const getLocalStorageTheme = () => {
    return typeof localStorage !== "undefined" ? localStorage.getItem('theme') : null;
  };

  let theme = getCookieTheme();

  // If no theme is found in cookies, retrieve it from localStorage
  if (!theme) {
    theme = getLocalStorageTheme();
  }

  // If no theme is found in localStorage, default to 'light' and set it
  if (!theme) {
    theme = 'light';
  }

  // Set the theme
  if (typeof document !== "undefined") {
    setTheme(theme);
  }

  return theme;
}


export function getThemeCookie() {
  if (typeof document !== "undefined") {
    const cookieMatch = document.cookie.match(/(^|;)\\s*theme=([^;]+)/);
    return cookieMatch ? cookieMatch.pop() : null;
  }
}
