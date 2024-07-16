/*
This is a Next.js example, but you can look into getting it working with Express.js instead
https://docs.novu.co/quickstart/express

Look into npm package @novu/node for novu operations
- workflow definiiton
- triggering workflows

    novu.trigger("test-app-notification", {
      to: "subscription id",
    });

To run:
npx novu@latest dev
npm run dev
Check out the studio endpoint -- you can trigger calls in the studio
Setting up a frontend with the proper subscriber ID will show the notifications in the frontend!
*/

import { serve } from "@novu/framework/next";
import { notificationWorkflow } from "../../novu/workflows";

// the workflows collection can hold as many workflow definitions as you need
export const { GET, POST, OPTIONS } = serve({
  workflows: [notificationWorkflow],
});