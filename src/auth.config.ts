export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // @ts-ignore
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOnDashboard = request?.url?.startsWith("/dashboard");

      if (isOnDashboard && isLoggedIn) {
        return true;
      }

      if (!isLoggedIn) {
        return false;
      }

      return Response.redirect("/dashboard", request.nextUrl);
    },
  },
  providers: [],
};
