import React from "react";
import ReactPaginate from "react-paginate";

export default function Pagination({ data, setOffset }) {
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * 20;
    setOffset(offset);
  };

  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
    />
  );
}
