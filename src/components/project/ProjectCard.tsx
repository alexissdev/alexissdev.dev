import Link from "next/link";
import Image from "next/image";
import Repository from "@/lib/github/github.repository";
import imageStyle from "@/styles/image.module.css";

export default function ProjectCard({
  repository,
  featured = false,
}: {
  repository: Repository;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/projects/${repository.name}`}
      className={`
        group block cursor-pointer
        ${featured ? "md:col-span-1 lg:col-span-1" : ""}
      `}
      prefetch
    >
      <div
        className={`
          relative flex flex-col py-4 px-6 gap-4 w-full rounded-2xl 
          bg-secondary transition-transform duration-300 
          md:group-hover:scale-[1.03]
          ${featured ? "ring-2 ring-purple-500/40 shadow-xl shadow-purple-500/20" : ""}
        `}
      >

        {featured && (
          <span
            className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full 
              bg-purple-500/20 text-purple-300 border border-purple-500/30"
          >
            ⭐ Featured
          </span>
        )}

        <div className="flex flex-col gap-2">
          <p className="font-normal text-white/80 text-lg">
            {repository.name}
          </p>

          <p className="font-light text-white/60 line-clamp-3">
            {repository.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-1">
            {repository.topics?.map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 text-xs rounded-full 
                  bg-purple-500/10 text-purple-300
                  border border-purple-500/20"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-row gap-3 pointer-events-auto">
          <a
            href={`https://github.com/${repository.fullName}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-normal text-sm text-white/70 hover:text-pink-200 
                       flex flex-row gap-1.5 items-center z-10"
          >
            <Image
              src="/github.svg"
              alt="github"
              width={24}
              height={24}
              loading="lazy"
              className={imageStyle.img}
            />
            View Repo
          </a>
        </div>
      </div>
    </Link>
  );
}