import { Link } from "react-router-dom";

export function BlogCard({ title, author, coverPhoto, postDate, slug }) {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid gap-6">
        <Link to={`/post/${slug}`} className="group relative block rounded-xl">
          <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-full h-[300px] sm:h-[400px] before:absolute before:inset-x-0 before:z-[1] before:size-full before:bg-gradient-to-t before:from-gray-900/70">
            <img
              className="size-full absolute top-0 start-0 object-cover"
              src={coverPhoto.url}
              alt={title}
            />
          </div>
          <div className="absolute top-0 inset-x-0 z-10">
            <div className="p-4 flex flex-col h-full sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="size-[60px] border-2 border-white rounded-full"
                    src={author.avatar.url}
                    alt={author.name}
                  />
                </div>
                <div className="ms-3 sm:ms-4">
                  <h4 className="font-semibold text-xl text-white">
                    {author.name}
                  </h4>
                  <p className="text-sm text-white/80">
                    {new Date(postDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 z-10">
            <div className="flex flex-col h-full p-4 sm:p-6">
              <h3 className="text-xl sm:text-3xl font-semibold text-white group-hover:text-white/80">
                {title}
              </h3>
              <p className="mt-2 text-white/80">
                By {author.name}, {new Date(postDate).toDateString()}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
