import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#212121] text-gray-300">
      <div className="container mx-auto px-12 md:px-16 lg:px-24 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2 lg:gap-2 flex-1">
            {/* Company Section */}
            <div>
              <h3 className="text-white font-semibold text-base mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="hover:text-white transition-colors"
                  >
                    Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-white font-semibold text-base mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/support"
                    className="hover:text-white transition-colors"
                  >
                    Help & Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partner"
                    className="hover:text-white transition-colors"
                  >
                    Partner with us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ride"
                    className="hover:text-white transition-colors"
                  >
                    Ride with us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="text-white font-semibold text-base mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund"
                    className="hover:text-white transition-colors"
                  >
                    Refund & Cancellation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookie"
                    className="hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:min-w-[380px] xl:min-w-[420px]">
            <h3 className="text-white font-semibold text-base mb-4 uppercase tracking-wide">
              Follow Us
            </h3>
            <div className="flex gap-3 mb-8">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>

            <div>
              <p className="text-sm mb-3 text-gray-400">
                Receive exclusive offers in your mailbox
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1 min-w-[280px]">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter Your email"
                    className="pl-10 bg-[#2e2e2e] border-gray-700 text-white placeholder:text-gray-500 focus:border-brand-primary text-sm h-11 w-full"
                  />
                </div>
                <Button 
                  className="text-white px-6 text-sm h-11 whitespace-nowrap sm:w-auto w-full"
                  style={{ background: 'var(--brand-primary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--brand-primary-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--brand-primary)'}
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm text-gray-400">
            All rights Reserved © Your Company, {currentYear}
          </p>
          <p className="text-sm text-gray-400">
            Made with ❤️ by{" "}
            <span className="text-brand-primary font-semibold">Themewagon</span>
          </p>
        </div>
      </div>
    </footer>
  );
}