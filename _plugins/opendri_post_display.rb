require 'feedjira'
module Jekyll
  class OpenDRIPostDisplay < Generator
    safe true
    priority :high
def generate(site)
      jekyll_coll = Jekyll::Collection.new(site, 'external_feed')
      site.collections['external_feed'] = jekyll_coll
Feedjira::Feed.fetch_and_parse("https://opendri.org/tag/open-cities-africa/feed/").entries.each do |e|
        #p "Title: #{e.title}, published on OpenDRI #{e.url} #{e}"
        title = e[:title]
        link = e[:url]
        content = e[:content]
        summary = e[:summary]
        published = e[:published]
        author = e[:author]
        path = "./_external_feed/" + title + ".md"
        path = site.in_source_dir(path)
        doc = Jekyll::Document.new(path, { :site => site, :collection => jekyll_coll })
        doc.data['title'] = title;
        doc.data['link'] = link;
        doc.data['feed_content'] = content;
        doc.data['summary'] = summary;
        doc.data['published'] = published;
        doc.data['author'] = author;
        jekyll_coll.docs << doc
      end
    end
  end
end
