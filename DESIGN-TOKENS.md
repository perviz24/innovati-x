# DESIGN TOKENS — Innovati-X

## Theme
- Mode: Dark (default, `className="dark"` on html)
- Base: shadcn/ui Zinc palette (New York style)

## Colors
| Token | Value | Usage |
|---|---|---|
| Primary | Violet-600 `#7c3aed` | CTA buttons, links, brand accent |
| Primary hover | Violet-700 `#6d28d9` | Button hover states |
| Background | `oklch(0.145 0 0)` | Page background (dark theme) |
| Card | `oklch(0.205 0 0)` | Card surfaces |
| Muted | `oklch(0.269 0 0)` | Secondary surfaces |
| Border | `oklch(1 0 0 / 10%)` | Subtle borders |
| Foreground | `oklch(0.985 0 0)` | Primary text |
| Muted foreground | `oklch(0.708 0 0)` | Secondary text |

## Accent Colors (Pipeline Stages)
| Stage | Color | Tailwind |
|---|---|---|
| Decomposition | Violet | `text-violet-400 bg-violet-500/10` |
| Research | Blue | `text-blue-400 bg-blue-500/10` |
| Gap Analysis | Emerald | `text-emerald-400 bg-emerald-500/10` |
| Innovation | Amber | `text-amber-400 bg-amber-500/10` |
| Scoring | Rose | `text-rose-400 bg-rose-500/10` |
| Patent | Cyan | `text-cyan-400 bg-cyan-500/10` |

## Typography
| Element | Class |
|---|---|
| H1 | `text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight` |
| H2 | `text-3xl sm:text-4xl font-bold tracking-tight` |
| H3 | `text-lg font-semibold` |
| Body | `text-sm leading-relaxed text-muted-foreground` |
| Mono | `font-mono text-xs` |
| Fonts | Geist Sans (body) + Geist Mono (code/data) |

## Spacing
- Section padding: `py-24 px-4`
- Max content width: `max-w-6xl mx-auto`
- Card padding: `p-6`
- Gap between cards: `gap-6`

## Components
- Buttons: shadcn Button, violet-600 primary, outline for secondary
- Cards: shadcn Card with `bg-card/50 backdrop-blur-sm` + colored borders
- Badges: shadcn Badge with custom colored variants
- Gradient text: `bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent`
