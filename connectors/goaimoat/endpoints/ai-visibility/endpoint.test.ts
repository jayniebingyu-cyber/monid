import { assertEquals } from "@std/assert";
import { fromFileUrl } from "@std/path";
import { loadFixture, runEndpoint, testSealedUnit } from "@shared/testing";

const fixturesDir = fromFileUrl(new URL("./fixtures/", import.meta.url));

Deno.test("goaimoat#ai-visibility happy: returns a diagnosis for the brand", async () => {
    const unit = await testSealedUnit("goaimoat#ai-visibility");
    const fixture = await loadFixture(`${fixturesDir}happy.json`);
    const result = await runEndpoint({
        unit,
        input: { body: { brand_name: "GoAI Moat" } },
        mode: "replay",
        fixture,
    });
    assertEquals(result.httpStatus, 200);
    assertEquals(result.isProviderError, false);
    const output = result.output as Record<string, unknown>;
    assertEquals(output.brand_name, "GoAI Moat");
    assertEquals(
        output.core_thesis,
        "Being good is no longer enough — you have to be *sayable by AI*.",
    );
});
