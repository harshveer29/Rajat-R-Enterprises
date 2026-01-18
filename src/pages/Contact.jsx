import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleEmailClick = (formData = null) => {
    const to = 'rajatrenterprises2025@gmail.com'
    let subject = 'Inquiry from Website'
    let body = 'Hello Rajat R Enterprises,'
    
    // If form data is provided, include it in the email
    if (formData && formData.name) {
      subject = encodeURIComponent(`Contact Inquiry from ${formData.name}`)
      body = encodeURIComponent(
        `Hello Rajat R Enterprises,\n\n` +
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n\n` +
        `Message:\n${formData.message}`
      )
    } else {
      // Simple inquiry without form data
      subject = encodeURIComponent(subject)
      body = encodeURIComponent(body)
    }
    
    // Open Gmail compose in new tab
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${subject}&body=${body}`
    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Open Gmail compose with form data
    handleEmailClick(formData)
    
    // Reset form after a short delay
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      })
    }, 100)
  }

  const handleWhatsApp = () => {
    const phoneNumber = '918396948500' // Remove + and - from the number
    const message = encodeURIComponent('Hello, I would like to get in touch regarding your construction services.')
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight">Contact Us</h1>
          <p className="text-lg sm:text-xl md:text-xl text-primary-100 leading-relaxed">
            Get in Touch for Your Construction & Infrastructure Needs
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-7 md:mb-8 leading-tight">Get In Touch</h2>
              <p className="text-gray-600 mb-6 sm:mb-7 md:mb-8 text-base sm:text-lg leading-relaxed">
                We're here to help with your construction and infrastructure projects. 
                Reach out to us through any of the following channels.
              </p>

              <div className="space-y-5 sm:space-y-6">
                {/* Address */}
                <div className="flex items-start">
                  <div className="bg-primary-100 text-primary-600 p-2.5 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1.5 sm:mb-2 leading-tight">Location</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Rohtak, Haryana, India</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="bg-primary-100 text-primary-600 p-2.5 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1.5 sm:mb-2 leading-tight">Phone</h3>
                    <a
                      href="tel:+918396008500"
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base break-all"
                    >
                      +918396008500
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="bg-primary-100 text-primary-600 p-2.5 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1.5 sm:mb-2 leading-tight">Email</h3>
                    <button
                      onClick={() => handleEmailClick()}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base break-all text-left cursor-pointer"
                    >
                      rajatrenterprises2025@gmail.com
                    </button>
                  </div>
                </div>

                {/* Proprietor */}
                <div className="flex items-start">
                  <div className="bg-primary-100 text-primary-600 p-2.5 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1.5 sm:mb-2 leading-tight">Proprietor</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Mr. Anil Kumar</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-300">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 leading-tight">Quick Actions</h3>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="tel:+918396008500"
                    className="bg-primary-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-primary-700 active:bg-primary-800 transition-colors text-center text-sm sm:text-base"
                  >
                    Call Now
                  </a>
                  <button
                    onClick={handleWhatsApp}
                    className="bg-green-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-green-700 active:bg-green-800 transition-colors text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </button>
                  <button
                    onClick={() => handleEmailClick()}
                    className="bg-white border-2 border-primary-600 text-primary-600 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-primary-50 active:bg-primary-100 transition-colors text-center text-sm sm:text-base w-full sm:w-auto"
                  >
                    Send Email
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-7 md:mb-8 leading-tight">Send Us a Message</h2>
              
              <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
                Fill out the form below and click "Send Message" to open your email client with your message pre-filled.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm sm:text-base"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm sm:text-base"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm sm:text-base"
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none text-sm sm:text-base"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold hover:bg-primary-700 active:bg-primary-800 transition-colors shadow-lg text-sm sm:text-base"
                >
                  Send Message via Email
                </button>
              </form>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold hover:bg-green-700 active:bg-green-800 transition-colors shadow-lg text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Contact via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8 leading-tight">
            Business Hours
          </h2>
          <div className="bg-gray-50 rounded-lg p-6 sm:p-8 text-center">
            <p className="text-gray-700 text-base sm:text-lg mb-3 sm:mb-4 leading-relaxed">
              <span className="font-semibold">Monday - Saturday:</span> 9:00 AM - 6:00 PM
            </p>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              <span className="font-semibold">Sunday:</span> Closed
            </p>
            <p className="text-gray-600 mt-4 text-sm sm:text-base leading-relaxed">
              For urgent inquiries, please call us directly at{' '}
              <a href="tel:+918396008500" className="text-primary-600 hover:text-primary-700 font-semibold">
                +91-8396008500
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

