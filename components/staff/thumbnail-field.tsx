"use client"

import { useId, useRef, useState } from "react"
import { useUploadThing } from "@/utils/uploadthing"
import { RemoteThumbnail } from "@/components/remote-thumbnail"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ImageSquare, ArrowsClockwise, Trash } from "@phosphor-icons/react"

interface ThumbnailFieldProps {
  id?: string
  value: string
  onChange: (url: string) => void
  invalid?: boolean
  describedBy?: string
}

export function ThumbnailField({
  id,
  value,
  onChange,
  invalid,
  describedBy,
}: ThumbnailFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadProgress: setProgress,
    onUploadError: (error) => setUploadError(error.message),
  })

  async function handleFiles(files: FileList | null) {
    const file = files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setUploadError("Choose an image file (JPG, PNG or WebP).")
      return
    }
    setUploadError(null)
    setProgress(0)
    const uploaded = await startUpload([file])
    const url = uploaded?.[0]?.ufsUrl ?? uploaded?.[0]?.url
    if (url) onChange(url)
  }

  const fileInput = (
    <input
      ref={inputRef}
      id={inputId}
      type="file"
      accept="image/*"
      className="sr-only"
      aria-label={value ? "Replace cover image" : "Upload cover image"}
      aria-invalid={invalid}
      aria-describedby={describedBy}
      onChange={(event) => {
        void handleFiles(event.target.files)
        event.target.value = ""
      }}
    />
  )

  if (value && !isUploading) {
    return (
      <div className="flex flex-col gap-2">
        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted ring-1 ring-border">
          <RemoteThumbnail
            src={value}
            alt="Cover image preview"
            className="size-full object-cover"
          />
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
            onClick={() => onChange("")}
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
          "flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/50 px-4 text-center transition-colors duration-150",
          "hover:border-ring hover:bg-secondary/60 has-[:focus-visible]:border-ring has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50",
          isDragging && "border-ring bg-secondary",
          invalid && "border-destructive",
          isUploading && "pointer-events-none"
        )}
      >
        <ImageSquare className="size-7 text-muted-foreground" aria-hidden />
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
              Drop an image or <span className="underline underline-offset-3">browse</span>
            </span>
            <span className="text-xs text-muted-foreground">JPG, PNG or WebP, up to 4 MB</span>
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
