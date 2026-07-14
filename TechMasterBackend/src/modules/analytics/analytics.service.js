export const getAnalyticsService = async () => {
  return {
    summary: {
      totalPageviews: 98400,
      avgSessionDuration: "2m 48s",
      bounceRate: "41.6%",
      activeSessions: 42,
    },

    traffic: [
      {
        date: "06/26",
        mobile: 4200,
        desktop: 2500,
      },
      {
        date: "06/27",
        mobile: 4700,
        desktop: 2800,
      },
      {
        date: "06/28",
        mobile: 5200,
        desktop: 3100,
      },
      {
        date: "06/29",
        mobile: 6100,
        desktop: 3500,
      },
      {
        date: "06/30",
        mobile: 5900,
        desktop: 3400,
      },
      {
        date: "07/01",
        mobile: 6800,
        desktop: 3900,
      },
      {
        date: "07/02",
        mobile: 7600,
        desktop: 4300,
      },
    ],

    referrals: [
      {
        channel: "Google",
        visitors: 5200,
        percentage: 52,
      },
      {
        channel: "Direct",
        visitors: 2500,
        percentage: 25,
      },
      {
        channel: "Social",
        visitors: 1800,
        percentage: 18,
      },
      {
        channel: "Others",
        visitors: 500,
        percentage: 5,
      },
    ],

    topPages: [
      {
        path: "/",
        views: 12400,
        avgDuration: "3m 10s",
      },
      {
        path: "/portfolio",
        views: 8100,
        avgDuration: "2m 32s",
      },
      {
        path: "/blogs",
        views: 6900,
        avgDuration: "2m 01s",
      },
      {
        path: "/contact",
        views: 4100,
        avgDuration: "1m 44s",
      },
    ],
  };
};