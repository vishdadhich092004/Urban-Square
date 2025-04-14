import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  Home,
  Building,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-background text-foreground relative border-t">
      {/* Scroll to top button */}
      <Button
        onClick={scrollToTop}
        size="icon"
        variant="default"
        className="absolute -top-5 left-1/2 transform -translate-x-1/2 rounded-full shadow-lg"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>

      {/* Newsletter Section */}
      <div className="bg-muted py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-muted-foreground mb-6">
              Stay up to date with the latest properties, news, and updates from
              Urban Square
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-grow"
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="text-xl font-bold">Urban Square</span>
              </div>

              <p className="text-muted-foreground mb-6">
                Your trusted partner in finding the perfect property. Whether
                you're buying, selling, or renting, we're here to help.
              </p>

              <div className="flex space-x-4 mb-8">
                {[
                  { icon: <Facebook className="h-4 w-4" />, name: "Facebook" },
                  { icon: <Twitter className="h-4 w-4" />, name: "Twitter" },
                  {
                    icon: <Instagram className="h-4 w-4" />,
                    name: "Instagram",
                  },
                  { icon: <Linkedin className="h-4 w-4" />, name: "LinkedIn" },
                ].map((social) => (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary hover:text-primary-foreground"
                  >
                    {social.icon}
                    <span className="sr-only">{social.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Home className="mr-2 text-primary" /> Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", path: "/" },
                  { name: "Properties", path: "/properties" },
                  { name: "Agents", path: "/agents" },
                  { name: "About Us", path: "/about" },
                  { name: "Contact", path: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-foreground hover:pl-1 transition-all duration-200 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Property Types */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Building className="mr-2 text-primary" /> Property Types
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Houses", query: "house" },
                  { name: "Apartments", query: "apartment" },
                  { name: "Condos", query: "condo" },
                  { name: "Land", query: "land" },
                  { name: "Commercial", query: "commercial" },
                ].map((type) => (
                  <li key={type.name}>
                    <Link
                      to={`/properties?propertyType=${type.query}`}
                      className="text-muted-foreground hover:text-foreground hover:pl-1 transition-all duration-200 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      {type.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Phone className="mr-2 text-primary" /> Contact Us
              </h3>
              <address className="not-italic text-muted-foreground space-y-4">
                <p className="flex items-start">
                  <MapPin className="text-primary mr-3 mt-1 flex-shrink-0" />
                  <span>
                    1234 Real Estate Ave
                    <br />
                    San Francisco, CA 94103
                  </span>
                </p>
                <p className="flex items-center">
                  <Phone className="text-primary mr-3 flex-shrink-0" />
                  <a
                    href="tel:+1234567890"
                    className="hover:text-foreground transition-colors duration-200"
                  >
                    (123) 456-7890
                  </a>
                </p>
                <p className="flex items-center">
                  <Mail className="text-primary mr-3 flex-shrink-0" />
                  <a
                    href="mailto:info@urbansquare.com"
                    className="hover:text-foreground transition-colors duration-200"
                  >
                    info@urbansquare.com
                  </a>
                </p>
              </address>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold mb-3">Business Hours</h4>
                <ul className="text-muted-foreground space-y-2">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} Urban Square. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex flex-wrap space-x-6">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Sitemap",
                  "Cookie Policy",
                ].map((item) => (
                  <li key={item}>
                    <Button
                      variant="link"
                      className="text-muted-foreground text-sm p-0 h-auto"
                    >
                      {item}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
