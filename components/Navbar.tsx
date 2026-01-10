import { useState } from "react";
import { useStore } from "@nanostores/react";
import { enquiryStore } from "../store/enquiryStore";
import SearchBar from "./SearchBar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/why-deltric", label: "Why Deltric" },
  {
    href: "/products",
    label: "Products",
    dropdown: [
      {
        label: "Cable Management Systems",
        href: "/products/cable-management-systems",
      },
      { label: "Earthing", href: "/products/earthing" },
      { label: "Lightning", href: "/products/lightning" },
      { label: "Exothermic Welding", href: "/products/exothermic-welding" },
      {
        label: "Plugs and Sockets",
        href: "/products/plugs-and-sockets",
      },
      {
        label: "Hazardous Area Solutions",
        href: "/products/hazardous-area-solutions",
      },
    ],
  },
  {
    href: "/services",
    label: "Services",
    dropdown: [
      {
        label: "Project Engineering Design",
        href: "/services/product-engineering-design",
      },
      {
        label: "Soil Resistivity Test",
        href: "/services/soil-resistivity-test",
      },
      {
        label: "Lightning Risk Assessment",
        href: "/services/lightning-risk-assessment",
      },
      { label: "Value Engineering", href: "/services/value-engineering" },
      { label: "Audit Services", href: "/services/audit" },
      {
        label: "Project Management and Installation Services",
        href: "/services/project-management-and-installation",
      },
    ],
  },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showSearchInput, setShowSearchInput] = useState(false); // NEW FOR EXPANDING SEARCH

  const $enquiryStore = useStore(enquiryStore);
  const enquiryCount = Object.values($enquiryStore).length;
  const badgeCount = enquiryCount > 9 ? "9+" : enquiryCount;

  const toggleMobileDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <nav className="sticky top-0 left-0 z-50 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="shrink-0">
            <a href="/" className="flex items-center gap-2">
              <div className="w-48 h-24 bg-primary rounded-lg flex items-center justify-center 2xl:w-84 2xl:h-48">
                <img
                  src="https://deltric.com.my/assets/img/logo/logo.png"
                  alt="deltric-logo"
                  className="2xl:w-84"
                />
              </div>
            </a>
          </div>

          <div className="flex gap-8">
            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8 relative">
              {navLinks.map((link) => {
                const hasDropdown = !!link.dropdown;

                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <a
                      href={link.href}
                      className={`text-sm md:text-sm xl:text-2xl font-medium transition-colors hover:text-brand-color hover:underline ${link.href === "/products"
                        ? "text-foreground border-primary"
                        : "text-foreground hover:text-primary"
                        }`}
                    >
                      {link.label}
                    </a>

                    {hasDropdown && openDropdown === link.label && (
                      <div className="absolute left-0 bg-white shadow-lg rounded-lg p-2 w-64 z-50">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 text-md lg:text-lg text-foreground hover:bg-muted rounded-lg"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop Search + Mobile Button */}
            <div className="flex items-center gap-4">
              {/* *** SEARCH AREA *** */}

              {/* 1️⃣ SMALL SCREENS (md to lg): ICON → EXPANDING SEARCH */}
              <div className="hidden lg:flex lg:gap-8 xl:hidden items-center relative">
                {!showSearchInput && (
                  <button
                    onClick={() => setShowSearchInput(true)}
                    className="p-2 text-foreground"
                  >
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35m1.1-5.4a6.5 6.5 0 11-13.001 0 6.5 6.5 0 0113.001 0z"
                      />
                    </svg>
                  </button>
                )}

                {showSearchInput && (
                  <div className="relative">
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search..."
                      className="w-36 bg-muted text-foreground placeholder-muted-foreground px-4 py-2 pl-10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                    <svg
                      className="w-5 h-5 absolute left-3 top-2.5 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35m1.1-5.4a6.5 6.5 0 11-13.001 0 6.5 6.5 0 0113.001 0z"
                      />
                    </svg>
                  </div>
                )}
                {/*  CART BUTTON */}
                <a href="/enquiry" className="relative">
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                  >
                    <path
                      fill="#000000"
                      d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"
                    />
                  </svg>
                  {enquiryCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {badgeCount}
                    </div>
                  )}
                </a>
              </div>

              {/* 2️⃣ LARGE SCREENS (lg+): SHOW STATIC SMALL SEARCH BAR */}
              <div className="hidden xl:flex items-center relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 bg-muted text-foreground placeholder-muted-foreground px-4 py-2 pl-10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <svg
                  className="w-5 h-5 absolute left-3 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m1.1-5.4a6.5 6.5 0 11-13.001 0 6.5 6.5 0 0113.001 0z"
                  />
                </svg>
                {/* Desktop Cart Button */}
                <a href="/enquiry" className="relative ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    className="w-8 h-8"
                  >
                    <path
                      fill="#000000"
                      d="M104 112C90.7 112 80 122.7 80 136L80 184C80 197.3 90.7 208 104 208L152 208C165.3 208 176 197.3 176 184L176 136C176 122.7 165.3 112 152 112L104 112zM256 128C238.3 128 224 142.3 224 160C224 177.7 238.3 192 256 192L544 192C561.7 192 576 177.7 576 160C576 142.3 561.7 128 544 128L256 128zM256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L256 288zM256 448C238.3 448 224 462.3 224 480C224 497.7 238.3 512 256 512L544 512C561.7 512 576 497.7 576 480C576 462.3 561.7 448 544 448L256 448zM80 296L80 344C80 357.3 90.7 368 104 368L152 368C165.3 368 176 357.3 176 344L176 296C176 282.7 165.3 272 152 272L104 272C90.7 272 80 282.7 80 296zM104 432C90.7 432 80 442.7 80 456L80 504C80 517.3 90.7 528 104 528L152 528C165.3 528 176 517.3 176 504L176 456C176 442.7 165.3 432 152 432L104 432z"
                    />
                  </svg>
                  {enquiryCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {badgeCount}
                    </div>
                  )}
                </a>
              </div>

              {/* 3️⃣ MOBILE SEARCH COMPONENT */}
              <div className="lg:hidden">
                <SearchBar />
              </div>
              {/* 3️⃣ MOBILE CART BUTTON */}
              <div className="lg:hidden">
                <a href="/enquiry" className="relative">
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                  >
                    <path
                      fill="#050505"
                      d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"
                    />
                  </svg>
                  {enquiryCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {badgeCount}
                    </div>
                  )}
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="w-6 h-6 text-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.href}>
                <div className="flex justify-between items-center px-4">
                  <a
                    href={link.href}
                    className="block py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors w-full"
                    onClick={() => {
                      if (!link.dropdown) setIsMobileMenuOpen(false);
                    }}
                  >
                    {link.label}
                  </a>

                  {link.dropdown && (
                    <button
                      className="text-foreground px-2"
                      onClick={() => toggleMobileDropdown(link.label)}
                    >
                      {openDropdown === link.label ? "−" : "+"}
                    </button>
                  )}
                </div>

                {link.dropdown && openDropdown === link.label && (
                  <div className="pl-6 flex flex-col gap-1">
                    {link.dropdown.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="px-4 pt-2">
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-muted text-foreground placeholder-muted-foreground px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
