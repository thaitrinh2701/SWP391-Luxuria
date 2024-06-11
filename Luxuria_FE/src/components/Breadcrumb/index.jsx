import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Breadcrumb({ title, slug }) {
  return (
    <div className="ml-8 mt-6 ">
      <Breadcrumbs
        aria-label="breadcrumb"
        className="hs-dark-mode-active:text-white"
      >
        <Link underline="hover" color="inherit" to={`/tin-tuc`}>
          <span className="hs-dark-mode-active:text-white hover:underline">
            Tin tức
          </span>
        </Link>
        <Link underline="hover" color="inherit" to={`/post/${slug}`}>
          <span className="hs-dark-mode-active:text-white hover:underline">
            {title}
          </span>
        </Link>
      </Breadcrumbs>
    </div>
  );
}
