'use client';

import { useEffect, useState } from 'react';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchComponent({ data }) {
    // Ensure data is an array and default to an empty array if it's not
    const dataArray = Array.isArray(data) ? data : [];
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // const options = { day: 'numeric', month: 'short', year: 'numeric' };

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
    function shorten(text, max) {
        return text && text.length > max
            ? text.slice(0, max).split(' ').slice(0, -1).join(' ')
            : text;
    }
    return (
        <>
            <h2 className={utilStyles.headingLg}>Blog</h2>
            <ul className={utilStyles.list}>
                {dataArray?.map((blog, index) => (
                    <div key={blog?._id}>
                        <Link href={`/posts/${blog?._id}`}>
                            <div className="Allcards" key={index}>
                                <h3 className="mt-2 mb-2 lg:mt-4 text-3xl lg:text-3xl font-bold ">
                                    {blog?.title}
                                </h3>
                                <p className="mb-2">
                                    Published on&nbsp;
                                    {formatDate(blog?.uploadDate)}
                                    &nbsp;by
                                    <span className="text-danger ml-2 font-bold">
                                        Jaya Joshi
                                    </span>
                                </p>
                                <div className="imagecardanddescription">
                                    {/* <Image
                                        src={
                                            'https://task.appsdeployer.com/api/' +
                                            blog.titleImage
                                        }
                                        fill
                                        alt="placeholder-blog"
                                        className="object-fit"
                                    /> */}

                                    <p className="text-xl">
                                        {shorten(blog?.description, 195)}

                                        <br />
                                        <span className="text-danger font-bold">
                                            Read More...
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </ul>
        </>
    );
}
