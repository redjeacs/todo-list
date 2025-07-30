function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function saveProjectList(projectList) {
  if (storageAvailable('localStorage')) {
    localStorage.setItem('projectList', JSON.stringify(projectList));
  } else {
    console.error('Local storage is not available');
  }
}

function loadProjectList() {
  if (storageAvailable('localStorage')) {
    const projectListData = localStorage.getItem('projectList');
    if (projectListData) {
      return JSON.parse(projectListData);
    } else {
      return null;
    }
  } else {
    console.error('Local storage is not available');
    return null;
  }
}

function clearProjectList() {
  if (storageAvailable('localStorage')) {
    localStorage.removeItem('projectList');
  } else {
    console.error('Local storage is not available');
  }
}

export { saveProjectList, loadProjectList, clearProjectList };