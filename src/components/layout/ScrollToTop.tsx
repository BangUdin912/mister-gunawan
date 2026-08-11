"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  usePathname,
} from "next/navigation";


import {
  ArrowUp,
} from "lucide-react";


export default function ScrollToTop(){

  const pathname =
    usePathname();


  const [
    visible,
    setVisible,
  ] = useState(false);



  useEffect(()=>{

    if(
      pathname.startsWith("/admin")
    ){
      return;
    }


    const handleScroll = ()=>{

      setVisible(
        window.scrollY > 400
      );

    };


    handleScroll();


    window.addEventListener(
      "scroll",
      handleScroll
    );


    return ()=>{

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };


  },[
    pathname
  ]);



  if(
    pathname.startsWith("/admin")
  ){
    return null;
  }



  if(!visible){
    return null;
  }



  return (

    <button
      type="button"
      onClick={()=>{

        window.scrollTo({
          top:0,
          behavior:"smooth",
        });

      }}
      className="
        fixed
        bottom-6
        right-6
        z-50
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        bg-blue-600
        text-white
        shadow-lg
        transition
        hover:bg-blue-700
      "
      aria-label="Scroll to top"
    >

      <ArrowUp
        className="h-5 w-5"
      />

    </button>

  );

}