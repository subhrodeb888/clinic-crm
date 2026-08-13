"use client";

/*
  "use client"

  This component runs in the browser.

  Why?

  Because it uses:
  - hooks (usePathname)
  - client-side navigation
  - interactive UI behavior

  In Next.js App Router,
  hooks only work inside Client Components.
*/

/*
  Link component from Next.js.

  Used instead of normal <a> tags.

  Why?

  Because Next.js Link:
  - enables fast client-side navigation
  - prevents full page reload
  - improves performance
*/

import Link from "next/link";

/*
  usePathname()

  Next.js hook.

  Gives the current URL pathname.

  Example:

  Current URL:
  /patients

  pathname becomes:
  "/patients"
*/

import { usePathname } from "next/navigation";

/*
  cn()

  Utility function for combining class names.

  Usually built using:
  - clsx
  - tailwind-merge

  Why use it?

  Instead of manually writing:

  className={
    isActive
      ? "..."
      : "..."
  }

  cn() helps combine classes cleanly.
*/

import { cn } from "@/lib/utils";

/*
  TypeScript type for component props.

  Props = data passed into a component.

  Example:

  <SidebarLink
    href="/dashboard"
    label="Dashboard"
    icon={LayoutDashboard}
  />

  This type defines what props are allowed.
*/

type SidebarLinkProps = {
  /*
    href

    URL path for navigation.

    Example:
    "/dashboard"
  */
  href: string;

  /*
    label

    Text shown in sidebar.
  */
  label: string;

  /*
    icon

    React component type.

    Example:
    LayoutDashboard

    React.ElementType means:
    "Any valid React component."
  */
  icon: React.ElementType;
};

/*
  SidebarLink component

  Receives props from parent component.
*/

export function SidebarLink({
  /*
    Destructuring props.

    Instead of:

    props.href
    props.label

    we directly extract them.
  */

  href,
  label,

  /*
    icon: Icon

    This renames the prop.

    Incoming prop name:
    icon

    Local variable name:
    Icon

    Why capital I?

    Because React components MUST start with capital letters.

    Example:

    <Icon />

    React treats this as a component.
  */

  icon: Icon,
}: SidebarLinkProps) {
  /*
    Current URL pathname.

    Example:
    "/dashboard"
  */

  const pathname = usePathname();

  /*
    Checking if current page matches link.

    Example:

    pathname = "/dashboard"
    href = "/dashboard"

    Result:
    true

    Used for active sidebar styling.
  */

  const isActive = pathname === href;

  return (
    /*
      Next.js Link component

      Clicking it changes route/page.
    */

    <Link
      /*
        Navigation destination
      */

      href={href}
      /*
        className

        CSS classes for styling.

        Using cn() to combine:
        - base styles
        - conditional styles
      */

      className={cn(
        /*
          Base styles
          Always applied.
        */

        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",

        /*
          Conditional styling

          If active:
          blue background + blue text

          Else:
          gray text + hover effects
        */

        isActive
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
      )}
    >
      {/*
        Icon component

        Example:
        <LayoutDashboard size={18} />

        size={18}
        -> icon size in pixels
      */}

      <Icon size={18} />

      {/*
        span

        Inline HTML element for text.
      */}

      <span>{label}</span>
    </Link>
  );
}
