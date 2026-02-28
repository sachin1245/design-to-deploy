"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";

export type DesignSystem = "default" | "area";

const STORAGE_KEY = "design-system";

type DesignSystemContextValue = {
	designSystem: DesignSystem;
	setDesignSystem: (ds: DesignSystem) => void;
};

const DesignSystemContext = createContext<DesignSystemContextValue | undefined>(undefined);

function getServerSnapshot(): DesignSystem {
	return "default";
}

function getSnapshot(): DesignSystem {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === "area") return "area";
	} catch {
		/* SSR or access denied */
	}
	return "default";
}

function subscribe(callback: () => void): () => void {
	function handleStorage(e: StorageEvent) {
		if (e.key === STORAGE_KEY) callback();
	}
	window.addEventListener("storage", handleStorage);
	return () => window.removeEventListener("storage", handleStorage);
}

function applyToDOM(ds: DesignSystem) {
	const root = document.documentElement;
	if (ds === "default") {
		root.removeAttribute("data-design-system");
	} else {
		root.setAttribute("data-design-system", ds);
	}
}

export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
	const designSystem = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

	const setDesignSystem = useCallback((ds: DesignSystem) => {
		try {
			if (ds === "default") {
				localStorage.removeItem(STORAGE_KEY);
			} else {
				localStorage.setItem(STORAGE_KEY, ds);
			}
		} catch {
			/* quota exceeded or access denied */
		}
		applyToDOM(ds);
		// Dispatch storage event for other tabs / useSyncExternalStore
		window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
	}, []);

	// Sync DOM on mount and when value changes
	useEffect(() => {
		applyToDOM(designSystem);
	}, [designSystem]);

	return (
		<DesignSystemContext.Provider value={{ designSystem, setDesignSystem }}>
			{children}
		</DesignSystemContext.Provider>
	);
}

export function useDesignSystem(): DesignSystemContextValue {
	const ctx = useContext(DesignSystemContext);
	if (!ctx) {
		throw new Error("useDesignSystem must be used within a DesignSystemProvider");
	}
	return ctx;
}
