import style from "./downloadvideo.module.css";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { useState } from "react";

export default function DownloadVideo(props) {
  const [videoSrc, setVideoSrc] = useState("");
  async function download() {
    const ffmpeg = createFFmpeg({
      log: true,
      corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
    });

    await ffmpeg.load();
    // ffmpeg.FS("writeFile", "test.avi", await fetchFile("./test.avi"));
    await ffmpeg.run(
      "-i",
      "https://media.dumpert.nl/dmp/media/video/5/3/5/5358f72c-65bf-6ba1-958b-ca82167926fd/480/index.m3u8",
      "test.mp4"
    );
    // await fs.promises.writeFile(
    //   "./test.mp4",
    //   ffmpeg.FS("readFile", "test.mp4")
    // );
    const data = ffmpeg.FS("readFile", "test.mp4");
  }
  return <button onClick={download}>download video</button>;
}
