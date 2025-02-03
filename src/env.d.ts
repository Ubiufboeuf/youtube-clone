export type VideoCard = {
  id: string,
  duration: number,
  timeSeen: number,
  creator: Creator,
  title: string,
  views: number,
  publicationDate: string,
}

export type Creator = {
  id: string,
  name: string,
  creationDate: string,
  verified: boolean
}