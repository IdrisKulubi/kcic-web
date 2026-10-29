"use client"

import { useId, useRef, useState } from "react"
import { useUploadThing } from "@/utils/uploadthing"
import { formatFileSize } from "@/lib/data/knowledge-hub"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowsClockwise, FileArrowUp, FileText, Trash } from "@phosphor-icons/react"

export interface AttachmentValue {
  url: string
  name: string
  size: number | null
}

interface AttachmentFieldProps {
  id?: string
  value: AttachmentValue
  onChange: (value: AttachmentValue) => void
}

const EMPTY: AttachmentValue = { url: "", name: "", size: null }

export function AttachmentField({ id, value, onChange }: AttachmentFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const { startUpload, isUploading } = useUploadThing("documentUploader", {
    onUploadProgress: setProgress,
    onUploadError: (error) => setUploadError(error.message),
  })

  async function handleFiles(files: FileList | null) {
    const file = files?.[0]
    if (!file) return
    setUploadError(null)
    setProgress(0)
    const uploaded = await startUpload([file])
    const url = uploaded?.[0]?.ufsUrl ?? uploaded?.[0]?.url
    if (url) onChange({ url, name: file.name, size: file.size })
  }

  const fileInput = (
    <input
      ref={inputRef}
      id={inputId}
      type="file"
      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,application/pdf"
      className="sr-only"
      aria-label={value.url ? "Replace attachment" : "Upload attachment"}
      onChange={(event) => {
        void handleFiles(event.target.files)
        event.target.value = ""
      }}
    />
  )

  if (value.url && !isUploading) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 rounded-lg bg-muted/60 p-3 ring-1 ring-border">
          <FileText className="size-6 shrink-0 text-muted-foreground" aria-hidden />
          <div className="min-w-0 flex-1">
            <a
              href={value.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block truncate text-sm font-medium hover:underline hover:underline-offset-3"
            >
              {value.name || "Attached file"}
            </a>
            {value.size ? (
              <p className="text-xs text-muted-foreground">{formatFileSize(value.size)}</p>
            ) : null}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => inputRef.current?.click()}
          >
            <ArrowsClockwise className="size-3.5" />
            Replace
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onChange(EMPTY)}
          >
            <Trash className="size-3.5" />
            Remove
          </Button>
        </div>
        {fileInput}
        {uploadError ? (
          <p role="alert" className="text-sm text-destructive">{uploadError}</p>
        ) : null}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={inputId}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setIsDragging(false)
          void handleFiles(event.dataTransfer.files)
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/50 px-4 py-6 text-center transition-colors duration-150",
          "hover:border-ring hover:bg-secondary/60 has-[:focus-visible]:border-ring has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50",
          isDragging && "border-ring bg-secondary",
          isUploading && "pointer-events-none"
        )}
      >
        <FileArrowUp className="size-6 text-muted-foreground" aria-hidden />
        {isUploading ? (
          <span className="flex w-full max-w-40 flex-col items-center gap-2 text-sm text-muted-foreground">
            Uploading… {progress}%
            <span className="h-1 w-full overflow-hidden rounded-full bg-border">
              <span
                className="block h-full w-full origin-left bg-primary transition-transform duration-150"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </span>
          </span>
        ) : (
          <>
            <span className="text-sm font-medium">
              Drop a file or <span className="underline underline-offset-3">browse</span>
            </span>
            <span className="text-xs text-muted-foreground">PDF or Office document, up to 16 MB</span>
          </>
        )}
        {fileInput}
      </label>
      {uploadError ? (
        <p role="alert" className="text-sm text-destructive">{uploadError}</p>
      ) : null}
    </div>
  )
}
