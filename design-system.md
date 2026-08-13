**UI/UX Design System**

This project’s design system is a quiet, operational clinic-dashboard system: dense information, white surfaces, gray borders, blue primary actions, status colors, and responsive admin layouts. It is implemented mostly through Tailwind classes plus a few global utilities in [app/globals.css](/Volumes/MySSD/nextjs%20projects/clinic-dashboard/app/globals.css:1) and tokens in [styles/theme.css](/Volumes/MySSD/nextjs%20projects/clinic-dashboard/styles/theme.css:1).

**Foundations**

- Styling: Tailwind CSS v4.
- Font: `Arial, Helvetica, sans-serif`.
- App background: `#f5f7fb`.
- Main surface: white.
- Main text: `#111827`.
- Muted text: `#6b7280`.
- Border: `#e5e7eb`.
- Brand blue: `#2563eb`.
- Brand hover blue: `#1d4ed8`.
- Core radius tokens:
  - medium: `12px`
  - large: `16px`
- Shadows:
  - small: `0 1px 2px rgba(0, 0, 0, 0.05)`
  - medium: `0 4px 6px rgba(0, 0, 0, 0.08)`

**Status Colors**

- Success: green, used for paid/completed/active states.
- Warning: yellow/amber, used for follow-ups, checked-in, pending attention.
- Danger: red, used for high-risk, cancelled, failed, refund/destructive actions.
- Info: blue, used for scheduled/confirmed and neutral operational highlights.
- Neutral: gray, used for inactive or secondary metadata.

**Typography**

Global utility classes:

- `.page-title`: `text-2xl font-bold tracking-tight`
- `.section-title`: `text-lg font-semibold`
- `.card-title`: `text-sm font-medium`
- `.label-text`: `text-sm font-medium`
- `.helper-text`: `text-xs text-gray-500`
- `.table-text`: `text-sm text-gray-700`

Common hierarchy:

- Page title: `text-2xl font-bold`
- Section title: `text-lg font-semibold`
- Card/widget title: `text-base font-semibold text-gray-900`
- KPI value: `text-3xl font-bold`
- Secondary text: `text-sm text-gray-500`
- Dense labels: `text-xs text-gray-500`
- Table/body text: `text-sm text-gray-700`

**Spacing And Layout**

- Page padding: `p-4 md:p-6`.
- Standard page section spacing: `space-y-6`.
- Standard grid gap: `gap-6`.
- Card padding:
  - compact cards: `p-4`
  - normal cards: `p-5`
  - base `Card`: `p-6`
- Form spacing: usually `space-y-5` or `space-y-6`.
- Detail drawer spacing: `space-y-6` or `space-y-8`.
- Responsive layout patterns:
  - KPI grid: `sm:grid-cols-2 xl:grid-cols-4`
  - Two-column dashboard: `xl:grid-cols-2`
  - Main/sidebar layout: `xl:grid-cols-[2fr_1fr]`
  - Consultation workspace: `xl:grid-cols-[380px_minmax(0,1fr)]`
  - Queue board: `xl:grid-cols-4`

**Surfaces**

- Standard card: `rounded-xl border border-gray-200 bg-white shadow-sm`.
- Larger panels/widgets: `rounded-2xl border border-gray-200 bg-white shadow-sm`.
- Subtle grouped sections: `bg-gray-50`.
- Alert/attention panels:
  - red: `bg-red-50 border-red-100 text-red-700`
  - amber: `bg-amber-50 border-amber-100`
  - blue: `bg-blue-50 text-blue-700`
  - green: `bg-green-50 text-green-700`

**Core Components**

- [Button](/Volumes/MySSD/nextjs%20projects/clinic-dashboard/components/ui/button.tsx:1)
  - Base: inline flex, centered, rounded, medium weight, disabled opacity.
  - Variants:
    - `primary`: blue filled button.
    - `secondary`: gray filled button.
    - `outline`: white button with gray border.
    - `danger`: red destructive button.
    - `ghost`: minimal hover-only button.
  - Sizes:
    - `sm`: `h-8 px-3 text-sm`
    - `md`: `h-10 px-4 text-sm`
    - `lg`: `h-11 px-6 text-base`

- [Input](/Volumes/MySSD/nextjs%20projects/clinic-dashboard/components/ui/input.tsx:1)
  - Full width, `h-10`, rounded, gray border, white background.
  - Focus: blue border and blue ring.

- [Select](/Volumes/MySSD/nextjs%20projects/clinic-dashboard/components/ui/select.tsx:1)
  - Same visual language as input.
  - Used heavily in filters and forms.

- [Textarea](/Volumes/MySSD/nextjs%20projects/clinic-dashboard/components/ui/textarea.tsx:1)
  - Full width, rounded, gray border, white background.
  - Used for notes, diagnosis, prescriptions, consultation text.

- [SearchInput](/Volumes/MySSD/nextjs%20projects/clinic-dashboard/components/ui/search-input.tsx:1)
  - Input with left search icon.
  - Adds left padding for icon alignment.

- [FormField](/Volumes/MySSD/nextjs%20projects/clinic-dashboard/components/ui/form-field.tsx:1)
  - Label + child control + optional red error text.

- [Badge](/Volumes/MySSD/nextjs%20projects/clinic-dashboard/components/ui/badge.tsx:1)
  - Pill shape, `text-xs font-medium`.
  - Variants: `success`, `warning`, `danger`, `info`, `neutral`.

- [Card](/Volumes/MySSD/nextjs%20projects/clinic-dashboard/components/ui/card.tsx:1)
  - Base white bordered panel with rounded corners and shadow.

- [ChartCard](/Volumes/MySSD/nextjs%20projects/clinic-dashboard/components/ui/chart-card.tsx:1)
  - Card with title, optional description, and fixed chart area.

- [Modal](/Volumes/MySSD/nextjs%20projects/clinic-dashboard/components/ui/modal.tsx:1)
  - Centered overlay dialog.
  - Overlay: black `40%` with slight blur.
  - Panel: white, rounded-2xl, max width, shadow.

- [Drawer](/Volumes/MySSD/nextjs%20projects/clinic-dashboard/components/ui/drawer.tsx:1)
  - Right-side full-height overlay panel.
  - Used for appointment, invoice, reminder details.

**Navigation And Shell**

- [DashboardShell](/Volumes/MySSD/nextjs%20projects/clinic-dashboard/components/layout/dashboard-shell.tsx:1)
  - Main app frame: sidebar + top navbar + content.
  - Background: `bg-gray-50`.

- Sidebar:
  - Desktop width: `w-64`.
  - White surface, right border.
  - Active link: `bg-blue-50 text-blue-600`.
  - Inactive link: gray text, gray hover background.
  - Icons from `lucide-react`.

- Top navbar:
  - Sticky, `h-16`, white, bottom border.
  - Mobile menu button.
  - Search field visible from medium screens.
  - Circular blue avatar.

- Page header:
  - Title + description + optional action.
  - Stacks on mobile, row layout on larger screens.

**Tables**

Shared table: [components/tables/data-table.tsx](/Volumes/MySSD/nextjs%20projects/clinic-dashboard/components/tables/data-table.tsx:1)

- White bordered rounded table container.
- Header: gray background, uppercase small text.
- Rows: border-top, hover gray background.
- Cells: `px-4 py-4 text-sm`.
- Supports sorting, filtering, pagination.
- Toolbars usually sit above tables.
- Patient, billing, reminder toolbars use a framed filter panel: `rounded-2xl border bg-white p-4`.
- Appointments toolbar is lighter and unframed.

Mobile note: tables should use horizontal overflow or mobile card layouts, because current multi-column tables can exceed screen width.

**Charts**

- Dashboard charts use Recharts.
- Report analytics also use chart panels.
- Chart areas typically use `h-80`.
- Grid lines: light slate/gray.
- Blue: appointments/info.
- Green: revenue/success.
- Purple: patient growth.
- Red: no-show/danger.
- Pie chart uses green, yellow, blue, red, gray slices.

**Calendar**

Uses `react-big-calendar`.

Global overrides:

- Inherits app font.
- Toolbar buttons are white, bordered, rounded.
- Active toolbar button is blue with white text.
- Events are blue rounded blocks.
- Today is light blue.
- Time view has rounded border and hidden overflow.
- Calendar page wraps the calendar in a white card with fixed tall viewport height.

**Feature UX Patterns**

- Dashboard:
  - KPI cards first.
  - Charts next.
  - Activity and overview panels below.
  - Quick actions as button grid.

- Appointments:
  - Table/list view with filters.
  - Calendar view separately.
  - Add appointment opens modal.
  - Row click opens details drawer.

- Patients:
  - Table with search/status filter.
  - Status badges for active, inactive, follow-up, high-risk.
  - Profile page uses header, summary cards, sticky actions, tabs, timeline.

- Queue:
  - Kanban-style four-column board.
  - Columns: Waiting, Checked In, In Consultation, Completed.
  - Queue cards show patient, phone, time, doctor, and next action.

- Doctor dashboard:
  - KPI cards plus operational widgets.
  - Uses `DashboardWidget` as a larger widget shell.
  - Lists use bordered inner cards.

- Consultation workspace:
  - Sticky consultation header.
  - Left panel: patient context.
  - Right panel: clinical form, diagnosis, prescription builder, actions.
  - Desktop becomes two-column; mobile stacks.

- Billing:
  - KPI strip + billing table.
  - Invoice details use large right drawer.
  - Invoice creation uses large modal.
  - Invoice item rows use nested cards.

- Reports:
  - KPI strip.
  - Chart grid.
  - Operational insight cards.

- Reminders:
  - KPI strip.
  - Table with status/type badges.
  - Detail drawer pattern similar to billing.

- Settings:
  - Uses cards, forms, staff table, role badges, permission indicators.
  - Same grid/card/form language as the rest of the app.

**Interaction Rules**

- Primary actions use blue filled buttons.
- Secondary actions use gray or outline buttons.
- Destructive actions use red.
- Icon-only table actions use gray icons with hover backgrounds; destructive icon actions hover red.
- Inputs focus with blue border/ring.
- Rows hover with gray background.
- Modals/drawers close via overlay or X button.
- Sticky elements:
  - top navbar
  - consultation header
  - patient profile action bar
  - timeline date labels

**Current Design Gaps**

- CSS variables exist, but many components hardcode Tailwind colors directly.
- Button focus states are weaker than input focus states.
- Icon-only buttons do not consistently have labels/tooltips.
- Some form fields use raw `<input>`/`textarea` instead of shared `Input`/`Textarea`.
- Cards use both `rounded-xl` and `rounded-2xl` without strict rules.
- Tables need a formal mobile pattern: horizontal scroll or card-style mobile rows.
- Several drawer/modal variants are duplicated instead of using one shared primitive.

In short: the system is a clean admin-dashboard design language: white cards, gray borders, blue actions, compact typography, status badges, responsive grids, and domain-specific panels for clinic workflows.
