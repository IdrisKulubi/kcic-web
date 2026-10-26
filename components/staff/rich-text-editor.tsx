"use client"

import { useCallback, useEffect } from "react"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import Youtube from "@tiptap/extension-youtube"
import { EditorContent, useEditor, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useUploadThing } from "@/utils/uploadthing"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  TextB,
  TextItalic,
  ListBullets,
  ListNumbers,
  Quotes,
  Link as LinkIcon,
  Image as ImageIcon,
  YoutubeLogo,
  ArrowCounterClockwise,
  ArrowClockwise,
  TextHTwo,
  TextHThree,
} from "@phosphor-icons/react"

interface RichTextEditorProps {
  id?: string
  value: string
  onChange: (html: string) => void
  onWordCountChange?: (wordCount: number) => void
}

function countWords(html: string) {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  return text ? text.split(" ").length : 0
}

export function RichTextEditor({
  id,
  value,
  onChange,
  onWordCountChange,
}: RichTextEditorProps) {
  const { startUpload, isUploading } = useUploadThing("imageUploader")

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer" },
      }),
      Image,
      Youtube.configure({ nocookie: true }),
      Placeholder.configure({
        placeholder: "Tell the story. Use headings to break up long articles.",
      }),
    ],
    content: value,
    onCreate: ({ editor: ed }) => {
      onWordCountChange?.(countWords(ed.getHTML()))
    },
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML()
      onChange(html)
      onWordCountChange?.(countWords(html))
    },
    editorProps: {
      attributes: {
        ...(id ? { id } : {}),
        "aria-label": "Article body",
        class: "staff-prose mx-auto min-h-[24rem] px-5 py-6 focus:outline-none md:px-10 md:py-8",
      },
    },
  })

  const state = useEditorState({
    editor,
    selector: ({ editor: ed }) =>
      ed
        ? {
            h2: ed.isActive("heading", { level: 2 }),
            h3: ed.isActive("heading", { level: 3 }),
            bold: ed.isActive("bold"),
            italic: ed.isActive("italic"),
            bulletList: ed.isActive("bulletList"),
            orderedList: ed.isActive("orderedList"),
            blockquote: ed.isActive("blockquote"),
            link: ed.isActive("link"),
            canUndo: ed.can().undo(),
            canRedo: ed.can().redo(),
          }
        : null,
  })

  useEffect(() => {
    if (!editor) return
    if (value !== editor.getHTML() && value !== "<p></p>") {
      editor.commands.setContent(value || "", { emitUpdate: false })
    }
  }, [editor, value])

  const setLink = useCallback(() => {
    if (!editor) return
    const previous = editor.getAttributes("link").href as string | undefined
    const url = window.prompt("Link URL", previous ?? "https://")
    if (url === null) return
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }, [editor])

  const addImage = useCallback(() => {
    if (!editor) return
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      const uploaded = await startUpload([file])
      const url = uploaded?.[0]?.ufsUrl ?? uploaded?.[0]?.url
      if (url) {
        editor.chain().focus().setImage({ src: url, alt: "" }).run()
      }
    }
    input.click()
  }, [editor, startUpload])

  const addYoutube = useCallback(() => {
    if (!editor) return
    const url = window.prompt("YouTube video URL")
    if (!url) return
    editor.commands.setYoutubeVideo({ src: url })
  }, [editor])

  return (
    <div className="rounded-xl bg-card ring-1 ring-border focus-within:ring-2 focus-within:ring-ring/40">
      <div
        role="toolbar"
        aria-label="Formatting"
        aria-controls={id}
        className="sticky top-12 z-10 flex flex-wrap items-center gap-0.5 rounded-t-xl border-b bg-card/95 px-2 py-1.5 backdrop-blur-sm"
      >
        <ToolbarButton
          label="Heading"
          shortcut="Ctrl+Alt+2"
          pressed={state?.h2}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <TextHTwo />
        </ToolbarButton>
        <ToolbarButton
          label="Subheading"
          shortcut="Ctrl+Alt+3"
          pressed={state?.h3}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <TextHThree />
        </ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton
          label="Bold"
          shortcut="Ctrl+B"
          pressed={state?.bold}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <TextB />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          shortcut="Ctrl+I"
          pressed={state?.italic}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <TextItalic />
        </ToolbarButton>
        <ToolbarButton
          label="Link"
          pressed={state?.link}
          disabled={!editor}
          onClick={setLink}
        >
          <LinkIcon />
        </ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton
          label="Bulleted list"
          pressed={state?.bulletList}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <ListBullets />
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          pressed={state?.orderedList}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <ListNumbers />
        </ToolbarButton>
        <ToolbarButton
          label="Quote"
          pressed={state?.blockquote}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        >
          <Quotes />
        </ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton
          label={isUploading ? "Uploading image…" : "Insert image"}
          disabled={!editor || isUploading}
          onClick={addImage}
        >
          <ImageIcon />
        </ToolbarButton>
        <ToolbarButton label="Embed YouTube video" disabled={!editor} onClick={addYoutube}>
          <YoutubeLogo />
        </ToolbarButton>
        <div className="ml-auto flex items-center gap-0.5">
          <ToolbarButton
            label="Undo"
            shortcut="Ctrl+Z"
            disabled={!state?.canUndo}
            onClick={() => editor?.chain().focus().undo().run()}
          >
            <ArrowCounterClockwise />
          </ToolbarButton>
          <ToolbarButton
            label="Redo"
            shortcut="Ctrl+Shift+Z"
            disabled={!state?.canRedo}
            onClick={() => editor?.chain().focus().redo().run()}
          >
            <ArrowClockwise />
          </ToolbarButton>
        </div>
      </div>
      {editor ? (
        <EditorContent editor={editor} />
      ) : (
        <div className="min-h-[24rem] px-5 py-6 md:px-10 md:py-8" aria-hidden>
          <div className="mx-auto flex max-w-[70ch] flex-col gap-3">
            <div className="h-4 w-11/12 animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
          </div>
        </div>
      )}
    </div>
  )
}

function ToolbarDivider() {
  return <span aria-hidden className="mx-1 h-5 w-px bg-border" />
}

function ToolbarButton({
  label,
  shortcut,
  children,
  onClick,
  pressed,
  disabled,
}: {
  label: string
  shortcut?: string
  children: React.ReactNode
  onClick: () => void
  pressed?: boolean
  disabled?: boolean
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={label}
            aria-pressed={pressed}
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onClick}
            className={cn(
              "rounded-md text-muted-foreground hover:text-foreground [&_svg]:size-[1.05rem]",
              pressed && "bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground"
            )}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {label}
        {shortcut ? <span className="ml-2 opacity-60">{shortcut}</span> : null}
      </TooltipContent>
    </Tooltip>
  )
}
