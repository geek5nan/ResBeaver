import { useRef, useEffect, forwardRef } from 'react'
import { MergePreviewDetail, XmlDiffLine } from '@/types'

interface DiffPreviewProps {
    preview: MergePreviewDetail | null
}

// Syntax highlight XML content
function highlightXml(content: string, baseColor: string): React.ReactNode {
    // Match XML string elements: <string name="key">value</string>
    const stringMatch = content.match(/^(\s*)(<string\s+)(name=")([^"]+)(")(>)(.*)(<\/string>)(.*)$/)

    if (stringMatch) {
        const [, indent, openTag, nameAttr, keyValue, closeQuote, gt, textContent, closeTag, trailing] = stringMatch
        return (
            <>
                <span>{indent}</span>
                <span className="text-cyan-600">{openTag}</span>
                <span className="text-purple-600">{nameAttr}</span>
                <span className="text-amber-600">{keyValue}</span>
                <span className="text-purple-600">{closeQuote}</span>
                <span className="text-cyan-600">{gt}</span>
                <span className={baseColor}>{textContent}</span>
                <span className="text-cyan-600">{closeTag}</span>
                <span className="text-slate-400">{trailing}</span>
            </>
        )
    }

    // Match XML comments: <!-- ... -->
    const commentMatch = content.match(/^(\s*)(<!--.*)$/)
    if (commentMatch) {
        return <span className="text-slate-400 italic">{content}</span>
    }

    // Match other XML tags: <resources>, </resources>, <?xml ...?>
    const tagMatch = content.match(/^(\s*)(<\/?[a-zA-Z][^>]*>?)(.*)$/)
    if (tagMatch) {
        const [, indent, tag, rest] = tagMatch
        return (
            <>
                <span>{indent}</span>
                <span className="text-cyan-600">{tag}</span>
                <span className={baseColor}>{rest}</span>
            </>
        )
    }

    // Plain text
    return <span className={baseColor}>{content}</span>
}

export function DiffPreview({ preview }: DiffPreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const firstChangeRef = useRef<HTMLDivElement>(null)

    // Scroll to first change with some context (show 5 lines before)
    useEffect(() => {
        if (firstChangeRef.current && containerRef.current) {
            const container = containerRef.current
            const firstChange = firstChangeRef.current

            const lineHeight = 28
            const contextLines = 5
            const targetScroll = Math.max(0, firstChange.offsetTop - (lineHeight * contextLines))

            container.scrollTop = targetScroll
        }
    }, [preview])

    if (!preview) {
        return (
            <div className="flex-1 flex items-center justify-center text-muted-foreground bg-slate-50 rounded-lg border border-dashed">
                <p className="text-sm">选择左侧语言查看详细变更</p>
            </div>
        )
    }

    const hasChanges = preview.addCount > 0 || preview.overwriteCount > 0
    const diffLines = preview.diffLines || []

    if (diffLines.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center text-muted-foreground bg-slate-50 rounded-lg border border-dashed">
                <p className="text-sm">无内容</p>
            </div>
        )
    }

    const firstChangeIndex = diffLines.findIndex(line =>
        line.type === 'add' || line.type === 'update-old' || line.type === 'update-new'
    )

    return (
        <div className="flex-1 overflow-hidden flex flex-col bg-white rounded-lg border">
            {/* Header */}
            <div className="px-4 py-2 border-b bg-slate-50 flex items-center">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium font-mono">
                        {preview.folderName}/strings.xml
                    </span>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">{diffLines.length} 行</span>
                        {preview.addCount > 0 && (
                            <span className="text-green-600">+{preview.addCount}</span>
                        )}
                        {preview.overwriteCount > 0 && (
                            <span className="text-amber-600">~{preview.overwriteCount}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Diff Content */}
            <div ref={containerRef} className="flex-1 overflow-y-auto font-mono text-xs">
                {!hasChanges && (
                    <div className="px-4 py-2 bg-blue-50 text-blue-700 text-xs border-b font-sans">
                        此语言无变更，以下是目标文件现有内容
                    </div>
                )}
                {diffLines.map((line, idx) => (
                    <DiffLine
                        key={`${line.type}-${idx}`}
                        line={line}
                        ref={idx === firstChangeIndex ? firstChangeRef : undefined}
                    />
                ))}
            </div>
        </div>
    )
}

const DiffLine = forwardRef<HTMLDivElement, { line: XmlDiffLine }>(({ line }, ref) => {
    const lineNumberWidth = 'w-10'

    if (line.type === 'add') {
        return (
            <div ref={ref} className="flex border-b border-slate-100">
                <div className={`${lineNumberWidth} flex-shrink-0 text-right pr-2 py-1 text-slate-400 bg-green-50 border-r select-none`}>
                    +
                </div>
                <div className="flex-1 py-1 px-3 bg-green-50/50 whitespace-pre-wrap break-all">
                    {highlightXml(line.content, 'text-green-700')}
                </div>
            </div>
        )
    }

    if (line.type === 'update-old') {
        return (
            <div ref={ref} className="flex border-b border-slate-100">
                <div className={`${lineNumberWidth} flex-shrink-0 text-right pr-2 py-1 text-red-600 bg-red-50 border-r select-none`}>
                    {line.lineNumber || '-'}
                </div>
                <div className="flex-1 py-1 px-3 bg-red-50/50 whitespace-pre-wrap break-all line-through">
                    {highlightXml(line.content, 'text-red-700')}
                </div>
            </div>
        )
    }

    if (line.type === 'update-new') {
        return (
            <div ref={ref} className="flex border-b border-slate-100">
                <div className={`${lineNumberWidth} flex-shrink-0 text-right pr-2 py-1 text-green-600 bg-green-50 border-r select-none`}>
                    +
                </div>
                <div className="flex-1 py-1 px-3 bg-green-50/50 whitespace-pre-wrap break-all">
                    {highlightXml(line.content, 'text-green-700')}
                </div>
            </div>
        )
    }

    // unchanged
    return (
        <div ref={ref} className="flex border-b border-slate-100">
            <div className={`${lineNumberWidth} flex-shrink-0 text-right pr-2 py-1 text-slate-400 bg-slate-50 border-r select-none`}>
                {line.lineNumber}
            </div>
            <div className="flex-1 py-1 px-3 whitespace-pre-wrap break-all">
                {highlightXml(line.content, 'text-slate-600')}
            </div>
        </div>
    )
})

DiffLine.displayName = 'DiffLine'
