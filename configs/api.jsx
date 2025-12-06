export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
  ENDPOINTS: {
    AUTH: {
      SIGNUP: "/auth/register",
      SIGNIN: "/auth/login",
    },

    ACCOUNT: {
      CREATE: "/account/create/",
      GET: "/account/",
      walletBalance: "/wallet/",
      allWalletTransactions: "/wallet/",
    },

    PROFILE: {
      UPDATE: "/profile/update",
      GET: "/user/profile",
      UPDATE_USER: "/user/update",
      DELETE: "/user/delete/",
      SHIPPING: "/profile/shipping",
    },

    FUNDING_HISTORY: {
      GET: "/wallet/",
    },

    NIN_VERIFICATION: {
      CREATE: "/verify/nin",
      DATA_HISTORY: "/transactions/dataHistory/", // append userId
    },
    BVN_VERIFICATION: {
      CREATE: "/verify/bvn",
      DATA_HISTORY: "/transactions/dataHistory/", // append userId
    },
  },
};

export const apiUrl = (endpoint) => `${API_CONFIG.BASE_URL}${endpoint}`;
