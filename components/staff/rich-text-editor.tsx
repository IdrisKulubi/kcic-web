"use client"

import { useCallback, useEffect } from "react"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import Youtube from "@tiptap/extension-youtube"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { newsArticleBodyClassName } from "@/lib/news-article-media"
import { useUploadThing } from "@/utils/uploadthing"
import { Button } from "@/components/ui/button"
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
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer" },
      }),
      Image,
      Youtube.configure({ nocookie: true }),
      Placeholder.configure({
        placeholder: "Write the full article…",
      }),
    ],
    content: value,
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML()
      onChange(html)
      onWordCountChange?.(countWords(html))
    },
    editorProps: {
      attributes: {
        class: cn(
          newsArticleBodyClassName,
          "min-h-[280px] rounded-b-lg border-0 bg-background px-4 py-3 focus:outline-none"
        ),
      },
    },
  })

  useEffect(() => {
    if (!editor) return
    const current = editor.getHTML()
    if (value !== current && value !== "<p></p>") {
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

  const addImage = useCallback(async () => {
    if (!editor) return
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      const uploaded = await startUpload([file])
      const url = uploaded?.[0]?.url
      if (url) {
        editor.chain().focus().setImage({ src: url }).run()
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

  if (!editor) {
    return (
      <div className="rounded-lg border bg-muted/30 p-8 text-sm text-muted-foreground">
        Loading editor…
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <div className="flex flex-wrap gap-1 border-b bg-muted/40 p-2">
        <ToolbarButton
          label="Heading 2"
          pressed={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <TextHTwo className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Heading 3"
          pressed={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <TextHThree className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Bold"
          pressed={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <TextB className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          pressed={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <TextItalic className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Bullet list"
          pressed={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <ListBullets className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          pressed={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListNumbers className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Quote"
          pressed={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quotes className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Link" onClick={setLink}>
          <LinkIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Image" disabled={isUploading} onClick={addImage}>
          <ImageIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="YouTube" onClick={addYoutube}>
          <YoutubeLogo className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <ArrowCounterClockwise className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <ArrowClockwise className="size-4" />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

function ToolbarButton({
  label,
  children,
  onClick,
  pressed,
  disabled,
}: {
  label: string
  children: React.ReactNode
  onClick: () => void
  pressed?: boolean
  disabled?: boolean
}) {
  return (
    <Button
      type="button"
      variant={pressed ? "secondary" : "ghost"}
      size="icon-sm"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
