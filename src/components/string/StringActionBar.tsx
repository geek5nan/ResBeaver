import { RefreshCw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

interface StringActionBarProps {
    localeCount: number
    totalAdd: number
    totalUpdate: number
    canImport: boolean
    canRefresh: boolean
    onOpenImportDialog: () => void
    onRefresh: () => void
}

export function StringActionBar({
    localeCount,
    totalAdd,
    totalUpdate,
    canImport,
    canRefresh,
    onOpenImportDialog,
    onRefresh
}: StringActionBarProps) {
    const { t } = useTranslation()

    return (
        <div className="flex-shrink-0 border-t bg-white px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onRefresh}
                    disabled={!canRefresh}
                    title={t('string.refresh')}
                    className="h-8 w-8 p-0"
                >
                    <RefreshCw className="h-4 w-4" />
                </Button>
                <div className="h-4 w-px bg-border" />
                <div className="text-sm text-muted-foreground">
                    {t('string.totalLocales', { count: localeCount })} · +{totalAdd} {t('string.added')} · ~{totalUpdate} {t('string.updated')}
                </div>
            </div>
            <Button
                onClick={onOpenImportDialog}
                disabled={!canImport}
            >
                {t('string.merge')}
            </Button>
        </div>
    )
}

