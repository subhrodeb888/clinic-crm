/*
  Importing everything from React namespace.

  Needed for React TypeScript types like:
  - React.InputHTMLAttributes
*/

import * as React from "react";



/*
  cn() utility function.

  Used for combining class names cleanly.

  Helps merge:
  - default classes
  - custom classes
*/

import { cn } from "@/lib/utils";


/*
  TypeScript type for Input component props.

  React.InputHTMLAttributes<HTMLInputElement>

  Gives ALL normal HTML input props automatically.

  Examples:
  - placeholder
  - type
  - value
  - onChange
  - disabled
  - className

  Without this,
  we would need to define all props manually.
*/

type InputProps =
  React.InputHTMLAttributes<HTMLInputElement>;

/*
  Reusable Input component
*/

export function Input({

  /*
    className

    Extra custom CSS classes
    passed by user.

    Example:

    <Input className="bg-red-100" />
  */

  className,



  /*
    ...props

    Rest operator.

    Collects all remaining props.

    Example:
    - placeholder
    - type
    - value
    - onChange
    - disabled
  */

  ...props

}: InputProps) {




  return (

    /*
      Actual HTML input element
    */

    <input

      /*
        className

        Combining:
        - default styles
        - custom styles
      */

      className={cn(

        /*
          DEFAULT INPUT STYLES
          ---------------------
        */

        `
        flex h-10 w-full rounded-lg

        border border-gray-300

        bg-white px-3 py-2

        text-sm

        outline-none

        transition-colors

        placeholder:text-gray-400

        focus:border-blue-500

        focus:ring-2

        focus:ring-blue-100
        `,


        /*
          Tailwind CSS classes explained
          --------------------------------

          flex
          -> enables flexbox behavior

          h-10
          -> height = 40px

          w-full
          -> full width of parent container

          rounded-lg
          -> rounded corners

          border
          -> adds border

          border-gray-300
          -> light gray border color


          bg-white
          -> white background

          px-3
          -> horizontal padding

          py-2
          -> vertical padding


          text-sm
          -> smaller text size


          outline-none
          -> removes default browser outline


          transition-colors
          -> smooth color animation
             during hover/focus


          placeholder:text-gray-400
          -> placeholder text becomes gray


          focus:border-blue-500
          -> blue border when input is focused


          focus:ring-2
          -> adds ring effect on focus


          focus:ring-blue-100
          -> light blue ring color
        */

        /*
          Extra custom classes passed
          by component user.
        */

        className,
      )}

      /*
        Spread operator

        Passes all remaining props
        into input element.

        Example:
        - placeholder
        - type
        - value
        - onChange
        - disabled
      */

      {...props}
    />
  );
}


/*
  EXAMPLE USAGE
  ---------------

  <Input
    placeholder="Enter email"
  />

  <Input
    type="password"
  />

  <Input
    disabled
  />

  <Input
    className="bg-gray-50"
  />

  WHY CREATE A REUSABLE INPUT?
  -----------------------------

  Without reusable component:

  You repeat same Tailwind classes
  everywhere.


  With reusable Input component:

  - consistent styling
  - cleaner code
  - easier maintenance
  - reusable across app
*/