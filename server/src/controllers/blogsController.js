import db from '../db/database.js';
import { logAudit } from '../services/auditService.js';

// Get Blogs (Public vs Admin)
export async function getBlogs(req, res) {
  try {
    const showAll = req.query.all === 'true' || req.query.all === '1' || req.user;
    const { status, category, search } = req.query;

    let sql = 'SELECT * FROM blogs';
    const where = [];
    const params = [];

    if (!showAll) {
      where.push("status = 'Published'");
    } else if (status && status !== 'All') {
      where.push('status = ?');
      params.push(status);
    }

    if (category && category !== 'All') {
      where.push('category = ?');
      params.push(category);
    }

    if (search) {
      where.push('(title LIKE ? OR excerpt LIKE ? OR tags LIKE ?)');
      const s = `%${search}%`;
      params.push(s, s, s);
    }

    if (where.length > 0) {
      sql += ' WHERE ' + where.join(' AND ');
    }
    sql += " ORDER BY (status = 'Published') DESC, published_at DESC, created_at DESC";

    const rows = await db.all(sql, params);
    const parsed = rows.map(b => {
      let tags = [];
      let sections = [];
      try {
        tags = typeof b.tags === 'string' ? JSON.parse(b.tags) : (b.tags || []);
      } catch {
        tags = typeof b.tags === 'string' ? b.tags.split(',') : [];
      }
      try {
        sections = typeof b.sections_json === 'string' ? JSON.parse(b.sections_json) : (b.sections_json || []);
      } catch {
        sections = [];
      }
      return { ...b, tags, sections };
    });

    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs: ' + err.message });
  }
}

// Get Single Blog
export async function getBlogById(req, res) {
  try {
    const { id } = req.params;
    const blog = await db.get('SELECT * FROM blogs WHERE id = ? OR slug = ? LIMIT 1', [id, id]);
    if (!blog) {
      return res.status(404).json({ error: 'Article not found' });
    }
    let tags = [];
    let sections = [];
    try {
      tags = typeof blog.tags === 'string' ? JSON.parse(blog.tags) : (blog.tags || []);
    } catch {
      tags = typeof blog.tags === 'string' ? blog.tags.split(',') : [];
    }
    try {
      sections = typeof blog.sections_json === 'string' ? JSON.parse(blog.sections_json) : (blog.sections_json || []);
    } catch {
      sections = [];
    }
    res.json({ ...blog, tags, sections });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get blog: ' + err.message });
  }
}

// Create Blog
export async function createBlog(req, res) {
  try {
    const data = req.body;
    const title = (data.title || 'Untitled Article').trim();
    let slug = (data.slug || '').trim();
    if (!slug) {
      slug = title.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)/g, '');
    }
    let id = slug;

    const existing = await db.get('SELECT id FROM blogs WHERE slug = ?', [slug]);
    if (existing) {
      slug += '-' + Date.now().toString().slice(-4);
      id = slug;
    }

    const section = data.section || 'Digital Marketing';
    const category = data.category || 'Digital Marketing';
    const excerpt = data.excerpt || '';
    const content = data.content || '';
    const intro = data.intro || '';
    const sections_json = data.sections ? JSON.stringify(data.sections) : null;
    const conclusion = data.conclusion || '';
    const image = data.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
    const author = data.author || req.user?.name || 'NeuOrzin Editorial';
    const author_role = data.authorRole || data.author_role || 'Growth & Marketing Lead';
    const tags = data.tags ? JSON.stringify(data.tags) : JSON.stringify(['Digital Marketing']);
    const status = ['Draft', 'Published', 'Archived'].includes(data.status) ? data.status : 'Draft';
    const read_time = data.readTime || data.read_time || '5 min read';
    const is_featured = data.is_featured ? 1 : 0;
    const seo_title = data.seo_title || title;
    const seo_description = data.seo_description || excerpt;
    const seo_keywords = data.seo_keywords || '';
    const published_at = status === 'Published' ? (data.published_at || new Date().toISOString()) : null;

    await db.run(
      `INSERT INTO blogs (id, slug, title, section, category, excerpt, content, intro, sections_json, conclusion, image, author, author_role, tags, status, read_time, is_featured, seo_title, seo_description, seo_keywords, published_at, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [id, slug, title, section, category, excerpt, content, intro, sections_json, conclusion, image, author, author_role, tags, status, read_time, is_featured, seo_title, seo_description, seo_keywords, published_at]
    );

    await logAudit('Blog', id, 'Create Blog', req.user?.id, req.user?.name, { title, status });

    res.json({ success: true, id, slug, message: 'Blog article created successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create blog: ' + err.message });
  }
}

// Update Blog
export async function updateBlog(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const title = data.title || 'Untitled';
    const slug = data.slug || id;
    const category = data.category || 'Digital Marketing';
    const excerpt = data.excerpt || '';
    const intro = data.intro || '';
    const sections_json = data.sections ? JSON.stringify(data.sections) : null;
    const conclusion = data.conclusion || '';
    const image = data.image || '';
    const author = data.author || 'NeuOrzin Editorial';
    const author_role = data.authorRole || data.author_role || 'Growth & Marketing Lead';
    const tags = data.tags ? JSON.stringify(data.tags) : null;
    const status = data.status || 'Draft';
    const read_time = data.readTime || data.read_time || '5 min read';
    const is_featured = data.is_featured ? 1 : 0;
    const seo_title = data.seo_title || title;
    const seo_description = data.seo_description || excerpt;
    const seo_keywords = data.seo_keywords || '';
    const published_at = status === 'Published' ? (data.published_at || new Date().toISOString()) : null;

    await db.run(
      `UPDATE blogs SET title = ?, slug = ?, category = ?, excerpt = ?, intro = ?, sections_json = ?, conclusion = ?, image = ?, author = ?, author_role = ?, tags = ?, status = ?, read_time = ?, is_featured = ?, seo_title = ?, seo_description = ?, seo_keywords = ?, published_at = COALESCE(?, published_at), updated_at = CURRENT_TIMESTAMP WHERE id = ? OR slug = ?`,
      [title, slug, category, excerpt, intro, sections_json, conclusion, image, author, author_role, tags, status, read_time, is_featured, seo_title, seo_description, seo_keywords, published_at, id, id]
    );

    await logAudit('Blog', id, 'Update Blog', req.user?.id, req.user?.name, { title, status });

    res.json({ success: true, message: 'Article updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update blog: ' + err.message });
  }
}

// Delete Blog
export async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    await db.run('DELETE FROM blogs WHERE id = ? OR slug = ?', [id, id]);
    await logAudit('Blog', id, 'Delete Blog', req.user?.id, req.user?.name);
    res.json({ success: true, message: 'Article deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete blog: ' + err.message });
  }
}

// Publish Blog
export async function publishBlog(req, res) {
  try {
    const { id } = req.params;
    await db.run("UPDATE blogs SET status = 'Published', published_at = COALESCE(published_at, CURRENT_TIMESTAMP), updated_at = CURRENT_TIMESTAMP WHERE id = ? OR slug = ?", [id, id]);
    await logAudit('Blog', id, 'Publish Blog', req.user?.id, req.user?.name);
    res.json({ success: true, message: 'Blog published successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to publish blog: ' + err.message });
  }
}

// Unpublish Blog
export async function unpublishBlog(req, res) {
  try {
    const { id } = req.params;
    await db.run("UPDATE blogs SET status = 'Draft', updated_at = CURRENT_TIMESTAMP WHERE id = ? OR slug = ?", [id, id]);
    await logAudit('Blog', id, 'Unpublish Blog', req.user?.id, req.user?.name);
    res.json({ success: true, message: 'Blog status changed to Draft.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to unpublish blog: ' + err.message });
  }
}

// Categories & Tags
export async function getCategories(req, res) {
  try {
    const categories = await db.all(`
      SELECT c.*, (SELECT COUNT(*) FROM blogs b WHERE b.category = c.name) as blog_count
      FROM blog_categories c ORDER BY name ASC
    `);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createCategory(req, res) {
  try {
    const { name, description } = req.body;
    const slug = (name || '').toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)/g, '');
    const id = 'CAT-' + Date.now().toString().slice(-6);
    await db.run('INSERT INTO blog_categories (id, name, slug, description) VALUES (?, ?, ?, ?)', [id, name, slug, description || '']);
    res.json({ success: true, id, name, slug });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function syncServicesToCategories(req, res) {
  try {
    const services = [
      ["Sales & Marketing Growth Engines", "sales-marketing-growth", "Programmatic SEO, high-conversion outbound pipelines, CRO, and performance marketing."],
      ["CRM & Revenue Operations", "crm-revenue-operations", "Enterprise HubSpot and Salesforce architecture, automated lead scoring, and pipeline telemetry."],
      ["Intelligent Autonomous Systems", "intelligent-autonomous-systems", "Multi-agent cognitive workflows, autonomous decision engines, and self-orchestrating processes."],
      ["AI-Driven Quality Automation", "ai-driven-quality-automation", "Continuous automated validation, self-healing test automation, and QA pipelines."],
      ["Enterprise Data Operations", "enterprise-data-operations", "Snowflake migrations, dbt transformation pipelines, real-time Kafka streaming, and data mesh."],
      ["Business AI Implementation", "business-ai-implementation", "Private retrieval-augmented generation (RAG), fine-tuned domain models, and vector search."],
      ["Cloud Performance Management", "cloud-performance-management", "High-availability multi-cloud orchestration, Kubernetes cluster tuning, and SRE."],
      ["Cloud Cost Intelligence", "cloud-cost-intelligence", "FinOps telemetry, automated compute right-sizing, spot instance fleets, and cost reduction."],
      ["Seamless Cloud Transitioning", "seamless-cloud-transitioning", "Zero-downtime legacy migration, containerization, and IaC automation."],
      ["Quantum-Enhanced Machine Learning", "quantum-enhanced-ml", "Hybrid quantum-classical optimization, quantum support vector machines (QSVM), and post-quantum crypto."],
      ["On-Demand Quantum Compute", "on-demand-quantum-compute", "Access to QPU backends, circuit simulation, and algorithm acceleration."]
    ];

    let count = 0;
    for (const s of services) {
      const id = 'CAT-' + s[1].slice(0, 10);
      await db.run(
        `INSERT INTO blog_categories (id, name, slug, description) VALUES (?, ?, ?, ?)
         ON CONFLICT(id) DO NOTHING`,
        [id, s[0], s[1], s[2]]
      );
      count++;
    }
    res.json({ success: true, count, message: 'Service pillars synchronized with blog categories.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTopicRecommendations(req, res) {
  res.json([
    { title: "How We Grew Organic Pipeline in 2026: Why Traditional SEO Failed and What Actually Worked", category: "Sales & Marketing Growth Engines", keywords: ["Programmatic SEO", "AI Search Overviews", "GEO"], length: "1,500 words" },
    { title: "Where Did Our Ad Budget Go? An Honest Guide to Fixing B2B Attribution with Server-Side CAPI", category: "Sales & Marketing Growth Engines", keywords: ["Server-Side Tracking", "Meta CAPI", "RevOps"], length: "1,500 words" },
    { title: "Zero-Downtime Data Lakehouse Migration: Moving 50TB to Snowflake and dbt", category: "Enterprise Data Operations", keywords: ["Snowflake", "dbt", "Data Contracts"], length: "2,000 words" },
    { title: "Enterprise RAG That Does Not Hallucinate: Hybrid Search, Reranking & Knowledge Graphs", category: "Business AI Implementation", keywords: ["Private RAG", "Vector Search", "ColBERT"], length: "2,200 words" },
    { title: "Beyond Simple Chatbots: Building Multi-Agent Autonomous Workflows for Complex Operations", category: "Intelligent Autonomous Systems", keywords: ["Multi-Agent AI", "LangGraph", "Cognitive Workflows"], length: "1,800 words" },
    { title: "How We Slashed AWS Cloud Spend by 43% in 60 Days: A Pragmatic FinOps Case Study", category: "Cloud Cost Intelligence", keywords: ["AWS FinOps", "Spot Instances", "Kubecost"], length: "1,600 words" }
  ]);
}

export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    await db.run('DELETE FROM blog_categories WHERE id = ? OR slug = ?', [id, id]);
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTags(req, res) {
  try {
    const tags = await db.all('SELECT * FROM blog_tags ORDER BY name ASC');
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createTag(req, res) {
  try {
    const { name } = req.body;
    const slug = (name || '').toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)/g, '');
    const id = 'TAG-' + Date.now().toString().slice(-6);
    await db.run('INSERT INTO blog_tags (id, name, slug) VALUES (?, ?, ?)', [id, name, slug]);
    res.json({ success: true, id, name, slug });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// AI Config
export async function getAiConfig(req, res) {
  try {
    const row = await db.get("SELECT model_name, temperature, is_configured, updated_at, gemini_api_key FROM ai_config WHERE id = 'default' LIMIT 1");
    const hasKey = Boolean(row && row.gemini_api_key);
    let masked = '';
    if (hasKey) {
      const k = row.gemini_api_key;
      masked = k.slice(0, 6) + '...' + k.slice(-4);
    }
    res.json({
      has_key: hasKey,
      is_configured: Boolean(row?.is_configured || hasKey),
      masked_key: masked,
      model: row?.model_name || 'gemini-1.5-flash',
      model_name: row?.model_name || 'gemini-1.5-flash',
      temperature: Number(row?.temperature || 0.70),
      updated_at: row?.updated_at || null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function saveAiConfig(req, res) {
  try {
    const apiKey = (req.body.api_key || req.body.gemini_api_key || '').trim();
    const model = req.body.model || req.body.model_name || 'gemini-1.5-flash';
    const temperature = Number(req.body.temperature || 0.70);

    if (apiKey) {
      await db.run(
        `INSERT INTO ai_config (id, gemini_api_key, model_name, temperature, is_configured, updated_at)
         VALUES ('default', ?, ?, ?, 1, CURRENT_TIMESTAMP)
         ON CONFLICT(id) DO UPDATE SET gemini_api_key = excluded.gemini_api_key, model_name = excluded.model_name, temperature = excluded.temperature, is_configured = 1, updated_at = CURRENT_TIMESTAMP`,
        [apiKey, model, temperature]
      );
    } else {
      await db.run("UPDATE ai_config SET model_name = ?, temperature = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 'default'", [model, temperature]);
    }
    await logAudit('AIConfig', 'default', 'Update AI Gemini Configuration', req.user?.id, req.user?.name, { model });
    res.json({ success: true, has_key: true, message: 'Gemini AI configuration saved securely in server database.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function testAiConfig(req, res) {
  try {
    let { gemini_api_key, model_name = 'gemini-1.5-pro' } = req.body;
    if (!gemini_api_key) {
      const row = await db.get("SELECT gemini_api_key, model_name FROM ai_config WHERE id = 'default' LIMIT 1");
      gemini_api_key = row?.gemini_api_key;
      model_name = row?.model_name || model_name;
    }
    if (!gemini_api_key) {
      return res.status(400).json({ error: 'No Gemini API key found. Please save an API key first.' });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model_name)}:generateContent?key=${encodeURIComponent(gemini_api_key)}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Reply with the single word 'CONNECTED'." }] }]
      })
    });

    const data = await response.json();
    if (response.ok && data.candidates) {
      res.json({ success: true, message: `Gemini API connection verified! Model '${model_name}' is online and responsive.` });
    } else {
      res.status(400).json({ error: data.error?.message || 'Gemini API connection failed.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Connection test error: ' + err.message });
  }
}

// Server-side Gemini Blog Generation
export async function generateBlogWithGemini(req, res) {
  try {
    const {
      topic = 'Enterprise AI & Revenue Growth',
      tone = 'Authoritative & Practitioner-Led',
      length = 'Comprehensive (1500+ words)',
      category = 'Digital Marketing',
      keywords = '',
      audience = 'CTOs, VPs of Growth, Enterprise Decision-Makers',
      instructions = ''
    } = req.body;

    const row = await db.get("SELECT gemini_api_key, model_name, temperature FROM ai_config WHERE id = 'default' LIMIT 1");
    const apiKey = row?.gemini_api_key;
    const modelName = row?.model_name || 'gemini-1.5-pro';
    const temperature = Number(row?.temperature || 0.70);

    if (!apiKey) {
      return res.status(400).json({
        error: 'Gemini API Key is not configured. Please go to Admin Settings -> AI / Gemini Configuration.'
      });
    }

    const prompt = `You are a world-class principal technology strategist, revenue engineer, and editorial writer at NeuOrzin (neuorzin.com).
Write an in-depth, authentic, highly engaging article on the topic: '${topic}'.
Tone: ${tone}.
Target Audience: ${audience}.
Length Category: ${length}.
Category: ${category}.
Keywords to weave naturally: ${keywords}.
Additional Guidelines: ${instructions}.

You MUST return your response as a valid JSON object matching this exact schema:
{
  "title": "Catchy, high-authority headline with strong editorial value",
  "slug": "seo-friendly-url-slug-all-lowercase-hyphens",
  "excerpt": "1-2 punchy sentences summarizing the core problem and high-intent takeaway",
  "intro": "Engaging opening paragraph establishing empathy with decision-makers",
  "readTime": "6 min read",
  "tags": ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"],
  "category": "${category}",
  "sections": [
    {
      "heading": "1. Section Heading",
      "paragraphs": ["Paragraph 1...", "Paragraph 2..."],
      "callout": "A bold, memorable pull-quote or takeaway sentence."
    },
    {
      "heading": "2. Section Heading",
      "paragraphs": ["Paragraph 1...", "Paragraph 2..."],
      "list": ["Bullet point 1 with actionable insight", "Bullet point 2 with concrete takeaway", "Bullet point 3 with architectural wisdom"]
    },
    {
      "heading": "3. Section Heading",
      "paragraphs": ["Paragraph 1...", "Paragraph 2..."]
    },
    {
      "heading": "4. Section Heading",
      "paragraphs": ["Paragraph 1...", "Paragraph 2..."]
    }
  ],
  "conclusion": "Powerful concluding paragraph leaving executive readers with clarity on immediate next steps.",
  "seo_title": "SEO Meta Title (under 60 chars) | NeuOrzin",
  "seo_description": "SEO Meta Description (140-160 chars) designed for high click-through rate.",
  "seo_keywords": "comma, separated, high, intent, keywords"
}

Return ONLY the raw JSON object without markdown fences or extraneous text.`;

    const modelsToTry = Array.from(new Set([
      modelName,
      'gemini-1.5-flash-latest',
      'gemini-2.0-flash',
      'gemini-1.5-flash-8b',
      'gemini-1.5-pro-latest',
      'gemini-1.5-pro',
      'gemini-pro'
    ]));

    let generatedArticle = null;
    let lastErrorMsg = 'Gemini generation failed';

    for (const m of modelsToTry) {
      if (!m) continue;
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(m)}:generateContent?key=${encodeURIComponent(apiKey)}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature,
              responseMimeType: 'application/json'
            }
          })
        });

        const data = await response.json();
        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          const rawText = data.candidates[0].content.parts[0].text;
          const clean = rawText.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
          const parsed = JSON.parse(clean);
          if (parsed && parsed.title) {
            generatedArticle = parsed;
            break;
          }
        } else {
          lastErrorMsg = data.error?.message || `HTTP ${response.status}`;
        }
      } catch (callErr) {
        lastErrorMsg = callErr.message;
      }
    }

    if (generatedArticle) {
      await logAudit('AI', 'gemini', 'Generated Blog Draft', req.user?.id, req.user?.name, { topic });
      res.json({ success: true, data: generatedArticle });
    } else {
      res.status(400).json({ error: lastErrorMsg });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server AI error: ' + err.message });
  }
}
