import { generateEmbeddings, insertEmbeddings } from "../embeddings";
import fs from "fs";

const createEmbeddings = async () => {
  const file = fs.readFileSync("src/lib/ai/data/country-info.txt", "utf8");
  const embeddings = await generateEmbeddings(file);

  fs.writeFileSync(
    "src/lib/ai/data/country-info-embeddings.json",
    JSON.stringify(embeddings, null, 2)
  );
  console.log(embeddings);

  await insertEmbeddings(embeddings);
};

createEmbeddings();
