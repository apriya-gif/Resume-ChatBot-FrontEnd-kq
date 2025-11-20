import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WORK_EXPERIENCE, PROJECTS } from './data';
import './BlogPost.css';

function BlogPost() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Find the item in either work or projects
    const item = [...WORK_EXPERIENCE, ...PROJECTS].find(i => i.id === id);

    if (!item || !item.content) {
        return (
            <div className="blog-container">
                <div className="blog-content">
                    <h1>Not Found</h1>
                    <button onClick={() => navigate('/')} className="back-btn">← Back to Home</button>
                </div>
            </div>
        );
    }

    const { content } = item;

    return (
        <div className="blog-container">
            <div className="blog-header">
                <button onClick={() => navigate('/')} className="back-btn">← Back to Home</button>
                <div className="blog-hero">
                    <div className="blog-hero-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                    <div className="blog-hero-overlay">
                        <span className="blog-category">{item.category}</span>
                        <h1 className="blog-title">{content.title}</h1>
                        <p className="blog-subtitle">{content.subtitle}</p>
                        <div className="blog-tech">{content.tech}</div>
                    </div>
                </div>
            </div>

            <div className="blog-content">
                {content.sections.map((section, index) => (
                    <section key={index} className="blog-section">
                        <h2>{section.heading}</h2>
                        <div className="blog-body">
                            {section.body.split('\n\n').map((paragraph, pIndex) => {
                                // Check if paragraph contains bullet points
                                if (paragraph.includes('•') || paragraph.includes('**')) {
                                    return (
                                        <div key={pIndex} className="blog-paragraph">
                                            {paragraph.split('\n').map((line, lIndex) => {
                                                // Handle bold text
                                                const parts = line.split('**');
                                                const formatted = parts.map((part, i) =>
                                                    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                                                );

                                                if (line.trim().startsWith('•')) {
                                                    return <li key={lIndex}>{formatted}</li>;
                                                } else if (line.trim()) {
                                                    return <p key={lIndex}>{formatted}</p>;
                                                }
                                                return null;
                                            })}
                                        </div>
                                    );
                                }
                                return <p key={pIndex} className="blog-paragraph">{paragraph}</p>;
                            })}
                        </div>
                    </section>
                ))}

                <div className="blog-footer">
                    <button onClick={() => navigate('/')} className="back-btn-large">
                        ← Back to Portfolio
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BlogPost;
