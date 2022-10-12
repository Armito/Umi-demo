import { useState, useEffect } from 'react';
import { Button } from 'antd';

let localStream: MediaStream;
let mediaRecorder: MediaRecorder;

const Page = () => {
  // 获取本地音视频流
  async function getLocalStream(constraints: MediaStreamConstraints) {
    // 获取媒体流
    localStream = await navigator.mediaDevices.getUserMedia(constraints);
    // 将媒体流设置到 video 标签上播放
    playLocalStream(localStream);
  }

  // 播放本地视频流
  function playLocalStream(localStream: MediaStream) {
    const videoEl = document.getElementById('localVideo') as HTMLVideoElement;
    videoEl.srcObject = localStream;
  }

  useEffect(() => {
    getLocalStream({
      audio: false,
      video: true,
    });
  }, []);

  const [imgList, setImgList] = useState<string[]>([]);
  // 拍照
  function takePhoto() {
    const videoEl = document.getElementById('localVideo') as HTMLVideoElement;
    const canvas = document.createElement('canvas');
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
    setImgList([...imgList, canvas.toDataURL('image/png')]);

    // 添加滤镜
    const filterList = [
      'blur(5px)', // 模糊
      'brightness(0.5)', // 亮度
      'contrast(200%)', // 对比度
      'grayscale(100%)', // 灰度
      'hue-rotate(90deg)', // 色相旋转
      'invert(100%)', // 反色
      'opacity(90%)', // 透明度
      'saturate(200%)', // 饱和度
      'saturate(20%)', // 饱和度
      'sepia(100%)', // 褐色
      'drop-shadow(4px 4px 8px blue)', // 阴影
    ];

    const imgs = [];
    for (let i = 0; i < filterList.length; i++) {
      ctx.filter = filterList[i];
      ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
      imgs.push(canvas.toDataURL('image/png'));
    }

    setImgList([...imgList, ...imgs]);
  }

  // 获取所有视频输入设备
  async function getDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log('🚀🚀🚀 / devices', devices);
    let videoDevices = devices.filter((device) => device.kind === 'videoinput');
  }
  useEffect(() => {
    getDevices();
  }, []);

  // 获取屏幕共享的媒体流
  async function shareScreen() {
    localStream = await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: true,
    });
    // 播放本地视频流
    playStream(localStream);
  }

  // 在视频标签中播放视频流
  function playStream(stream: MediaStream) {
    const video = document.querySelector('#localVideo') as HTMLVideoElement;
    video.srcObject = stream;
  }

  // 录制媒体流
  function startRecord() {
    if (!localStream) {
      return;
    }
    if (mediaRecorder) {
      mediaRecorder.stop();

      return;
    }
    // 录制视频
    // MediaStreamRecorder 可以在 Chrome 上将音频录制为 WAV，将视频录制为 WebM 或动画 gif
    const options = {
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
      // mimeType: 'video/mp4',
      // mimeType: 'image/gif',
    };
    mediaRecorder = new MediaRecorder(localStream, options);
    mediaRecorder.start();
    // 计时
    const timerId = setInterval(() => {
      // timer.value++
    }, 1000);
    mediaRecorder.ondataavailable = (e) => {
      const blob = new Blob([e.data], { type: 'video/mp4' });
      downloadBlob(blob);
    };
    mediaRecorder.onstop = (e: Event) => {
      // timer.value = 0
      clearInterval(timerId);
    };
  }

  // 下载 Blob
  function downloadBlob(blob: Blob) {
    // 将 Blob 对象转换成一个 URL 地址
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    // 设置 a 标签的 href 属性为刚刚生成的 URL 地址
    a.href = url;
    // 设置 a 标签的 download 属性为文件名
    a.download = `${new Date().getTime()}.${blob.type.split('/')[1]}`;
    // 模拟点击 a 标签
    a.click();
    // 释放 URL 地址
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <video id="localVideo" autoPlay playsInline muted></video>
      <Button onClick={takePhoto}>拍照</Button>
      <Button onClick={shareScreen}>分享</Button>
      <Button onClick={startRecord}>录制</Button>
      {imgList.map((img, index) => (
        <img key={index} src={img} alt="" style={{ width: 250 }} />
      ))}
    </>
  );
};

export default Page;
