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
  return `${h} ${m}`.trim()
}

export const dateFormatting = (date: Date | undefined): string => {
  if (!date) return 'Data não informada'
  return dayjs.utc(date).format('D[ de ]MMMM[ de ]YYYY')
}

export const genresList = (genres: Genre[] | undefined) => {
  if (genres === null || genres === undefined || genres.length === 0) {
    return 'Gênero não informado'
  }

  return genres.map((genre) => genre.name).join(', ')
}

export const productionsList = (productions: Production[]) => {
  if (productions === null || productions === undefined) {
    return 'Produções não informadas'
  }

  return productions
    .map((production) => production.name ?? production.title)
    .filter(Boolean)
    .join(', ')
}

export function FormatterDollar(money: number) {
  if (money === undefined || money == null || money === 0)
    return 'Não informado'
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
      return 'Pós-produção'
    case 'Planned':
      return 'Planejado'
    default:
      return status
  }
}

export function StatusTvToBr(status: string) {
  switch (status) {
    case 'Returning Series':
      return 'Renovada'
    case 'Planned':
      return 'Planejada'
    case 'In Production':
      return 'Em produção'
    case 'Ended':
      return 'Finalizada'
    case 'Canceled':
      return 'Cancelada'
    case 'Pilot':
      return 'Piloto'
    default:
      return status
  }
}

export function TypeTvToBr(type: string) {
  switch (type) {
    case 'Miniseries':
      return 'Minissérie'
    case 'Scripted':
      return 'Roteirizada'
    case 'Reality':
      return 'Reality show'
    default:
      return type
  }
}

export function GetDepartmentPerson(department: string) {
  switch (department) {
    case 'Acting':
      return 'Atuação'
    case 'Writing':
      return 'Roteiro'
    case 'Directing':
      return 'Direção'
    case 'Production':
      return 'Produção'
    default:
      return department
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
    default:
      return 'Não informado'
  }
}

export const PersonDateFormatting = (date: Date | undefined): string => {
  if (!date) return 'Data não informada'
  return dayjs.utc(date).format('DD/MM/YYYY')
}

export const GetPersonAge = (birthday: Date | null, deathday: Date | null) => {
  if (!birthday) return 'idade não informada'
  return deathday !== null
    ? dayjs.utc(deathday).diff(birthday, 'y')
    : dayjs.utc().diff(birthday, 'y')
}
