"use client";

import Link from "next/link";

export default function NavBar() {
  const navLinks = [
    {
      name: "Danh sách đề",
      pages: [
        { name: "Đề ôn tập", href: "/practice/all" },
        { name: "Đề kiểm tra", href: "/exam/all" },
      ],
    },
    {
      name: "Tạo đề",
      pages: [
        { name: "Đề ôn tập", href: "/generate/practice" },
        { name: "Đề kiểm tra", href: "/generate/exam" },
      ],
    },
    { name: "Tải lên câu hỏi", href: "/upload" },
  ];

  return (
    <nav className="fixed z-10 bg-white top-0 w-full shadow-md">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="shrink-0 hover:text-blue-600 transition-colors">
            <Link href="/" className="font-bold text-xl">
              Generate Exam
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {navLinks.map((link) => {
              if (link.pages) {
                return (
                  <div key={link.name} className="relative group">
                    <div className="px-3 py-2 rounded-md text-sm font-semibold cursor-pointer transition-colors hover:bg-blue-600 hover:text-white">
                      {link.name}
                    </div>

                    <div className="absolute left-0 top-full pt-2 w-40 hidden group-hover:block z-50">
                      <div className="bg-white text-gray-800 rounded-md shadow-lg border border-gray-100 overflow-hidden">
                        {link.pages.map((page) => (
                          <Link
                            key={page.name}
                            href={page.href}
                            className="block px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            {page.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors hover:bg-blue-600 hover:text-white`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
