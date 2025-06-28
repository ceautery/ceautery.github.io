import fg from "fast-glob";
import fs from "fs";

const pattern = process.argv[2];
const files = await fg.globSync(pattern);

files.forEach((file) => {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");
  if (lines[0].includes("<!DOCTYPE html>")) {
    lines[0] = lines[0].replace("<!DOCTYPE html>", "<!doctype html>");
    fs.writeFileSync(file, lines.join("\n"));
  }
});
