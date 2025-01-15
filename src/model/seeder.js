const tingkat_gaji_list = [
  { id: 1, harga_tingkat: 120000 },
  { id: 2, harga_tingkat: 70000 },
  { id: 3, harga_tingkat: 75000 },
];

// Function to seed the database
const seedData = async (db) => {
  try {
    await db.tingkatgajiMaster.bulkCreate(tingkat_gaji_list);
    //await next data .bulkCreate();
    console.log("Seeder completed.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

module.exports = { seedData };
