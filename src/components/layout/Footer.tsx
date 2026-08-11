"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portofolio", href: "/portofolio" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Professional Training", href: "/services" },
  { name: "Leadership Training", href: "/services" },
  { name: "Public Speaking", href: "/services" },
  { name: "Motivation Training", href: "/services" },
  { name: "Corporate Training", href: "/services" },
  { name: "Consultant Training", href: "/services" },
];

const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com/mistergunawan",
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/mistergunawantrainer",
    icon: Facebook,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/mistergunawan",
    icon: Linkedin,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@MisterGunawan",
    icon: Youtube,
  },
];

export default function Footer() {
  const pathname = usePathname();

  // Jangan tampilkan footer di halaman admin
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-blue-600/20 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-4">
          {/* Company */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Mister Gunawan
            </h2>

            <p className="mt-2 text-sm font-medium text-blue-400">
              Hartawan Sukses Sejahtera (HSS)
            </p>

            <p className="mt-6 leading-8 text-slate-400">
              Professional Trainer, Public Speaker, Coach, dan Consultant
              yang membantu perusahaan, instansi, universitas, sekolah,
              maupun organisasi meningkatkan kualitas sumber daya manusia.
            </p>

            <div className="mt-8 flex gap-3">
              {socials.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xl font-semibold text-white">
              Navigation
            </h3>

            <ul className="mt-6 space-y-4">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 transition-all duration-300 hover:translate-x-1 hover:text-blue-400"
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold text-white">
              Services
            </h3>

            <ul className="mt-6 space-y-4">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 transition-all duration-300 hover:translate-x-1 hover:text-blue-400"
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white">
              Contact
            </h3>

            <div className="mt-6 space-y-6">
              <div className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-blue-400" />

                <div>
                  <p className="font-semibold text-white">
                    WhatsApp
                  </p>

                  <Link
                    href="https://wa.me/6287776105547"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-blue-400"
                  >
                    +62 877-7610-5547
                  </Link>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-blue-400" />

                <div>
                  <p className="font-semibold text-white">
                    Email
                  </p>

                  <Link
                    href="mailto:gunawanridwan1234@gmail.com"
                    className="break-all transition-colors hover:text-blue-400"
                  >
                    gunawanridwan1234@gmail.com
                  </Link>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-blue-400" />

                <div>
                  <p className="font-semibold text-white">
                    Location
                  </p>

                  <p className="leading-7 text-slate-400">
                    Jl. Damai No. 8
                    <br />
                    Ragunan
                    <br />
                    Jakarta Selatan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
            <p className="text-center text-sm text-slate-500 lg:text-left">
              © {new Date().getFullYear()} Mister Gunawan · Hartawan
              Sukses Sejahtera (HSS). All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-blue-400"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="transition-colors hover:text-blue-400"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}