const isProduction = false;

export const HOSTNAME = isProduction
  ? "https://api.housingeditor.com"
  : "http://localhost:3000";
