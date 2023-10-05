import { default as chalk } from "chalk";
import { execSync } from "child_process";
import { readdirSync } from "fs";
import { resolve } from "path";
import * as url from 'url';
import readline from 'readline/promises';

// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const allBlogs = readdirSync(resolve(__dirname, `../blog/drafts/`), { withFileTypes: true }).filter(file => file.isFile() && file.name.endsWith('.md'));

(async () => {
    const space = ' '.repeat(4);
    const answers = await readline
        .createInterface({ input: process.stdin, output: process.stdout })
        .question(`What blog do you want to publish? (Number only, use comma/space as delimiter)\n${space}`
            + allBlogs.map((blog, idx) => `${idx + 1}. ${blog.name}`).join(`\n${space}`)
            + `\n\n`
        );
    const pickedIndices = answers.split(/[, ]/g).map(idx => Number(idx) - 1);
    const pickedBlogs = pickedIndices.map(idx => allBlogs[idx]).filter(b => !!b);
    console.log(`Picked blogs: ${pickedBlogs.map(b => b.name)}`);

    for (const blog of pickedBlogs) {
        console.log(`Publishing ${chalk.greenBright(blog.name)}...`);
        try {
            execSync(`au-site blog publish ${blog.name}`, { encoding: 'utf-8', stdio: 'inherit' });
        } catch (err) {
            console.error(err.message);
            process.exit(1);
        }
    }

    console.log('Published all blogs');

    process.exit();
})();
