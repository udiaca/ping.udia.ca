export function handleRequest(request: Request, env: Bindings) {
  return new Response(
    JSON.stringify({
      headers: Object.fromEntries(request.headers.entries()),
      cf: request.cf || null,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  );
}

const worker: ExportedHandler<Bindings> = { fetch: handleRequest };

export default worker;
