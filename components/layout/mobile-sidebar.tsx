"use client";

/*
  "use client"

  This component runs in the browser.

  Why?

  Because it uses:
  - Zustand state
  - click handlers
  - conditional rendering
  - interactive sidebar behavior
*/

/*
  Importing icons from Lucide React.

  Every icon here is actually a React component.

  Example:
  <X />
  <Users />
*/

import {
  X,
  LayoutDashboard,
  CalendarDays,
  Users,
  Stethoscope,
  CreditCard,
  BarChart3,
  Bell,
  Settings,
  ClipboardList,
} from "lucide-react";

/*
  sidebarLinks

  Array containing sidebar navigation data.

  Example:

  [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: "dashboard"
    }
  ]
*/

import { sidebarLinks } from "@/lib/navigation";

/*
  Reusable sidebar link component.
*/

import { SidebarLink } from "./sidebar-link";

/*
  Zustand sidebar store.

  Used for global sidebar state.

  Example:
  - open sidebar
  - close sidebar
  - check if sidebar is open
*/

import { useSidebarStore } from "@/store/sidebar-store";

/*
  iconMap

  Converts icon strings into actual React components.

  Example:

  "dashboard"
  ->
  LayoutDashboard component

  Why?

  Because sidebarLinks stores icons as strings.
*/

const iconMap = {
  dashboard: LayoutDashboard,
  calendar: CalendarDays,
  users: Users,
  stethoscope: Stethoscope,
  "credit-card": CreditCard,
  "bar-chart": BarChart3,
  bell: Bell,
  settings: Settings,
  queues: ClipboardList,
};

/*
  MobileSidebar component
*/

export function MobileSidebar() {
  /*
    Getting state and actions from Zustand store.

    isOpen
    -> whether sidebar is currently visible

    closeSidebar
    -> function to close sidebar
  */

  const { isOpen, closeSidebar } = useSidebarStore();

  /*
    Conditional rendering.

    If sidebar is NOT open,
    render nothing.

    null means:
    "show nothing on screen"
  */

  if (!isOpen) return null;

  return (
    <>
      {/*
        Fragment shorthand: <></>

        Used when returning multiple elements
        without adding extra HTML wrapper.
      */}

      {/*
        Dark background overlay behind sidebar.

        Clicking outside sidebar closes it.
      */}

      <div
        className="
          fixed inset-0 z-40
          bg-black/40
          lg:hidden
        "
        /*
          onClick event

          When user clicks overlay,
          closeSidebar() runs.
        */

        onClick={closeSidebar}
      />

      {/*
        Main mobile sidebar
      */}

      <aside
        className="
          fixed left-0 top-0 z-50
          flex h-full w-64 flex-col
          bg-white shadow-xl
          lg:hidden
        "
      >
        {/*
          Tailwind classes explained:

          fixed
          -> fixed to screen

          left-0
          -> stick to left side

          top-0
          -> stick to top

          z-50
          -> very high stacking order
             (appears above overlay)

          flex
          -> enables flexbox

          h-full
          -> full screen height

          w-64
          -> width = 256px

          flex-col
          -> vertical layout

          bg-white
          -> white background

          shadow-xl
          -> large shadow

          lg:hidden
          -> hidden on large screens
        */}

        {/*
          Sidebar header
        */}

        <div
          className="
            flex items-center
            justify-between
            border-b border-gray-200
            p-6
          "
        >
          {/*
            flex
            -> horizontal layout

            items-center
            -> vertically center items

            justify-between
            -> pushes items apart

            border-b
            -> bottom border

            p-6
            -> padding
          */}

          {/*
            Logo/title
          */}

          <h1 className="text-xl font-bold">ClinicFlow</h1>

          {/*
            Close button
          */}

          <button
            /*
              When button is clicked,
              sidebar closes.
            */

            onClick={closeSidebar}
          >
            {/*
              X icon

              size={20}
              -> 20px icon size
            */}

            <X size={20} />
          </button>
        </div>

        {/*
          Navigation links container
        */}

        <nav className="flex flex-1 flex-col gap-1 p-4">
          {/*
            flex
            -> enables flexbox

            flex-1
            -> fills remaining height

            flex-col
            -> vertical links

            gap-1
            -> small spacing between links

            p-4
            -> padding
          */}

          {/*
            Looping through sidebarLinks array.
          */}

          {sidebarLinks.map((link) => {
            /*
              Example link object:

              {
                label: "Dashboard",
                href: "/dashboard",
                icon: "dashboard"
              }
            */

            /*
              Getting actual icon component.

              Example:

              link.icon = "dashboard"

              iconMap["dashboard"]
              ->
              LayoutDashboard component
            */

            const Icon =
              iconMap[
                /*
                  TypeScript explanation:

                  link.icon is a string.

                  TypeScript worries maybe:
                  link.icon = "pizza"

                  But iconMap has no "pizza" key.

                  So we tell TypeScript:

                  "Only use keys that exist
                   inside iconMap."

                  keyof typeof iconMap
                  gives all valid keys.
                */

                link.icon as keyof typeof iconMap
              ];

            return (
              /*
                Rendering reusable SidebarLink
                component.
              */

              <SidebarLink
                /*
                  Unique key for React list rendering.
                */

                key={link.href}
                /*
                  Route path
                */

                href={link.href}
                /*
                  Sidebar text
                */

                label={link.label}
                /*
                  Actual icon component
                */

                icon={Icon}
              />
            );
          })}
        </nav>
      </aside>
    </>
  );
}
