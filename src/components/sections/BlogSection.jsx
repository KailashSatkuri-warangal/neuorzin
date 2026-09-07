import React from 'react';
import { Link } from 'react-router-dom';

const posts = [
  { img: '/assets/img/blog/1.jpg', cat: 'Technology', date: '12 Aug, 2026', author: 'Admin', title: 'Additions in conveying or collected objection' },
  { img: '/assets/img/blog/2.jpg', cat: 'Firewall', date: '05 Oct, 2026', author: 'Admin', title: 'Discourse ye continued pronounce we abilities' },
  { img: '/assets/img/blog/3.jpg', cat: 'Security', date: '27 Dec, 2026', author: 'Admin', title: 'Children greatest online extended delicate of' }
];

export function BlogSection({ onSelectArticle }) {
  return (
    <div className="blog-area content-less default-padding bottom-less">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="site-heading text-center">
              <h4>Popular News</h4>
              <h2 className="title">Latest From our blog</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="blog-items">
          <div className="row">
            {posts.map((post, idx) => (
              <div key={idx} className="single-item col-lg-4 col-md-6 mb-4">
                <div className="item rounded-3xl bg-slate-50 dark:bg-[#111424] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer" onClick={() => onSelectArticle && onSelectArticle(post)}>
                  <div className="thumb aspect-[16/10] overflow-hidden">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="info p-6">
                    <div className="cats mb-2">
                      <span className="text-xs font-bold text-[#0070ba]">{post.cat}</span>
                    </div>
                    <div className="meta text-xs text-slate-400 mb-3 flex items-center gap-4">
                      <span><i className="fas fa-calendar-alt text-[#0070ba]"></i> {post.date}</span>
                      <span><i className="fas fa-user text-[#0070ba]"></i> By {post.author}</span>
                    </div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white leading-snug hover:text-[#0070ba] transition-colors">
                      {post.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default BlogSection;
