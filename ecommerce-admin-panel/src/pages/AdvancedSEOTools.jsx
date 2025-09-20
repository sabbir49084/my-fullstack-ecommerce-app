import React, { useState } from "react";

const AdvancedSEOTools = () => {
  const [seoData, setSeoData] = useState({
    focusKeyword: "",
    seoTitle: "",
    slug: "",
    metaDescription: "",
    readabilityScore: 0,
    seoScore: 0,
    contentAnalysis: "",
    socialTitle: "",
    socialDescription: "",
    socialImage: null,
    canonicalUrl: "",
    noindex: false,
    nofollow: false,
    schemaMarkup: "",
    breadcrumbTitle: "",
    cornerstoneContent: false,
    keyphraseLength: 0,
    keyphraseDensity: 0,
    keyphraseInIntroduction: false,
    keyphraseInSubheadings: false,
    keyphraseInConclusion: false,
    textLength: 0,
    internalLinks: 0,
    externalLinks: 0,
  });

  const [content, setContent] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSeoData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContentChange = (e) => {
    const text = e.target.value;
    setContent(text);
    
    // Calculate text length
    setSeoData(prev => ({
      ...prev,
      textLength: text.length,
      keyphraseLength: prev.focusKeyword ? prev.focusKeyword.split(' ').length : 0
    }));
  };

  const analyzeContent = () => {
    // Calculate SEO score based on various factors
    let score = 0;
    let reasons = [];
    
    // Check focus keyword
    if (seoData.focusKeyword) {
      score += 15;
      
      // Check keyword in title
      if (seoData.seoTitle.toLowerCase().includes(seoData.focusKeyword.toLowerCase())) {
        score += 15;
      } else {
        reasons.push("Focus keyword not in SEO title");
      }
      
      // Check keyword in content
      const keywordCount = (content.toLowerCase().match(new RegExp(seoData.focusKeyword.toLowerCase(), 'g')) || []).length;
      const wordCount = content.split(' ').length;
      const density = wordCount > 0 ? (keywordCount / wordCount) * 100 : 0;
      
      setSeoData(prev => ({ ...prev, keyphraseDensity: parseFloat(density.toFixed(2)) }));
      
      if (density >= 0.5 && density <= 2.5) {
        score += 15;
      } else {
        reasons.push(density < 0.5 ? 
          "Focus keyword used too little" : "Focus keyword used too much");
      }
      
      // Check keyword in first paragraph
      const firstParagraph = content.substring(0, 200);
      if (firstParagraph.toLowerCase().includes(seoData.focusKeyword.toLowerCase())) {
        score += 10;
        setSeoData(prev => ({ ...prev, keyphraseInIntroduction: true }));
      } else {
        reasons.push("Focus keyword not in first paragraph");
        setSeoData(prev => ({ ...prev, keyphraseInIntroduction: false }));
      }
    } else {
      reasons.push("No focus keyword set");
    }
    
    // Check meta description
    if (seoData.metaDescription.length >= 120 && seoData.metaDescription.length <= 155) {
      score += 10;
    } else {
      reasons.push("Meta description length is not optimal");
    }
    
    // Check title length
    if (seoData.seoTitle.length >= 40 && seoData.seoTitle.length <= 60) {
      score += 10;
    } else {
      reasons.push("SEO title length is not optimal");
    }
    
    // Check content length
    if (content.length > 300) {
      score += 10;
    } else {
      reasons.push("Content is too short");
    }
    
    // Check internal links
    const internalLinksMatch = content.match(/\[\[([^\]]+)\]\]/g) || [];
    setSeoData(prev => ({ ...prev, internalLinks: internalLinksMatch.length }));
    
    if (internalLinksMatch.length >= 1) {
      score += 5;
    } else {
      reasons.push("No internal links found");
    }
    
    // Check external links
    const externalLinksMatch = content.match(/\[([^\]]+)\]\(https?:\/\/[^\)]+\)/g) || [];
    setSeoData(prev => ({ ...prev, externalLinks: externalLinksMatch.length }));
    
    if (externalLinksMatch.length >= 1) {
      score += 5;
    } else {
      reasons.push("No external links found");
    }
    
    // Check subheadings for keyword
    const subheadings = content.match(/^##\s+.+$/gm) || [];
    const keywordInSubheadings = subheadings.some(heading => 
      heading.toLowerCase().includes(seoData.focusKeyword.toLowerCase())
    );
    
    if (keywordInSubheadings) {
      score += 5;
      setSeoData(prev => ({ ...prev, keyphraseInSubheadings: true }));
    } else {
      reasons.push("Focus keyword not in subheadings");
      setSeoData(prev => ({ ...prev, keyphraseInSubheadings: false }));
    }
    
    // Check conclusion for keyword
    const lastParagraph = content.substring(content.length - 200);
    if (lastParagraph.toLowerCase().includes(seoData.focusKeyword.toLowerCase())) {
      score += 5;
      setSeoData(prev => ({ ...prev, keyphraseInConclusion: true }));
    } else {
      reasons.push("Focus keyword not in conclusion");
      setSeoData(prev => ({ ...prev, keyphraseInConclusion: false }));
    }
    
    // Calculate readability score (simplified)
    const words = content.split(' ');
    const sentences = content.split(/[.!?]+/);
    const wordsPerSentence = words.length / sentences.length;
    let readability = 100;
    
    if (wordsPerSentence > 20) {
      readability -= (wordsPerSentence - 20) * 2;
    }
    
    if (readability < 0) readability = 0;
    if (readability > 100) readability = 100;
    
    setSeoData(prev => ({ ...prev, readabilityScore: Math.round(readability) }));
    setSeoData(prev => ({ ...prev, seoScore: score > 100 ? 100 : score }));
    
    setAnalysisResult({
      score: score > 100 ? 100 : score,
      reasons: reasons
    });
  };

  const generateSchemaMarkup = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": seoData.seoTitle,
      "description": seoData.metaDescription,
      "articleBody": content.substring(0, 200) + "..."
    };
    
    setSeoData(prev => ({
      ...prev,
      schemaMarkup: JSON.stringify(schema, null, 2)
    }));
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Advanced SEO Tools</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SEO Analysis Card */}
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Content Analysis</h3>
          
          <div className="mb-4">
            <label className="block mb-2 font-medium">Focus Keyword</label>
            <input
              type="text"
              name="focusKeyword"
              value={seoData.focusKeyword}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
              placeholder="Enter your focus keyword"
            />
            <p className="text-sm text-gray-400 mt-1">The keyword you want to rank for</p>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-medium">SEO Title</label>
            <input
              type="text"
              name="seoTitle"
              value={seoData.seoTitle}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
              placeholder="Enter SEO title (50-60 characters)"
            />
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-400">{seoData.seoTitle.length} characters</span>
              <span className={seoData.seoTitle.length >= 40 && seoData.seoTitle.length <= 60 ? "text-green-400" : "text-red-400"}>
                {seoData.seoTitle.length >= 40 && seoData.seoTitle.length <= 60 ? "Good length" : "Not optimal"}
              </span>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-medium">Slug</label>
            <input
              type="text"
              name="slug"
              value={seoData.slug}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
              placeholder="URL slug"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-medium">Meta Description</label>
            <textarea
              name="metaDescription"
              value={seoData.metaDescription}
              onChange={handleInputChange}
              rows="3"
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
              placeholder="Enter meta description (120-155 characters)"
            ></textarea>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-400">{seoData.metaDescription.length} characters</span>
              <span className={seoData.metaDescription.length >= 120 && seoData.metaDescription.length <= 155 ? "text-green-400" : "text-red-400"}>
                {seoData.metaDescription.length >= 120 && seoData.metaDescription.length <= 155 ? "Good length" : "Not optimal"}
              </span>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-medium">Content</label>
            <textarea
              value={content}
              onChange={handleContentChange}
              rows="10"
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
              placeholder="Write your content here..."
            ></textarea>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-400">{content.length} characters, {content.split(' ').length} words</span>
              <span className={content.length > 300 ? "text-green-400" : "text-red-400"}>
                {content.length > 300 ? "Good length" : "Too short"}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={analyzeContent}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium"
            >
              Analyze Content
            </button>
            <button
              onClick={generateSchemaMarkup}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded font-medium"
            >
              Generate Schema
            </button>
          </div>
        </div>
        
        {/* SEO Score Card */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">SEO Analysis</h3>
          
          {analysisResult ? (
            <>
              <div className="text-center mb-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#333"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={analysisResult.score >= 80 ? "#10B981" : analysisResult.score >= 50 ? "#F59E0B" : "#EF4444"}
                      strokeWidth="3"
                      strokeDasharray={`${analysisResult.score}, 100`}
                    />
                    <text x="18" y="22" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                      {analysisResult.score}
                    </text>
                  </svg>
                </div>
                <p className={`text-2xl font-bold ${analysisResult.score >= 80 ? "text-green-400" : analysisResult.score >= 50 ? "text-yellow-400" : "text-red-400"}`}>
                  {analysisResult.score >= 80 ? "Excellent" : analysisResult.score >= 50 ? "Good" : "Poor"}
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Keyphrase Analysis</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Keyphrase length:</span>
                    <span>{seoData.keyphraseLength} words</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Keyphrase density:</span>
                    <span className={seoData.keyphraseDensity >= 0.5 && seoData.keyphraseDensity <= 2.5 ? "text-green-400" : "text-red-400"}>
                      {seoData.keyphraseDensity}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>In introduction:</span>
                    <span className={seoData.keyphraseInIntroduction ? "text-green-400" : "text-red-400"}>
                      {seoData.keyphraseInIntroduction ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>In subheadings:</span>
                    <span className={seoData.keyphraseInSubheadings ? "text-green-400" : "text-red-400"}>
                      {seoData.keyphraseInSubheadings ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>In conclusion:</span>
                    <span className={seoData.keyphraseInConclusion ? "text-green-400" : "text-red-400"}>
                      {seoData.keyphraseInConclusion ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Content Analysis</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Readability score:</span>
                    <span className={seoData.readabilityScore >= 60 ? "text-green-400" : "text-red-400"}>
                      {seoData.readabilityScore}/100
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Text length:</span>
                    <span>{seoData.textLength} characters</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Internal links:</span>
                    <span className={seoData.internalLinks > 0 ? "text-green-400" : "text-red-400"}>
                      {seoData.internalLinks}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>External links:</span>
                    <span className={seoData.externalLinks > 0 ? "text-green-400" : "text-red-400"}>
                      {seoData.externalLinks}
                    </span>
                  </div>
                </div>
              </div>
              
              {analysisResult.reasons.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Improvements Needed</h4>
                  <ul className="list-disc list-inside text-red-400 text-sm space-y-1">
                    {analysisResult.reasons.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10 text-gray-400">
              <p>Analyze your content to see SEO recommendations</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Advanced SEO Options */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Advanced SEO Options</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Social Media</h4>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Social Title</label>
              <input
                type="text"
                name="socialTitle"
                value={seoData.socialTitle}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                placeholder="Social media title"
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Social Description</label>
              <textarea
                name="socialDescription"
                value={seoData.socialDescription}
                onChange={handleInputChange}
                rows="3"
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                placeholder="Social media description"
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Social Image</label>
              <input
                type="file"
                onChange={(e) => setSeoData(prev => ({ ...prev, socialImage: e.target.files[0] }))}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
              />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Advanced</h4>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Canonical URL</label>
              <input
                type="text"
                name="canonicalUrl"
                value={seoData.canonicalUrl}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                placeholder="https://example.com/canonical-url"
              />
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="noindex"
                  checked={seoData.noindex}
                  onChange={handleInputChange}
                  id="noindex"
                  className="mr-2"
                />
                <label htmlFor="noindex">Noindex</label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="nofollow"
                  checked={seoData.nofollow}
                  onChange={handleInputChange}
                  id="nofollow"
                  className="mr-2"
                />
                <label htmlFor="nofollow">Nofollow</label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="cornerstoneContent"
                  checked={seoData.cornerstoneContent}
                  onChange={handleInputChange}
                  id="cornerstone"
                  className="mr-2"
                />
                <label htmlFor="cornerstone">Cornerstone Content</label>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Breadcrumb Title</label>
              <input
                type="text"
                name="breadcrumbTitle"
                value={seoData.breadcrumbTitle}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                placeholder="Breadcrumb navigation title"
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Schema Markup</label>
              <textarea
                name="schemaMarkup"
                value={seoData.schemaMarkup}
                onChange={handleInputChange}
                rows="5"
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 font-mono text-sm"
                placeholder="Schema.org JSON-LD code"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSEOTools;