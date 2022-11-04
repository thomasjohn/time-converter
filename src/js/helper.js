export const getZoneTimeString = (date, timeZone) =>
  (typeof date === "string" ? new Date(date) : date).toLocaleTimeString(
    "en-US",
    {
      timeZone,
      hour12: false,
      timeStyle: "short",
    }
  );

export const getZoneDate = (date, timeZone) => {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone,
    })
  );
};

export const getCurrentDate = (zoneDate, zoneName) => {
  const currentDate = new Date();
  const currentDateInZone = getZoneDate(currentDate, zoneName);
  const diff = currentDateInZone.getTime() - currentDate.getTime();
  return new Date(zoneDate.getTime() - diff);
};
