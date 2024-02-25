// place files you want to import through the `$lib` alias in this folder.
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default prisma

export const getLocalTimestampInSeconds = () => {
    const now = new Date();
	return Math.round((now.getTime() - now.getTimezoneOffset() * 60000) / 1000);
}