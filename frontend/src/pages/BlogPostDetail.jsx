import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { blogPosts } from '../data/mockData';

const BlogPostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0A192F] pt-32 pb-24" data-testid="blog-not-found">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article not found</h1>
          <p className="text-gray-400 mb-8">The article you're looking for may have moved or been renamed.</p>
          <Button onClick={() => navigate('/resources')} className="bg-[#3B82F6] hover:bg-[#1E3A8A] text-white">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Resources
          </Button>
        </div>
      </div>
    );
  }

  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const formatDate = (s) => new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-[#0A192F] pt-20" data-testid="blog-post-detail">
      {/* Back nav */}
      <div className="border-b border-white/5 bg-[#0A192F]/80 backdrop-blur">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            data-testid="back-to-resources"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>
          <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/40 hidden sm:block">
            Infotron / Blog
          </div>
        </div>
      </div>

      {/* HERO */}
      <section
        className="relative py-16 lg:py-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 50%, #4C1D95 100%)' }}
      >
        <div className="max-w-[900px] mx-auto px-6 lg:px-12 relative">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-white/90 text-xs font-semibold tracking-wider uppercase mb-6">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-blue-100/90 leading-relaxed mb-8 max-w-3xl">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-blue-100/70 pt-6 border-t border-white/10">
            <span className="inline-flex items-center gap-2">
              <User className="w-4 h-4" /> {post.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" /> {post.readTime} read
            </span>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <section className="bg-[#0A192F]">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 -mt-8 relative z-10">
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/40">
            <img src={post.image} alt={post.title} className="w-full h-[300px] md:h-[420px] object-cover" />
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-16 lg:py-20 bg-[#0A192F]">
        <article className="max-w-[760px] mx-auto px-6 lg:px-12 space-y-12">
          {post.sections?.map((s, i) => (
            <div key={i}>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">{s.heading}</h2>
              <p className="text-base lg:text-lg text-gray-300 leading-[1.85]">{s.body}</p>
            </div>
          ))}
        </article>
      </section>

      {/* Related */}
      {others.length > 0 && (
        <section className="py-16 bg-[#111827]/40 border-t border-white/5">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-white">Continue reading</h2>
              <Link to="/resources" className="text-sm text-blue-400 hover:text-blue-300 inline-flex items-center gap-2">
                All articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group rounded-2xl overflow-hidden border border-white/10 bg-[#111827]/60 hover:border-white/25 transition-all"
                  data-testid={`related-blog-${p.slug}`}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/30 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <span className="text-[11px] font-semibold text-blue-300 tracking-wider uppercase">{p.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-blue-300 transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    <div className="text-xs text-gray-500">{p.readTime} • {formatDate(p.date)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 50%, #4C1D95 100%)' }}>
        <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-5">
            Ready to apply this in your program?
          </h2>
          <Link to="/contact?type=client" data-testid="blog-cta-contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-base px-8 py-6 transition-colors duration-300">
              Talk to Our Team <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPostDetail;
