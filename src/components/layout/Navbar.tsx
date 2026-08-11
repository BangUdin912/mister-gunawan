"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowRight,
  Menu,
  Shield,
} from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";


const menus = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "Portofolio",
    href: "/portofolio",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {

  const pathname = usePathname();

  const [scrolled,setScrolled] =
    useState(false);


  useEffect(()=>{

    const handleScroll = ()=>{

      setScrolled(
        window.scrollY > 30
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


  },[]);



  const isAdmin =
    pathname.startsWith("/admin");


  if(isAdmin){
    return null;
  }



  const textColor =
    scrolled
    ? "text-slate-800"
    : "text-white";


  const adminButton = (
    <Link
      href="/login"
      className="
        group
        inline-flex
        items-center
        gap-2
        rounded-full
        bg-blue-600
        px-6
        py-3
        text-sm
        font-semibold
        text-white
        shadow-lg
        shadow-blue-600/20
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-blue-700
        hover:shadow-xl
      "
    >

      <Shield className="h-4 w-4"/>


      <span>
        Admin Panel
      </span>


      <ArrowRight
        className="
          h-4
          w-4
          transition-transform
          duration-300
          group-hover:translate-x-1
        "
      />

    </Link>
  );



  return (

    <header
      className={`
        fixed
        inset-x-0
        top-0
        z-50
        transition-all
        duration-300
        ${
          scrolled
          ?
          "border-b border-slate-200 bg-white/95 shadow-lg backdrop-blur-xl"
          :
          "bg-transparent"
        }
      `}
    >


      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-6
          lg:px-8
        "
      >


        {/* LOGO */}

        <Link
          href="/"
          className="
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-white
              shadow-lg
              ring-1
              ring-black/5
            "
          >

            <Image
              src="/images/logo/logo hss.png"
              alt="Hartawan Sukses Sejahtera"
              width={42}
              height={42}
              priority
              className="object-contain"
            />

          </div>



          <div className="leading-tight">

            <h2
              className={`
                text-2xl
                font-bold
                transition-colors
                ${textColor}
              `}
            >
              Mister Gunawan
            </h2>


            <p
              className={`
                text-xs
                transition-colors
                ${
                  scrolled
                  ?
                  "text-slate-500"
                  :
                  "text-white/80"
                }
              `}
            >
              Hartawan Sukses Sejahtera
            </p>

          </div>


        </Link>





        {/* DESKTOP MENU */}

        <nav
          className="
            hidden
            items-center
            gap-9
            lg:flex
          "
        >

          {
            menus.map(menu=>(

              <Link
                key={menu.href}
                href={menu.href}
                className={`
                  text-[15px]
                  font-semibold
                  tracking-wide
                  transition-colors
                  hover:text-blue-500
                  ${textColor}
                `}
              >
                {menu.name}

              </Link>

            ))
          }


        </nav>






        {/* DESKTOP BUTTON */}

        <div className="hidden lg:flex">

          {adminButton}

        </div>






        {/* MOBILE */}

        <div className="lg:hidden">

          <Sheet>


            <SheetTrigger
  className={`
    flex
    h-10
    w-10
    items-center
    justify-center
    rounded-lg
    border
    ${
      scrolled
      ?
      "border-slate-200"
      :
      "border-white/20 bg-white/10 text-white"
    }
  `}
>

  <Menu
    className="h-5 w-5"
  />

</SheetTrigger>

            <SheetContent
              side="right"
              className="w-80"
            >


              <div
                className="
                  mt-10
                  flex
                  flex-col
                  gap-8
                "
              >


                <nav
                  className="
                    flex
                    flex-col
                    gap-2
                  "
                >

                  {
                    menus.map(menu=>(

                      <SheetClose
                        key={menu.href}
                      >

                        <Link
                          href={menu.href}
                          className="
                            block
                            rounded-lg
                            px-4
                            py-3
                            font-medium
                            hover:bg-slate-100
                          "
                        >

                          {menu.name}

                        </Link>


                      </SheetClose>

                    ))
                  }


                </nav>




                {adminButton}


              </div>


            </SheetContent>


          </Sheet>


        </div>



      </div>


    </header>

  );

}