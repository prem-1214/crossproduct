import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPrev,
  onNext,
}) => (
  <div className="flex justify-center text-lg">
    <div className="flex justify-end gap-4 mt-4">
      <button onClick={onPrev} disabled={page === 1} className="cursor-pointer">
        {"<<"}
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="cursor-pointer"
      >
        {">>"}
      </button>
    </div>
  </div>
);

export default Pagination;
