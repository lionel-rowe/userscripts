require 'base64'
require 'json'
require 'cgi'

json = JSON.parse(File.read(File.join(File.dirname(__FILE__), 'tampermonkey.json')), symbolize_names: true)

scripts = json[:scripts]

md = "# Userscripts\n\n"

scripts.each do |script|
  src = Base64.decode64(script[:source])
  src_lines = src.split("\n")

  desc_re = /\/\/\s*@description\s*(.+)/
  desc_line = src_lines.find { |line| line =~ desc_re }
  desc = desc_line ? desc_re.match(desc_line)[1].chomp : ''

  title = script[:name]

  md << "## #{CGI::escapeHTML(title)}\n\n"
  md << "_#{CGI::escapeHTML(desc)}_\n\n"
  md << <<~HTML
    <details>
      <summary>View Source</summary>
      <pre><code>
    #{CGI::escapeHTML(src)}
      </code></pre>
    </details>\n\n
  HTML
end


File.open(File.join(File.dirname(__FILE__), 'README.md'), 'w') do |f|
  f.write(md)
end
