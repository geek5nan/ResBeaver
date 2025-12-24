import { Download, Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

interface ActionBarProps {
    readyCount: number
    processingCount: number
    downloadingId: string | null
    onClearAll: () => void
    onDownloadAll: () => void
}

export function ActionBar({
    readyCount,
    processingCount,
    downloadingId,
    onClearAll,
    onDownloadAll
}: ActionBarProps) {
    const { t } = useTranslation()

    return (
        <div className="flex-shrink-0 border-t bg-white px-6 py-3 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
                {processingCount > 0 && `${processingCount} processing · `}
                {readyCount > 0 && t('drawable.totalFiles', { count: readyCount })}
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onClearAll}>{t('drawable.clearAll')}</Button>
                {readyCount > 0 && (
                    <Button size="sm" onClick={onDownloadAll} disabled={downloadingId === 'all'}>
                        {downloadingId === 'all' ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Download className="h-4 w-4 mr-1" />}
                        {t('drawable.downloadAll')}
                    </Button>
                )}
            </div>
        </div>
    )
}

