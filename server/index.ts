import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.json());

  // ===== API ROUTES - MUST BE BEFORE STATIC FILES =====
  
  // GET API endpoint to get current booking URL
  app.get("/api/booking-url", (_req, res) => {
    try {
      const configPath = path.resolve(__dirname, "public", "config.js");
      const content = fs.readFileSync(configPath, "utf-8");
      const match = content.match(/window\.EXTERNAL_BOOKING_URL\s*=\s*"([^"]*)";/);
      const url = match ? match[1] : "";
      res.json({ url });
    } catch (error) {
      res.status(500).json({ error: "Failed to read config" });
    }
  });

  // POST API endpoint to update booking URL
  app.post("/api/booking-url", async (req, res) => {
    try {
      const { url } = req.body;
      
      // Validate URL (allow empty string)
      if (typeof url !== "string") {
        return res.status(400).json({ error: "Invalid URL" });
      }

      // Update config.js in source
      const sourceConfigPath = path.resolve(__dirname, "..", "..", "client", "public", "config.js");
      const newContent = `// ضع الرابط الخارجي هنا، أو اتركه فارغاً للنموذج الداخلي\nwindow.EXTERNAL_BOOKING_URL = "${url}";\n`;
      fs.writeFileSync(sourceConfigPath, newContent, "utf-8");

      // Rebuild and restart
      const projectRoot = path.resolve(__dirname, "..");
      await execAsync(`cd ${projectRoot} && pnpm build`, { timeout: 120000 });
      
      res.json({ success: true, message: "URL updated successfully. Server will restart..." });
      
      // Restart server after response
      setTimeout(() => {
        process.exit(0);
      }, 1000);
    } catch (error: any) {
      console.error("Error updating booking URL:", error);
      res.status(500).json({ error: "Failed to update config", details: error.message });
    }
  });

  // ===== STATIC FILES - AFTER API ROUTES =====
  app.use(express.static(staticPath));

  // ===== CLIENT-SIDE ROUTING - CATCH ALL =====
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
