import React, { useState, useEffect, useCallback } from "react";
import NavLayer from "./NavLayer";
import {
  NavWrapper,
  NavHistory,
  NavLayers,
  NavContent,
  NavHistoryItem,
} from "./navigator.styles";

export const NavContext = React.createContext();

export default function Navigator({
  children,
  data,
  isFinalCheck,
  parseName,
  baseName = "...",
}) {
  const [filteredData, setFilteredData] = useState([...data]);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([{ data: [...data], name: baseName }]);

  const setFilter = useCallback((data) => {
    setIsLoading(true);
    setFilteredData((current) => {
      const filtered = current.find((c) => c.id === data.id);
      if (isFinalCheck(filtered)) {
        setHistory((prevHistory) => [
          ...prevHistory,
          { data: filtered, name: parseName(data) },
        ]);
        return [filtered];
      }
      const res = Object.entries(filtered).find(
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        ([_, value]) => typeof value === "object"
      )[1];
      setHistory((prevHistory) => [
        ...prevHistory,
        { data: res, name: parseName(data) },
      ]);
      if (isFinalCheck(res)) {
        return isFinalCheck(res);
      } else {
        return res;
      }
    });
    setIsLoading(false);
  }, []);

  const handleGoBack = (index) => {
    if (index >= history.length + 1) return;
    setHistory((prevVal) => [...prevVal.slice(0, index + 1)]);
    if (index === 0) return setFilteredData([...data]);
    setFilteredData(history[index].data);
  };

  useEffect(() => {
    setFilteredData([...data]);
  }, [data]);

  return (
    <NavWrapper>
      <NavHistory>
        {history.map((historyElement, index) => {
          if (index === history.length - 1)
            return (
              <NavHistoryItem disabled>
                {parseName(historyElement)}
              </NavHistoryItem>
            );
          else
            return (
              <>
                <NavHistoryItem key={index} onClick={() => handleGoBack(index)}>
                  {parseName(historyElement)}
                </NavHistoryItem>
                <div>/</div>
              </>
            );
        })}
      </NavHistory>
      <NavLayers>
        {!isLoading && (
          <>
            {filteredData.length > 1
              ? filteredData.map((item) => (
                  <NavLayer
                    data={item}
                    key={item.id}
                    filterFunc={setFilter}
                    parseName={parseName}
                    isFinalCheck={isFinalCheck}
                  />
                ))
              : null}
          </>
        )}
      </NavLayers>
      <NavContent>
        <NavContext.Provider
          value={{
            data: filteredData,
            current: parseName(history[history.length - 1]),
          }}
        >
          {children}
        </NavContext.Provider>
      </NavContent>
    </NavWrapper>
  );
}
