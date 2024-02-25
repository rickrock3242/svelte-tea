import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getLocalTimestampInSeconds = () => {
    const now = new Date();
	return Math.round((now.getTime() - now.getTimezoneOffset() * 60000) / 1000);
}
async function main() {
	const now = getLocalTimestampInSeconds();
	const user = await prisma.member.create({
		data: {
			active: true,
			name: "john",
			password: "123",
			fullName: "John Wick",
			phone: "",
			address: "",
			description: "",
			createdDate: now,
            lastOnline: now
		},
	});
    console.log(`A new member was inserted.\nName: ${user.name}\nPassword: ${user.password}`);
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});