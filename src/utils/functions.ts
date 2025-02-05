import { Genre } from '@/types/Movies'
import { Production } from '@/types/Persons'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'

dayjs.locale(ptBr)
dayjs.extend(utc)

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
  return dayjs.utc(date).format('D[ de ]MMMM[ de ]YYYY')
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

export function FormatterDollar(money: number) {
  if (money === undefined || money == null) return false
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(money)
}

export function StatusMovieToBr(status: string) {
  switch (status) {
    case 'Released':
      return 'Lançado'
    case 'Post Production':
      return 'Pós-Produção'
    case 'Planned':
      return 'Planejado'
  }
}

export function StatusTvToBr(status: string) {
  switch (status) {
    case 'Returning Series':
      return 'Renovada'
    case 'Planned':
      return 'Planejado'
    case 'In Production':
      return 'Em produçao'
    case 'Ended':
      return 'Finalizada'
    case 'Cancelad':
      return 'Cancelada'
    case 'Pilot':
      return 'Piloto'
  }
}

export function TypeTvToBr(type: string) {
  switch (type) {
    case 'Miniseries':
      return 'Minissérie'
    case 'Scripted':
      return 'Roteirizada'
    case 'Reality':
      return 'Reality Show'
  }
}

export function GetDepartmentPerson(department: string) {
  switch (department) {
    case 'Acting':
      return 'Atuação'
    case 'Scripted':
      return 'Roteirização'
  }
}

export function GetGenderPerson(gender: number) {
  switch (gender) {
    case 0:
      return 'Não informado'
    case 1:
      return 'Feminino'
    case 2:
      return 'Masculino'
    case 3:
      return 'Não-binário'
  }
}

export const PersonDateFormatting = (date: Date | undefined): string => {
  return dayjs.utc(date).format('DD/MM/YYYY')
}

export const GetPersonAge = (birthday: Date | null, deathday: Date | null) => {
  return deathday !== null
    ? dayjs.utc(deathday).diff(birthday, 'y')
    : dayjs.utc().diff(birthday, 'y')
}
