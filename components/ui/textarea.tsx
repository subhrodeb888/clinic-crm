/*
  Importing everything from React.

  We need this mainly for TypeScript types like:
  - React.TextareaHTMLAttributes
*/

import * as React from "react";
/*
  cn() utility function.

  Used for combining multiple class names together.

  Helps merge:
  - default styles
  - custom styles from props
*/

import { cn } from "@/lib/utils";

/*
  TypeScript type for Textarea component props.

  React.TextareaHTMLAttributes<HTMLTextAreaElement>

  This automatically includes ALL normal
  HTML textarea attributes.

  Examples:
  - placeholder
  - value
  - onChange
  - rows
  - disabled
  - className

  Without this,
  we would need to define all props manually.
*/

type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;


/*
  Reusable Textarea component.

  Purpose:
  Create one styled textarea component
  that can be reused throughout the app.
*/

export function Textarea({

  /*
    className

    Allows users to pass extra custom styles.

    Example:

    <Textarea className="bg-gray-50" />
  */

  className,


  /*
    ...props

    Rest operator.

    Collects all remaining props.

    Example:
    - placeholder
    - rows
    - value
    - onChange
    - disabled
  */

  ...props

}: TextareaProps) {



  return (

    /*
      Actual HTML textarea element.

      Used for multi-line text input.
    */

    <textarea

      /*
        Combining:
        - default styles
        - extra custom styles
      */

      className={cn(

        /*
          DEFAULT TAILWIND STYLES
          ------------------------
        */

        `
        min-h-30 w-full rounded-lg

        border border-gray-300

        bg-white px-3 py-2

        text-sm

        outline-none

        focus:border-blue-500

        focus:ring-2

        focus:ring-blue-100
        `,

        /*
          Tailwind CSS classes explained
          --------------------------------

          min-h-30
          -> minimum height for textarea

          w-full
          -> textarea takes full width
             of parent container

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


          focus:border-blue-500
          -> blue border when textarea
             is focused/clicked



          focus:ring-2
          -> adds focus ring effect


          focus:ring-blue-100
          -> light blue ring color
        */


        /*
          Additional custom classes
          passed by component user.
        */

        className,
      )}



      /*
        Spread operator

        Passes all remaining props
        into textarea element.

        Example:
        - placeholder
        - rows
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

  <Textarea
    placeholder="Write notes..."
  />

  <Textarea
    rows={6}
  />


  <Textarea
    disabled
  />


  <Textarea
    className="bg-gray-50"
  />


  WHY CREATE REUSABLE COMPONENTS?
  --------------------------------

  Without reusable components:

  You repeat same Tailwind classes
  everywhere.


  With reusable components:

  - cleaner code
  - consistent UI
  - easier maintenance
  - reusable across app
*/