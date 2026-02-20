# TESTED — Innovati-X

## Feature 1: Landing page
- [x] Desktop (1280px): All 6 sections render — hero, pipeline, methodologies, features, CTA, footer
- [x] Mobile (375px): Responsive stacking, no horizontal scroll
- [x] Console: Zero errors
- [x] Links: "Start Innovating" → /dashboard, "See How It Works" → #how-it-works

## Feature 2: Auth (Clerk)
- [x] `/dashboard` redirects unauthenticated users to Clerk sign-in
- [x] Landing page (`/`) remains public — no redirect
- [x] Sign-in page renders at `/sign-in`
- [x] Sign-up page renders at `/sign-up`
- [x] Console: Zero errors (only Clerk dev-mode warning, expected)

## Feature 3: Dashboard shell
- [x] Dashboard layout renders with sticky header (logo + "New Challenge" + UserButton)
- [x] Empty state card shows "No challenges yet" with CTA button
- [x] 3 demo challenge cards render in grid (Sustainable Urban Farming, Reducing Medical Wait Times, Clean Energy Storage)
- [x] Status badges colored correctly (emerald = Completed, amber = In Progress)
- [x] Auth middleware protects route — redirects to sign-in when not authenticated
- [x] Console: Zero errors
- [x] TypeScript: `tsc --noEmit` passes
