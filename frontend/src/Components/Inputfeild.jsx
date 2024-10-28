import React from "react";

function Inputfeild({ icon: Icon, ...props }) {
  return (
    <div className="relative mb-6">
      <div className="relative border-l-2 border-r-2 border-b-2  border-gray-300 rounded-lg">
        <div className="absolute inset-y-0 left-0 flex pointer-events-none items-center pl-3"> 
        <Icon className="size-5 text-white"/>
        </div>
        
        <input
          {...props}
          className="w-full bg-transparent p-3 outline-none text-white pl-10"
        />
        <div className="absolute top-0 right-0 w-4/5 h-0.5 bg-gray-300 rounded-tr-lg"></div>
      </div>
    </div>
  );
}

export default Inputfeild;
