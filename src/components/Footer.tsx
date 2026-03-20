import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="py-2 md:py-3">
      <div className="section-shell shell-wide px-4 py-4 md:px-5 md:py-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-start md:gap-x-6 md:gap-y-3">
          <div className="md:col-span-5">
            <p className="text-sm font-semibold text-white/92">联系我们</p>
            <h3 className="font-display mt-2 text-[1.28rem] font-bold leading-tight text-white md:text-[1.44rem] lg:whitespace-nowrap">
              准备好把客户沟通升级成增长资产了吗？
            </h3>

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:max-w-[460px]">
              <div className="rounded-2xl border border-white/10 bg-black/35 px-3 py-2">
                <p className="text-xs text-white/65">电话</p>
                <div className="mt-1.5 space-y-0.5 text-sm font-semibold text-white">
                  <p>17810648168</p>
                  <p>13911788783</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/35 px-3 py-2">
                <p className="text-xs text-white/65">邮箱</p>
                <div className="mt-1.5 space-y-0.5 text-sm font-semibold">
                  <a href="mailto:doublegou@gmail.com" className="block text-white transition-colors hover:text-primary">
                    doublegou@gmail.com
                  </a>
                  <a href="mailto:newbee1984@gmail.com" className="block text-white transition-colors hover:text-primary">
                    newbee1984@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm font-semibold text-white/92">扫码添加</p>
            <div className="mt-[14px] grid max-w-[240px] grid-cols-2 gap-2">
              <div className="rounded-xl border border-white/10 bg-black/35 p-1.5">
                <Image src="/images/qr-code-1.jpg" alt="微信二维码一" width={120} height={120} className="h-auto w-full rounded-lg" />
              </div>
              <div className="rounded-xl border border-white/10 bg-black/35 p-1.5">
                <Image src="/images/qr-code-2.jpg" alt="微信二维码二" width={120} height={120} className="h-auto w-full rounded-lg" />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm font-semibold text-white/92">快速入口</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <Link href="#home" className="text-white/70 transition-colors hover:text-primary">
                  首页
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-white/70 transition-colors hover:text-primary">
                  关于
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-white/70 transition-colors hover:text-primary">
                  功能
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm font-semibold text-white/92">公司信息</p>
            <div className="mt-3 text-xs leading-5 text-white/52">
              <p>北京三擎科技有限公司</p>
              <p className="mt-1">北京市昌平区东小口镇天通中苑二区21号楼1层103-1799</p>
            </div>
          </div>
        </div>

        <div className="mt-3 border-t border-white/12 pt-2">
          <div className="flex items-center justify-center gap-3 text-[11px] leading-tight text-white/56">
            <p>Trigine</p>
            <span className="text-white/35">|</span>
            <p>京ICP备2026012266号-1</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
