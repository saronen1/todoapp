import { serve } from "https://deno.land/std@0.100.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.100.0/http/file_server.ts";
import { existsSync } from "https://deno.land/std@0.100.0/fs/exists.ts";

let port = 7777;
if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}

const server = serve({ port: port });

for await (const request of server) {
  const path = `${Deno.cwd()}${request.url}`;
  if (!request.url.endsWith("/") && existsSync(path)) {
    const response = await serveFile(request, path);
    request.respond(response);
  } else {
    request.respond({ status: 404 });
  }
}