import { clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";



const isProtectedRoute =createRouteMatcher([
  '/Dashboard(.*)'])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};


//gacaj10826@facais.com