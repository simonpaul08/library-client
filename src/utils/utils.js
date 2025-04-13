

// generate QR code 
export const generateQR = (b64Data, contentType, sliceSize) => {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

// handle filter search book
export const handleSearch = (query, list) => {
  const filtered = list.filter((item) =>
    item?.title?.toLowerCase().includes(query?.toLowerCase())
  );
  return filtered;
};

// handle sort by status - pending
export const handleSortByStatus = (list) => {
  const sorted = list?.sort((a, b) => (a?.status === b?.status) ? 0 : a?.status === "pending" ? -1 : 1);
  return sorted;
};

// handle sort by issue status - issued
export const handleSortByIssueStatus = (list) => {
  const sorted = list?.sort((a, b) => (a?.issueStatus === b?.issueStatus) ? 0 : a?.issueStatus === "issued" ? -1 : 1);
  return sorted;
};