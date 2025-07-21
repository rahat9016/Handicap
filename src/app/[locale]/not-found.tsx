import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "@/i18n/navigation"
import { ArrowLeft, Home, Phone, Search } from "lucide-react"

export default function NotFound() {
  const quickLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/contact", label: "Contact", icon: Phone },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 pt-40">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            asChild
            size="lg"
            className="gradient-primary text-white px-8 py-4 text-lg font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <Link href="/">
              <Home className="h-5 w-5 mr-2" />
              Go to Homepage
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
          >
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <Card className="glass-card border-0 p-8 max-w-2xl mx-auto">
          <CardContent className="p-0">
            <h3 className="text-2xl font-bold text-gradient mb-6">Quick Links</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className="group p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 text-center"
                  >
                    <IconComponent className="h-8 w-8 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 font-medium group-hover:text-blue-600">{link.label}</span>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still can&apos;t find what you&apos;re looking for?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50">
              <Link href="/contact">
                <Phone className="h-4 w-4 mr-2" />
                Contact Support
              </Link>
            </Button>

            <Button asChild variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50">
              <Link href="/gallery">
                <Search className="h-4 w-4 mr-2" />
                Search Site
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
