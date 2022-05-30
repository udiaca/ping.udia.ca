import { handleRequest } from "@/index";

test("should get payload as text/html", async () => {
  const env = getMiniflareBindings();
  const res = await handleRequest(new Request("http://localhost"), env);
  expect(res.status).toBe(200);
  expect(await res.text()).toContain('"cf": null');
  expect(res.headers.get("content-type")).toEqual("text/html; charset=UTF-8");
});

test("should get payload as application/json", async () => {
  const env = getMiniflareBindings();
  const res = await handleRequest(new Request("http://localhost?json=1"), env);
  expect(res.status).toBe(200);
  expect(await res.json()).toMatchObject({ cf: null, headers: {} });
  expect(res.headers.get("content-type")).toEqual("application/json");
});
