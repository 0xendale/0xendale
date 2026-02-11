require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");



async function main() {
    const readmeTemplate = (
        await fs.readFile(path.join(process.cwd(), "./README.template.md"))
    ).toString("utf-8");

    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();
    const quote = {
        quote: data[0].q,
        author: data[0].a
    };

    const readme = readmeTemplate
        .replace("{__quote}", `" ${quote?.quote} "`)
        .replace("{__character}", `___ ${quote?.author ? quote?.author : "0xEnda"} ___`)
    await fs.writeFile("README.md", readme);
}
main();

