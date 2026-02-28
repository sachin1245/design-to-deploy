"use client";

import {
	type ChangeEvent,
	type DragEvent,
	forwardRef,
	type HTMLAttributes,
	useRef,
	useState,
} from "react";
import { cn } from "@/lib/utils";

type FileUploadProps = HTMLAttributes<HTMLDivElement> & {
	accept?: string;
	multiple?: boolean;
	onFilesChange?: (files: File[]) => void;
	maxSizeMB?: number;
};

const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
	({ className, accept, multiple = false, onFilesChange, maxSizeMB = 10, ...props }, ref) => {
		const [isDragging, setIsDragging] = useState(false);
		const [files, setFiles] = useState<File[]>([]);
		const inputRef = useRef<HTMLInputElement>(null);

		const handleFiles = (newFiles: FileList | null) => {
			if (!newFiles) return;
			const maxSize = maxSizeMB * 1024 * 1024;
			const valid = Array.from(newFiles).filter((f) => f.size <= maxSize);
			const updated = multiple ? [...files, ...valid] : valid.slice(0, 1);
			setFiles(updated);
			onFilesChange?.(updated);
		};

		const handleDrop = (e: DragEvent) => {
			e.preventDefault();
			setIsDragging(false);
			handleFiles(e.dataTransfer.files);
		};

		const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
			handleFiles(e.target.files);
		};

		const removeFile = (index: number) => {
			const updated = files.filter((_, i) => i !== index);
			setFiles(updated);
			onFilesChange?.(updated);
		};

		return (
			<div ref={ref} className={cn("w-full space-y-2", className)} {...props}>
				{/* biome-ignore lint/a11y/useSemanticElements: button element can't accept drag events properly; div with role="button" is the standard dropzone pattern */}
				<div
					onDragOver={(e) => {
						e.preventDefault();
						setIsDragging(true);
					}}
					onDragLeave={() => setIsDragging(false)}
					onDrop={handleDrop}
					onClick={() => inputRef.current?.click()}
					onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
					role="button"
					tabIndex={0}
					className={cn(
						"flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center cursor-pointer transition-colors",
						isDragging
							? "border-primary bg-primary/5"
							: "border-border hover:border-primary/50 hover:bg-muted/50",
					)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="h-8 w-8 text-muted-foreground"
						aria-hidden="true"
					>
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
						<polyline points="17 8 12 3 7 8" />
						<line x1="12" y1="3" x2="12" y2="15" />
					</svg>
					<div>
						<p className="text-sm font-medium text-foreground">
							Drop files here or click to browse
						</p>
						<p className="text-xs text-muted-foreground mt-1">Max {maxSizeMB}MB per file</p>
					</div>
					<input
						ref={inputRef}
						type="file"
						accept={accept}
						multiple={multiple}
						onChange={handleChange}
						className="hidden"
						aria-label="Upload files"
					/>
				</div>
				{files.length > 0 && (
					<ul className="space-y-1">
						{files.map((file, i) => (
							<li
								key={`${file.name}-${i}`}
								className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm"
							>
								<span className="truncate text-foreground">{file.name}</span>
								<button
									type="button"
									onClick={() => removeFile(i)}
									className="shrink-0 ml-2 text-muted-foreground hover:text-foreground transition-colors"
									aria-label={`Remove ${file.name}`}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="h-3.5 w-3.5"
										aria-hidden="true"
									>
										<path d="M18 6 6 18" />
										<path d="m6 6 12 12" />
									</svg>
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		);
	},
);
FileUpload.displayName = "FileUpload";

export { FileUpload };
export type { FileUploadProps };
