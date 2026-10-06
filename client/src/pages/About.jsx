import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  Award, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Wrench,
  Hammer
} from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function About({ settings }) {
  const phone = settings?.phone || '+94 77 123 4567';

  return (
    <>
      <SEOHead 
        title="About Us"
        description="Learn more about Nethmi Hardware — Sri Lanka’s premier hardware supplier providing authentic building materials, power tools, and industrial equipment."
        settings={settings}
      />

      <div className="space-y-16 sm:space-y-24 pb-16">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-charcoal-900 text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/10 text-primary-400 text-xs font-bold uppercase tracking-wide mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>Over 15 Years of Building Excellence</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white mb-6">
              Building Trust. Powering Creation.
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              At Nethmi Hardware, we equip homeowners, carpenters, plumbers, electricians, and civil contractors with the highest-grade tools and construction supplies in Sri Lanka.
            </p>
          </div>
        </section>

        {/* Story & Vision */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
              <img
                src="https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=1000&q=80"
                alt="Nethmi Hardware Storefront and Showroom"
                className="w-full h-full object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-sm text-gray-900 dark:text-white">Nethmi Hardware Kiribathgoda</h4>
                  <p className="text-xs text-gray-500">Retail Outlet & Materials Depot</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center">
                  <Wrench className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Our Story & Commitment
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-heading text-gray-900 dark:text-white leading-tight">
                From a Neighborhood Store to Sri Lanka's Preferred Hardware Supplier
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Founded with a mission to eliminate low-quality, uncertified hardware products, Nethmi Hardware has grown into a trusted wholesale and retail destination. We stock only SLS and ISO certified materials from internationally acclaimed manufacturers.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Whether you need a single screwdriver for a quick DIY repair or 500 bags of Tokyo Cement delivered directly to your commercial building site, our team ensures prompt service and transparent pricing every time.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">100% Genuine Authorized Brands</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Fast Contractor Logistics</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Competitive Tiered Pricing</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Comprehensive Product Warranties</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Core Values */}
        <section className="bg-white dark:bg-charcoal-900/50 py-16 sm:py-24 border-t border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 block mb-2">
                Guiding Principles
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-gray-900 dark:text-white">
                Our Core Pillars
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-charcoal-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-soft">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-primary-500 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">
                  Uncompromised Authenticity
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  We verify source chains directly with factory representatives to guarantee you never receive counterfeit tools or sub-standard cement batches.
                </p>
              </div>

              <div className="bg-white dark:bg-charcoal-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-soft">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-primary-500 flex items-center justify-center mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">
                  Customer-First Consultation
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our counter staff are seasoned construction veterans who help calculate surface coverage, cable gauges, and drill bit compatibility.
                </p>
              </div>

              <div className="bg-white dark:bg-charcoal-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-soft">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-primary-500 flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">
                  On-Time Delivery
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Construction delays cost money. Our dedicated fleet ensures materials land on your site right when your work crew is ready.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-primary-500 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-black font-heading mb-3">
              Need Assistance with Material Estimation?
            </h3>
            <p className="text-sm text-orange-100 max-w-xl mx-auto mb-6">
              Send us your architectural plan or list of required supplies and get a complete price breakdown within hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/quote"
                className="px-6 py-3 rounded-xl bg-white text-primary-600 font-bold text-sm shadow-md hover:bg-orange-50 transition-all"
              >
                Submit Quote Request
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm transition-all"
              >
                Visit Our Store
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
