"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		Sentry.captureException(error);
	}, [error]);

	return (
		<html lang="en">
			<body>
				<div
					style={{
						display: "flex",
						minHeight: "100vh",
						alignItems: "center",
						justifyContent: "center",
						fontFamily: "system-ui, sans-serif",
						backgroundColor: "#faf8f5",
						color: "#1c1427",
					}}
				>
					<div style={{ textAlign: "center", maxWidth: "400px", padding: "2rem" }}>
						<h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>
							Something went wrong
						</h2>
						<p style={{ fontSize: "0.875rem", color: "#736b7e", marginBottom: "1.5rem" }}>
							A critical error occurred. Please try again.
						</p>
						<button
							type="button"
							onClick={reset}
							style={{
								padding: "0.5rem 1rem",
								fontSize: "0.875rem",
								fontWeight: 500,
								color: "#faf8f5",
								backgroundColor: "#7c3aed",
								border: "none",
								borderRadius: "0.5rem",
								cursor: "pointer",
							}}
						>
							Try again
						</button>
					</div>
				</div>
			</body>
		</html>
	);
}
