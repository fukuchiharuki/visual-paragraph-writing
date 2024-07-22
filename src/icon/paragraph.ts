import * as path from "path";

export default function paragraphIcon() {
  return {
    dark: path.join(
      __filename,
      "..",
      "..",
      "..",
      "media",
      "paragraph--dark-svgrepo-com.svg",
    ),
    light: path.join(
      __filename,
      "..",
      "..",
      "..",
      "media",
      "paragraph--light-svgrepo-com.svg",
    ),
  };
}
