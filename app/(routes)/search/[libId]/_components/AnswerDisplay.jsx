import Image from "next/image";
import React from "react";

function AnswerDisplay({ searchResult }) {
  const webResult = searchResult?.results;

  return (
    <div>
      <div className="flex gap-2 flex-wrap mt-5">
        {webResult?.map((item, index) => (
          <div
            key={index}
            className="p-3 bg-accent rounded-lg w-[200px] cursor-pointer hover:bg-[#e1e3da]"
            onClick={() => window.open(item.url, '_blank')}
          >
            <div className="flex gap-2 items-center mb-1">
              {item?.profile?.img ? (
                <Image
                  src={item.profile.img}
                  alt={item.profile.name || item.title || "Favicon"}
                  width={20}
                  height={20}
                  style={{ width: "auto", height: "auto" }}
                />
              ) : (
                <div className="w-5 h-5 bg-gray-200 rounded" />
              )}
              <h2 className="text-xs">
                {item?.profile?.long_name || item?.profile?.name || ""}
              </h2>
            </div>
            <h2 className="font-semibold text-xs mb-1">{item?.title}</h2>
            <p className="line-clamp-2 text-black text-xs">
              {item?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnswerDisplay;