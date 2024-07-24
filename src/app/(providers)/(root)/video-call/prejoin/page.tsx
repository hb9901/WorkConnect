"use client";
import { PreJoin, setLogLevel } from "@livekit/components-react";
import "@livekit/components-styles";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";

const PreJoinExample: NextPage = () => {
  setLogLevel("debug", { liveKitClientLogLevel: "warn" });
  const router = useRouter();
  return (
    <div className="flex items-center h-[100vh] bg-[#121212]">
      <PreJoin
        data-lk-theme="default"
        defaults={{ videoDeviceId: "" }}
        onSubmit={(values) => {
          values.audioDeviceId;
        }}
        onValidate={(values) => {
          return true;
        }}
      />
    </div>
  );
};

export default PreJoinExample;
