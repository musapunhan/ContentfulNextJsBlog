import Link from "next/link";

let client = require('contentful').createClient({
    space: process.env.NEXT_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN,
})

export async function getStaticProps() {
    let data = await client.getEntries({
        content_type: 'post'
    })

    return {
        props: {
            posts: data.items
        }
    }
}

export default function Home({posts}) {

  return (
    <main>
        <ul>
            {posts.map( post =>(
                <li key={post.sys.id}>
                    <Link href={'/posts/' + post.fields.slug}>
                        <a>
                            {post.fields.title}
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    </main>
  )
}
