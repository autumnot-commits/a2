import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 개발 서버에 localhost 말고 내 PC의 네트워크 IP(같은 와이파이의 휴대폰 등)로도 접속할 수 있게 허용한다.
  // 개발 모드에만 적용된다. IP가 바뀌면 여기도 바꾼다.
  allowedDevOrigins: ["192.168.45.58"],
};

export default nextConfig;
