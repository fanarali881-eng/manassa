import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // Custom REST API for booking URL management
  app.get("/api/booking-url", (_req, res) => {
    try {
      const configPath = process.env.NODE_ENV === "production"
        ? path.resolve(__dirname, "..", "..", "dist", "public", "config.js")
        : path.resolve(__dirname, "..", "..", "dist", "public", "config.js");
      const content = fs.readFileSync(configPath, "utf-8");
      const urlMatch = content.match(/window\.EXTERNAL_BOOKING_URL\s*=\s*"([^"]*)";/);
      const countriesMatch = content.match(/window\.ALLOWED_COUNTRIES\s*=\s*\[([^\]]*)\];/);
      
      const url = urlMatch ? urlMatch[1] : "";
      let countries: string[] = [];
      
      if (countriesMatch && countriesMatch[1]) {
        countries = countriesMatch[1]
          .split(',')
          .map(c => c.trim().replace(/"/g, ''))
          .filter(c => c.length > 0);
      }
      
      res.json({ url, countries });
    } catch (error) {
      res.status(500).json({ error: "Failed to read config" });
    }
  });

  app.post("/api/booking-url", async (req, res) => {
    try {
      const { url, countries } = req.body;
      
      if (typeof url !== "string") {
        return res.status(400).json({ error: "Invalid URL" });
      }
      
      if (!Array.isArray(countries)) {
        return res.status(400).json({ error: "Invalid countries array" });
      }

      const sourceConfigPath = path.resolve(__dirname, "..", "..", "client", "public", "config.js");
      const countriesStr = countries.length > 0 
        ? countries.map(c => `"${c}"`).join(", ")
        : "";
      
      const newContent = `// ضع الرابط الخارجي هنا، أو اتركه فارغاً للنموذج الداخلي\nwindow.EXTERNAL_BOOKING_URL = "${url}";\n\n// الدول المسموحة للرابط الخارجي (ISO country codes)\n// مثال: ["SA", "AE", "KW"] للسعودية والإمارات والكويت\n// اترك فارغاً [] للسماح لجميع الدول\nwindow.ALLOWED_COUNTRIES = [${countriesStr}];\n`;
      fs.writeFileSync(sourceConfigPath, newContent, "utf-8");

      const projectRoot = path.resolve(__dirname, "..");
      await execAsync(`cd ${projectRoot} && pnpm build`, { timeout: 120000 });
      
      res.json({ success: true, message: "URL updated successfully. Server will restart..." });
      
      // Restart server in background
      setTimeout(() => {
        execAsync(`cd ${projectRoot} && PORT=5000 pnpm start > /tmp/newsalamat.log 2>&1 &`).catch(console.error);
        process.exit(0);
      }, 1000);
    } catch (error: any) {
      console.error("Error updating booking URL:", error);
      res.status(500).json({ error: "Failed to update config", details: error.message });
    }
  });
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
