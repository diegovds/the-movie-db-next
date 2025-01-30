import { Genre } from '@/types/Movies'
import { Production } from '@/types/Persons'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.locale(ptBr)
dayjs.extend(utc)
dayjs.extend(timezone)

export const runtime = (runtime: number) => {
  const auxH = Math.floor(runtime / 60)
  const auxM = runtime % 60
  let h = auxH < 10 ? '0' + auxH + 'h' : auxH + 'h'
  let m = auxM < 10 ? '0' + auxM + 'min' : auxM + 'min'
  if (h === '00h') h = ''
  if (m === '00min') m = ''
  return `${h} ${m}`
}

export const dateFormatting = (date: Date | undefined): string => {
  return dayjs.utc(date).tz('America/Sao_Paulo').format('D[ de ]MMMM[ de ]YYYY')
}

export const genresList = (genres: Genre[] | undefined) => {
  if (genres === null || genres === undefined) return false
  let list = ''

  for (let i = 0; i < genres.length; i++) {
    const element = genres[i]

    list += `${element.name}${i !== genres.length - 1 ? ',' : ''} `
  }
  return list
}

export const productionsList = (productions: Production[]) => {
  if (productions === null || productions === undefined) return false
  let list = ''

  for (let i = 0; i < productions.length; i++) {
    const element = productions[i]

    if (element.name) {
      list += `${element.name}${i !== productions.length - 1 ? ',' : ''} `
    }

    if (element.title) {
      list += `${element.title}${i !== productions.length - 1 ? ',' : ''} `
    }
  }
  return list
}
