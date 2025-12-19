export interface ImageFile {
  id: string
  file: File
  name: string
  width: number
  height: number
  size: number
  preview: string
}

export interface ConvertConfig {
  inputScale: number
  quality: number
  lossless: boolean
  selectedDensities: string[]
}
