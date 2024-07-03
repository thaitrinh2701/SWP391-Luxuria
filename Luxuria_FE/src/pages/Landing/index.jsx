import { useEffect } from "react";
import { Carousel, Toast } from "@components";
import { useCookies } from "react-cookie";
import { PRODUCT_CATEGORIES, PRODUCTS } from "@utils/constant";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import Testimonials from "../Testimonials";
import { useState } from "react";
import { GraphQLClient, gql } from "graphql-request";
import { HomeBlog } from "../Blog";
import Products from "@/components/ProductCard";
import TeamSection from "@/components/TeamMember";
import Subcribe from "@/components/Subcribe";

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

function Landing() {
  const [cookies] = useCookies(["user"]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.HSStaticMethods.autoInit();
    window.HSTooltip.autoInit();
  }, []);

  useEffect(() => {
    if (cookies.user !== undefined && cookies.user?.isLogin) {
      Toast(
        "landing_info",
        "info",
        `Chào mừng ${
          cookies.user?.full_name || "quý khách"
        } đến cửa hàng của chúng tôi`
      );
    }
  }, [cookies.user]);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const { posts } = await graphcms.request(QUERY);
        setPosts(posts);
        console.log(posts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <Hero />
      <Features />
      <Products />
      <Gallery />
      <HomeBlog posts={posts} />;
      <Testimonials />
      <TeamSection />
      {/* <Subcribe /> */}
    </div>
  );
}

export default Landing;
