import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from '@contentful/rich-text-types'
import Image from "next/image";

let client = require('contentful').createClient({
    space: process.env.NEXT_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN,
})

export async function getStaticPaths() {
    let data = await client.getEntries({
        content_type: 'post'
    })

    return {
        paths: data.items.map(item => ({
            params: {slug: item.fields.slug}
        })),
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    let data = await client.getEntries({
        content_type: 'post',
        'fields.slug': params.slug
    })

    return {
        props: {
            post: data.items[0]
        }
    }
}

const Post = ({ post }) => {
    return (
        <div>
            <h1>{post.fields.title}</h1>
            <div>{documentToReactComponents( post.fields.content, {
                renderNode: {
                    [BLOCKS.EMBEDDED_ASSET] : node => (
                        <Image
                            src={"http:" + node.data.target.fields.file.url}
                            width={node.data.target.fields.file.details.image.width}
                            height={node.data.target.fields.file.details.image.height}
                        />
                    )
                }
            })}</div>
        </div>
    );
};

    export default Post;