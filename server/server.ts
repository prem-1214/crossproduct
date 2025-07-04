import { app } from "./app";
import { config } from "./src/config/config";
import { connectDb } from "./src/db/index";

(async () => {
  try {
    await connectDb();
    app.listen(config.PORT, () => {
      console.log(`server running at http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.log("error during db connection ...", error);
  }
})();
