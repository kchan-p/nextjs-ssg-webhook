const fetchData = [
    {slug:"top",title:"TOP Page",content:"このページはトップページです"},
    {slug:"post1",title:"仮データページ1",content:"仮データ1"},
    {slug:"post2",title:"仮データページ2",content:"仮データ2"},
    {slug:"post3",title:"仮データページ3",content:"仮データ3"},
];

const siteData = {
    siteTitle:"Test Site",
    siteDescription: "テストサイトです"
};
    // fetchでの取得を想定して async とする
const getPostsData = async ()=>fetchData;
const getPostData = async (slug)=>fetchData.find(f=>f.slug===slug);
const getSiteData = async ()=>siteData;

export {getPostsData,getPostData,getSiteData};