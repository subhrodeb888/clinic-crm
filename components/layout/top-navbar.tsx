"use client";

/*
  "use client"

  This component runs in the browser.

  Why?

  Because it uses:
  - Zustand state
  - button click events
  - interactive UI behavior
*/

/*
  Importing icons from Lucide React.

  These are React components.

  Example:
  <Menu />
  <Search />
*/

import { Menu, Search } from "lucide-react";

/*
  Zustand sidebar store.

  Used for managing sidebar state globally.

  Example:
  - open sidebar
  - close sidebar
  - toggle sidebar
*/

import { useSidebarStore } from "@/store/sidebar-store";

/*
  TopNavbar component
*/

export function TopNavbar() {
  /*
    Extracting toggleSidebar function
    from Zustand store.

    toggleSidebar()

    If sidebar is:
    - open -> closes it
    - closed -> opens it
  */

  const { toggleSidebar } = useSidebarStore();

  return (
    /*
      header

      Semantic HTML element.

      Used for:
      - top navigation
      - page header
      - toolbar
    */

    <header
      className="
        sticky top-0 z-30
        flex h-16 items-center justify-between
        border-b border-gray-200
        bg-white px-6
      "
    >
      {/*
        Tailwind CSS classes explained:

        sticky
        -> sticks while scrolling

        top-0
        -> stick to top of screen

        z-30
        -> stacking order

        flex
        -> enables flexbox

        h-16
        -> height = 4rem (64px)

        items-center
        -> vertically center items

        justify-between
        -> pushes left and right sections apart

        border-b
        -> bottom border

        border-gray-200
        -> light gray border color

        bg-white
        -> white background

        px-6
        -> horizontal padding
      */}

      {/*
        LEFT SECTION
        ----------------
        Contains:
        - mobile menu button
        - search bar
      */}

      <div className="flex items-center gap-4">
        {/*
          flex
          -> horizontal layout

          items-center
          -> vertical alignment

          gap-4
          -> spacing between children
        */}

        {/*
          Mobile menu button
        */}

        <button
          /*
            lg:hidden

            Hidden on large screens.

            Only visible on:
            - mobile
            - tablet
          */

          className="lg:hidden"
          /*
            When clicked:
            open/close mobile sidebar
          */

          onClick={toggleSidebar}
        >
          {/*
            Hamburger menu icon

            size={20}
            -> icon size in pixels
          */}

          <Menu size={20} />
        </button>

        {/*
          Search container
        */}

        <div
          className="
            hidden items-center gap-2
            rounded-lg border border-gray-200
            bg-gray-50 px-3 py-2
            md:flex
          "
        >
          {/*
            hidden
            -> hidden by default

            md:flex
            -> visible from medium screens and above

            items-center
            -> vertically center items

            gap-2
            -> spacing between icon and input

            rounded-lg
            -> rounded corners

            border
            -> adds border

            border-gray-200
            -> light gray border color

            bg-gray-50
            -> very light gray background

            px-3
            -> horizontal padding

            py-2
            -> vertical padding
          */}

          {/*
            Search icon
          */}

          <Search size={16} />

          {/*
            Input field
          */}

          <input
            /*
              Placeholder text
              shown when input is empty.
            */

            placeholder="Search patients..."
            className="
              bg-transparent text-sm outline-none
            "
          />

          {/*
            bg-transparent
            -> no background color

            text-sm
            -> smaller text size

            outline-none
            -> removes default browser outline
               when input is focused
          */}
        </div>
      </div>

      {/*
        RIGHT SECTION
        ----------------
        Contains:
        - profile/avatar
      */}

      <div className="flex items-center gap-4">
        {/*
          flex
          -> horizontal layout

          items-center
          -> vertical alignment

          gap-4
          -> spacing between items
        */}

        {/*
          User avatar circle
        */}

        <div
          className="
            flex h-9 w-9 items-center justify-center
            rounded-full bg-blue-500 text-white
          "
        >
          {/*
            flex
            -> enables flexbox

            h-9
            -> height = 36px

            w-9
            -> width = 36px

            items-center
            -> vertical centering

            justify-center
            -> horizontal centering

            rounded-full
            -> perfect circle

            bg-blue-500
            -> blue background

            text-white
            -> white text color
          */}
          {/*
            User initial

            Example:
            A = Admin or user name initial
          */}
          A
        </div>
      </div>
    </header>
  );
}
