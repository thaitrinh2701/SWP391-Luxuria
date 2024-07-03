import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GraphQLClient, gql } from "graphql-request";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { Divider } from "antd";
import Breadcrumb from "../Breadcrumb";

const API = import.meta.env.VITE_API_HYGRAPH;
const graphcms = new GraphQLClient(API);

const GET_POST_BY_SLUG = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      postDate
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        raw
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;

function BlogPostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await graphcms.request(GET_POST_BY_SLUG, { slug });
        setPost(data.post);
      } catch (error) {
        setError(error);
        console.error("GraphQL Error:", error.response.errors);
        console.error("Request Query:", error.request.query);
        console.error("Request Variables:", error.request.variables);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!post) return <p>No post found</p>;
  return (
    <div>
      <div className="container mx-auto p-4 mt-28">
        <Breadcrumb title={post.title} slug={post.slug} />

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          {post.title}
        </h1>
        <Divider className="hs-dark-mode-active: bg-gray-400" />
        <div className="flex items-center mt-3 bg-gray-100 p-3 max-w-screen rounded-lg overflow-hidden shadow-lg hs-dark-mode-active:bg-slate-800">
          <img
            className="w-50 h-28 rounded-full mr-4"
            src={post.author.avatar.url}
            alt={post.title}
          />
          <div>
            <p className="text-xl text-gray-900 leading-none hs-dark-mode-active:text-gray-300">
              Tác giả: {post.author.name}
            </p>
            <p className="text-xl text-gray-600 hs-dark-mode-active:text-gray-400">
              Ngày xuất bản: {new Date(post.postDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Divider className="hs-dark-mode-active: bg-gray-400" />
        <div>
          <p className="text-xl dark:text-gray-100">
            <RichText content={post.content.raw.children} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlogPostDetail;
