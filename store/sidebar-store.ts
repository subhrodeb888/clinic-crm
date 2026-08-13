/*
  Importing create function from Zustand.

  Zustand = small state management library for React.

  Used for:
  - global state
  - shared state across components

  Example:
  - sidebar open/close state
  - theme state
  - auth state
*/

import { create } from "zustand";

/*
  TypeScript type for Zustand store.

  Defines:
  - what data exists in store
  - what functions/actions exist
*/

type SidebarStore = {
  /*
    isOpen

    Boolean value.

    true  -> sidebar is open
    false -> sidebar is closed
  */

  isOpen: boolean;

  /*
    toggleSidebar

    Function type.

    () => void means:

    - function takes no arguments
    - function returns nothing
  */

  toggleSidebar: () => void;

  /*
    closeSidebar

    Function to close sidebar.
  */

  closeSidebar: () => void;
};

/*
  Creating Zustand store.

  create<SidebarStore>()

  Means:

  "Create a store that follows
   SidebarStore type structure."
*/

export const useSidebarStore = create<SidebarStore>(
  /*
    Zustand provides set function.

    set() is used to update state.
  */

  (set) => ({
    /*
      Initial state
    */

    /*
      Sidebar starts closed by default.
    */

    isOpen: false,

    /*
      toggleSidebar function

      Purpose:
      Open sidebar if closed,
      close sidebar if open.
    */

    toggleSidebar: () =>
      /*
        set()

        Updates Zustand state.
      */

      set(
        /*
          state

          Current store state.

          Example:

          {
            isOpen: true
          }
        */

        (state) => ({
          /*
            !state.isOpen

            ! means NOT operator.

            true  -> false
            false -> true

            So this toggles sidebar state.
          */

          isOpen: !state.isOpen,
        }),
      ),

    /*
      closeSidebar function

      Purpose:
      Always close sidebar.
    */

    closeSidebar: () =>
      /*
        Directly setting state.
      */

      set({
        /*
          Force sidebar closed.
        */

        isOpen: false,
      }),
  }),
);

/*
  HOW THIS STORE IS USED
  -----------------------

  Inside components:

  const {
    isOpen,
    toggleSidebar,
    closeSidebar
  } = useSidebarStore();



  EXAMPLE FLOW
  -------------

  Initial:
  isOpen = false

  User clicks menu button:
  toggleSidebar()

  Result:
  isOpen = true

  Sidebar opens.

  WHY USE ZUSTAND?
  ----------------

  Without Zustand:

  You would pass props manually
  through many components.

  Example:
  App -> Navbar -> Sidebar -> Button

  This becomes messy.

  Zustand allows:

  Any component can directly access
  shared state globally.

  COMMON USE CASES
  ----------------

  - sidebar state
  - dark/light theme
  - authentication
  - cart state
  - modals
  - notifications
*/
