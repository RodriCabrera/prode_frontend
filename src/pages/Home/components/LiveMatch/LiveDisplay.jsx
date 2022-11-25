import { useState, useEffect } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { MdSportsSoccer, MdExitToApp } from "react-icons/md";

import useCleanupController from "../../../../hooks/useCleanupController";
import { getLiveMatch } from "../../../../api/fixture";
import { getFlagUrl } from "../../../pagesHelpers";

import {
  MatchContainer,
  MatchInfoBanner,
  MoreInfoTrigger,
  EventContainer,
  PlayerChangeGroup,
} from "./LiveMatch.styles";
import { Text } from "../../../../common/common.styles";

export function LiveDisplay({ matchData }) {
  const [live, setLive] = useState({});
  const [showMore, setShowMore] = useState(false);
  const { signal, cleanup } = useCleanupController();

  const getData = () => {
    if (!matchData) return;
    getLiveMatch(matchData.id, matchData.stageId, signal).then((res) => {
      if (res.status === 204) return;
      setLive(res.data);
    });
  };

  useEffect(() => {
    getData();
    const update = setInterval(getData, 1000 * 60);
    return () => {
      clearInterval(update);
      cleanup;
    };
  }, [matchData]);

  function sideEvent(events, evType, side) {
    if (!events) return [];
    return events.map((ev) => ({
      ...ev,
      side,
      evType,
      player: findPlayerName(ev.player, side),
      playerOn: findPlayerName(ev.playerOn, side),
      playerOff: findPlayerName(ev.playerOff, side),
    }));
  }

  function sortMinutes(a, b) {
    const splitedA = a.minute.replace("'", "").split("+");
    const splitedB = b.minute.replace("'", "").split("+");
    const difBase = parseInt(splitedA[0]) - parseInt(splitedB[0]);
    if (difBase !== 0 || (!splitedA[1] && !splitedB[1])) return difBase;
    if (!splitedA[1]) return -1;
    if (!splitedB[1]) return 1;
    return parseInt(splitedA[1]) - parseInt(splitedB[1]);
  }

  const formatEvents = () => {
    const allEvents = [
      ...sideEvent(live?.home?.goals, "goal", "home"),
      ...sideEvent(live?.away?.goals, "goal", "away"),
      ...sideEvent(live?.home?.substitutions, "sub", "home"),
      ...sideEvent(live?.away?.substitutions, "sub", "away"),
    ].sort(sortMinutes);
    return allEvents;
  };

  function findPlayerName(id, side) {
    if (!id) return null;
    return live[side].players.find((player) => player.id === id);
  }

  const allEvents = formatEvents();
  return (
    <MatchContainer>
      <Text align="center" size="0.8rem">
        {matchData.stadium}
      </Text>
      <Text align="center" color="red" margin="1rem" size="1.2rem" weight="600">
        {live?.time}
      </Text>
      <MatchInfoBanner>
        {getFlagUrl(matchData.home.flag, 1)}
        <Text>{matchData.home.name}</Text>
        <Text>{live?.home?.score}</Text>
        <Text>-</Text>
        <Text>{live?.away?.score}</Text>
        <Text>{matchData.away.name}</Text>
        {getFlagUrl(matchData.away.flag, 1)}
      </MatchInfoBanner>
      {allEvents.length > 0 && (
        <MoreInfoTrigger onClick={() => setShowMore((prev) => !prev)}>
          {showMore ? <HiChevronUp size={24} /> : <HiChevronDown size={24} />}
        </MoreInfoTrigger>
      )}
      {showMore &&
        allEvents.map((event) => {
          return <MatchEvent key={event.id} event={event} />;
        })}
    </MatchContainer>
  );
}

function MatchEvent({ event }) {
  return (
    <EventContainer position={event.side === "home" ? "left" : "right"}>
      {event.evType === "goal" ? (
        <>
          <MdSportsSoccer size={18} />
          <Text
            color="gold"
            style={{ textAlign: event.side === "home" ? "right" : "left" }}
          >
            {event.player.shirtNumber} {event.player.name}
          </Text>
          <Text
            style={{
              flexGrow: 2,
              textAlign: event.side === "home" ? "right" : "left",
            }}
          >
            {event.minute}
          </Text>
        </>
      ) : (
        <>
          <div>
            <PlayerChangeGroup exit>
              <MdExitToApp
                size={18}
                style={{
                  transform: "scaleX(-1)",
                  textAlign: event.side === "home" ? "right" : "left",
                }}
              />
              <Text
                color="salmon"
                style={{ textAlign: event.side === "home" ? "right" : "left" }}
              >
                {event.playerOff.shirtNumber} {event.playerOff.name}
              </Text>
            </PlayerChangeGroup>
            <PlayerChangeGroup>
              <MdExitToApp size={18} />
              <Text
                style={{ textAlign: event.side === "home" ? "right" : "left" }}
              >
                {event.playerOn.shirtNumber} {event.playerOn.name}
              </Text>
            </PlayerChangeGroup>
          </div>
          <Text
            style={{
              flexGrow: 2,
              textAlign: event.side === "home" ? "right" : "left",
            }}
          >
            {event.minute}
          </Text>
        </>
      )}
    </EventContainer>
  );
}
