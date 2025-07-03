// Replace this with your shared folder ID
const ROOT_FOLDER_ID = "YOUR_FOLDER_ID_HERE";

function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

function createSession(sessionName) {
  const root = DriveApp.getFolderById(ROOT_FOLDER_ID);
  const folders = root.getFoldersByName(sessionName);
  if (folders.hasNext()) {
    return { status: "exists", url: folders.next().getUrl() };
  }
  const newFolder = root.createFolder(sessionName);
  return { status: "created", url: newFolder.getUrl() };
}

function uploadFile(sessionName, fileData) {
  const root = DriveApp.getFolderById(ROOT_FOLDER_ID);
  const folders = root.getFoldersByName(sessionName);
  if (!folders.hasNext()) throw new Error("Session not found");
  const sessionFolder = folders.next();

  const blob = Utilities.newBlob(Utilities.base64Decode(fileData.data), fileData.mimeType, fileData.name);
  sessionFolder.createFile(blob);
  return "Uploaded";
}
