const buildHtml = (text: string) => `<!DOCTYPE html>
<html>
<head>
  <title>ping.udia.ca</title>
  <style>body {font-family:sans-serif;white-space:pre-wrap;}</style>
</head>
<body><pre><code>${text}</code></pre></body>
</html>`;

export function handleRequest(request: Request, env: {}) {
  const url = new URL(request.url);

  const payload = {
    headers: Object.fromEntries(request.headers.entries()),
    cf: request.cf || null,
  };

  const accept = request.headers.get("accept") || "";
  const headers: Record<string, string> = {};
  let body;

  if (
    url.searchParams.get("json") !== null ||
    accept.toLowerCase().includes("application/json")
  ) {
    // serve json
    body = JSON.stringify(payload);
    headers["content-type"] = "application/json";
  } else {
    // serve html
    body = buildHtml(JSON.stringify(payload, undefined, 2));
    headers["content-type"] = "text/html; charset=UTF-8";
  }

  return new Response(body, {
    status: 200,
    headers,
  });
}

const worker: ExportedHandler<{}> = { fetch: handleRequest };

export default worker;
