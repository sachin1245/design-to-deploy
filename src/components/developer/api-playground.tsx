"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const REQUEST_CODE = `GET /api/v1/users?limit=20 HTTP/1.1
Host: api.clarity.dev
Authorization: Bearer sk_live_...
Content-Type: application/json
Accept: application/json`;

const RESPONSE_CODE = `{
  "data": [
    {
      "id": "usr_2xK9mQ",
      "name": "Ada Lovelace",
      "email": "ada@example.com",
      "role": "admin",
      "createdAt": "2026-01-15T08:30:00Z"
    }
  ],
  "meta": {
    "total": 847,
    "page": 1,
    "limit": 20
  }
}`;

const SCHEMA_CODE = `type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member" | "viewer";
  createdAt: string;
};

type UsersResponse = {
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};`;

const TABS_CONTENT = {
	request: REQUEST_CODE,
	response: RESPONSE_CODE,
	schema: SCHEMA_CODE,
} as const;

type ApiPlaygroundProps = {
	className?: string;
};

export function ApiPlayground({ className }: ApiPlaygroundProps) {
	const shouldReduce = useReducedMotion();
	const [activeTab, setActiveTab] = useState("request");

	const animationProps = shouldReduce
		? {}
		: {
				initial: { opacity: 0, y: 8 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: -8 },
				transition: { duration: 0.2 },
			};

	return (
		<section className={cn("py-24 sm:py-32", className)} aria-label="API playground">
			<div className="mx-auto max-w-6xl px-6 sm:px-8">
				<div className="text-center mb-12">
					<h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						Try the <span className="text-primary">API playground</span>
					</h2>
					<p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
						Explore request and response shapes before writing a single line of code.
					</p>
				</div>

				<div className="overflow-hidden rounded-lg border border-border bg-[#0d0b14] shadow-xl max-w-3xl mx-auto">
					<Tabs value={activeTab} onValueChange={setActiveTab}>
						<div className="border-b border-border/50 px-4 pt-3">
							<TabList className="border-0">
								<Tab value="request" className="font-mono text-xs">
									Request
								</Tab>
								<Tab value="response" className="font-mono text-xs">
									Response
								</Tab>
								<Tab value="schema" className="font-mono text-xs">
									Schema
								</Tab>
							</TabList>
						</div>

						<div className="p-5 min-h-[280px]">
							<AnimatePresence mode="wait">
								<TabPanel value="request">
									<motion.pre
										key="request"
										className="font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap"
										{...animationProps}
									>
										{TABS_CONTENT.request}
									</motion.pre>
								</TabPanel>
								<TabPanel value="response">
									<motion.pre
										key="response"
										className="font-mono text-sm leading-relaxed text-emerald-400 whitespace-pre-wrap"
										{...animationProps}
									>
										{TABS_CONTENT.response}
									</motion.pre>
								</TabPanel>
								<TabPanel value="schema">
									<motion.pre
										key="schema"
										className="font-mono text-sm leading-relaxed text-primary whitespace-pre-wrap"
										{...animationProps}
									>
										{TABS_CONTENT.schema}
									</motion.pre>
								</TabPanel>
							</AnimatePresence>
						</div>
					</Tabs>
				</div>
			</div>
		</section>
	);
}
