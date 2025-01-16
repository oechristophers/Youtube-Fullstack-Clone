import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import styled, { css } from "styled-components";
import { cn } from "@/lib/utils";

// Styled Overlay for background blur
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  z-index: 1040;
`;

// Styled Popover Content with conditional styles
const PopoverC = styled(PopoverPrimitive.Content)`
  background-color: ${({ theme }) => theme.bg || "white"};
  color: ${({ theme }) => theme.text || "black"};
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 1050;

  ${({ $isBigPop }) =>
    $isBigPop &&
    css`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 90%;
      padding: 1rem;
    `}
`;

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef((props, ref) => {
  const { className, align = "center", sideOffset = 4, type = "default", open, children, ...prop } = props;

  return (
    <>
      {/* Render overlay only for bigPop when open */}
      {type === "bigPop" && open && <Overlay />}
      <PopoverPrimitive.Portal>
        <PopoverC
          ref={ref}
          align={type === "bigPop" ? undefined : align} // Ignore align for bigPop
          sideOffset={type === "bigPop" ? undefined : sideOffset} // Ignore sideOffset for bigPop
          $isBigPop={type === "bigPop"} // Apply conditional styling
          className={cn(
            "z-50 rounded-md border-zinc-200 bg-white p-4 text-zinc-950 shadow-md outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
            className
          )}
          {...prop}
        >
          {children}
        </PopoverC>
      </PopoverPrimitive.Portal>
    </>
  );
});

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
