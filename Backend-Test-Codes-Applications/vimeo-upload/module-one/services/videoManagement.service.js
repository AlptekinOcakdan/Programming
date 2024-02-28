import ffmpeg from 'fluent-ffmpeg';

ffmpeg.setFfmpegPath("D:\\WebApps\\Programming\\Backend-Test-Codes-Applications\\vimeo-upload\\module-one\\ffmpeg\\bin\\ffmpeg.exe")

// Function to process video
export const processVideo = (inputPath, outputPath) => {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .output(outputPath)
            .on('end', () => {
                console.log('Video processing finished');
                resolve(outputPath);
            })
            .on('error', (err) => {
                console.error('Error processing video:', err);
                reject(err);
            })
            .run();
    });
};
