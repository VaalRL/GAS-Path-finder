function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('Google Drive File Path Finder')
      .setWidth(400)
      .setHeight(300);
}

function processFileUrl(fileUrl) {
  var fileId = extractFileId(fileUrl);
  if (!fileId) {
    throw new Error('Invalid Google Drive file URL');
  }
  return getItemPathAndFolderUrls(fileId);
}

function extractFileId(url) {
  var match = url.match(/[-\w]{25,}/);
  return match ? match[0] : null;
}

function getItemPathAndFolderUrls(itemId) {
  try {
    var item;
    var itemType;
    var folderInfo = [];
    // Try to get as a file
    try {
      item = DriveApp.getFileById(itemId);
      itemType = "File";
    } catch (e) {
      // If not a file, try to get as a folder
      try {
        item = DriveApp.getFolderById(itemId);
        itemType = "Folder";
      } catch (e) {
        throw new Error("Unable to identify item type. It might be a Google document, spreadsheet, or presentation.");
      }
    }
    var pathParts = [{name: item.getName(), url: item.getUrl()}];
    var parents = item.getParents();
   
    while (parents.hasNext()) {
      var parent = parents.next();
      pathParts.unshift({
        name: parent.getName(),
        url: "https://drive.google.com/drive/folders/" + parent.getId()
      });
      folderInfo.push({
        name: parent.getName(),
        id: parent.getId(),
        url: "https://drive.google.com/drive/folders/" + parent.getId()
      });
      parents = parent.getParents();
    }
   
    var formattedPath = pathParts.map(function(part) {
      return part.name;
    }).join(" > ");

    var formattedLinkPath = pathParts.map(function(part) {
      return "[" + part.name + "](" + part.url + ")";
    }).join(" > ");
   
    var result = {
      itemType: itemType,
      path: formattedPath,
      linkPath: formattedLinkPath,
      folderInfo: folderInfo.reverse(), // Reverse array to start from root
      itemName: item.getName(),
      itemUrl: item.getUrl()
    };
    // If it's a file, add MIME type
    if (itemType === "File") {
      result.mimeType = item.getMimeType();
    }
    return result;
  } catch (e) {
    throw new Error("Error processing item: " + e.message);
  }
}