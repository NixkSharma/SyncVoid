import DriveContents from "../../drive-contents";
import { Query } from "~/server/db/queries"

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const [folders, files, parents] = await Promise.all([
    Query.getFolders(parsedFolderId),
    Query.getFiles(parsedFolderId),
    Query.getAllParentsForFolder(parsedFolderId)
  ])

  return (
    <DriveContents
      files={files}
      folders={folders}
      parents={parents}
      currentFolderId={parsedFolderId}
    />
  );
}