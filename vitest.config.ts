import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineWorkersConfig({
	plugins: [tsconfigPaths()], // <--- Add the plugin here
	test: {
		deps: {
			optimizer: {
				ssr: {
					enabled: true,
					include: [
						"@supabase/postgrest-js",
						"@supabase/supabase-js",
						"@supabase/ssr",
						"snakecase-keys",
						"camelcase-keys",
					],
				},
			},
		},
		poolOptions: {
			workers: {
				wrangler: {
					configPath: "./wrangler.jsonc",
				},
			},
		},
		reporters: ["dot"],
	},
});
