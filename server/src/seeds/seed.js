const db = require("../config/connection");
const { Job } = require("../models");
const jobSeeds = require("./jobSeeds.json");

db.once("open", async () => {
  try {
    await Job.deleteMany({});

    await Job.create(jobSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("seeding done! 🌱");
  process.exit(0);
});
