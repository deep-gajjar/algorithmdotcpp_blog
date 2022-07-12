import React from 'react'
import {useRouter} from 'next/router'
import Head from 'next/head'
import {getCategoryPost, getCategories} from '../../services'
import {PostCard,Categories,Loader} from '../../components'

const CategoryPost = ({posts}) => {

	const router = useRouter();

	if(router.isFallback){
		return <Loader/>
	}
  return (
    <div className="container mx-auto px-10 mb-8">
    <Head>
      <title>Category</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

      <div className='lg:col-span-8 col-span-1'>
        {posts.map((post) => <PostCard post={post.node} key={post.node.title} />)}
      </div>

      <div className='lg:col-span-4 col-span-1'>
        <div className='lg:sticky relative top-8'>
          <Categories />
        </div>
      </div>

    </div>
  </div>
  )
}

export default CategoryPost
export async function getStaticProps({params}){
    const posts = await getCategoryPost(params.slug);

    return {
        props: {posts}
    }
}

export async function getStaticPaths(){
    const categories = await getCategories();
    return {
        paths: categories.map(({slug}) => ({params:{slug}})),
        fallback: true
    }
}