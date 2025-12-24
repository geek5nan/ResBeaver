import { useTranslation } from 'react-i18next'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { ConvertConfig } from '@/types'
import { Analytics } from '@/lib/analytics'

interface SidebarProps {
    config: ConvertConfig
    onChange: (config: ConvertConfig) => void
}

// Get recommended output densities based on input scale
function getRecommendedDensities(inputScale: number): string[] {
    switch (inputScale) {
        case 1: return ['mdpi']
        case 2: return ['mdpi', 'hdpi', 'xhdpi']
        case 3: return ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi']
        case 4: return ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi']
        default: return ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi']
    }
}

export function Sidebar({ config, onChange }: SidebarProps) {
    const { t } = useTranslation()

    const handleDensityToggle = (key: string, checked: boolean) => {
        const newDensities = checked
            ? [...config.selectedDensities, key]
            : config.selectedDensities.filter(d => d !== key)
        onChange({ ...config, selectedDensities: newDensities })
        Analytics.toggleDensity(key, checked)
    }

    return (
        <aside className="w-[280px] border-r bg-white flex-shrink-0 overflow-y-auto">
            <div className="p-6 space-y-6">
                <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">{t('drawable.input')}</h3>
                    <Label className="text-sm font-medium mb-3 block">{t('drawable.inputScale')}</Label>
                    <RadioGroup
                        value={config.inputScale.toString()}
                        onValueChange={(value) => {
                            const newScale = parseInt(value)
                            onChange({
                                ...config,
                                inputScale: newScale,
                                selectedDensities: getRecommendedDensities(newScale)
                            })
                            Analytics.changeInputScale(newScale)
                        }}
                        className="grid grid-cols-2 gap-2"
                    >
                        {[
                            { value: '1', label: '1x', desc: 'mdpi' },
                            { value: '2', label: '2x', desc: 'xhdpi' },
                            { value: '3', label: '3x', desc: 'xxhdpi' },
                            { value: '4', label: '4x', desc: 'xxxhdpi' },
                        ].map(({ value, label, desc }) => (
                            <div
                                key={value}
                                className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-colors ${config.inputScale.toString() === value
                                    ? 'bg-primary/5 border-primary'
                                    : 'hover:bg-slate-50'
                                    }`}
                                onClick={() => {
                                    const newScale = parseInt(value)
                                    onChange({
                                        ...config,
                                        inputScale: newScale,
                                        selectedDensities: getRecommendedDensities(newScale)
                                    })
                                    Analytics.changeInputScale(newScale)
                                }}
                            >
                                <RadioGroupItem value={value} id={`scale-${value}`} className="sr-only" />
                                <span className="font-semibold">{label}</span>
                                <span className="text-xs text-muted-foreground">{desc}</span>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                <div className="h-px bg-border" />

                <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">{t('drawable.output')}</h3>
                    <Label className="text-sm font-medium mb-3 block">{t('drawable.encodingMode')}</Label>
                    <RadioGroup
                        value={config.lossless ? 'lossless' : 'lossy'}
                        onValueChange={(value) => {
                            const isLossless = value === 'lossless'
                            onChange({ ...config, lossless: isLossless })
                            Analytics.changeEncodingMode(isLossless ? 'lossless' : 'lossy')
                        }}
                        className="space-y-2"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="lossy" id="lossy" />
                            <Label htmlFor="lossy" className="text-sm cursor-pointer">
                                {t('drawable.lossy')}
                                <span className="text-xs text-muted-foreground ml-2">{t('drawable.lossyDesc')}</span>
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="lossless" id="lossless" />
                            <Label htmlFor="lossless" className="text-sm cursor-pointer">
                                {t('drawable.lossless')}
                                <span className="text-xs text-muted-foreground ml-2">{t('drawable.losslessDesc')}</span>
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                <div>
                    <Label className="text-sm font-medium mb-3 block">
                        {config.lossless ? t('drawable.compression') : t('drawable.quality')}
                    </Label>
                    <div className="flex items-center gap-3">
                        <Slider
                            value={[config.quality]}
                            onValueChange={([value]) => {
                                onChange({ ...config, quality: value })
                            }}
                            max={100}
                            min={config.lossless ? 0 : 10}
                            step={1}
                            className="flex-1"
                        />
                        <Input
                            type="number"
                            value={config.quality}
                            onChange={(e) => {
                                const val = Math.min(100, Math.max(config.lossless ? 0 : 10, parseInt(e.target.value) || 0))
                                onChange({ ...config, quality: val })
                            }}
                            className="w-16 h-8 text-center text-sm"
                            min={config.lossless ? 0 : 10}
                            max={100}
                        />
                    </div>
                    {config.lossless && (
                        <p className="text-xs text-muted-foreground mt-2">
                            {t('drawable.compressionDesc')}
                        </p>
                    )}
                </div>

                <div>
                    <Label className="text-sm font-medium mb-3 block">{t('drawable.outputDir')}</Label>
                    <div className="space-y-2">
                        <div className="pb-3 mb-3 border-b">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="night-mode"
                                    checked={config.nightMode}
                                    onCheckedChange={(checked) => {
                                        onChange({ ...config, nightMode: !!checked })
                                        Analytics.toggleNightMode(!!checked)
                                    }}
                                />
                                <Label htmlFor="night-mode" className="text-sm cursor-pointer flex-1">
                                    {t('drawable.nightMode')}
                                    <span className="text-xs text-muted-foreground ml-2">(drawable-night-*)</span>
                                </Label>
                            </div>
                            {config.nightMode && (
                                <p className="text-[10px] text-muted-foreground mt-1 ml-6">
                                    {t('drawable.nightModeDesc')}
                                </p>
                            )}
                        </div>
                        {[
                            { key: 'mdpi', label: 'drawable-mdpi', desc: '1x' },
                            { key: 'hdpi', label: 'drawable-hdpi', desc: '1.5x' },
                            { key: 'xhdpi', label: 'drawable-xhdpi', desc: '2x' },
                            { key: 'xxhdpi', label: 'drawable-xxhdpi', desc: '3x' },
                            { key: 'xxxhdpi', label: 'drawable-xxxhdpi', desc: '4x' },
                            { key: 'drawable', label: 'drawable', desc: t('drawable.universal') },
                        ].map(({ key, label, desc }) => (
                            <div key={key} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`density-${key}`}
                                    checked={config.selectedDensities.includes(key)}
                                    onCheckedChange={(checked) => handleDensityToggle(key, !!checked)}
                                />
                                <Label htmlFor={`density-${key}`} className="text-sm cursor-pointer flex-1">
                                    {label}
                                    <span className="text-xs text-muted-foreground ml-2">({desc})</span>
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    )
}

