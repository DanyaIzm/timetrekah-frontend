import { useContext, useEffect, useLayoutEffect, useState } from "react";
import PageLoader from "../components/PageLoader";
import { getSelectUtilityClasses } from "@mui/material";
import generateTimeline from "../utils/generateTimeline";
import useSWR from "swr";
import { getAuthFetcher } from "../fetcher";
import AuthContext from "../contexts/auth-context";

const HistoryPage = () => {
  const { token } = useContext(AuthContext);

  const { data, isLoading } = useSWR("/titles/", getAuthFetcher(token));

  useLayoutEffect(() => {
    if (data) {
      const titles = data.map((title) => {
        return {
          name: title.name,
          description: title.description,
          startDate: title.start_date,
          endDate: title.end_date,
          image: title.image,
          activityName: title.activity_name,
        };
      });

      const timelineData = generateTimeline("Aboba", "kakulya", titles);

      console.log(timelineData);

      const timeline = new TL.Timeline("timeline-embed", timelineData);
    }
  }, [data]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <div id="timeline-embed" style={{ width: "100%", height: "600px" }}></div>
    </>
  );
};

export default HistoryPage;
