import React from "react";

export const CardSkeleton = ({ type }) => {
  return (
    <div
      className={`w-full mb-${type === "sm" ? "2" : "20"} cursor-pointer ${
        type === "sm" ? "grid grid-cols-2 gap-2" : "block"
      }`}
    >
      {/* Image skeleton */}
      <div
        className={`w-full ${
          type === "sm" ? "h-28" : "h-52"
        } bg-gray-300 animate-pulse rounded-lg`}
      ></div>

      {/* Details skeleton */}
      <div className={`flex mt-${type !== "sm" ? "2" : "0"} gap-3`}>
        {/* Channel Image */}
        {type !== "sm" && (
          <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
        )}

        {/* Text skeleton */}
        <div className="flex flex-col w-full gap-2">
          {/* Title */}
          <div className="w-3/4 h-4 bg-gray-300 animate-pulse rounded"></div>
          {/* Channel Name */}
          <div className="w-1/2 h-3 bg-gray-300 animate-pulse rounded"></div>
          {/* Info */}
          <div className="w-1/4 h-3 bg-gray-300 animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  );
};
