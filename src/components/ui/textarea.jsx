import * as React from "react";

import { cn } from "../../lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-[8px] border border-muted bg-white dark:bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus:border-primary focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
