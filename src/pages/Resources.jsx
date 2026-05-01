import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { blogPosts, caseStudies } from '../data/mockData';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';

const Resources = () => {
  const [activeTab, setActiveTab] = useState('all');
  const observerRef = useRef(null);

  useEffect(() => {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('scroll-reveal');
        }
      });
    }, options);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#0A192F] pt-20">
      {/* Hero */}
      <section className="py-24 lg:py-32" style={{background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 40%, #3B82F6 75%, #7C3AED 100%)'}}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center scroll-reveal">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-8">
              Resources & Insights
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
              Expert perspectives on technology delivery, talent strategy, and enterprise transformation
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-[#111827]/80 border-b border-[#3B82F6]/20 sticky top-20 z-40 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex gap-6 justify-center">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 font-semibold text-lg transition-all rounded-lg ${
                activeTab === 'all'
                  ? 'text-violet-400 bg-violet-500/10 border border-violet-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              All Resources
            </button>
            <button
              onClick={() => setActiveTab('case-studies')}
              className={`px-6 py-3 font-semibold text-lg transition-all rounded-lg ${
                activeTab === 'case-studies'
                  ? 'text-violet-400 bg-violet-500/10 border border-violet-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Case Studies
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-6 py-3 font-semibold text-lg transition-all rounded-lg ${
                activeTab === 'blogs'
                  ? 'text-violet-400 bg-violet-500/10 border border-violet-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Blog
            </button>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-20 bg-[#0A192F]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* All Resources */}
          {activeTab === 'all' && (
            <div>
              {/* Featured Case Studies */}
              <div className="mb-20">
                <h2 className="text-3xl font-bold mb-8 scroll-reveal">
                  <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">
                    Featured Case Studies
                  </span>
                </h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  {caseStudies.slice(0, 2).map((study, index) => (
                    <Link
                      key={study.id}
                      to={`/resources/case-studies/${study.id}`}
                      className={`scroll-reveal delay-${index * 100} group bg-[#111827]/80 border border-[#3B82F6]/20 rounded-2xl overflow-hidden hover:border-[#3B82F6]/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300`}
                    >
                      <div className="relative overflow-hidden h-64">
                        <img
                          src={study.image}
                          alt={study.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                        <div className="absolute bottom-4 left-6 text-white">
                          <div className="text-sm font-semibold text-violet-400 mb-1">{study.industry}</div>
                          <div className="text-xs text-gray-300">{study.client}</div>
                        </div>
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-violet-400 transition-colors">
                          {study.title}
                        </h3>
                        <p className="text-gray-400 mb-6">{study.challenge}</p>
                        <div className="flex items-center text-violet-400 font-semibold">
                          Read Case Study
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Latest Blog Posts */}
              <div>
                <h2 className="text-3xl font-bold mb-8 scroll-reveal">
                  <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">
                    Latest Insights
                  </span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.slice(0, 3).map((post, index) => (
                    <Link
                      key={post.id}
                      to={`/resources/blog/${post.slug}`}
                      className={`scroll-reveal delay-${index * 100} group bg-[#111827]/80 border border-[#3B82F6]/20 rounded-2xl overflow-hidden hover:border-[#3B82F6]/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300`}
                    >
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                          <span className="inline-flex items-center gap-1 bg-violet-500/20 text-violet-400 px-3 py-1 rounded-full text-xs font-semibold">
                            <Tag className="w-3 h-3" />
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1 text-gray-400">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <ArrowRight className="w-5 h-5 text-violet-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Case Studies Only */}
          {activeTab === 'case-studies' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <Link
                  key={study.id}
                  to={`/resources/case-studies/${study.id}`}
                  className={`scroll-reveal delay-${index * 100} group bg-[#111827]/80 border border-[#3B82F6]/20 rounded-2xl overflow-hidden hover:border-[#3B82F6]/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300`}
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                    <div className="absolute bottom-4 left-6 text-white">
                      <div className="text-sm font-semibold text-violet-400 mb-1">{study.industry}</div>
                      <div className="text-xs text-gray-300">{study.client}</div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-violet-400 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-gray-400 mb-6">{study.challenge}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>{study.duration}</span>
                        <span>•</span>
                        <span>{study.teamSize}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-violet-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Blog Posts Only */}
          {activeTab === 'blogs' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/resources/blog/${post.slug}`}
                  className={`scroll-reveal delay-${index * 100} group bg-[#111827]/80 border border-[#3B82F6]/20 rounded-2xl overflow-hidden hover:border-[#3B82F6]/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300`}
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="inline-flex items-center gap-1 bg-violet-500/20 text-violet-400 px-3 py-1 rounded-full text-xs font-semibold">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <ArrowRight className="w-5 h-5 text-violet-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 40%, #3B82F6 75%, #7C3AED 100%)'}}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center scroll-reveal">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Success Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let's discuss how Infotron can help you achieve similar results
          </p>
          <Link to="/contact?type=client">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              Schedule a Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Resources;
