import { Check, AlertCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface StatusBannersProps {
    status: 'idle' | 'scanning' | 'ready' | 'merging' | 'success' | 'error'
    error: string | null
}

export function StatusBanners({ status, error }: StatusBannersProps) {
    const { t } = useTranslation()

    return (
        <>
            {status === 'success' && (
                <div className="mx-6 mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-green-700 font-medium">{t('string.mergeSuccess')}</span>
                </div>
            )}

            {error && (
                <div className="mx-6 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <span className="text-red-700">{error}</span>
                </div>
            )}
        </>
    )
}

