const fetchURL = (path) => `${process.env.DATA_URL}/api/${path}`;
const headers = {
    "X-API-KEY": process.env.DATA_KEY,
};

const fetchData = async (path, tag) => {
    try {
        const res = await fetch(fetchURL(path), {
            headers,
            next: { tags: [tag], revalidate: false }
        });
        if (!res.ok) {
            if (res.status === 404) notFound()
            throw new Error(`HTTP ${res.status}`)
        }
        const json = await res.json();
        return json.error ? null : json;
    } catch (err) {
        console.error(err)
        return null
    }
};

const getSiteData = async () => {
    return await fetchData("site/", "site");
};
const getTopData = async () => {
    return await fetchData("posts/top/", "top");
};
const getContentsData = async () => {
    return await fetchData("posts/", "posts");
};

const getContentData = async (slug) => {
    return await fetchData(`posts/${slug}`, `posts-${slug}`);
};

const getLatestData = async () => {
    return await fetchData("new", "latest-posts");
}

export { getTopData, getContentData, getContentsData, getSiteData, getLatestData };