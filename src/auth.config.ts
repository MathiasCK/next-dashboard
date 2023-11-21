export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // @ts-ignore
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      if (
        process.env.NODE_ENV === "development" &&
        url.startsWith("http://localhost:3000")
      )
        return url;
      return baseUrl;
    },
    // @ts-ignore
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }
      return true;
    },
  },
};
