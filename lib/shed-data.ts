import shedData from '@/public/shedconfig.json';

export interface ShedModel {
  id: number
  title: string
  subtitle: string
  image: string
  size: string
  model: string
  gallery?: string[]
}

export const shedModels: ShedModel[] = shedData;