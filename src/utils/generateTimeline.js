import { TitleOutlined } from "@mui/icons-material";

const generateTimeline = (titleName, titleDescription, titles) => {
  const events = titles.map((title) => {
    console.log("sta", title.startDate, title.endDate);

    const startDate = new Date(title.startDate);
    const endDate = title.endDate && new Date(title.endDate);
    console.log("en", startDate, endDate);

    const timelineData = {
      start_date: {
        day: startDate.getDate(),
        month: startDate.getMonth() + 1,
        year: startDate.getFullYear(),
      },
      text: {
        headline: title.name,
        text: title.description,
      },
      group: title.activityName,
    };

    if (endDate) {
      timelineData.end_date = {
        day: endDate.getDate(),
        month: endDate.getMonth() + 1,
        year: endDate.getFullYear(),
      };
    }

    if (title.image) {
      timelineData.media = {
        url: title.image,
      };
    }

    return timelineData;
  });

  return {
    title: {
      text: {
        headline: titleName,
        text: titleDescription,
      },
    },
    events: events,
  };
};

export default generateTimeline;
