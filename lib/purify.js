import DOMPurify from "isomorphic-dompurify"

function purify(html) {
    if( !html ) return "";
    
    return DOMPurify.sanitize(html, {
        USE_PROFILES: { html: true },
        ALLOWED_TAGS: [
            "p", "br", "strong", "em", "ul", "ol", "li",
            "a", "h1", "h2", "h3", "h4","h5","blockquote"
        ],
        ALLOWED_ATTR: ["href", "target", "rel"]
    })
}
function stripHtmlTags(html){
    if( !html ) return "";

    return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim()
}
export {purify,stripHtmlTags};