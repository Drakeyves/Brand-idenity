const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Create test user
    const hashedPassword = await hash('Monkey2003', 12);
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: 'Drazoyves@gmail.com',
      },
    });

    if (existingUser) {
      console.log('Test user already exists');
      return;
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name: 'Drake Test User',
        email: 'Drazoyves@gmail.com',
        password: hashedPassword,
        emailVerified: new Date(),
      },
    });

    console.log('Created test user:', user);

    // Create a team for the user
    const team = await prisma.team.create({
      data: {
        name: 'Drake Test Team',
        slug: 'drake-test-team',
      },
    });

    console.log('Created test team:', team);

    // Add user to team as owner
    const teamMember = await prisma.teamMember.create({
      data: {
        teamId: team.id,
        userId: user.id,
        role: 'OWNER',
      },
    });

    console.log('Added user to team:', teamMember);

    console.log('Test user setup complete!');
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 