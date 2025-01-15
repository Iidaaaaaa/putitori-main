import React from "react";
// assetsのインポート
import Gps from "@assets/Gps";

const Getgpsbtn = () => {
  return (
    <div className=" inline-block p-[9px] bg-[#999999] rounded-2xl">
      <div className="flex items-center">
        <Gps width="16" height="16" />
        <p className="ml-2 text-xs">現在地を取得</p>
      </div>
    </div>
  );
};

export default Getgpsbtn;
