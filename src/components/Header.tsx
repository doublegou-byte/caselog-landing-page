import React, { useEffect } from "react";
import Image from "next/image";


const Header = () => {
  // Component did mount effect to ensure we're running client-side
  useEffect(() => {
    // Add active class to navigation links based on scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('text-primary');
            
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('text-primary');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header className="absolute w-full z-100 top-0">
      <div className="container mx-auto px-4 py-2">
        <nav className="bg-white py-[2mm] rounded-md">
          <div className="flex flex-wrap justify-center md:justify-center items-center">
            <a href="#home" className="relative h-16 w-60 overflow-hidden bg-white mr-3">
              <Image
                src="/images/logo (2).png"
                alt="Logo"
                fill
                className="scale-110"
                style={{ objectFit: "contain" }}
              />
            </a>
            <a
              href="#home"
              className="px-4 py-1.5 font-semibold text-base text-primary uppercase hover:text-primary/70 transition-colors"
            >
              首页
            </a>
            <a
              href="#about"
              className="px-4 py-1.5 font-semibold text-base text-secondary uppercase hover:text-primary transition-colors cursor-pointer"
            >
              关于我们
            </a>
            <a
              href="#features"
              className="px-4 py-1.5 font-semibold text-base text-secondary uppercase hover:text-primary transition-colors"
            >
              应用功能
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
