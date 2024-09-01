import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
const handleAuth = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId };
};
export const ourFileRouter = {
  photo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
