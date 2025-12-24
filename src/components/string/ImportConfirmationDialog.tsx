import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'

interface ImportConfirmationDialogProps {
    open: boolean
    onClose: () => void
    localeCount: number
    totalAdd: number
    totalUpdate: number
    importComment: string
    isImporting: boolean
    importCompleted: boolean
    importProgress: { current: number; total: number; fileName: string }
    onCommentChange: (comment: string) => void
    onConfirm: (comment: string) => void
    onConfirmCompletion: () => void
}

export function ImportConfirmationDialog({
    open,
    onClose,
    localeCount,
    totalAdd,
    totalUpdate,
    importComment,
    isImporting,
    importCompleted,
    importProgress,
    onCommentChange,
    onConfirm,
    onConfirmCompletion
}: ImportConfirmationDialogProps) {
    const { t } = useTranslation()

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="px-6 py-4 border-b flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{t('string.confirmImport')}</h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className="px-6 py-4 space-y-4">
                    <div className="text-sm text-muted-foreground">
                        {t('string.importSummary', { localeCount, totalAdd, totalUpdate })}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="import-comment">{t('string.importComment')}</Label>
                        <Input
                            id="import-comment"
                            value={importComment}
                            onChange={(e) => onCommentChange(e.target.value)}
                            placeholder={t('string.importCommentPlaceHolder')}
                        />
                        <p className="text-xs text-muted-foreground">
                            {t('string.importCommentDesc')}
                        </p>
                    </div>

                    {isImporting && (
                        <div className="space-y-2 pt-2 border-t">
                            {importProgress.current < importProgress.total ? (
                                <>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">{t('string.processing')}: {importProgress.fileName}</span>
                                        <span className="font-medium">{importProgress.current} / {importProgress.total}</span>
                                    </div>
                                    <Progress value={(importProgress.current / importProgress.total) * 100} />
                                </>
                            ) : (
                                <div className="flex items-center justify-center text-sm font-medium text-green-600 py-2">
                                    ✓ {t('string.importCompleted')}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="px-6 py-4 border-t flex justify-end gap-2">
                    {!importCompleted && (
                        <Button variant="outline" onClick={onClose} disabled={isImporting}>{t('string.cancel')}</Button>
                    )}
                    {importCompleted ? (
                        <Button onClick={onConfirmCompletion}>{t('string.confirm')}</Button>
                    ) : (
                        <Button onClick={() => onConfirm(importComment || undefined as unknown as string)} disabled={isImporting}>
                            {isImporting ? t('string.importing') : t('string.confirm')}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

