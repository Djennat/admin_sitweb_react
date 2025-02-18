import React, { useState } from "react";
import './HtmlTagSelector.css';

const HtmlTagSelector = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [title, setTitle] = useState(""); // Champ pour le titre
  const [url, setUrl] = useState(""); // Champ pour l'URL

  const htmlTags = [
   "<a>", "<abbr>", "<address>", "<area>", "<article>", "<aside>", "<audio>", "<b>", "<base>", "<bdi>", "<bdo>", 
"<blockquote>", "<body>", "<br>", "<button>", "<canvas>", "<caption>", "<cite>", "<code>", "<col>", "<colgroup>", 
"<data>", "<datalist>", "<dd>", "<del>", "<details>", "<dfn>", "<dialog>", "<div>", "<dl>", "<dt>", "<em>", "<embed>",
"<fieldset>", "<figcaption>", "<figure>", "<footer>", "<form>", "<h1>", "<h2>", "<h3>", "<h4>", "<h5>", "<h6>",
"<head>", "<header>", "<hgroup>", "<hr>", "<html>", "<i>", "<iframe>", "<img>", "<input>", "<ins>", "<kbd>", "<label>",
"<legend>", "<li>", "<link>", "<main>", "<map>", "<mark>", "<meta>", "<meter>", "<nav>", "<noscript>", "<object>",
"<ol>", "<optgroup>", "<option>", "<output>", "<p>", "<param>", "<picture>", "<pre>", "<progress>", "<q>", "<rp>", 
"<rt>", "<ruby>", "<s>", "<samp>", "<script>", "<section>", "<select>", "<small>", "<source>", "<span>", "<strong>",
"<style>", "<sub>", "<summary>", "<sup>", "<table>", "<tbody>", "<td>", "<template>", "<textarea>", "<tfoot>",
"<th>", "<thead>", "<time>", "<title>", "<tr>", "<track>", "<u>", "<ul>", "<var>", "<video>", "<wbr>"

  ];

  const filteredTags = htmlTags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowMenu(true);
  };

  const handleSelectTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setSearchTerm("");
    setShowMenu(false);
  };

  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Fonction pour échapper les caractères spéciaux pour XML
  const escapeXml = (str) =>
    str.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const createXmlFile = () => {
    // Construire le contenu XML
    const xmlContent = `
<file>
  <title>${title}</title>
  <url>${url}</url>
  <tags>
    ${selectedTags.map(tag => `<tag>${escapeXml(tag)}</tag>`).join("\n    ")}
  </tags>
</file>
`.trim();

    // Créer un fichier Blob et déclencher le téléchargement
    const blob = new Blob([xmlContent], { type: "application/xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${title || "file"}.xml`; // Utilise le titre comme nom de fichier, sinon "file.xml"
    a.click();
  };

  return (
    <div className="container">
      <div className="tag-selector">
        <h2 className="search-title">Search HTML Tags</h2>

        {/* Champ pour le titre */}
        <label>Title</label>
        <input
          className="search-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Champ pour l'URL */}
        <label>URL</label>
        <input
          className="search-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        {/* Conteneur pour la barre de recherche */}
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search for an HTML tag..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setShowMenu(true)}
            className="search-input"
          />
          <button onClick={toggleMenu} className="toggle-button">
            &lt;
          </button>
        </div>

        {/* Menu déroulant des tags */}
        {showMenu && (
          <div className="menu">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectTag(tag)}
                  className="menu-item"
                >
                  {tag}
                </div>
              ))
            ) : (
              <div className="no-tags">No tags found</div>
            )}
          </div>
        )}

        {/* Affichage des tags sélectionnés */}
        {selectedTags.length > 0 && (
          <div className="selected-tags">
            <h3>Selected Tags:</h3>
            <ul>
              {selectedTags.map((tag, index) => (
                <li key={index}>
                  {tag}
                  <button
                    className="remove-tag-button"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bouton pour créer le fichier XML */}
        <button onClick={createXmlFile} className="create-xml-button">
          Create XML File
        </button>
      </div>
    </div>
  );
};

export default HtmlTagSelector;
