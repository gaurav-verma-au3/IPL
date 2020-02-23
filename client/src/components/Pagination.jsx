import React from "react";

const Pagination = ({ itemsPerPage, totalItems, setCurrentPage }) => {
  const pages = [];

  console.log(itemsPerPage, totalItems);

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div>
      <nav className="d-flex justify-content-center py-3">
        <ul class="pagination">
          {pages.map(pagenum => {
            return (
              <li key={pagenum} class="page-item">
                <button
                  onClick={e => {
                    setCurrentPage(pagenum);
                  }}
                  class="page-link"
                >
                  {pagenum}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
