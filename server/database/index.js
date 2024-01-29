import sequelize from './sequelize.js';
import { config } from 'dotenv'
config();


async function databaseInit() {
  try {
    await sequelize.sync({ force: true });
    console.log('✅ Database tables created successfully.');
  } catch (error) {
    console.error('❌Error syncing database:', error);
  }
}

export { databaseInit };