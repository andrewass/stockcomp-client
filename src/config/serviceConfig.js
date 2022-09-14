const OAUTH2_REDIRECT_URL = "http://localhost:8000/";

export const STOCK_COMP_CLIENT_BASE_URL = process.env.STOCK_COMP_CLIENT_BASE_URL;
export const CONTEST_BASE_URL = process.env.REACT_APP_STOCK_CONTEST_BASE_URL;
export const STOCK_BASE_URL = process.env.REACT_APP_STOCK_QUOTE_BASE_URL;
export const AUTH_SERVER_URL = process.env.AUTH_SERVER_URL;
export const CLIENT_ID = process.env.CLIENT_ID;
export const REDIRECT_URI = STOCK_BASE_URL+"/symbols"