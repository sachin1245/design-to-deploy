import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Step = {
	label: string;
	description?: string;
};

type StepperProps = HTMLAttributes<HTMLOListElement> & {
	steps: Step[];
	activeStep: number;
};

const Stepper = forwardRef<HTMLOListElement, StepperProps>(
	({ className, steps, activeStep, ...props }, ref) => (
		<ol
			ref={ref}
			className={cn("flex items-center gap-2", className)}
			aria-label="Progress"
			{...props}
		>
			{steps.map((step, index) => {
				const status =
					index < activeStep ? "completed" : index === activeStep ? "active" : "pending";
				return (
					<li key={step.label} className="flex items-center gap-2">
						{index > 0 && (
							<div
								className={cn("h-px w-8 sm:w-12", index <= activeStep ? "bg-primary" : "bg-border")}
								aria-hidden="true"
							/>
						)}
						<div className="flex items-center gap-2">
							<span
								className={cn(
									"flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors",
									status === "completed" && "bg-primary text-primary-foreground",
									status === "active" && "border-2 border-primary text-primary",
									status === "pending" && "border border-border text-muted-foreground",
								)}
								aria-current={status === "active" ? "step" : undefined}
							>
								{status === "completed" ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="h-3.5 w-3.5"
										aria-hidden="true"
									>
										<polyline points="20 6 9 17 4 12" />
									</svg>
								) : (
									index + 1
								)}
							</span>
							<div className="hidden sm:block">
								<p
									className={cn(
										"text-sm font-medium",
										status === "pending" ? "text-muted-foreground" : "text-foreground",
									)}
								>
									{step.label}
								</p>
								{step.description && (
									<p className="text-xs text-muted-foreground">{step.description}</p>
								)}
							</div>
						</div>
					</li>
				);
			})}
		</ol>
	),
);
Stepper.displayName = "Stepper";

export { Stepper };
export type { StepperProps, Step };
