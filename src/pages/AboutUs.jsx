import React from 'react';
import Navigation from '../components/Navigation';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-8 sm:pb-12 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">About Frodel Enterprises</h1>
          <p className="text-lg sm:text-xl opacity-90">Quality Frozen Foods Since 2014</p>
        </div>
      </section>

      {/* Where We Started */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Where We Started</h2>
          <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
            <p>FRODEL Enterprises is a Partnership firm founded by a like-minded group of friends turned partners, established in 2014. Partners at FRODEL hail from different walks of life.</p>
            <p>Right from Hotelkeeping, Catering, Food Processing; to Marketing, Finance, Medicine, Teaching & IT - they have all the feathers falling in one cap.</p>
          </div>
        </div>
      </section>

      {/* What We Are */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">What We Are</h2>
          <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
            <p>Currently FRODEL manufactures, markets & sells all its own commodities & processed frozen foods including Jain, Veg & Non-Veg options. Operating from their self-owned food manufacturing and processing unit, FRODELs set up covers about 7500 sq. ft. in Bhiwandi, Thane off Mumbai Nasik Highway.</p>
            <p>This facility was built from scratch to suit FRODEL's specific requirements. It comes furnished with an equipped kitchen, a processing area, a blast freezer, a massive cold room & an office space.</p>
            <p>Their production is seen through by experienced & competent Chef/s captaining a team of skilled workers. Moreover, FRODEL delivers its products utilizing their select logistic resources.</p>
            <p>Besides vending commodities, FRODEL offers a variety of about 60 different food products. These products frozen, of course; are stored under -18°C and delivered to distributors through cold supply chain logistics.</p>
          </div>
        </div>
      </section>

      {/* Where We Are Going */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Where We Are Going</h2>
          <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
            <p>From B2B market, FRODEL is steadily catering the B2C market with extensive Digital Media support & heavy penetration in traditional market.</p>
            <p>FRODEL strives to further enhance its management strategies & get onto IPO on SME platform by 2022 & eventually onto the main IPO platform.</p>
            <p>At present, FRODEL products have found appreciable market in Mumbai, Thane, New Mumbai, Goa, Pune, Navsari, Ahmedabad & Surat. With intentions to expand and cover diverse markets, FRODEL aims to go pan India & abroad soon. Consequently, FRODEL envisions exponential growth in its turnover in coming years.</p>
          </div>
        </div>
      </section>

      {/* Beyond Business */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Beyond The Business Lines</h2>
          <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
            <p>In addition to running a profitable business, FRODEL is committed to their Social Enterprise Activities & cater to our country's underprivileged brethren.</p>
            <p>During the pandemic in 2020, meals & beverages worth Rs. 3 lakhs were distributed to migrant workers residing in Mumbai. In 2021 again, FRODEL didn't fail to support and extend aid in all possible ways. Serving meals and beverages daily to the front-line covid-19 warriors – city police, traffic police and government essential workers; amidst the tough times is them doing their bit.</p>
            <p>At FRODEL we are committed to execute fair business, take care of our employees, fuel their aspirations, and do our best to make this world a better place to live.</p>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Social Enterprise Initiatives</h3>
          <ul className="space-y-2 text-gray-700 text-base sm:text-lg leading-relaxed list-disc list-inside">
            <li>Majority of Partners in Frodel Enterprises are graduates from the same, R. J. College in Mumbai & were actively involved in the Social Service Projects through National Service Scheme (NSS)</li>
            <li>With time Frodel plans to employ Differentially Abled persons in its work as per eligibility</li>
            <li>Frodel intends to procure raw materials directly from the Farmers in Village once our procurement needs reach a rational quantum</li>
            <li>Frodel plans to initiate a unique programme Women Entrepreneurship Empowerment Movement (WEEM) to support women</li>
            <li>Community Refrigerator is yet another Social Enterprise Programme which Frodel plans to start for supporting needy people</li>
          </ul>
        </div>
      </section>

      {/* Why Try Our Products */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Why You Should Try Our Products</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 text-base sm:text-lg list-disc list-inside">
            <li>No Preservatives added</li>
            <li>No Artificial Colours added</li>
            <li>Ready To Cook products</li>
            <li>High on natural flavours</li>
            <li>Food for every mood</li>
            <li>Beats the hunger pangs</li>
            <li>Affordable and Good Quality products</li>
            <li>Treat family with Ala Carte at home</li>
          </ul>
        </div>
      </section>

      {/* Vision Mission Values */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 sm:space-y-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-base sm:text-lg leading-relaxed opacity-90">To carve an identity as the Best & Biggest Food Product Manufacturer & provide opportunity to all those eligible to associate & earn a decent livelihood in or with our organisation.</p>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-base sm:text-lg leading-relaxed opacity-90">To provide authentic, safe & hygienic food products for best price & diversify ourselves in various fields giving honest & genuine products & services. And thus contributing towards - Making this world a better place to live.</p>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Core Values</h2>
              <div className="space-y-3 text-base sm:text-lg">
                <p><span className="font-bold">GENUINITY:</span> To be authentic, be adaptable.</p>
                <p><span className="font-bold">UNITY:</span> Diversity empowers, together we stand.</p>
                <p><span className="font-bold">ZEAL:</span> Chase the passion.</p>
                <p><span className="font-bold">FLEXIBILITY:</span> Learn, leap & lead.</p>
                <p><span className="font-bold">MINDFULNESS:</span> Thoughtful, pure, and honest.</p>
                <p><span className="font-bold">APPRECIATION:</span> Dwell on the good.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
