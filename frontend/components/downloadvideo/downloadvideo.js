import style from "./downloadvideo.module.css";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { useState } from "react";

/**
 * https://github.com/ffmpegwasm/ffmpeg.wasm/issues/184
 * https://github.com/cvanh/cors-cache-proxy
 */

export default function DownloadVideo(props) {
  const [videoSrc, setVideoSrc] = useState("");
  async function download() {
    const ffmpeg = createFFmpeg({
      log: true,
      corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
    });

    const video_url =
      "http://localhost:5000/https://media.dumpert.nl/dmp/media/video/5/3/5/5358f72c-65bf-6ba1-958b-ca82167926fd/480/index.m3u8";

    // await ffmpeg.load();
    // // ffmpeg.FS("writeFile", "test.avi", await fetchFile("./test.avi"));
    // await ffmpeg.run(
    //   "-i",
    //   "http://media.dumpert.nl/dmp/media/video/5/3/5/5358f72c-65bf-6ba1-958b-ca82167926fd/480/index.m3u8",
    //   "test.mp4"
    // );
    // await fs.promises.writeFile(
    //   "./test.mp4",
    //   ffmpeg.FS("readFile", "test.mp4")
    // );
    // const data = await ffmpeg.FS("readFile", "test.mp4");
    // setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
    await ffmpeg.load();
    ffmpeg.FS(
      "writeFile",
      "test.mp4",
      await fetchFile(video_url)
    );
    await ffmpeg.run("-i", video_url, "-c","copy","asad.mp4");
    const data = ffmpeg.FS("readFile", "asad.mp4");
    setVideoSrc(
      URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
    );
  }
  return (
    <>
      <video src={videoSrc} controls></video>
      <br />
      <button onClick={download}>download video</button>
    </>
  );
}