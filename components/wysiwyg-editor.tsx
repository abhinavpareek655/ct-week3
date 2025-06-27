"use client"

import { useState } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import TextStyle from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import FontFamily from "@tiptap/extension-font-family"
import HardBreak from "@tiptap/extension-hard-break"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Bold,
  Italic,
  UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  Copy,
  Type,
  FileText,
  Highlighter,
} from "lucide-react"

const templates = {
  "Cover Page": `
    <div style="text-align: center; padding: 60px 0;">
      <h1 style="font-size: 48px; font-weight: bold; color: #1e293b; margin-bottom: 20px; font-family: 'Times New Roman', serif;">
        Document Title
      </h1>
      <h2 style="font-size: 24px; color: #64748b; margin-bottom: 40px; font-family: 'Times New Roman', serif;">
        Subtitle or Description
      </h2>
      <hr style="width: 200px; margin: 40px auto; border: 1px solid #cbd5e1;" />
      <p style="font-size: 18px; color: #475569; margin-bottom: 10px;">
        Author Name
      </p>
      <p style="font-size: 16px; color: #64748b;">
        ${new Date().toLocaleDateString()}
      </p>
    </div>
  `,
  "Index Page": `
    <h1 style="font-size: 36px; font-weight: bold; color: #1e293b; margin-bottom: 30px; text-align: center; font-family: 'Times New Roman', serif;">
      Table of Contents
    </h1>
    <ol style="font-size: 16px; line-height: 2; color: #374151; max-width: 600px; margin: 0 auto;">
      <li><strong>Introduction</strong> ......................................................... 1</li>
      <li><strong>Chapter 1: Getting Started</strong> ...................................... 3</li>
      <li><strong>Chapter 2: Main Content</strong> ......................................... 8</li>
      <li><strong>Chapter 3: Advanced Topics</strong> .................................... 15</li>
      <li><strong>Conclusion</strong> ......................................................... 22</li>
      <li><strong>References</strong> ......................................................... 24</li>
      <li><strong>Appendix</strong> ........................................................... 26</li>
    </ol>
  `,
  "Business Letter": `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #374151;">
      <div style="text-align: right; margin-bottom: 2rem;">
        <p style="margin: 0 0 0.25rem 0;">Your Name</p>
        <p style="margin: 0 0 0.25rem 0;">Your Address</p>
        <p style="margin: 0 0 0.25rem 0;">City, State ZIP</p>
        <p style="margin: 0 0 0.25rem 0;">Email Address</p>
        <p style="margin: 0 0 1rem 0;">Phone Number</p>
        <p style="margin: 0;">${new Date().toLocaleDateString()}</p>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <p style="margin: 0 0 0.25rem 0;">Recipient Name</p>
        <p style="margin: 0 0 0.25rem 0;">Company Name</p>
        <p style="margin: 0 0 0.25rem 0;">Address</p>
        <p style="margin: 0;">City, State ZIP</p>
      </div>
      
      <p style="margin: 0 0 1rem 0;"><strong>Subject: [Subject Line]</strong></p>
      
      <p style="margin: 0 0 1rem 0;">Dear [Recipient Name],</p>
      
      <p style="margin: 0 0 1rem 0;">I am writing to [state your purpose]. This letter serves to [explain the main reason for writing].</p>
      
      <p style="margin: 0 0 1rem 0;">[Body paragraph with main content and details]</p>
      
      <p style="margin: 0 0 1rem 0;">Thank you for your time and consideration. I look forward to hearing from you soon.</p>
      
      <p style="margin: 0 0 0.5rem 0;">Sincerely,</p>
      <p style="margin: 0 0 0.5rem 0;">[Your Signature]</p>
      <p style="margin: 0;">Your Typed Name</p>
    </div>
  `,
  Resume: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #374151; max-width: 800px;">
      <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 20px;">
        <h1 style="font-size: 32px; font-weight: bold; color: #1e293b; margin-bottom: 10px;">
          [Your Full Name]
        </h1>
        <p style="font-size: 16px; color: #64748b;">
          Email: your.email@example.com | Phone: (555) 123-4567 | LinkedIn: linkedin.com/in/yourname
        </p>
      </div>
      
      <h2 style="color: #3b82f6; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">
        Professional Summary
      </h2>
      <p style="margin-bottom: 25px;">
        [Brief summary of your professional background and key achievements]
      </p>
      
      <h2 style="color: #3b82f6; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">
        Experience
      </h2>
      <div style="margin-bottom: 25px;">
        <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">[Job Title] - [Company Name]</h3>
        <p style="color: #64748b; margin-bottom: 10px;">[Start Date] - [End Date]</p>
        <ul style="margin-left: 20px;">
          <li>Achievement or responsibility 1</li>
          <li>Achievement or responsibility 2</li>
          <li>Achievement or responsibility 3</li>
        </ul>
      </div>
      
      <h2 style="color: #3b82f6; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">
        Education
      </h2>
      <div style="margin-bottom: 25px;">
        <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">[Degree] - [University Name]</h3>
        <p style="color: #64748b;">[Graduation Year]</p>
      </div>
      
      <h2 style="color: #3b82f6; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">
        Skills
      </h2>
      <p>[List your key skills separated by commas]</p>
    </div>
  `,
}

const fontSizes = [
  { label: "8px", value: "8px" },
  { label: "10px", value: "10px" },
  { label: "12px", value: "12px" },
  { label: "14px", value: "14px" },
  { label: "16px", value: "16px" },
  { label: "18px", value: "18px" },
  { label: "20px", value: "20px" },
  { label: "24px", value: "24px" },
  { label: "28px", value: "28px" },
  { label: "32px", value: "32px" },
  { label: "36px", value: "36px" },
  { label: "48px", value: "48px" },
  { label: "72px", value: "72px" },
]

const fontFamilies = [
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Times New Roman", value: "'Times New Roman', serif" },
  { label: "Helvetica", value: "Helvetica, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Courier New", value: "'Courier New', monospace" },
  { label: "Verdana", value: "Verdana, sans-serif" },
  { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
  { label: "Impact", value: "Impact, sans-serif" },
]

export function WysiwygEditor() {
  const [textColor, setTextColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#ffff00")
  const { toast } = useToast()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'mb-3',
          },
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      FontFamily.configure({
        types: ["textStyle"],
      }),
      HardBreak.configure({
        HTMLAttributes: {
          class: "break-all",
        },
      }),
    ],
    content: `
      <h2>Welcome to the WYSIWYG Editor!</h2>
      <p>Start creating your document here. Use the toolbar above to format your text with various styles, colors, and layouts.</p>
      <p>You can:</p>
      <ul>
        <li>Apply <strong>bold</strong>, <em>italic</em>, and <u>underline</u> formatting</li>
        <li>Change font families and sizes</li>
        <li>Add colors and highlights</li>
        <li>Insert links and images</li>
        <li>Create lists and align text</li>
        <li>Use preset templates</li>
      </ul>
      <p>Try selecting some text and using the formatting options!</p>
    `,
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[400px] p-6",
      },
      handleKeyDown: (view, event) => {
        // Handle Shift+Enter for line breaks
        if (event.key === 'Enter' && event.shiftKey) {
          event.preventDefault()
          editor?.chain().focus().setHardBreak().run()
          return true
        }
        return false
      },
    },
  })

  const handleCopy = async () => {
    if (!editor) return

    try {
      const html = editor.getHTML()

      // Create a more Word-compatible HTML structure with better line break handling
      const wordCompatibleHtml = `
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { 
                font-family: Arial, sans-serif; 
                line-height: 1.6; 
                margin: 0;
                padding: 20px;
              }
              p { 
                margin: 0 0 12px 0; 
                line-height: 1.6;
              }
              p:last-child {
                margin-bottom: 0;
              }
              h1, h2, h3, h4, h5, h6 { 
                margin: 16px 0 8px 0; 
                line-height: 1.3;
              }
              ul, ol { 
                margin: 12px 0; 
                padding-left: 24px; 
              }
              li { 
                margin: 4px 0; 
              }
              br {
                display: block;
                content: "";
                margin-top: 8px;
              }
              div[style*="text-align: right"] p {
                margin-bottom: 4px;
              }
              div[style*="margin-bottom"] p {
                margin-bottom: 4px;
              }
            </style>
          </head>
          <body>
            ${html}
          </body>
        </html>
      `

      // Copy both HTML and plain text to clipboard
      const plainText = editor.getText()

      if (navigator.clipboard && window.ClipboardItem) {
        const htmlBlob = new Blob([wordCompatibleHtml], { type: "text/html" })
        const textBlob = new Blob([plainText], { type: "text/plain" })

        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": htmlBlob,
            "text/plain": textBlob,
          }),
        ])
      } else {
        // Fallback for older browsers
        await navigator.clipboard.writeText(plainText)
      }

      toast({
        title: "Content Copied!",
        description: "Your formatted content has been copied to clipboard and can be pasted into Word.",
      })
    } catch (error) {
      console.error("Failed to copy:", error)
      toast({
        title: "Copy Failed",
        description: "Unable to copy content. Please try again.",
        variant: "destructive",
      })
    }
  }

  const applyTemplate = (templateName: string) => {
    if (!editor || !templates[templateName as keyof typeof templates]) return
    editor.commands.setContent(templates[templateName as keyof typeof templates])
    toast({
      title: "Template Applied",
      description: `${templateName} template has been loaded.`,
    })
  }

  const insertImage = () => {
    const url = prompt("Enter image URL:")
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const insertLink = () => {
    const url = prompt("Enter link URL:")
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const setFontSize = (size: string) => {
    if (!editor) return
    editor.chain().focus().setMark("textStyle", { fontSize: size }).run()
  }

  const setFontFamily = (family: string) => {
    if (!editor) return
    editor.chain().focus().setFontFamily(family).run()
  }

  if (!editor) {
    return <div>Loading editor...</div>
  }

  return (
    <Card className="w-full shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Rich Text Editor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Toolbar */}
        <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 rounded-lg border">
          {/* Text Formatting */}
          <div className="flex items-center gap-1">
            <Button
              variant={editor.isActive("bold") ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive("italic") ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive("underline") ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Font Controls */}
          <div className="flex items-center gap-2">
            <Select onValueChange={setFontFamily}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Font" />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setFontSize}>
              <SelectTrigger className="w-20">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                {fontSizes.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Color Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="text-color" className="sr-only">
                Text Color
              </Label>
              <div className="flex items-center gap-1 p-1 border rounded">
                <Type className="h-4 w-4" />
                <Input
                  id="text-color"
                  type="color"
                  value={textColor}
                  onChange={(e) => {
                    setTextColor(e.target.value)
                    editor.chain().focus().setColor(e.target.value).run()
                  }}
                  className="w-8 h-8 p-0 border-0 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Label htmlFor="bg-color" className="sr-only">
                Highlight Color
              </Label>
              <div className="flex items-center gap-1 p-1 border rounded">
                <Highlighter className="h-4 w-4" />
                <Input
                  id="bg-color"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => {
                    setBackgroundColor(e.target.value)
                    editor.chain().focus().toggleHighlight({ color: e.target.value }).run()
                  }}
                  className="w-8 h-8 p-0 border-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Alignment */}
          <div className="flex items-center gap-1">
            <Button
              variant={editor.isActive({ textAlign: "left" }) ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: "center" }) ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: "right" }) ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: "justify" }) ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            >
              <AlignJustify className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Lists */}
          <div className="flex items-center gap-1">
            <Button
              variant={editor.isActive("bulletList") ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive("orderedList") ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Insert Elements */}
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" onClick={insertLink}>
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={insertImage}>
              <ImageIcon className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Copy Button */}
          <Button variant="default" size="sm" onClick={handleCopy} className="bg-blue-600 hover:bg-blue-700">
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
        </div>

        {/* Templates Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-700">Quick Templates</h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(templates).map((templateName) => (
              <Badge
                key={templateName}
                variant="outline"
                className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 px-3 py-1"
                onClick={() => applyTemplate(templateName)}
              >
                {templateName}
              </Badge>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="border rounded-lg bg-white shadow-inner">
          <EditorContent editor={editor} className="min-h-[500px] max-h-[800px] overflow-y-auto" />
        </div>

        {/* Status Bar */}
        <div className="flex justify-between items-center text-sm text-slate-500 px-2">
          <div>
            Words:{" "}
            {
              editor
                .getText()
                .split(/\s+/)
                .filter((word) => word.length > 0).length
            }{" "}
            | Characters: {editor.getText().length}
          </div>
          <div className="text-xs">Tip: Select text to format it, or use templates for quick layouts</div>
        </div>
      </CardContent>
    </Card>
  )
}
