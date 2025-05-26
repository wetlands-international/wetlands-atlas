import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { Header } from "@/containers/header";
import StoryImage from "@/containers/stories/image";

import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: `${t("stories.title")} detail`,
    description: t("stories.description"),
  };
}

export default async function StoriesIdPage() {
  return (
    <>
      <aside className="z-10 w-full max-w-xl">
        <Header className="sticky top-0 p-4">
          <Link href="/stories">Stories</Link> / title
        </Header>

        <article className="px-11 py-10">
          <h1 className="font-display text-7xl font-bold text-blue-300">The Inner Niger Delta</h1>

          <StoryImage />

          <div className="prose prose-invert">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro
              ipsum accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto
              ut veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro
              ipsum accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto
              ut veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro
              ipsum accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto
              ut veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro
              ipsum accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto
              ut veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro
              ipsum accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto
              ut veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro
              ipsum accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto
              ut veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro
              ipsum accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto
              ut veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro
              ipsum accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto
              ut veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro
              ipsum accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto
              ut veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro
              ipsum accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto
              ut veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro
              ipsum accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto
              ut veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro
              ipsum accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto
              ut veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro
              ipsum accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto
              ut veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
            </p>
          </div>
        </article>
      </aside>
    </>
  );
}
