import StoryImage from "@/containers/stories/[id]/image";

import { Story } from "@/payload-types";

export const StoriesIdArticle = (props: Story) => {
  return (
    <article className="px-11 py-10">
      <h1 className="font-display animate-in fade-in slide-in-from-top-10 text-7xl font-bold text-blue-300">
        {props.name}
      </h1>

      <StoryImage {...props} />

      <div className="prose prose-invert">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro ipsum
          accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto ut
          veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro ipsum
          accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto ut
          veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro ipsum
          accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto ut
          veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro ipsum
          accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto ut
          veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro ipsum
          accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto ut
          veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro ipsum
          accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto ut
          veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro ipsum
          accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto ut
          veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro ipsum
          accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto ut
          veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro ipsum
          accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto ut
          veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro ipsum
          accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto ut
          veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro ipsum
          accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto ut
          veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro ipsum
          accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto ut
          veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit magni porro ipsum
          accusantium natus sunt blanditiis repudiandae, eum minus reiciendis, architecto ut
          veritatis eius exercitationem aperiam perspiciatis qui doloribus debitis?
        </p>
      </div>
    </article>
  );
};
