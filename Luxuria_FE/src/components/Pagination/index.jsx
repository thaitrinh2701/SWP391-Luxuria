export const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center my-4">
      <ul className="flex list-none">
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={`mx-1 px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white hs-dark-mode-active:bg-gray-300  ${
              number === currentPage
                ? "bg-blue-500 text-white hs-dark-mode-active:bg-blue-600"
                : "bg-white text-gray-700 hs-dark-mode-active:bg-gray-800 hs-dark-mode-active:text-gray-300"
            }`}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};
