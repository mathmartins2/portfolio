import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInYears } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const BIRTH_DATE = new Date(2003, 4, 25)
const CAREER_START_DATE = new Date(2019, 11, 1)

export function calculateAge(): number {
  return differenceInYears(new Date(), BIRTH_DATE)
}

export function calculateExperienceYears(): number {
  return differenceInYears(new Date(), CAREER_START_DATE)
}
