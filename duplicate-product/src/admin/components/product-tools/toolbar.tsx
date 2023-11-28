import { Tools } from "@medusajs/icons";
import { IconButton, Popover, Text } from "@medusajs/ui";
import * as React from "react";

interface ToolbarProps extends React.ComponentPropsWithoutRef<"div"> {}

const Root = ({ children }: ToolbarProps) => {
  return (
    <div className="flex items-center justify-end relative">
      <div className="fixed top-[88px] xsmall:right-4 small:right-8 medium:right-14">
        <Popover>
          <Popover.Trigger asChild>
            <IconButton className="rounded-full" size="large">
              <Tools className="text-ui-fg-subtle" />
            </IconButton>
          </Popover.Trigger>
          <Popover.Content
            side="left"
            align="center"
            className="w-fit h-fit min-w-0 p-0"
          >
            <div className="flex items-center">{children}</div>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  );
};

interface ToolbarButtonProps extends React.ComponentPropsWithoutRef<"button"> {}

const Button = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className="px-3 py-2 flex items-center justify-center hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed outline-none transiiton-fg"
        {...rest}
      >
        <Text size="small" leading="compact">
          {children}
        </Text>
      </button>
    );
  }
);
Button.displayName = "Toolbar.Button";

export const Toolbar = Object.assign(Root, {
  Button,
});
