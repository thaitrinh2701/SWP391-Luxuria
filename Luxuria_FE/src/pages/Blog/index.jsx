import { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";
import { BlogCard, Pagination } from "@components";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_HYGRAPH;
const graphcms = new GraphQLClient(API);

const QUERY = gql`
  {
    posts {
      id
      title
      postDate
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        url
      }
    }
  }
`;

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { posts } = await graphcms.request(QUERY);
        setPosts(posts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto mt-5 px-4 py-10">
      <Breadcrumb />
      <div className="flex flex-wrap -mx-4">
        {currentPosts.map((post) => (
          <div key={post.id} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-4">
            {" "}
            <BlogCard
              title={post.title}
              author={post.author}
              coverPhoto={post.coverPhoto}
              postDate={post.postDate}
              slug={post.slug}
            />
          </div>
        ))}
      </div>
      {posts.length > postsPerPage && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}

export function HomeBlog({ posts }) {
  const homePosts = posts.slice(0, 3);

  return (
    <section className="bg-white mx-auto py-10 dark:bg-[#1F2937] dark:text-white ">
      <div className="container mx-auto text-center">
        <h2
          className="text-4xl font-inter 
        font-bold border-b-4 border-blue-600 inline-block pb-2"
        >
          Tin tức
        </h2>
      </div>
      <div className="flex flex-wrap -mx-4 mx-auto">
        {homePosts.map((post) => (
          <div key={post.id} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-4">
            {" "}
            {/* Giảm từ mb-8 xuống mb-4 */}
            <BlogCard
              title={post.title}
              author={post.author}
              coverPhoto={post.coverPhoto}
              postDate={post.postDate}
              slug={post.slug}
            />
          </div>
        ))}
      </div>
      <div className=" text-center">
        <Link
          className="py-5 px-10 inline-flex items-center gap-x-1 text-sm font-medium text-xl border border-gray-200 bg-white shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          to="/tin-tuc"
        >
          Xem thêm
          <svg
            className="flex-shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

export default Blog;
