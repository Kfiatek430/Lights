import React from "react";
import { Badge } from "../ui/badge";

const OfflineBadge = () => {
  return (
    <Badge className="bg-red-600/10 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 shadow-none rounded-full">
      <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2" />
      Offline
    </Badge>
  );
};

export default OfflineBadge;
