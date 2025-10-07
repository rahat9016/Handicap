export interface ICertificate {
  id: number
  uniqueCode: string
  expiryDate: string
  downloadCount: number
  user: {
    id: number
    email: string
    firstName: string
    lastName: string
    phone: string | null
  }
  course: {
    id: number
    title: string
    description: string
    level: string
  }
  organization: {
    id: number
    name: string
    logoUrl: string
  }
}