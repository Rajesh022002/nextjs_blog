/** @type {import('next').NextConfig} */

module.exports = {
    exportPathMap: async function (defaultPathMap) {
        delete defaultPathMap['/posts/[id]']; // Exclude the problematic page
        return defaultPathMap;
    },
    images: {
        domains: ['task.appsdeployer.com'],
    },
};
