"use client";

import { createContext, forwardRef, type HTMLAttributes, type ReactNode, useContext } from "react";
import { cn } from "@/lib/utils";

type TabsContextValue = {
	value: string;
	onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue>({
	value: "",
	onValueChange: () => {},
});

type TabsProps = HTMLAttributes<HTMLDivElement> & {
	value: string;
	onValueChange: (value: string) => void;
};

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
	({ className, value, onValueChange, ...props }, ref) => (
		<TabsContext.Provider value={{ value, onValueChange }}>
			<div ref={ref} className={cn("w-full", className)} {...props} />
		</TabsContext.Provider>
	),
);
Tabs.displayName = "Tabs";

type TabListProps = HTMLAttributes<HTMLDivElement>;

const TabList = forwardRef<HTMLDivElement, TabListProps>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		role="tablist"
		className={cn("inline-flex items-center gap-1 border-b border-border", className)}
		{...props}
	/>
));
TabList.displayName = "TabList";

type TabProps = HTMLAttributes<HTMLButtonElement> & {
	value: string;
	disabled?: boolean;
};

const Tab = forwardRef<HTMLButtonElement, TabProps>(
	({ className, value, disabled, ...props }, ref) => {
		const ctx = useContext(TabsContext);
		const isActive = ctx.value === value;

		return (
			<button
				ref={ref}
				type="button"
				role="tab"
				aria-selected={isActive}
				disabled={disabled}
				className={cn(
					"inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors -mb-px border-b-2",
					isActive
						? "border-primary text-foreground"
						: "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
					disabled && "pointer-events-none opacity-50",
					className,
				)}
				onClick={() => ctx.onValueChange(value)}
				{...props}
			/>
		);
	},
);
Tab.displayName = "Tab";

type TabPanelProps = HTMLAttributes<HTMLDivElement> & {
	value: string;
	children: ReactNode;
};

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
	({ className, value, children, ...props }, ref) => {
		const ctx = useContext(TabsContext);
		if (ctx.value !== value) return null;

		return (
			<div ref={ref} role="tabpanel" className={cn("mt-3", className)} {...props}>
				{children}
			</div>
		);
	},
);
TabPanel.displayName = "TabPanel";

export { Tabs, TabList, Tab, TabPanel };
export type { TabsProps, TabListProps, TabProps, TabPanelProps };
