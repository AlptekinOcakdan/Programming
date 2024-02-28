import { Vimeo } from '@vimeo/vimeo';
import { CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN } from '../constants/environment.js';

const vimeoClient = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);

export const uploadVideoToVimeo = (filePath) => {
    return new Promise((resolve, reject) => {
        vimeoClient.upload(
            filePath,
            {
                'name': 'Test Video',
                'description': 'This is a test video.',
            },
            function (uri) {
                console.log('File upload completed. Your Vimeo video is at:', uri);
                resolve(uri);
            },
            function (bytesUploaded, bytesTotal) {
                // Optional: Implement progress logging
                const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
                console.log(`${percentage}% uploaded`);
            },
            function (error) {
                console.error('Failed to upload to Vimeo:', error);
                reject(error);
            }
        );
    });
};
