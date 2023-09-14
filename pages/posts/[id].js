import Head from 'next/head';
import Layout from '../../components/layout';

export async function getServerSideProps({ params }) {
    try {
        const response = await fetch(
            `https://task.appsdeployer.com/api/web/blog/${params.id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers as needed
                },
            },
        );

        if (!response.ok) {
            return {
                notFound: true, // Handle 404 error
            };
        }

        const data = await response.json();
        const blog = data.data;

        return {
            props: {
                blog,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);

        return {
            notFound: true, // Handle 404 error
        };
    }
}

export default function Post({ blog }) {
    const formatDate = (dateString) => {
        console.log('dateString', dateString);
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleDateString(undefined, { month: 'short' });
        const year = date.getFullYear();
        return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
    };

    const getOrdinalSuffix = (number) => {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;
        return suffixes[lastDigit] || suffixes[lastTwoDigits] || suffixes[0];
    };
    return (
        <Layout>
            <Head>
                {blog?.map((blogItem) => (
                    <>
                        <title>{blogItem.title}</title>
                        <meta
                            name="description"
                            content={blogItem.description}
                        />
                        <meta
                            property="og:image"
                            content={`https://task.appsdeployer.com/api/${encodeURI(
                                blogItem.titleImage,
                            )} `}
                        />
                        <meta name="og:title" content={blogItem.title} />
                        <meta
                            name="twitter:card"
                            content="summary_large_image"
                        />
                    </>
                ))}
            </Head>
            <article>
                <div>
                    <h1>Blog Listing Page</h1>
                    <ul>
                        {blog?.map((blogItem) => (
                            <div className="container" key={blogItem._id}>
                                <div className="row ">
                                    <div className="col-sm-8 container">
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <h1 className="mb-2">
                                                {blogItem.title}
                                            </h1>
                                        </div>
                                        <p className="mb-2">
                                            Published on&nbsp;
                                            {formatDate(blogItem.uploadDate)}
                                            &nbsp;
                                            <span className="text-danger ml-2 font-bold">
                                                Jaya Joshi
                                            </span>
                                        </p>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: blogItem.blog_content,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </article>
        </Layout>
    );
}
