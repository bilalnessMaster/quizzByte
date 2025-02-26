const  prisma  = require("./lib/db");

async function testCreate() {
    try {
        const user = await prisma.user.create({
            data: {
                email: "test@example.com",
                password: "password123",
                firstName: "Test",
                lastName: "User",
                gender: "male",
                isAdmin: false,
                streak: 0,
                longestStreak: 0,
                lastAttemptDate: 0
            },
        });

        console.log("User created:", user);
    } catch (error) {
        console.error("Error creating user:", error);
    }
}

testCreate();
