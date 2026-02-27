import { TAG_SITE,TAG_TOP,TAG_POSTS,TAG_SLUG,TAG_LATEST } from "./fetchtag";

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
    return await fetchData("site/", TAG_SITE());
};
const getTopData = async () => {
    return await fetchData("posts/top/", TAG_TOP());
};
const getContentsData = async () => {
    return await fetchData("posts/", TAG_POSTS());
};

const getContentData = async (slug) => {
    return await fetchData(`posts/${slug}`, TAG_SLUG(slug) );
};

const getLatestData = async () => {
    return await fetchData("latest", TAG_LATEST() );
}

export { getTopData, getContentData, getContentsData, getSiteData, getLatestData };