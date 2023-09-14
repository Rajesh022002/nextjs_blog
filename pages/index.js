import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import SearchComponent from './SearchComponent';

export async function getStaticProps() {
    try {
        const response = await fetch(
            'https://task.appsdeployer.com/api/web/blogs',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers as needed
                },
                body: JSON.stringify({
                    page_number: 1,
                    page_size: 10,
                }), // Replace with your request data
            },
        );

        if (!response.ok) {
            return {
                notFound: true, // Handle 404 error
            };
        }

        const data = await response.json();
        const allPostsData = data.data;

        return {
            props: {
                allPostsData,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);

        return {
            notFound: true, // Handle 404 error
        };
    }
}

export default function Home({ allPostsData }) {
    return (
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <SearchComponent data={allPostsData} />
        </section>
    );
}
