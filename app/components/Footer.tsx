import Link from "next/link";



const Footer = () => {
  return (
    <footer className="border-t border-neutral-100 py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
        <div>&copy; 2026 YourTimer</div>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-neutral-900">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-neutral-900">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-neutral-900">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
