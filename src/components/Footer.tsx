import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white pt-4 pb-2 relative">
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 max-w-4xl mx-auto">
          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold uppercase mb-2">
              快速链接
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="#features"
                  className="text-white/80 hover:text-primary transition-colors text-sm"
                >
                  应用功能
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-white/80 hover:text-primary transition-colors text-sm"
                >
                  关于我们
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold uppercase mb-2">
              联系我们
            </h3>
            <div className="mb-2 flex items-center justify-center md:justify-start">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M3 21h18M5 21V7l8-4 8-4-4v14M9 10a2 2 0 1 1 4 0 2 2 0 1 1-4 0"></path>
                </svg>
              </div>
              <p className="text-white/80 text-sm">北京三擎科技有限公司</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Image
                    src="/images/footer-phone-icon.svg"
                    alt="Phone"
                    width={12}
                    height={12}
                    className="text-white"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <p className="text-white/80 text-sm">17810648168</p>
                  <span className="text-white/80">|</span>
                  <p className="text-white/80 text-sm">13911788783</p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Image
                    src="/images/footer-mail-icon.svg"
                    alt="Email"
                    width={12}
                    height={12}
                    className="text-white"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <a href="mailto:doublegou@gmail.com" className="text-white/80 hover:text-primary transition-colors text-sm">
                    doublegou@gmail.com
                  </a>
                  <span className="text-white/80">|</span>
                  <a href="mailto:newbee1984@gmail.com" className="text-white/80 hover:text-primary transition-colors text-sm">
                    newbee1984@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <p className="text-white/80 text-sm">北京市昌平区东小口镇天通中苑二区21号楼1层103-1799</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-2 mt-1">
          <div className="flex flex-col items-center justify-center space-y-1">
            <p className="text-white/80 text-xs leading-tight">
              Trigine
            </p>
            <p className="text-white/80 text-xs leading-tight">
              京ICP备2026012266号-1
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
