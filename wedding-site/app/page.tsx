"use client";

import { useState } from "react";
import { CinematicIntro } from "@/components/sections/CinematicIntro";
import { TwoWorlds } from "@/components/sections/TwoWorlds";
import { FirstMeeting } from "@/components/sections/FirstMeeting";
import { HelloStory } from "@/components/sections/HelloStory";
import { FriendshipToLove } from "@/components/sections/FriendshipToLove";
import { Struggles } from "@/components/sections/Struggles";
import { ChoseEachOther } from "@/components/sections/ChoseEachOther";
import { Journey } from "@/components/sections/Journey";
import { MemoryUniverse } from "@/components/sections/MemoryUniverse";
import { Proposal } from "@/components/sections/Proposal";
import { FamiliesUnite } from "@/components/sections/FamiliesUnite";
import { WeddingHero } from "@/components/sections/WeddingHero";
import { WeddingEvents } from "@/components/sections/WeddingEvents";
import { Countdown } from "@/components/sections/Countdown";
import { Venue } from "@/components/sections/Venue";
import { RSVP } from "@/components/sections/RSVP";
import { ShareInvitation } from "@/components/sections/ShareInvitation";
import { FinalEnding } from "@/components/sections/FinalEnding";
import { MusicPlayer } from "@/components/ui/MusicPlayer";
import { ProgressRail } from "@/components/ui/ProgressRail";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <CinematicIntro onDone={() => setIntroDone(true)} />}

      <main className="relative">
        {/* Act I — Two lives, and how they became one */}
        <TwoWorlds />
        <FirstMeeting />
        <HelloStory />
        <FriendshipToLove />
        <Struggles />
        <ChoseEachOther />
        <Journey />
        <MemoryUniverse />
        <Proposal />

        {/* Act II — The wedding itself */}
        <FamiliesUnite />
        <WeddingHero />
        <WeddingEvents />
        <Countdown />
        <Venue />
        <RSVP />
        <ShareInvitation />
        <FinalEnding />
      </main>

      <ProgressRail />
      <MusicPlayer />
      <div className="film-grain" />
    </>
  );
}
