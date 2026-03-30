import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
  category: string;
  author: string;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

export const getPostBySlug = (slug: string): Post | undefined => {
  try {
    const realSlug = slug.replace(/\.mdx$/, "");
    const filePath = path.join(CONTENT_DIR, `${realSlug}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      meta: {
        title: data.title,
        description: data.description,
        date: data.date,
        slug: realSlug,
        category: data.category,
        author: data.author || "Shibil S",
      },
      content,
    };
  } catch (error) {
    return undefined;
  }
};

export const getAllPosts = (): PostMeta[] => {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  
  const files = fs.readdirSync(CONTENT_DIR);
  const posts = files
    .filter((file) => /\.mdx$/.test(file))
    .map((file) => getPostBySlug(file)?.meta)
    .filter(Boolean) as PostMeta[];

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
